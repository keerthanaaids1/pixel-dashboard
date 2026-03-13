// =============================================
// CONFIGURATION — ADD YOUR API KEY HERE!!
// =============================================
const GEMINI_API_KEY = "AIzaSyCwVB502qU7Vx4po9yP7QSL0aGF-cnaMfk";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// =============================================
// CHART INSTANCES
// =============================================
let salesChartInstance = null;
let revenueChartInstance = null;
let priceChartInstance = null;
let profitChartInstance = null;
let modalChartInstance = null;

// =============================================
// INIT
// =============================================
window.onload = () => {
  renderYearList();
  renderModelList();
  renderOverview(pixelData.models, "All");
  renderAllCharts(pixelData.models);
};

// Enter key support
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("aiInput");
  if (input) input.addEventListener("keydown", e => { if (e.key === "Enter") askAI(); });
});

// =============================================
// YEAR LIST
// =============================================
function renderYearList() {
  const years = getAllYears();
  const el = document.getElementById("yearList");
  el.innerHTML = `<div class="year-item active" onclick="selectYear(this,'all')">
    📅 All Years <span class="model-year-tag">${pixelData.models.length}</span>
  </div>`;
  years.forEach(y => {
    const count = getModelsByYear(y).length;
    el.innerHTML += `<div class="year-item" onclick="selectYear(this,${y})">
      ${y} <span class="model-year-tag">${count}</span>
    </div>`;
  });
}

function selectYear(el, year) {
  document.querySelectorAll(".year-item").forEach(e => e.classList.remove("active"));
  el.classList.add("active");
  const models = year === "all" ? pixelData.models : getModelsByYear(year);
  renderOverview(models, year);
  renderAllCharts(models);
  if (year !== "all") {
    const revenue = getTotalRevenueByYear(year);
    const profit = getTotalProfitByYear(year);
    const withTotals = models.map(m => ({ ...m, totalUnits: m.monthlySales.reduce((a,b)=>a+b,0) }));
    const highest = withTotals.reduce((a,b) => a.totalUnits > b.totalUnits ? a : b);
    const lowest = withTotals.reduce((a,b) => a.totalUnits < b.totalUnits ? a : b);
    showAIResponse(`📅 <strong>${year} Summary:</strong> ${models.length} model(s) — ${models.map(m=>m.name).join(", ")}<br>
    💰 Revenue: ₹${(revenue/1e9).toFixed(2)}B | Profit: ₹${(profit/1e7).toFixed(0)}Cr<br>
    🏆 Best seller: <strong>${highest.name}</strong> (${highest.totalUnits.toLocaleString()} units) | 
    📉 Lowest: <strong>${lowest.name}</strong> (${lowest.totalUnits.toLocaleString()} units)`);
  }
}

// =============================================
// MODEL LIST
// =============================================
function renderModelList() {
  const el = document.getElementById("modelList");
  el.innerHTML = "";
  pixelData.models.forEach(m => {
    el.innerHTML += `<div class="model-item" onclick="selectModel(this,'${m.name}')">
      ${m.name} <span class="model-year-tag">${m.year}</span>
    </div>`;
  });
}

function selectModel(el, name) {
  document.querySelectorAll(".model-item").forEach(e => e.classList.remove("active"));
  el.classList.add("active");
  const model = getModelByName(name);
  if (!model) return;
  renderOverview([model], model.year);
  renderAllCharts([model]);
  openPhoneModal(model);
}

