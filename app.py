from flask import Flask, request, jsonify, send_from_directory
import requests
import os

app = Flask(__name__, static_folder='.')

# =============================================
# SERVE FRONTEND FILES
# =============================================
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_file(filename):
    return send_from_directory('.', filename)

# =============================================
# GEMINI API ENDPOINT
# =============================================
@app.route('/api/ask', methods=['POST'])
def ask_gemini():
    try:
        data = request.get_json()
        query = data.get('query', '')
        context = data.get('context', '')
        api_key = data.get('api_key', '')

        if not api_key:
            return jsonify({'error': 'API key missing'}), 400

        # Build prompt
        prompt = f"""You are a Business Intelligence analyst for Google Pixel India Sales Dashboard.
Answer concisely using ONLY the data provided. Use ₹ for prices. Be specific with numbers.

DATA:
{context}

Question: {query}

Answer in 2-3 sentences max."""

        # Call Gemini API
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        
        response = requests.post(url, json={
            "contents": [{"parts": [{"text": prompt}]}]
        })

        result = response.json()
        text = result['candidates'][0]['content']['parts'][0]['text']
        
        return jsonify({'response': text, 'status': 'success'})

    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

# =============================================
# DATA ANALYTICS ENDPOINT
# =============================================
@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    try:
        analytics = {
            "total_models": 25,
            "years_covered": "2016-2026",
            "market": "India",
            "features": [
                "Natural Language Queries",
                "Interactive Charts",
                "CSV Upload",
                "Gemini AI Integration",
                "Year/Model Filtering"
            ],
            "tech_stack": {
                "frontend": "HTML, CSS, JavaScript",
                "charts": "Chart.js",
                "ai": "Google Gemini API",
                "backend": "Python Flask",
                "data": "JavaScript Dataset + CSV Upload"
            }
        }
        return jsonify(analytics)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =============================================
# RUN SERVER
# =============================================
if __name__ == '__main__':
    print("🚀 Pixel BI Dashboard Server Starting...")
    print("📊 Open: http://localhost:5000")
    print("🇮🇳 Google Pixel India Sales Dashboard")
    app.run(debug=True, port=5000)
