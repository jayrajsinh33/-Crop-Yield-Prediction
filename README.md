# 🌾 Smart Crop Yield Prediction & Farming Assistant System

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> An AI-powered agricultural intelligence system that helps farmers make data-driven decisions for better crop yield, profit maximization, and sustainable farming practices.

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation Guide](#-installation-guide)
- [Usage Guide](#-usage-guide)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🎯 Overview

**FarmAI** is a comprehensive web-based agricultural intelligence system that leverages Machine Learning, Real-time Weather Data, and AI-powered recommendations to assist farmers in making informed decisions about crop cultivation, yield prediction, profit calculation, and farm management.

### Problem Statement
Farmers often face challenges in:
- Predicting crop yields accurately
- Choosing the right crops for their soil and climate
- Calculating potential profits
- Accessing government schemes and subsidies
- Getting timely farming advice

### Solution
FarmAI addresses these challenges by providing:
- ML-based yield prediction with 90%+ accuracy
- Smart crop recommendation system
- Real-time weather integration
- Profit calculator with market insights
- Government schemes portal
- AI-powered farming assistant

## ✨ Features

### Core Features
| Feature | Description |
|---------|-------------|
| 🌾 **Crop Yield Prediction** | ML-based prediction with multi-year forecasting |
| 🌱 **Crop Recommendation** | Suggests best crops based on soil & climate |
| 💰 **Profit Calculator** | Real-time profit analysis with market prices |
| 🌤️ **Live Weather Integration** | Automatic weather data via OpenWeatherMap API |
| 🤖 **AI Chatbot** | 24/7 intelligent farming assistant |
| 🗺️ **Interactive India Map** | State-wise farming data visualization |
| 📊 **Analytics Dashboard** | Charts for rainfall vs yield, crop comparison |
| 👤 **User System** | Login/Signup with prediction history |
| 🌍 **Multi-Language** | English, Hindi, Gujarati support |
| 📄 **PDF Reports** | Generate professional farm reports |

### Advanced Features
- 🔔 **Smart Weather Alerts** - Heavy rain, frost, heatwave warnings
- 🌱 **Seed & Fertilizer Recommendations** - Crop-specific guidance
- 📝 **Weather-Based Tasks** - Daily farming tasks based on conditions
- 💧 **Water Management** - Irrigation calculator and water-saving tips
- 📋 **Government Schemes** - PM-KISAN, Soil Health Card, PMFBY, KCC
- 🎙️ **Voice Input** - Speech recognition for chatbot
- 📱 **Responsive Design** - Works on mobile, tablet, desktop

## 🛠️ Technology Stack

### Frontend
HTML5 - Semantic markup structure

CSS3 - Glassmorphism design, animations

JavaScript ES6 - Dynamic interactions

Chart.js - Data visualization & analytics charts

Leaflet.js - Interactive India map

Font Awesome - Professional icons

Google Fonts - Inter font family


### Backend
Python 3.8+ - Core programming language

Flask 2.3.3 - Web framework

Flask-CORS - Cross-origin resource sharing

SQLite3 - Lightweight database

Joblib - ML model persistence


### Machine Learning
Scikit-learn - RandomForest, preprocessing

Pandas - Data manipulation

NumPy - Numerical computations


### APIs & Integrations
OpenWeatherMap API - Live weather data

jsPDF - PDF generation


## 📁 Project Structure

smart-farming-assistant/
│
├── frontend/ # Frontend files
│ ├── index.html # Main application page
│ ├── css/
│ │ └── style.css # Styling and animations
│ └── js/
│ └── app.js # Frontend logic & API calls
│
├── backend/ # Backend files
│ ├── app.py # Flask application (all routes)
│ ├── train_model.py # ML model training script
│ ├── requirements.txt # Python dependencies
│ └── models/ # Trained ML models
│ ├── yield_model.pkl # Yield prediction model
│ └── scaler.pkl # Feature scaler
│
├── farming_assistant.db # SQLite database (auto-generated)
└── README.md # Project documentation


## 💻 Installation Guide

### Prerequisites
- Python 3.8 or higher
- pip package manager
- Modern web browser (Chrome/Firefox/Edge)
- Git (optional)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/smart-farming-assistant.git
cd smart-farming-assistant

Step 2: Install Backend Dependencies

cd backend
pip install -r requirements.txt


requirements.txt:

Flask==2.3.3
Flask-CORS==4.0.0
scikit-learn==1.3.0
pandas==2.0.3
numpy==1.24.3
requests==2.31.0
joblib==1.3.2


Step 3: Train ML Models (Optional)

python train_model.py

Step 4: Configure Weather API (Optional)
Sign up at OpenWeatherMap

Get your free API key

Update in app.py:

WEATHER_API_KEY = "7c1b56b88375d9d8e05aa07d8506500d"

Step 5: Run the Application
python app.py

Step 6: Access the Application
Open your browser and navigate to:
http://localhost:5000

🚀 Usage Guide
1. Crop Yield Prediction
Navigate to Yield Predictor page

Enter your location or use Fetch Live Weather

Select crop type, soil type, and season

Enter temperature, humidity, rainfall

Click Predict Yield

View 3D gauge visualization and multi-year forecast

2. Crop Recommendation
Go to Crop Advisor page

Enter location or fetch weather data

Input temperature, humidity, rainfall

Select soil type

Get top 3 crop recommendations with confidence scores

3. Profit Calculator
Navigate to Profit Analyzer

Select crop type

Enter expected yield, market price, production cost

Get profit analysis with margin percentage

4. Seed & Fertilizer
Go to Seed & Fertilizer page

Select crop and soil type

Enter farm area in acres

Get seed varieties, rates, and fertilizer recommendations

5. Weather-Based Tasks
View daily farming tasks based on current weather

Check weekly schedule for seasonal activities

Mark tasks as complete

6. Government Schemes
Browse available schemes (PM-KISAN, Soil Health Card, etc.)

Click Apply to visit official government websites

View helpline numbers for assistance

7. PDF Reports
Fill farmer details (name, location, crop, yield, fertilizer)

Click Download PDF Report

Professional report generates and downloads automatically

8. AI Chatbot
Ask farming-related questions

Get instant responses about crops, fertilizers, pests

Use voice input for hands-free interaction

9. Interactive Map
Click on state markers

View detailed farming information for each state

Get crop recommendations and yield data

🔌 API Endpoints
Endpoint	Method	Description	Request Body
/api/predict	POST	Predict crop yield	{crop_type, location, rainfall, temperature, soil_type, season, humidity}
/api/recommend	POST	Get crop recommendations	{temperature, rainfall, humidity, soil_type}
/api/profit	POST	Calculate profit	{crop_type, yield_amount, market_price, production_cost}
/api/weather	GET	Fetch live weather	Query param: ?city=city_name
/api/chatbot	POST	AI assistant response	{message}
/api/auth	POST	User login/signup	{email, password}
/api/user/history	GET	Get prediction history	Query param: ?user_id=id
/api/analytics/data	GET	Get chart data	-
📸 Screenshots
Dashboard Home
https://screenshots/dashboard.png

Yield Prediction
https://screenshots/prediction.png

Crop Recommendation
https://screenshots/recommendation.png

Analytics Dashboard
https://screenshots/analytics.png

Government Schemes
https://screenshots/schemes.png

PDF Report
https://screenshots/pdf.png

🔮 Future Enhancements
Disease Detection - Upload crop images for disease identification

Market Price Integration - Live mandi prices from government APIs

Weather Alerts (SMS/Email) - Push notifications for extreme weather

Farmer Forum - Community discussion and knowledge sharing

Expert Consultation - Video call with agriculture experts

Expense Tracker - Log and analyze farming expenses

Crop Rotation Planner - AI-powered rotation suggestions

Drone Integration - Aerial crop health monitoring

Mobile App - React Native / Flutter version

Multi-language Expansion - Marathi, Telugu, Tamil, Bengali

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

Development Guidelines
Follow PEP 8 for Python code

Use semantic HTML5 elements

Write clean, commented code

Test before submitting PR

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

text
MIT License

Copyright (c) 2024 FarmAI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
🙏 Acknowledgments
OpenWeatherMap - For free weather API

Leaflet.js - For interactive mapping

Chart.js - For beautiful data visualization

Scikit-learn - For ML algorithms

Flask - For lightweight backend framework

📞 Contact
Project Maintainer: Jayrajsinh Chudasama

📧 Email: jayrajsinhc831@gmail.com

🐙 GitHub: @jayrajsinh33

💼 LinkedIn: Jayrajsinh Chudasama

Project Links
🔗 Live Demo: http://localhost:5000

📂 Repository: https://github.com/yourusername/smart-farming-assistant

⭐ Show Your Support
If you found this project helpful, please give it a ⭐ on GitHub!

Built with ❤️ for Indian Farmers | Smart Agriculture for Better Tomorrow

“Empowering Farmers with AI, One Prediction at a Time” 🌾