// =============================================
// OVERVIEW CARDS
// =============================================
function renderOverview(models = pixelData.models, year = "All") {
  const totalRevenue = models.reduce((s,m) => s+m.totalRevenue, 0);
  const totalProfit  = models.reduce((s,m) => s+m.profit, 0);
  const totalUnits   = models.reduce((s,m) => s+m.monthlySales.reduce((a,b)=>a+b,0), 0);
  const avgDiscount  = Math.round(models.reduce((s,m) => s+getDiscountPercent(m), 0) / models.length);
  const topModel     = models.reduce((a,b) => a.totalRevenue > b.totalRevenue ? a : b);

  document.getElementById("overviewCards").innerHTML = `
    <div class="card">
      <div class="card-icon">📱</div>
      <div class="card-label">Models</div>
      <div class="card-value">${models.length}</div>
      <div class="card-sub">Year: ${year}</div>
    </div>
    <div class="card">
      <div class="card-icon">💰</div>
      <div class="card-label">Total Revenue</div>
      <div class="card-value">₹${(totalRevenue/1e9).toFixed(1)}B</div>
      <div class="card-sub">India market</div>
    </div>
    <div class="card">
      <div class="card-icon">📈</div>
      <div class="card-label">Total Profit</div>
      <div class="card-value">₹${(totalProfit/1e7).toFixed(0)}Cr</div>
      <div class="card-badge up">▲ Profitable</div>
    </div>
    <div class="card">
      <div class="card-icon">📦</div>
      <div class="card-label">Units Sold</div>
      <div class="card-value">${(totalUnits/1000).toFixed(0)}K</div>
      <div class="card-sub">Total units</div>
    </div>
    <div class="card">
      <div class="card-icon">🏷️</div>
      <div class="card-label">Avg Discount</div>
      <div class="card-value">${avgDiscount}%</div>
      <div class="card-badge ${avgDiscount>30?'down':'up'}">${avgDiscount>30?'▼ High drop':'▲ Stable'}</div>
    </div>
    <div class="card">
      <div class="card-icon">🏆</div>
      <div class="card-label">Top Model</div>
      <div class="card-value" style="font-size:1rem">${topModel.name}</div>
      <div class="card-sub">₹${(topModel.totalRevenue/1e9).toFixed(1)}B revenue</div>
    </div>
  `;
}

// =============================================
// CHARTS
// =============================================
function renderAllCharts(models) {
  renderSalesChart(models);
  renderRevenueChart(models);
  renderPriceChart(models);
  renderProfitChart(models);
  const sub = document.getElementById("chartSubTitle");
  if (sub) sub.textContent = models.length === 1 ? `${models[0].name} — Monthly Sales` : `${models.length} Models — Total Units`;
}

function destroyChart(inst) { if (inst) inst.destroy(); }

const COLORS = ["#1a73e8","#ea4335","#fbbc04","#34a853","#9c27b0","#00bcd4","#ff5722","#607d8b","#e91e63","#4caf50"];

function renderSalesChart(models) {
  destroyChart(salesChartInstance);
  const ctx = document.getElementById("salesChart").getContext("2d");
  if (models.length === 1) {
    const m = models[0];
    salesChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [{ label: `${m.name} Monthly Sales`, data: m.monthlySales, backgroundColor: "#1a73e822", borderColor: "#1a73e8", borderWidth: 2, borderRadius: 8 }]
      },
      options: lightChartOptions("Units")
    });
  } else {
    const show = models.slice(-6);
    salesChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: show.map(m => m.name),
        datasets: [{ label: "Total Units", data: show.map(m => m.monthlySales.reduce((a,b)=>a+b,0)), backgroundColor: COLORS.map(c => c+"33"), borderColor: COLORS, borderWidth: 2, borderRadius: 8 }]
      },
      options: lightChartOptions("Total Units")
    });
  }
}

function renderRevenueChart(models) {
  destroyChart(revenueChartInstance);
  const ctx = document.getElementById("revenueChart").getContext("2d");
  revenueChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: models.map(m => m.name),
      datasets: [{ data: models.map(m => m.totalRevenue), backgroundColor: COLORS.map(c => c+"cc"), borderColor: "#fff", borderWidth: 2 }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#4a5568", font: { family: "Outfit", size: 10 } }, position: "bottom" },
        tooltip: { callbacks: { label: ctx => ` ₹${(ctx.raw/1e9).toFixed(2)}B` } }
      }
    }
  });
}

function renderPriceChart(models) {
  destroyChart(priceChartInstance);
  const ctx = document.getElementById("priceChart").getContext("2d");
  const show = models.length > 7 ? models.slice(-7) : models;
  priceChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: show.map(m => m.name),
      datasets: [
        { label: "Launch ₹", data: show.map(m => m.launchPrice), backgroundColor: "#1a73e822", borderColor: "#1a73e8", borderWidth: 2, borderRadius: 6 },
        { label: "Current ₹", data: show.map(m => m.currentPrice), backgroundColor: "#34a85322", borderColor: "#34a853", borderWidth: 2, borderRadius: 6 }
      ]
    },
    options: lightChartOptions("Price (₹)")
  });
}

