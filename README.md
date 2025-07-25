# Amaya AI - Anime Companion Token Portal

## 🌸 Overview

Amaya AI is a Flask-based web application featuring a flirty anime girlfriend companion powered by OpenAI's GPT-4o-mini model. The application provides fast, engaging conversational interactions through a beautifully animated, anime-inspired portal interface.

## ✨ Features

- **AI Companion Chat**: Real-time conversations with Amaya, a playful anime girlfriend character
- **Anime-Themed UI**: Stunning glass panel design with sparkle animations and glowing effects
- **Fast Response Times**: Optimized for quick responses (0.3-0.7 seconds)
- **Mobile Responsive**: Works perfectly on all devices
- **Demo Mode**: Graceful fallback when API quota is reached

## 🚀 Tech Stack

- **Backend**: Flask (Python)
- **AI Model**: OpenAI GPT-4o-mini
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Feather Icons
- **Deployment**: Replit/Gunicorn

## 🎯 Character Personality

Amaya is designed as a flirty, playful anime girlfriend who:
- Uses cute nicknames like "Senpai", "darling", "master", "baka~"
- Responds with anime-style expressions and emojis
- Maintains engaging, contextual conversations
- Provides fast, entertaining interactions

## 📁 Project Structure

```
├── app.py                 # Main Flask application with OpenAI integration
├── main.py               # Application entry point
├── templates/
│   └── index.html        # Main HTML template with anime UI
├── static/
│   ├── css/
│   │   └── style.css     # Custom animations and styling
│   └── js/
│       ├── chat.js       # Chat functionality and API communication
│       └── animations.js # UI animations and effects
├── replit.md            # Project documentation and user preferences
└── README.md            # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.11+
- OpenAI API key

### Environment Variables
```bash
OPENAI_API_KEY=your_openai_api_key_here
SESSION_SECRET=your_session_secret_here
```

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/armaan20200/amaya-ai.git
cd amaya-ai
```

2. Install dependencies:
```bash
pip install flask flask-cors openai gunicorn
```

3. Set environment variables and run:
```bash
python main.py
```

### Replit Deployment
1. Import the repository into Replit
2. Add your `OPENAI_API_KEY` to Replit Secrets
3. Click Run - the app will start automatically on port 5000

## 🎮 Usage

1. Visit the application URL
2. Start chatting with Amaya in the chat interface
3. Enjoy fast, anime-style conversations
4. Follow the social links to stay connected

## 🔧 Configuration

### Response Speed Optimization
- Uses GPT-4o-mini for faster generation
- Limited to 200 max tokens per response
- Reduced chat history context (6 messages)
- Optimized system prompt for concise responses

### Demo Mode
When OpenAI API quota is reached, the app falls back to demo responses with realistic typing delays.

## 🌐 Social Links

- **Twitter/X**: [@AmayaAIapi](https://x.com/AmayaAIapi)
- **GitHub**: [armaan20200/amaya-ai](https://github.com/armaan20200/amaya-ai)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for improvements.

## 💖 Support

If you enjoy chatting with Amaya, consider following our social media for updates and new features!

---

Built with ❤️ for the anime and AI community