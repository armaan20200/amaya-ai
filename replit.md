# AI Companion Token Portal

## Overview

This is a Flask-based web application that provides an AI chat interface with an anime-themed frontend featuring Amaya, a flirty anime girlfriend companion. The application integrates with OpenAI's GPT-4o-mini model for fast conversational interactions through a visually appealing, anime-inspired portal interface focused purely on chat experience.

## User Preferences

Preferred communication style: Simple, everyday language.
AI Companion Personality: Amaya - flirty, playful, and seductive anime girlfriend character with teasing and affectionate responses.

## System Architecture

### Frontend Architecture
- **Technology**: HTML5, CSS3, JavaScript (vanilla)
- **Styling Framework**: Tailwind CSS for rapid UI development
- **Design Pattern**: Single-page application with dynamic content loading
- **Theme**: Anime-inspired design with animated backgrounds, sparkle effects, and glowing elements
- **Responsiveness**: Mobile-first responsive design using Tailwind CSS classes

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Session Management**: Flask sessions for maintaining chat history per user
- **API Integration**: OpenAI Python client for GPT-4o model interactions
- **CORS**: Enabled for cross-origin requests using Flask-CORS
- **Logging**: Built-in Python logging for debugging and monitoring

## Key Components

### Core Application Files
- **app.py**: Main Flask application with chat endpoints and OpenAI integration
- **main.py**: Application entry point for running the Flask server
- **templates/index.html**: Main HTML template with anime-themed UI
- **static/css/style.css**: Custom CSS animations and styling
- **static/js/animations.js**: JavaScript for UI animations and effects
- **static/js/chat.js**: Client-side chat functionality and API communication

### Frontend Components
- **Animated Background**: Sparkle effects, floating particles, and glow orbs
- **Chat Interface**: Input field, message history, and interactive buttons
- **Character Display**: Anime mascot integration with custom framing
- **Glass Panel Design**: Translucent UI elements with blur effects

### Backend Components
- **Chat Endpoint** (`/chat`): Handles POST requests for AI conversations
- **Session Management**: Maintains per-user chat history using Flask sessions
- **Error Handling**: Comprehensive error responses for various failure scenarios
- **Environment Configuration**: Secure API key management through environment variables

## Data Flow

1. **User Input**: User types message in chat interface
2. **Frontend Validation**: Client-side validation for message length and content
3. **API Request**: JavaScript sends POST request to `/chat` endpoint
4. **Session Retrieval**: Flask retrieves user's chat history from session
5. **OpenAI Integration**: Server sends conversation context to GPT-4o model
6. **Response Processing**: AI response is processed and added to chat history
7. **Session Update**: Updated chat history is stored in user session
8. **Frontend Update**: Response is displayed in chat interface with animations

## External Dependencies

### Python Packages
- **Flask**: Web framework for handling HTTP requests and routing
- **Flask-CORS**: Cross-origin resource sharing support
- **OpenAI**: Official OpenAI Python client for API interactions

### Frontend Libraries
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Lottie Player**: Animation library for complex animations (included but not actively used)
- **Feather Icons**: Icon library for UI elements

### API Services
- **OpenAI GPT-4o**: Large language model for conversational AI
- **External Image Sources**: Pixabay for anime character images

## Deployment Strategy

### Environment Configuration
- **Development Mode**: Flask debug mode enabled for local development
- **Session Security**: Configurable session secret key via environment variables
- **API Security**: OpenAI API key management through environment variables
- **Port Configuration**: Configurable port binding (default: 5000)

### Hosting Requirements
- **Python Runtime**: Python 3.x environment
- **Network Access**: Outbound HTTPS access for OpenAI API calls
- **Static File Serving**: Flask serves static assets (CSS, JS, images)
- **Session Storage**: In-memory session storage (suitable for single-instance deployment)

### Security Considerations
- **API Key Protection**: Environment variable-based API key storage
- **Session Management**: Secure session handling with configurable secret keys
- **Input Validation**: Client and server-side message validation
- **CORS Configuration**: Enabled for development but should be restricted in production

The application is designed for easy deployment on platforms like Replit, with minimal configuration requirements and straightforward dependency management.