function renderProfitChart(models) {
  destroyChart(profitChartInstance);
  const ctx = document.getElementById("profitChart").getContext("2d");
  const selectedYear = models && models.length < pixelData.models.length ? Math.min(...models.map(m => m.year)) : 2016;
  const years = getAllYears().filter(y => y >= selectedYear);
  profitChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [{
        label: "Profit (₹ Crores)",
        data: years.map(y => getTotalProfitByYear(y)/1e7),
        borderColor: "#34a853",
        backgroundColor: "#34a85318",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#34a853",
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: lightChartOptions("₹ Crores")
  });
}

function lightChartOptions(yLabel) {
  return {
    responsive: true,
    plugins: { legend: { labels: { color: "#4a5568", font: { family: "Outfit", size: 11 } } } },
    scales: {
      x: { ticks: { color: "#8492a6", font: { family: "Outfit", size: 10 } }, grid: { color: "#f0f2f5" } },
      y: { ticks: { color: "#8492a6", font: { family: "Outfit", size: 10 } }, grid: { color: "#f0f2f5" }, title: { display: true, text: yLabel, color: "#8492a6", font: { size: 10 } } }
    }
  };
}

// =============================================
// PHONE MODAL
// =============================================
function openPhoneModal(model) {
  const modal = document.getElementById("phoneModal");
  const img   = document.getElementById("modalImage");
  const name  = document.getElementById("modalPhoneName");
  const det   = document.getElementById("modalDetails");

  img.src = phoneImages[model.name] || DEFAULT_IMAGE;
  name.textContent = model.name;

  const totalUnits   = model.monthlySales.reduce((a,b)=>a+b,0);
  const discount     = getDiscountPercent(model);
  const maxSales     = Math.max(...model.monthlySales);
  const bestMonth    = months[model.monthlySales.indexOf(maxSales)];
  const isProfit     = model.profit > 0;

  det.innerHTML = `
    <div class="detail-chip"><div class="detail-chip-label">Year</div><div class="detail-chip-value">${model.year}</div></div>
    <div class="detail-chip"><div class="detail-chip-label">RAM</div><div class="detail-chip-value">${model.ram}</div></div>
    <div class="detail-chip"><div class="detail-chip-label">Storage</div><div class="detail-chip-value">${model.storage.join(" / ")}</div></div>
    <div class="detail-chip"><div class="detail-chip-label">Camera</div><div class="detail-chip-value">${model.camera}</div></div>
    <div class="detail-chip"><div class="detail-chip-label">Battery</div><div class="detail-chip-value">${model.battery}</div></div>
    <div class="detail-chip"><div class="detail-chip-label">OS</div><div class="detail-chip-value">${model.os}</div></div>
    <div class="detail-chip"><div class="detail-chip-label">Launch Price</div><div class="detail-chip-value">₹${model.launchPrice.toLocaleString()}</div></div>
    <div class="detail-chip"><div class="detail-chip-label">Current Price</div><div class="detail-chip-value">₹${model.currentPrice.toLocaleString()} <span style="color:${discount>0?'#d93025':'#0f9d58'};font-size:0.75rem">(${discount}% off)</span></div></div>
    <div class="detail-chip"><div class="detail-chip-label">Units Sold</div><div class="detail-chip-value">${totalUnits.toLocaleString()}</div></div>
    <div class="detail-chip"><div class="detail-chip-label">Best Month</div><div class="detail-chip-value">${bestMonth} (${maxSales.toLocaleString()})</div></div>
    <div class="detail-chip"><div class="detail-chip-label">Revenue</div><div class="detail-chip-value">₹${(model.totalRevenue/1e9).toFixed(2)}B</div></div>
    <div class="detail-chip">
      <div class="detail-chip-label">Profit/Loss</div>
      <div class="detail-chip-value"><span class="profit-tag ${isProfit?'up':'down'}">${isProfit?'▲':'▼'} ₹${(model.profit/1e7).toFixed(0)} Cr</span></div>
    </div>
  `;

  // Modal monthly chart
  destroyChart(modalChartInstance);
  setTimeout(() => {
    const mctx = document.getElementById("modalChart").getContext("2d");
    modalChartInstance = new Chart(mctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [{
          label: "Units Sold",
          data: model.monthlySales,
          borderColor: "#1a73e8",
          backgroundColor: "#1a73e815",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#1a73e8",
          pointRadius: 4
        }]
      },
      options: lightChartOptions("Units")
    });
  }, 100);

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("phoneModal").classList.add("hidden");
  destroyChart(modalChartInstance);
  modalChartInstance = null;
}

