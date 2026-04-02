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