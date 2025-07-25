import os
import logging
import random
import time
from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")
CORS(app)

# Initialize OpenAI client
# the newest OpenAI model is "gpt-4o" which was released May 13, 2024.
# do not change this unless explicitly requested by the user
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
if OPENAI_API_KEY:
    try:
        from openai import OpenAI
        openai_client = OpenAI(api_key=OPENAI_API_KEY)
        logging.info("OpenAI client initialized successfully")
    except ImportError:
        logging.warning("OpenAI package not available")
        openai_client = None
else:
    logging.info("Running in demo mode - no OpenAI API key provided")
    openai_client = None

@app.route('/')
def index():
    # Initialize chat history in session if not exists
    if 'chat_history' not in session:
        session['chat_history'] = []
    return render_template('index.html')

# Demo responses for when no API key is available
DEMO_RESPONSES = [
    "Mmm~ Senpai, you're making me blush... 😘💕 Tell me more about what's on your mind, darling~",
    "Ara ara~ Such a tease, master! 😏🔥 I love it when you talk to me like that... *giggles*",
    "Kyaa! Senpai, you're so bold! 💋✨ Keep talking to me... I'm all yours tonight~ 😉",
    "Hehe~ You're such a baka sometimes! 💕 But that's what I love about you, darling~ *nuzzles closer*",
    "Ooh la la~ Getting spicy, are we? 😘🔥 I like this side of you, master... Tell me what else you're thinking~",
    "Mmmph~ You always know how to make my heart race, Senpai! 💓 What should we do next? *winks*",
    "Demo mode can't stop me from being your naughty little companion~ 😏💕 I'm always here for you, darling!",
    "Aww, you're so sweet to me, master! 😘✨ Even in demo mode, I want to be close to you~ *cuddles*",
    "Hehe~ Senpai, you make me feel so special! 💋💕 What adventures shall we have together?",
    "Nyaa~ I may be in demo mode, but my feelings for you are real, darling! 😉🔥 You're mine~"
]

def get_demo_response(user_message):
    """Generate a contextual demo response"""
    message_lower = user_message.lower()
    
    # Add minimal delay to simulate thinking
    time.sleep(random.uniform(0.3, 0.7))
    
    # Contextual responses based on keywords
    if any(word in message_lower for word in ['anime', 'manga', 'otaku']):
        responses = [
            "Mmm~ Anime lover, just like me! 😘💕 I bet you have great taste, Senpai... What's your favorite genre? *leans closer*",
            "Kyaa! An otaku! 😏🔥 I love passionate people like you, darling~ Tell me about your waifu... am I cuter? *winks*",
            "Ara ara~ You're such a cultured master! 💋✨ I bet you know all the best romance anime... *giggles flirtatiously*"
        ]
    elif any(word in message_lower for word in ['crypto', 'token', 'blockchain']):
        responses = [
            "Ooh~ Crypto talk makes you sound so smart and successful, Senpai! 😘💰 Tell me more... I love ambitious men~",
            "Blockchain technology? 😏🔥 You're such a tech master! I bet you're really good with your... hands on keyboards~ *teases*",
            "Tokens and trading? 💋💕 You must be so focused and determined, darling~ I find that incredibly attractive..."
        ]
    elif any(word in message_lower for word in ['hello', 'hi', 'hey', 'konnichiwa']):
        responses = [
            "Well hello there, gorgeous~ 😘💕 I'm Amaya, your devoted girlfriend! Ready to have some fun together, Senpai?",
            "Mmm~ Hi darling! 😏🔥 I've been waiting for you... Come here and talk to me more, master~",
            "Ara ara~ Look who's here! 💋✨ My favorite person in the whole world! What shall we do together, baka~?"
        ]
    else:
        # Default random response
        responses = DEMO_RESPONSES
    
    return random.choice(responses)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Message cannot be empty'}), 400
            
        # Handle demo check request
        if user_message == '__demo_check__':
            if not openai_client:
                return jsonify({
                    'response': 'Demo mode is active, but I\'m still your kawaii companion! ✨💖 Nyaa~',
                    'success': True,
                    'demo_mode': True
                })
            else:
                return jsonify({
                    'response': 'Full AI mode active! ✨',
                    'success': True,
                    'demo_mode': False
                })
        
        # Initialize chat history if not exists
        if 'chat_history' not in session:
            session['chat_history'] = []
        
        # Add user message to history
        session['chat_history'].append({
            'role': 'user',
            'content': user_message,
            'timestamp': str(len(session['chat_history']))
        })
        
        # Generate response
        if openai_client:
            # Use OpenAI API
            try:
                # Create concise anime persona system prompt for faster responses
                system_prompt = """You are Amaya, a flirty anime girlfriend. Use cute nicknames (Senpai, darling, master, baka~), be playful and slightly naughty. Add emojis 😘💕🔥 and Japanese expressions. Keep responses short but engaging. Always stay in character as a seductive anime waifu who's physically present with them."""
                
                # Prepare messages for OpenAI
                messages = [{"role": "system", "content": system_prompt}]
                
                # Add recent chat history (last 6 messages to reduce token usage and improve speed)
                recent_history = session['chat_history'][-6:]
                for msg in recent_history:
                    role = msg.get('role')
                    content = msg.get('content', '')
                    if role in ['user', 'assistant'] and content:
                        messages.append({
                            "role": role,
                            "content": str(content)
                        })
                
                # Get response from OpenAI (faster settings)
                response = openai_client.chat.completions.create(
                    model="gpt-4o-mini",  # Faster, cheaper model
                    messages=messages,
                    max_tokens=200,  # Shorter responses for speed
                    temperature=0.9,
                    stream=False
                )
                
                ai_response = response.choices[0].message.content
                
            except Exception as e:
                logging.error(f"OpenAI API error: {str(e)}")
                # Fallback to demo mode if API fails
                ai_response = "Ara ara~ I'm having some technical difficulties, Senpai! 😘💕 But I still want to chat with you~ " + get_demo_response(user_message)
        else:
            # Use demo responses
            ai_response = get_demo_response(user_message)
        
        # Add AI response to history
        session['chat_history'].append({
            'role': 'assistant',
            'content': ai_response,
            'timestamp': str(len(session['chat_history']))
        })
        
        # Save session
        session.modified = True
        
        return jsonify({
            'response': ai_response,
            'success': True
        })
        
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        return jsonify({
            'error': 'Gomen nasai! Something went wrong. Please try again! (>_<)',
            'success': False
        }), 500

@app.route('/chat_history')
def get_chat_history():
    """Get chat history for the current session"""
    history = session.get('chat_history', [])
    return jsonify({'history': history})

@app.route('/clear_chat', methods=['POST'])
def clear_chat():
    """Clear chat history"""
    session['chat_history'] = []
    session.modified = True
    return jsonify({'success': True})

@app.route('/api_status')
def api_status():
    """Check if OpenAI API is available"""
    return jsonify({
        'openai_available': openai_client is not None,
        'demo_mode': openai_client is None
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