// Close on backdrop click
document.addEventListener("click", e => {
  const modal = document.getElementById("phoneModal");
  if (e.target === modal) closeModal();
});

// =============================================
// GEMINI AI
// =============================================
function showAIResponse(html) {
  const el = document.getElementById("aiResponse");
  el.classList.remove("hidden", "loading");
  el.innerHTML = html;
}

async function askAI() {
  const query = document.getElementById("aiInput").value.trim();
  if (!query) return;

  const el = document.getElementById("aiResponse");
  el.classList.remove("hidden");
  el.classList.add("loading");
  el.textContent = "🤖 Thinking...";

  // Always try fallback first for speed + accuracy
  const fallbackResult = handleFallbackQuery(query);

  // Try Gemini if API key set
  if (GEMINI_API_KEY !== "AIzaSyCwVB502qU7Vx4po9yP7QSL0aGF-cnaMfk") {
    try {
      const dataContext = pixelData.models.map(m =>
        `${m.name} (${m.year}): RAM ${m.ram}, Launch ₹${m.launchPrice}, Current ₹${m.currentPrice}, Revenue ₹${(m.totalRevenue/1e9).toFixed(2)}B, Profit ₹${(m.profit/1e7).toFixed(0)}Cr, TotalUnits ${m.monthlySales.reduce((a,b)=>a+b,0)}, BestMonth ${months[m.monthlySales.indexOf(Math.max(...m.monthlySales))]}`
      ).join("\n");

      const prompt = `You are a Business Intelligence analyst for Google Pixel India Sales. Answer concisely using ONLY the data below. Use ₹ for prices. Be specific with numbers.

DATA:
${dataContext}

Question: ${query}`;

      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && !text.includes("error")) {
        showAIResponse(`🤖 <strong>AI:</strong> ${text}`);
        autoUpdateCharts(query);
        return;
      }
    } catch(e) {}
  }

  // Use fallback
  showAIResponse(`🤖 <strong>AI Response:</strong> ${fallbackResult}`);
  autoUpdateCharts(query);
}

