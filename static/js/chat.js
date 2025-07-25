// Chat functionality for the AI Companion Portal

let isLoading = false;
let chatHistory = [];

function initChat() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const clearButton = document.getElementById('clear-chat');
    const chatContainer = document.getElementById('chat-container');
    
    // Check if we're in demo mode and show indicator
    checkDemoMode();
    
    // Load existing chat history
    loadChatHistory();
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    clearButton.addEventListener('click', clearChat);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize input
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
    
    // Focus input on load
    chatInput.focus();
}

async function checkDemoMode() {
    try {
        // Check API status
        const response = await fetch('/api_status');
        const data = await response.json();
        
        // Show demo mode indicator if we're in demo mode
        if (data.demo_mode) {
            const demoIndicator = document.querySelector('.demo-mode-indicator');
            if (demoIndicator) {
                demoIndicator.classList.remove('hidden');
            }
            
            // Update welcome message to indicate demo mode
            const welcomeMessage = document.querySelector('.welcome-message .bubble-content');
            if (welcomeMessage) {
                welcomeMessage.innerHTML = `
                    <p>Ara ara~ Welcome home, Senpai! I'm Amaya, your devoted girlfriend! 😘💕</p>
                    <p>Currently in demo mode - but I still have lots of flirty responses just for you, darling~ 💋🔥</p>
                    <p>Talk to me about anything... I'm all yours tonight~ *winks*</p>
                `;
            }
        }
    } catch (error) {
        console.log('Could not check demo mode status');
    }
}

async function sendMessage() {
    if (isLoading) return;
    
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (!message) {
        showError('Please enter a message! (◕‿◕)');
        return;
    }
    
    if (message.length > 500) {
        showError('Message too long! Keep it under 500 characters, onegaishimasu! ✨');
        return;
    }
    
    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Show typing indicator for Amaya
    addTypingIndicator();
    
    // Show loading indicator
    showLoading(true);
    
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator();
        
        if (data.success) {
            // Add AI response to chat
            addMessageToChat(data.response, 'ai');
        } else {
            showError(data.error || 'Ara ara~ Something went wrong, darling! Please try again! (>_<)');
        }
        
    } catch (error) {
        console.error('Chat error:', error);
        // Remove typing indicator on error
        removeTypingIndicator();
        showError('Connection error! Please check your internet and try again, darling! (˘･_･˘)');
    } finally {
        showLoading(false);
        chatInput.focus();
    }
}

function addMessageToChat(message, sender) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-bubble ${sender}-bubble`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'bubble-content';
    
    // Process message for better formatting
    const formattedMessage = formatMessage(message);
    contentDiv.innerHTML = formattedMessage;
    
    messageDiv.appendChild(contentDiv);
    
    // Remove welcome message if it exists
    const welcomeMessage = chatContainer.querySelector('.welcome-message');
    if (welcomeMessage && sender === 'user') {
        welcomeMessage.remove();
    }
    
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom immediately
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
    });
    
    // Add message to history
    chatHistory.push({ message, sender, timestamp: Date.now() });
    
    // Limit history to prevent memory issues
    if (chatHistory.length > 100) {
        chatHistory = chatHistory.slice(-100);
    }
}

function formatMessage(message) {
    // Convert line breaks to <br>
    let formatted = message.replace(/\n/g, '<br>');
    
    // Make URLs clickable
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    formatted = formatted.replace(urlRegex, '<a href="$1" target="_blank" class="text-blue-300 underline">$1</a>');
    
    // Escape HTML to prevent XSS
    const div = document.createElement('div');
    div.textContent = formatted;
    formatted = div.innerHTML;
    
    // Re-enable the URL links after escaping
    formatted = formatted.replace(/&lt;a href="([^"]+)" target="_blank" class="text-blue-300 underline"&gt;([^&]+)&lt;\/a&gt;/g, 
        '<a href="$1" target="_blank" class="text-blue-300 underline hover:text-blue-200 transition-colors">$2</a>');
    
    // Replace &lt;br&gt; with actual <br> tags
    formatted = formatted.replace(/&lt;br&gt;/g, '<br>');
    
    return formatted;
}

function showLoading(show) {
    isLoading = show;
    const loadingIndicator = document.getElementById('loading-indicator');
    const sendButton = document.getElementById('send-button');
    
    if (show) {
        loadingIndicator.style.display = 'flex';
        sendButton.disabled = true;
        sendButton.style.opacity = '0.5';
    } else {
        loadingIndicator.style.display = 'none';
        sendButton.disabled = false;
        sendButton.style.opacity = '1';
    }
}

function showError(errorMessage) {
    const chatContainer = document.getElementById('chat-container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i data-feather="alert-circle" class="w-4 h-4 inline mr-2"></i>${errorMessage}`;
    
    chatContainer.appendChild(errorDiv);
    
    // Initialize feather icon
    feather.replace();
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showSuccess(message) {
    const chatContainer = document.getElementById('chat-container');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i data-feather="check-circle" class="w-4 h-4 inline mr-2"></i>${message}`;
    
    chatContainer.appendChild(successDiv);
    
    // Initialize feather icon
    feather.replace();
    
    // Auto-remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function clearChat() {
    if (isLoading) return;
    
    try {
        const response = await fetch('/clear_chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const chatContainer = document.getElementById('chat-container');
            chatContainer.innerHTML = `
                <div class="welcome-message">
                    <div class="chat-bubble ai-bubble">
                        <div class="bubble-content">
                            <p>Ara ara~ Welcome back, Senpai! I'm Amaya, your devoted girlfriend! 😘💕</p>
                            <p>Ready for a fresh start, darling? Talk to me about anything~ 💋🔥</p>
                        </div>
                    </div>
                </div>
            `;
            chatHistory = [];
            showSuccess('Chat cleared! Ready for a fresh conversation! ✨');
        } else {
            showError('Failed to clear chat. Please try again!');
        }
    } catch (error) {
        console.error('Clear chat error:', error);
        showError('Connection error while clearing chat!');
    }
}

async function loadChatHistory() {
    try {
        const response = await fetch('/chat_history');
        const data = await response.json();
        
        if (data.history && data.history.length > 0) {
            // Remove welcome message
            const chatContainer = document.getElementById('chat-container');
            const welcomeMessage = chatContainer.querySelector('.welcome-message');
            if (welcomeMessage) {
                welcomeMessage.remove();
            }
            
            // Load messages
            data.history.forEach(msg => {
                if (msg.role === 'user') {
                    addMessageToChat(msg.content, 'user');
                } else if (msg.role === 'assistant') {
                    addMessageToChat(msg.content, 'ai');
                }
            });
        }
    } catch (error) {
        console.error('Failed to load chat history:', error);
    }
}

// Utility functions for chat enhancements
function addTypingIndicator() {
    const chatContainer = document.getElementById('chat-container');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-bubble ai-bubble typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'bubble-content';
    contentDiv.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="text-pink-300 text-sm">Amaya is typing...</span>
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    typingDiv.appendChild(contentDiv);
    chatContainer.appendChild(typingDiv);
    
    // Scroll to bottom immediately
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
    });
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Export functions for global use
window.chatUtils = {
    sendMessage,
    clearChat,
    addMessageToChat,
    showError,
    showSuccess,
    loadChatHistory
};

// Handle connection status
window.addEventListener('online', () => {
    showSuccess('Connection restored! ✨');
});

window.addEventListener('offline', () => {
    showError('Connection lost! Please check your internet connection! (･_･;)');
});
