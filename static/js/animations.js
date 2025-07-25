// Animation controller for the anime companion portal

function initAnimations() {
    // Initialize sparkle animations with random timing
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach((sparkle, index) => {
        const delay = Math.random() * 3000;
        sparkle.style.animationDelay = delay + 'ms';
        
        // Add random position variations
        const randomTop = 10 + Math.random() * 80;
        const randomLeft = 10 + Math.random() * 80;
        sparkle.style.top = randomTop + '%';
        sparkle.style.left = randomLeft + '%';
    });
    
    // Animate glow orbs with random timing
    const glowOrbs = document.querySelectorAll('.glow-orb');
    glowOrbs.forEach((orb, index) => {
        const delay = Math.random() * 6000;
        orb.style.animationDelay = delay + 'ms';
    });
    
    // Add entrance animations to sections
    const sections = document.querySelectorAll('.glass-panel');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fade-in 0.8s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
    
    // Add hover effects to interactive elements
    addHoverEffects();
    
    // Initialize particle effects
    createFloatingParticles();
}

function addHoverEffects() {
    // Add glow effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add glow effect to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 30px rgba(255, 105, 180, 0.3)';
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add ripple effect to glass panels
    const glassPanels = document.querySelectorAll('.glass-panel');
    glassPanels.forEach(panel => {
        panel.addEventListener('click', createRippleEffect);
    });
}

function createRippleEffect(e) {
    const ripple = document.createElement('div');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 105, 180, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    this.style.position = 'relative';
    this.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight + 50;
    const duration = Math.random() * 20000 + 10000;
    const delay = Math.random() * 5000;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255, 105, 180, 0.8) 0%, rgba(157, 78, 221, 0.4) 100%);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: float-up ${duration}ms linear infinite;
        animation-delay: ${delay}ms;
        opacity: 0.6;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, duration + delay);
}

// Add CSS animation for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) translateX(50px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 0.6;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle window resize
window.addEventListener('resize', () => {
    // Recreate particles on resize
    const existingContainer = document.querySelector('.floating-particles');
    if (existingContainer) {
        existingContainer.remove();
        createFloatingParticles();
    }
});

// Export for use in other scripts
window.animationUtils = {
    initAnimations,
    createRippleEffect,
    createFloatingParticles
};
