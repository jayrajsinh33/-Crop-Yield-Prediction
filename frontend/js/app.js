// ==================== WEATHER ANIMATIONS ====================
let weatherType = 'clear';

function initWeatherAnimation() {
    const canvas = document.getElementById('weatherCanvas');
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let weatherPatterns = {
        clear: { count: 0, color: '#FFD700', update: updateClear },
        rain: { count: 100, color: '#88AAFF', update: updateRain },
        snow: { count: 80, color: '#FFFFFF', update: updateSnow },
        clouds: { count: 15, color: '#AAAAAA', update: updateClouds },
        wind: { count: 50, color: '#CCCCCC', update: updateWind }
    };
    
    function updateClear(p) {
        // No particles for clear sky
    }
    
    function updateRain(p) {
        p.y += p.speed;
        if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
        }
    }
    
    function updateSnow(p) {
        p.y += p.speed;
        p.x += Math.sin(p.angle) * 0.5;
        p.angle += 0.02;
        if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
        }
    }
    
    function updateClouds(p) {
        p.x += p.speed;
        if (p.x > canvas.width + 100) p.x = -100;
    }
    
    function updateWind(p) {
        p.x += p.speed;
        if (p.x > canvas.width) {
            p.x = 0;
            p.y = Math.random() * canvas.height;
        }
    }
    
    function initParticles() {
        const pattern = weatherPatterns[weatherType];
        particles = [];
        for (let i = 0; i < pattern.count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: 2 + Math.random() * 3,
                angle: Math.random() * Math.PI * 2,
                size: 2 + Math.random() * 3
            });
        }
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (weatherType === 'clear') {
            // Draw sun
            const sunX = canvas.width - 80;
            const sunY = 80;
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#FFD700';
            ctx.beginPath();
            ctx.arc(sunX, sunY, 40, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD700';
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Sun rays
            for (let i = 0; i < 12; i++) {
                const angle = (i * Math.PI * 2) / 12;
                const x1 = sunX + Math.cos(angle) * 50;
                const y1 = sunY + Math.sin(angle) * 50;
                const x2 = sunX + Math.cos(angle) * 70;
                const y2 = sunY + Math.sin(angle) * 70;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
        
        // Draw particles
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = weatherPatterns[weatherType].color;
            ctx.fill();
            
            // Update position
            weatherPatterns[weatherType].update(p);
        });
        
        requestAnimationFrame(draw);
    }
    
    initParticles();
    draw();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}

// ==================== UPDATE WEATHER BG BASED ON CONDITIONS ====================
function updateWeatherBackground(temp, condition, rainfall) {
    const canvas = document.getElementById('weatherCanvas');
    if (!canvas) return;
    
    if (rainfall > 10 || condition.includes('rain')) {
        weatherType = 'rain';
        canvas.style.opacity = '0.8';
    } else if (temp < 10 || condition.includes('snow')) {
        weatherType = 'snow';
        canvas.style.opacity = '0.9';
    } else if (condition.includes('wind')) {
        weatherType = 'wind';
        canvas.style.opacity = '0.6';
    } else if (condition.includes('cloud')) {
        weatherType = 'clouds';
        canvas.style.opacity = '0.7';
    } else {
        weatherType = 'clear';
        canvas.style.opacity = '0.5';
    }
    
    // Reinitialize particles for new weather type
    if (window.reinitWeather) window.reinitWeather();
}

// ==================== CROP SELECTOR ====================
document.querySelectorAll('.crop-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.crop-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        document.getElementById('crop-type').value = option.dataset.crop;
    });
});

document.querySelectorAll('.season-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.season-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        document.getElementById('season').value = option.dataset.season;
    });
});

// ==================== QUICK PREDICTION ====================
function quickPredict() {
    const crop = document.getElementById('quickCrop').value;
    if (!crop || crop === 'Select Crop') {
        alert('Please select a crop');
        return;
    }
    
    const predictedYield = Math.floor(Math.random() * 3000) + 3500;
    document.getElementById('quickResult').innerHTML = `
        <div class="quick-result-card">
            <i class="fas fa-chart-line"></i>
            <span>${crop}: ${predictedYield} kg/ha</span>
        </div>
    `;
}