// =============================================
// FALLBACK QUERY HANDLER
// =============================================
function handleFallbackQuery(query) {
  const q = query.toLowerCase();

  // Year + highest/lowest
  const yearMatch = q.match(/20\d{2}/);
  if (yearMatch) {
    const year = parseInt(yearMatch[0]);
    const models = getModelsByYear(year);
    if (models.length > 0) {
      const withTotals = models.map(m => ({ ...m, totalUnits: m.monthlySales.reduce((a,b)=>a+b,0) }));
      const highest = withTotals.reduce((a,b) => a.totalUnits > b.totalUnits ? a : b);
      const lowest  = withTotals.reduce((a,b) => a.totalUnits < b.totalUnits ? a : b);

      const askHigh = q.includes("highest") || q.includes("most") || q.includes("best") || q.includes("top");
      const askLow  = q.includes("lowest") || q.includes("least") || q.includes("worst") || q.includes("minimum");

      if (askHigh && askLow) {
        return `📊 In <strong>${year}</strong> (${models.length} models):<br>
        🏆 <strong>Highest:</strong> ${highest.name} — ${highest.totalUnits.toLocaleString()} units, ₹${(highest.totalRevenue/1e9).toFixed(2)}B revenue<br>
        📉 <strong>Lowest:</strong> ${lowest.name} — ${lowest.totalUnits.toLocaleString()} units, ₹${(lowest.totalRevenue/1e9).toFixed(2)}B revenue`;
      }
      if (askHigh) return `🏆 In <strong>${year}</strong>, <strong>${highest.name}</strong> had the highest sales: ${highest.totalUnits.toLocaleString()} units sold. Revenue: ₹${(highest.totalRevenue/1e9).toFixed(2)}B, Profit: ₹${(highest.profit/1e7).toFixed(0)}Cr.`;
      if (askLow)  return `📉 In <strong>${year}</strong>, <strong>${lowest.name}</strong> had the lowest sales: ${lowest.totalUnits.toLocaleString()} units sold. Revenue: ₹${(lowest.totalRevenue/1e9).toFixed(2)}B.`;

      return `📅 In <strong>${year}</strong>: ${models.map(m=>m.name).join(", ")}. Revenue: ₹${(getTotalRevenueByYear(year)/1e9).toFixed(2)}B | Profit: ₹${(getTotalProfitByYear(year)/1e7).toFixed(0)}Cr | Best seller: <strong>${highest.name}</strong>`;
    }
  }

  // Compare
  if (q.includes("compare") || q.includes(" vs ")) {
    const found = pixelData.models.filter(m => q.includes(m.name.toLowerCase()));
    if (found.length >= 2) {
      const [a, b] = found;
      const aUnits = a.monthlySales.reduce((x,y)=>x+y,0);
      const bUnits = b.monthlySales.reduce((x,y)=>x+y,0);
      return `⚖️ <strong>Comparison:</strong><br>
      📱 <strong>${a.name}</strong>: RAM ${a.ram} | Launch ₹${a.launchPrice.toLocaleString()} | Revenue ₹${(a.totalRevenue/1e9).toFixed(2)}B | ${aUnits.toLocaleString()} units<br>
      📱 <strong>${b.name}</strong>: RAM ${b.ram} | Launch ₹${b.launchPrice.toLocaleString()} | Revenue ₹${(b.totalRevenue/1e9).toFixed(2)}B | ${bUnits.toLocaleString()} units<br>
      🏆 Winner: <strong>${a.totalRevenue > b.totalRevenue ? a.name : b.name}</strong> (higher revenue)`;
    }
  }

  // Highest/lowest overall
  if (q.includes("highest revenue") || q.includes("most revenue")) {
    const top = pixelData.models.reduce((a,b) => a.totalRevenue > b.totalRevenue ? a : b);
    return `💰 <strong>${top.name}</strong> (${top.year}) had the highest revenue: ₹${(top.totalRevenue/1e9).toFixed(2)}B`;
  }
  if (q.includes("highest profit") || q.includes("most profit")) {
    const top = pixelData.models.reduce((a,b) => a.profit > b.profit ? a : b);
    return `📈 <strong>${top.name}</strong> (${top.year}) had the highest profit: ₹${(top.profit/1e7).toFixed(0)} Crores`;
  }
  if (q.includes("highest sale") || q.includes("most sale") || q.includes("best selling")) {
    const top = pixelData.models.reduce((a,b) => {
      const aU = a.monthlySales.reduce((x,y)=>x+y,0);
      const bU = b.monthlySales.reduce((x,y)=>x+y,0);
      return aU > bU ? a : b;
    });
    const units = top.monthlySales.reduce((a,b)=>a+b,0);
    return `🏆 <strong>${top.name}</strong> (${top.year}) was the best-selling Pixel with ${units.toLocaleString()} units sold in India.`;
  }
  if (q.includes("lowest sale") || q.includes("least sale") || q.includes("worst selling")) {
    const bot = pixelData.models.reduce((a,b) => {
      const aU = a.monthlySales.reduce((x,y)=>x+y,0);
      const bU = b.monthlySales.reduce((x,y)=>x+y,0);
      return aU < bU ? a : b;
    });
    const units = bot.monthlySales.reduce((a,b)=>a+b,0);
    return `📉 <strong>${bot.name}</strong> (${bot.year}) had the lowest sales with ${units.toLocaleString()} units sold.`;
  }
  if (q.includes("cheapest") || q.includes("affordable") || q.includes("lowest price")) {
    const m = pixelData.models.reduce((a,b) => a.currentPrice < b.currentPrice ? a : b);
    return `🏷️ <strong>${m.name}</strong> is currently the most affordable Pixel at ₹${m.currentPrice.toLocaleString()} in India.`;
  }
  if (q.includes("expensive") || q.includes("costliest") || q.includes("highest price")) {
    const m = pixelData.models.reduce((a,b) => a.currentPrice > b.currentPrice ? a : b);
    return `💎 <strong>${m.name}</strong> is the most expensive Pixel at ₹${m.currentPrice.toLocaleString()} in India.`;
  }
  if (q.includes("latest") || q.includes("newest")) {
    const m = pixelData.models[pixelData.models.length-1];
    return `🆕 Latest Pixel: <strong>${m.name}</strong> (${m.year}) — ₹${m.launchPrice.toLocaleString()}, ${m.ram} RAM, ${m.camera} camera.`;
  }
  if (q.includes("best year") || q.includes("most profitable year")) {
    const years = getAllYears();
    const best = years.reduce((a,b) => getTotalProfitByYear(a) > getTotalProfitByYear(b) ? a : b);
    return `🏆 Best year: <strong>${best}</strong> — Profit ₹${(getTotalProfitByYear(best)/1e7).toFixed(0)}Cr, Revenue ₹${(getTotalRevenueByYear(best)/1e9).toFixed(2)}B`;
  }
  if (q.includes("how many") || q.includes("total models")) {
    return `📱 Google launched <strong>${pixelData.models.length} Pixel models</strong> in India (2016–2026). Total revenue: ₹${(pixelData.models.reduce((s,m)=>s+m.totalRevenue,0)/1e9).toFixed(1)}B`;
  }

  // Specific model
  for (const model of pixelData.models) {
    if (q.includes(model.name.toLowerCase())) {
      const totalUnits = model.monthlySales.reduce((a,b)=>a+b,0);
      const maxSales   = Math.max(...model.monthlySales);
      const bestMonth  = months[model.monthlySales.indexOf(maxSales)];
      const minSales   = Math.min(...model.monthlySales.filter(s=>s>0));
      const worstMonth = months[model.monthlySales.indexOf(minSales)];
      const disc       = getDiscountPercent(model);
      return `📱 <strong>${model.name} (${model.year}):</strong><br>
      RAM ${model.ram} | Storage ${model.storage.join("/")} | ${model.camera} | ${model.battery}<br>
      Launch ₹${model.launchPrice.toLocaleString()} → Current ₹${model.currentPrice.toLocaleString()} (${disc}% drop)<br>
      Units: ${totalUnits.toLocaleString()} | Revenue: ₹${(model.totalRevenue/1e9).toFixed(2)}B | Profit: ₹${(model.profit/1e7).toFixed(0)}Cr<br>
      🏆 Best month: <strong>${bestMonth}</strong> (${maxSales.toLocaleString()} units) | 📉 Worst: <strong>${worstMonth}</strong> (${minSales.toLocaleString()} units)`;
    }
  }

  return `🤖 I know ${pixelData.models.length} Pixel models (India, 2016–2026). Try:<br>
  "Which 2024 model had highest sales?" | "Compare Pixel 7 and Pixel 8" | "Cheapest Pixel" | "Best year" | "Pixel 9 details"`;
}

