const pixelData = {
  models: [
    {
      name: "Pixel 1", year: 2016, ram: "4GB", storage: ["32GB", "128GB"],
      launchPrice: 57000, currentPrice: 8000,
      monthlySales: [1200, 1100, 1300, 1000, 950, 1050, 1150, 1200, 1100, 1000, 1300, 1400],
      totalRevenue: 684000000, profit: 120000000, loss: 0,
      camera: "12.3MP", battery: "2770mAh", os: "Android 7.1"
    },
    {
      name: "Pixel 1 XL", year: 2016, ram: "4GB", storage: ["32GB", "128GB"],
      launchPrice: 67000, currentPrice: 9000,
      monthlySales: [900, 850, 1000, 800, 780, 850, 900, 950, 880, 800, 1000, 1100],
      totalRevenue: 603000000, profit: 95000000, loss: 0,
      camera: "12.3MP", battery: "3450mAh", os: "Android 7.1"
    },
    {
      name: "Pixel 2", year: 2017, ram: "4GB", storage: ["64GB", "128GB"],
      launchPrice: 61000, currentPrice: 9500,
      monthlySales: [1500, 1400, 1600, 1300, 1200, 1350, 1450, 1500, 1400, 1300, 1600, 1700],
      totalRevenue: 976500000, profit: 180000000, loss: 0,
      camera: "12.2MP", battery: "2700mAh", os: "Android 8.0"
    },
    {
      name: "Pixel 2 XL", year: 2017, ram: "4GB", storage: ["64GB", "128GB"],
      launchPrice: 73000, currentPrice: 10000,
      monthlySales: [1100, 1050, 1200, 1000, 950, 1050, 1100, 1150, 1080, 1000, 1200, 1300],
      totalRevenue: 862500000, profit: 150000000, loss: 0,
      camera: "12.2MP", battery: "3520mAh", os: "Android 8.0"
    },
    {
      name: "Pixel 3", year: 2018, ram: "4GB", storage: ["64GB", "128GB"],
      launchPrice: 71000, currentPrice: 11000,
      monthlySales: [1800, 1700, 1900, 1600, 1500, 1650, 1750, 1850, 1700, 1600, 1900, 2000],
      totalRevenue: 1278000000, profit: 220000000, loss: 0,
      camera: "12.2MP", battery: "2915mAh", os: "Android 9.0"
    },
    {
      name: "Pixel 3 XL", year: 2018, ram: "4GB", storage: ["64GB", "128GB"],
      launchPrice: 83000, currentPrice: 12000,
      monthlySales: [1400, 1350, 1500, 1250, 1200, 1300, 1400, 1450, 1350, 1250, 1500, 1600],
      totalRevenue: 1162500000, profit: 190000000, loss: 0,
      camera: "12.2MP", battery: "3430mAh", os: "Android 9.0"
    },
    {
      name: "Pixel 3a", year: 2019, ram: "4GB", storage: ["64GB"],
      launchPrice: 39999, currentPrice: 12000,
      monthlySales: [2200, 2100, 2300, 2000, 1900, 2050, 2150, 2250, 2100, 2000, 2300, 2400],
      totalRevenue: 1079946000, profit: 200000000, loss: 0,
      camera: "12.2MP", battery: "3000mAh", os: "Android 9.0"
    },
    {
      name: "Pixel 4", year: 2019, ram: "6GB", storage: ["64GB", "128GB"],
      launchPrice: 53999, currentPrice: 13000,
      monthlySales: [1600, 1500, 1700, 1400, 1300, 1450, 1550, 1650, 1500, 1400, 1700, 1800],
      totalRevenue: 864000000, profit: 150000000, loss: 0,
      camera: "12.2MP + 16MP", battery: "2800mAh", os: "Android 10"
    },
    {
      name: "Pixel 4 XL", year: 2019, ram: "6GB", storage: ["64GB", "128GB"],
      launchPrice: 64999, currentPrice: 14000,
      monthlySales: [1200, 1150, 1300, 1100, 1050, 1150, 1200, 1250, 1150, 1100, 1300, 1400],
      totalRevenue: 780000000, profit: 130000000, loss: 0,
      camera: "12.2MP + 16MP", battery: "3700mAh", os: "Android 10"
    },
    {
      name: "Pixel 4a", year: 2020, ram: "6GB", storage: ["128GB"],
      launchPrice: 29999, currentPrice: 15000,
      monthlySales: [3000, 2900, 3100, 2800, 2700, 2850, 2950, 3050, 2900, 2800, 3100, 3200],
      totalRevenue: 898200000, profit: 180000000, loss: 0,
      camera: "12.2MP", battery: "3140mAh", os: "Android 11"
    },
    {
      name: "Pixel 5", year: 2020, ram: "8GB", storage: ["128GB"],
      launchPrice: 51999, currentPrice: 18000,
      monthlySales: [2000, 1900, 2100, 1800, 1700, 1850, 1950, 2050, 1900, 1800, 2100, 2200],
      totalRevenue: 1039800000, profit: 200000000, loss: 0,
      camera: "12.2MP + 16MP", battery: "4080mAh", os: "Android 11"
    },
    {
      name: "Pixel 6", year: 2021, ram: "8GB", storage: ["128GB", "256GB"],
      launchPrice: 59000, currentPrice: 23499,
      monthlySales: [3500, 3400, 3600, 3200, 3100, 3250, 3400, 3500, 3350, 3200, 3600, 3800],
      totalRevenue: 2065000000, profit: 380000000, loss: 0,
      camera: "50MP + 12MP", battery: "4614mAh", os: "Android 12"
    },
    {
      name: "Pixel 6 Pro", year: 2021, ram: "12GB", storage: ["128GB", "256GB", "512GB"],
      launchPrice: 79000, currentPrice: 28000,
      monthlySales: [2500, 2400, 2600, 2300, 2200, 2350, 2450, 2550, 2400, 2300, 2600, 2800],
      totalRevenue: 1975000000, profit: 350000000, loss: 0,
      camera: "50MP + 48MP + 12MP", battery: "5003mAh", os: "Android 12"
    },
    {
      name: "Pixel 6a", year: 2022, ram: "6GB", storage: ["128GB"],
      launchPrice: 43999, currentPrice: 22000,
      monthlySales: [4000, 3900, 4100, 3800, 3700, 3850, 3950, 4050, 3900, 3800, 4100, 4300],
      totalRevenue: 1759960000, profit: 300000000, loss: 0,
      camera: "12.2MP + 12MP", battery: "4306mAh", os: "Android 12"
    },
    {
      name: "Pixel 7", year: 2022, ram: "8GB", storage: ["128GB", "256GB"],
      launchPrice: 59999, currentPrice: 26999,
      monthlySales: [4500, 4400, 4600, 4200, 4100, 4250, 4400, 4500, 4350, 4200, 4600, 4800],
      totalRevenue: 2699550000, profit: 480000000, loss: 0,
      camera: "50MP + 12MP", battery: "4355mAh", os: "Android 13"
    },
    {
      name: "Pixel 7 Pro", year: 2022, ram: "12GB", storage: ["128GB", "256GB", "512GB"],
      launchPrice: 84999, currentPrice: 35000,
      monthlySales: [3000, 2900, 3100, 2800, 2700, 2850, 2950, 3050, 2900, 2800, 3100, 3300],
      totalRevenue: 2549970000, profit: 450000000, loss: 0,
      camera: "50MP + 48MP + 12MP", battery: "5000mAh", os: "Android 13"
    },
    {
      name: "Pixel 7a", year: 2023, ram: "8GB", storage: ["128GB"],
      launchPrice: 53999, currentPrice: 34999,
      monthlySales: [5000, 4900, 5100, 4800, 4700, 4850, 4950, 5050, 4900, 4800, 5100, 5300],
      totalRevenue: 2699950000, profit: 500000000, loss: 0,
      camera: "64MP + 13MP", battery: "4385mAh", os: "Android 13"
    },
    {
      name: "Pixel 8", year: 2023, ram: "8GB", storage: ["128GB", "256GB"],
      launchPrice: 75999, currentPrice: 49999,
      monthlySales: [5500, 5400, 5600, 5200, 5100, 5250, 5400, 5500, 5350, 5200, 5600, 5800],
      totalRevenue: 4179945000, profit: 750000000, loss: 0,
      camera: "50MP + 12MP", battery: "4575mAh", os: "Android 14"
    },
    {
      name: "Pixel 8 Pro", year: 2023, ram: "12GB", storage: ["128GB", "256GB", "512GB", "1TB"],
      launchPrice: 106999, currentPrice: 75000,
      monthlySales: [4000, 3900, 4100, 3800, 3700, 3850, 3950, 4050, 3900, 3800, 4100, 4300],
      totalRevenue: 4279960000, profit: 780000000, loss: 0,
      camera: "50MP + 48MP + 48MP", battery: "5050mAh", os: "Android 14"
    },
    {
      name: "Pixel 8a", year: 2024, ram: "8GB", storage: ["128GB", "256GB"],
      launchPrice: 52999, currentPrice: 49999,
      monthlySales: [6000, 5900, 6100, 5800, 5700, 5850, 5950, 6050, 5900, 5800, 6100, 6300],
      totalRevenue: 3179940000, profit: 580000000, loss: 0,
      camera: "64MP + 13MP", battery: "4492mAh", os: "Android 14"
    },
    {
      name: "Pixel 9", year: 2024, ram: "12GB", storage: ["128GB", "256GB"],
      launchPrice: 79999, currentPrice: 79999,
      monthlySales: [7000, 6900, 7100, 6800, 6700, 6850, 6950, 7050, 6900, 6800, 7100, 7300],
      totalRevenue: 5599930000, profit: 1000000000, loss: 0,
      camera: "50MP + 48MP", battery: "4700mAh", os: "Android 14"
    },
    {
      name: "Pixel 9 Pro", year: 2024, ram: "16GB", storage: ["128GB", "256GB", "512GB", "1TB"],
      launchPrice: 109999, currentPrice: 109999,
      monthlySales: [5000, 4900, 5100, 4800, 4700, 4850, 4950, 5050, 4900, 4800, 5100, 5300],
      totalRevenue: 5499945000, profit: 980000000, loss: 0,
      camera: "50MP + 48MP + 48MP", battery: "4700mAh", os: "Android 14"
    },
    {
      name: "Pixel 10", year: 2025, ram: "12GB", storage: ["128GB", "256GB"],
      launchPrice: 70690, currentPrice: 70690,
      monthlySales: [8000, 7900, 8100, 7800, 7700, 7850, 7950, 8050, 7900, 7800, 8100, 8300],
      totalRevenue: 5655200000, profit: 1100000000, loss: 0,
      camera: "50MP + 48MP", battery: "4800mAh", os: "Android 15"
    },
    {
      name: "Pixel 10 Pro", year: 2025, ram: "16GB", storage: ["256GB", "512GB", "1TB"],
      launchPrice: 99999, currentPrice: 99999,
      monthlySales: [6000, 5900, 6100, 5800, 5700, 5850, 5950, 6050, 5900, 5800, 6100, 6300],
      totalRevenue: 5999940000, profit: 1200000000, loss: 0,
      camera: "50MP + 48MP + 48MP", battery: "5000mAh", os: "Android 15"
    },
    {
      name: "Pixel 10a", year: 2026, ram: "8GB", storage: ["128GB", "256GB"],
      launchPrice: 49999, currentPrice: 49999,
      monthlySales: [9000, 8800, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      totalRevenue: 889982000, profit: 180000000, loss: 0,
      camera: "64MP + 13MP", battery: "4500mAh", os: "Android 16"
    }
  ]
};

// Helper functions
function getModelsByYear(year) {
  return pixelData.models.filter(m => m.year === year);
}

function getAllYears() {
  return [...new Set(pixelData.models.map(m => m.year))].sort();
}

function getModelByName(name) {
  return pixelData.models.find(m => m.name === name);
}

function getTotalRevenueByYear(year) {
  return getModelsByYear(year).reduce((sum, m) => sum + m.totalRevenue, 0);
}

function getTotalProfitByYear(year) {
  return getModelsByYear(year).reduce((sum, m) => sum + m.profit, 0);
}

function getDiscountPercent(model) {
  return Math.round(((model.launchPrice - model.currentPrice) / model.launchPrice) * 100);
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