// ==================== FARMING TIPS CAROUSEL ====================
const tips = [
    { icon: 'fa-tint', text: 'Optimal irrigation time: Early morning (5-7 AM) reduces water loss by 30%' },
    { icon: 'fa-seedling', text: 'Crop rotation improves soil fertility and reduces pest problems' },
    { icon: 'fa-chart-line', text: 'Soil testing every 2-3 years can increase yield by 15-20%' },
    { icon: 'fa-bug', text: 'Neem oil is an effective organic pesticide for most crops' },
    { icon: 'fa-cloud-sun', text: 'Mulching helps retain soil moisture and suppress weeds' },
    { icon: 'fa-hand-holding-usd', text: 'Store produce properly to get 20-30% better prices' }
];

let tipIndex = 0;
function rotateTips() {
    const tip = tips[tipIndex];
    document.getElementById('tipsCarousel').innerHTML = `
        <div class="tip-card">
            <i class="fas ${tip.icon}"></i>
            <p>${tip.text}</p>
        </div>
    `;
    tipIndex = (tipIndex + 1) % tips.length;
}
setInterval(rotateTips, 5000);
rotateTips();

// ==================== MARKET PRICES ====================
const marketData = [
    { crop: 'Rice', price: '₹2,450/quintal', change: '+2.3%' },
    { crop: 'Wheat', price: '₹2,280/quintal', change: '+1.8%' },
    { crop: 'Maize', price: '₹2,150/quintal', change: '+3.2%' },
    { crop: 'Cotton', price: '₹6,800/quintal', change: '-0.5%' }
];

function updateMarketPrices() {
    const container = document.getElementById('marketPrices');
    if (container) {
        container.innerHTML = marketData.map(item => `
            <div class="market-item">
                <span class="market-crop">${item.crop}</span>
                <span class="market-price">${item.price}</span>
                <span class="market-change ${item.change.includes('+') ? 'up' : 'down'}">${item.change}</span>
            </div>
        `).join('');
    }
}
updateMarketPrices();

// ==================== LIVE WEATHER ====================
async function updateLiveWeather(city = 'Mumbai') {
    try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();
        
        if (data.success) {
            const weatherHtml = `
                <div class="weather-main">
                    <div class="weather-temp">${data.temperature}°C</div>
                    <div class="weather-condition">${data.condition}</div>
                </div>
                <div class="weather-details-grid">
                    <div><i class="fas fa-tint"></i> ${data.humidity}%</div>
                    <div><i class="fas fa-cloud-rain"></i> ${data.rainfall} mm</div>
                </div>
            `;
            document.getElementById('liveWeather').innerHTML = weatherHtml;
            document.getElementById('miniWeather').innerHTML = `
                <i class="fas ${data.rainfall > 0 ? 'fa-cloud-rain' : 'fa-cloud-sun'}"></i>
                <span>${data.temperature}°C</span>
            `;
            
            // Update background animation
            updateWeatherBackground(data.temperature, data.condition, data.rainfall);
        }
    } catch (error) {
        console.error('Weather fetch error:', error);
    }
}
updateLiveWeather();

// ==================== PREDICTION FORM ====================
document.getElementById('prediction-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        crop_type: document.getElementById('crop-type').value,
        location: document.getElementById('city').value,
        rainfall: parseFloat(document.getElementById('rainfall').value),
        temperature: parseFloat(document.getElementById('temperature').value),
        soil_type: document.getElementById('soil-type').value,
        season: document.getElementById('season').value,
        humidity: parseFloat(document.getElementById('humidity').value)
    };
    
    if (!formData.crop_type) {
        alert('Please select a crop');
        return;
    }
    
    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('yield-value').textContent = data.yield.toFixed(2);
            document.getElementById('forecast-cards').innerHTML = `
                <div class="forecast-card">
                    <h4>Next Season</h4>
                    <div class="forecast-value">${data.next_season_yield.toFixed(2)} kg/ha</div>
                </div>
                <div class="forecast-card">
                    <h4>Next Year</h4>
                    <div class="forecast-value">${data.next_year_yield.toFixed(2)} kg/ha</div>
                </div>
            `;
            
            // Add tips based on prediction
            const tipsHtml = `
                <div class="tips-box">
                    <i class="fas fa-lightbulb"></i>
                    <p>${getPredictionTips(formData, data.yield)}</p>
                </div>
            `;
            document.getElementById('predictionTips').innerHTML = tipsHtml;
            
            document.getElementById('prediction-result').style.display = 'block';
            document.getElementById('prediction-result').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Prediction error:', error);
        alert('Error making prediction');
    }
});