// Auto update charts based on query
function autoUpdateCharts(query) {
  const q = query.toLowerCase();
  for (const model of pixelData.models) {
    if (q.includes(model.name.toLowerCase())) {
      renderAllCharts([model]);
      renderOverview([model], model.year);
      return;
    }
  }
  const yearMatch = q.match(/20\d{2}/);
  if (yearMatch) {
    const models = getModelsByYear(parseInt(yearMatch[0]));
    if (models.length > 0) {
      renderAllCharts(models);
      renderOverview(models, yearMatch[0]);
    }
  }
}

// =============================================
// CSV UPLOAD
// =============================================
function handleCSV(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const rows = e.target.result.trim().split("\n").map(r => r.split(","));
    const headers = rows[0].map(h => h.trim().toLowerCase());
    const csvModels = rows.slice(1).filter(r => r.length >= 3).map((row, i) => {
      const obj = {};
      headers.forEach((h,idx) => { obj[h] = row[idx]?.trim(); });
      return {
        name: obj["model"] || obj["name"] || `Row ${i+1}`,
        year: parseInt(obj["year"]) || 2024,
        ram: obj["ram"] || "N/A",
        storage: [obj["storage"] || "N/A"],
        launchPrice: parseInt(obj["launch_price"] || obj["launchprice"] || 0),
        currentPrice: parseInt(obj["current_price"] || obj["currentprice"] || 0),
        monthlySales: Array(12).fill(parseInt(obj["monthly_sales"] || obj["sales"] || 0)),
        totalRevenue: parseInt(obj["revenue"] || 0),
        profit: parseInt(obj["profit"] || 0),
        loss: 0,
        camera: obj["camera"] || "N/A",
        battery: obj["battery"] || "N/A",
        os: obj["os"] || "N/A",
      };
    });
    if (csvModels.length > 0) {
      renderAllCharts(csvModels);
      renderOverview(csvModels, "CSV");
      showAIResponse(`📂 <strong>CSV Loaded!</strong> ${csvModels.length} records from "${file.name}" — dashboard updated!`);
    }
  };
  reader.readAsText(file);
}