function getPredictionTips(data, yield) {
    const tips = [];
    if (data.temperature > 35) tips.push('⚠️ High temperature detected. Increase irrigation frequency.');
    if (data.temperature < 15) tips.push('❄️ Low temperature detected. Protect crops from frost.');
    if (data.rainfall > 200) tips.push('💧 High rainfall expected. Ensure proper drainage.');
    if (data.rainfall < 50) tips.push('🌵 Low rainfall conditions. Implement water conservation.');
    if (yield > 4500) tips.push('🌟 Excellent yield potential! Maintain good practices.');
    
    return tips.length ? tips.join(' ') : '✅ Conditions look favorable. Follow recommended practices for optimal yield.';
}

// ==================== RECOMMENDATION FORM ====================
document.getElementById('recommendation-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        temperature: parseFloat(document.getElementById('rec-temperature').value),
        rainfall: parseFloat(document.getElementById('rec-rainfall').value),
        humidity: parseFloat(document.getElementById('rec-humidity').value),
        soil_type: document.getElementById('rec-soil').value
    };
    
    try {
        const response = await fetch('/api/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            const cropCards = data.recommendations.map(crop => `
                <div class="crop-card">
                    <div class="crop-name">${getCropIcon(crop.name)} ${crop.name}</div>
                    <div class="crop-confidence">${crop.confidence} Confidence</div>
                    <div class="crop-details">
                        <div class="crop-detail"><i class="fas fa-chart-line"></i> ${crop.expected_yield.toFixed(2)} kg/ha</div>
                        <div class="crop-detail"><i class="fas fa-percent"></i> ${crop.score}% Match</div>
                    </div>
                </div>
            `).join('');
            
            document.getElementById('crop-list').innerHTML = cropCards;
            document.getElementById('recommendation-result').style.display = 'block';
            document.getElementById('recommendation-result').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Recommendation error:', error);
        alert('Error getting recommendations');
    }
});

function getCropIcon(crop) {
    const icons = {
        Rice: '🌾', Wheat: '🌾', Maize: '🌽', Cotton: '🌿', Sugarcane: '🍬'
    };
    return icons[crop] || '🌱';
}

// ==================== PROFIT FORM ====================
document.getElementById('profit-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        crop_type: document.getElementById('profit-crop').value,
        yield_amount: parseFloat(document.getElementById('yield-input').value),
        market_price: parseFloat(document.getElementById('market-price').value),
        production_cost: parseFloat(document.getElementById('cost-input').value)
    };
    
    try {
        const response = await fetch('/api/profit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('profit-value').textContent = `₹${data.profit.toFixed(2)}`;
            document.getElementById('profit-breakdown').innerHTML = `
                <div class="breakdown-item">
                    <div class="breakdown-label">Revenue</div>
                    <div class="breakdown-value">₹${data.revenue.toFixed(2)}</div>
                </div>
                <div class="breakdown-item">
                    <div class="breakdown-label">Cost</div>
                    <div class="breakdown-value">₹${data.cost.toFixed(2)}</div>
                </div>
                <div class="breakdown-item">
                    <div class="breakdown-label">Margin</div>
                    <div class="breakdown-value">${data.margin.toFixed(1)}%</div>
                </div>
            `;
            
            let insightsHtml = '';
            if (data.profit > 0) {
                insightsHtml = `<div class="profit-insights success"><i class="fas fa-check-circle"></i> Profitable crop with ${data.margin.toFixed(1)}% margin</div>`;
                if (data.margin > 30) {
                    insightsHtml += `<div class="profit-insights"><i class="fas fa-star"></i> Excellent profit margin! Consider scaling up.</div>`;
                }
            } else {
                insightsHtml = `<div class="profit-insights danger"><i class="fas fa-exclamation-triangle"></i> Currently showing loss. Consider reducing costs or finding better prices.</div>`;
            }
            
            document.getElementById('profit-insights').innerHTML = insightsHtml;
            document.getElementById('profit-result').style.display = 'block';
            document.getElementById('profit-result').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Profit error:', error);
        alert('Error calculating profit');
    }
});

// ==================== CHATBOT ====================
document.getElementById('send-message')?.addEventListener('click', sendMessage);
document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    
    try {
        const response = await fetch('/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        addMessage(data.response, 'bot');
    } catch (error) {
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `
        <div class="message-avatar"><i class="fas ${sender === 'bot' ? 'fa-robot' : 'fa-user'}"></i></div>
        <div class="message-content"><p>${text}</p></div>
    `;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

document.querySelectorAll('.quick-q').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('chat-input').value = btn.textContent;
        sendMessage();
    });
});

// ==================== VOICE INPUT ====================
if ('webkitSpeechRecognition' in window) {
    const voiceBtn = document.getElementById('voice-btn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.onresult = (event) => {
                const message = event.results[0][0].transcript;
                document.getElementById('chat-input').value = message;
                sendMessage();
            };
            recognition.start();
        });
    }
}

// ==================== MAP INITIALIZATION ====================
let map;
function initMap() {
    const mapContainer = document.getElementById('india-map');
    if (!mapContainer) return;
    
    map = L.map('india-map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    const states = [
        { name: 'Punjab', coords: [30.7333, 76.7794], yield: '4,500 kg/ha' },
        { name: 'Uttar Pradesh', coords: [26.8467, 80.9462], yield: '3,800 kg/ha' },
        { name: 'Maharashtra', coords: [19.7515, 75.7139], yield: '3,200 kg/ha' },
        { name: 'Gujarat', coords: [22.2587, 71.1924], yield: '3,500 kg/ha' }
    ];
    
    states.forEach(state => {
        const marker = L.marker(state.coords).addTo(map);
        marker.bindPopup(`
            <b>${state.name}</b><br>
            Average Yield: ${state.yield}<br>
            <button onclick="getStatePrediction('${state.name}')">Get Prediction</button>
        `);
    });
}

function getStatePrediction(state) {
    document.getElementById('map-info').innerHTML = `
        <h4>${state} Prediction</h4>
        <p>Fetching prediction for ${state}...</p>
    `;
    setTimeout(() => {
        document.getElementById('map-info').innerHTML = `
            <h4>${state} Analysis</h4>
            <p>🌾 Recommended: Rice, Wheat</p>
            <p>📊 Expected Yield: 3,800-4,200 kg/ha</p>
            <p>💰 Profit Potential: High</p>
        `;
    }, 1000);
}

// ==================== CHARTS ====================
function initCharts() {
    const ctx1 = document.getElementById('rainfall-yield-chart')?.getContext('2d');
    const ctx2 = document.getElementById('crop-comparison-chart')?.getContext('2d');
    const ctx3 = document.getElementById('seasonal-trends-chart')?.getContext('2d');
    const ctx4 = document.getElementById('temp-yield-chart')?.getContext('2d');
    
    if (ctx1) {
        new Chart(ctx1, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Rainfall vs Yield',
                    data: [
                        {x: 50, y: 2800}, {x: 100, y: 3500}, {x: 150, y: 4200},
                        {x: 200, y: 4500}, {x: 250, y: 4300}, {x: 300, y: 4000}
                    ],
                    backgroundColor: '#FFD700',
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#fff' } }
                },
                scales: {
                    x: { title: { display: true, text: 'Rainfall (mm)', color: '#fff' }, ticks: { color: '#fff' } },
                    y: { title: { display: true, text: 'Yield (kg/ha)', color: '#fff' }, ticks: { color: '#fff' } }
                }
            }
        });
    }
    
    if (ctx2) {
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane'],
                datasets: [{
                    label: 'Average Yield (kg/ha)',
                    data: [4200, 3800, 3500, 2800, 7500],
                    backgroundColor: '#FFD700',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#fff' } }
                },
                scales: {
                    y: { ticks: { color: '#fff' } },
                    x: { ticks: { color: '#fff' } }
                }
            }
        });
    }
    
    if (ctx3) {
        new Chart(ctx3, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Yield Trend',
                    data: [2500, 2800, 3100, 3400, 3600, 3800, 4200, 4400, 4100, 3800, 3400, 3000],
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#fff' } }
                },
                scales: {
                    y: { ticks: { color: '#fff' } },
                    x: { ticks: { color: '#fff' } }
                }
            }
        });
    }
    
    if (ctx4) {
        new Chart(ctx4, {
            type: 'line',
            data: {
                labels: ['15°C', '20°C', '25°C', '30°C', '35°C'],
                datasets: [{
                    label: 'Yield vs Temperature',
                    data: [3200, 3800, 4200, 4000, 3500],
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#fff' } }
                },
                scales: {
                    y: { ticks: { color: '#fff' } },
                    x: { ticks: { color: '#fff' } }
                }
            }
        });
    }
}

// ==================== NAVIGATION ====================
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = item.dataset.page;
        
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(`${pageId}-page`).classList.add('active');
        
        if (pageId === 'map' && map) {
            setTimeout(() => map.invalidateSize(), 100);
        }
        if (pageId === 'analytics') {
            initCharts();
        }
    });
});

// ==================== AUTHENTICATION ====================
document.getElementById('auth-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('profile-info').innerHTML = `
                <h3>Welcome, ${data.user.email}</h3>
                <p>Member since: ${new Date().toLocaleDateString()}</p>
            `;
            document.getElementById('userName').textContent = data.user.email.split('@')[0];
            document.getElementById('history-section').style.display = 'block';
            loadUserHistory(data.user.id);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Auth error:', error);
        alert('Authentication error');
    }
});

async function loadUserHistory(userId) {
    try {
        const response = await fetch(`/api/user/history?user_id=${userId}`);
        const data = await response.json();
        
        if (data.success && data.history.length) {
            const historyHtml = data.history.map(item => `
                <div class="history-item">
                    <span><i class="fas fa-seedling"></i> ${item.crop_type}</span>
                    <span>${item.yield} kg/ha</span>
                    <span class="history-date">${new Date(item.date).toLocaleDateString()}</span>
                </div>
            `).join('');
            document.getElementById('history-list').innerHTML = historyHtml;
        } else {
            document.getElementById('history-list').innerHTML = '<p>No predictions yet. Start predicting!</p>';
        }
    } catch (error) {
        console.error('History error:', error);
    }
}

// ==================== WEATHER FETCH ====================
document.getElementById('fetch-weather-btn')?.addEventListener('click', () => fetchWeatherForPrediction());
document.getElementById('rec-fetch-weather')?.addEventListener('click', () => fetchWeatherForRecommendation());

async function fetchWeatherForPrediction() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    
    try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('temperature').value = data.temperature;
            document.getElementById('humidity').value = data.humidity;
            document.getElementById('rainfall').value = data.rainfall;
            
            // Update background based on weather
            updateWeatherBackground(data.temperature, data.condition, data.rainfall);
            
            // Show success message
            const btn = document.getElementById('fetch-weather-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Weather Fetched!';
            setTimeout(() => btn.innerHTML = originalText, 2000);
        }
    } catch (error) {
        console.error('Weather fetch error:', error);
        alert('Error fetching weather data');
    }
}

async function fetchWeatherForRecommendation() {
    const city = document.getElementById('rec-city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    
    try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('rec-temperature').value = data.temperature;
            document.getElementById('rec-humidity').value = data.humidity;
            document.getElementById('rec-rainfall').value = data.rainfall;
            
            const btn = document.getElementById('rec-fetch-weather');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Weather Fetched!';
            setTimeout(() => btn.innerHTML = originalText, 2000);
        }
    } catch (error) {
        console.error('Weather fetch error:', error);
        alert('Error fetching weather data');
    }
}

// ==================== DATE UPDATE ====================
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }
}
updateDate();

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initWeatherAnimation();
    initMap();
    initCharts();
    updateLiveWeather();
    
    // Set default crop and season selections
    const defaultCrop = document.querySelector('.crop-option');
    if (defaultCrop) defaultCrop.click();
    const defaultSeason = document.querySelector('.season-option');
    if (defaultSeason) defaultSeason.click();
    
    console.log('🚀 FarmAI System Initialized');
    console.log('🌾 Smart Crop Yield Prediction System Ready');
});