/**
 * 90s Retro Theme - Main JavaScript
 * Handles all interactive elements and effects
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c Welcome to the 90s Web Terminal! 🚀 ', 'background: #000080; color: #00ff00; font-size: 14px; padding: 10px;');
    
    // Initialize components
    initBackToTop();
    initButtonEffects();
    initMarqueeEffects();
    initBackgroundEffects();
    updateVisitorCounter();
    updateLastModified();
    initTooltips();
    initPageLoader();
    initEasterEggs();
    
    // Play welcome sound (optional)
    playSound('welcome');
    
    // Add 90s style cursor trail
    if (window.innerWidth > 768) {
        initCursorTrail();
    }
});

/**
 * Initialize back to top button functionality
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Add click effects to buttons
 */
function initButtonEffects() {
    const buttons = document.querySelectorAll('button, .button, input[type="submit"], input[type="button"]');
    
    buttons.forEach(button => {
        // Skip if already has click handler
        if (button.hasAttribute('data-has-click-effect')) return;
        
        button.setAttribute('data-has-click-effect', 'true');
        
        button.addEventListener('mousedown', function() {
            this.classList.add('panel-3d-inset');
            // Play click sound
            playSound('click');
        });
        
        button.addEventListener('mouseup', function() {
            this.classList.remove('panel-3d-inset');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('panel-3d-inset');
        });
    });
}

/**
 * Initialize marquee effects
 */
function initMarqueeEffects() {
    // Add hover pause to all marquees
    const marquees = document.querySelectorAll('marquee');
    
    marquees.forEach(marquee => {
        marquee.addEventListener('mouseenter', function() {
            this.stop();
        });
        
        marquee.addEventListener('mouseleave', function() {
            this.start();
        });
    });
}

/**
 * Update visitor counter (simulated)
 */
function updateVisitorCounter() {
    const counter = document.querySelector('.counter-number');
    if (!counter) return;
    
    // Get current count from localStorage or use a random number
    let count = localStorage.getItem('visitorCount') || Math.floor(Math.random() * 1000) + 1000;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    
    // Format with leading zeros
    counter.textContent = String(count).padStart(5, '0');
}

/**
 * Update last modified date
 */
function updateLastModified() {
    const lastUpdated = document.getElementById('last-updated');
    if (!lastUpdated) return;
    
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    lastUpdated.textContent = now.toLocaleDateString('en-US', options);
}

/**
 * Initialize tooltips
 */
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
        const tooltipText = tooltip.getAttribute('data-tooltip');
        const tooltipElement = document.createElement('span');
        tooltipElement.className = 'tooltip';
        tooltipElement.textContent = tooltipText;
        
        tooltip.appendChild(tooltipElement);
        
        tooltip.addEventListener('mouseenter', function() {
            tooltipElement.style.visibility = 'visible';
            tooltipElement.style.opacity = '1';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            tooltipElement.style.visibility = 'hidden';
            tooltipElement.style.opacity = '0';
        });
    });
}

/**
 * Initialize page loader
 */
function initPageLoader() {
    const pageLoader = document.getElementById('page-loader');
    
    if (pageLoader) {
        // Hide loader when everything is loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                pageLoader.style.opacity = '0';
                pageLoader.style.visibility = 'hidden';
            }, 500);
        });
    }
}

/**
 * Play sound effects
 * @param {string} soundName - Name of the sound to play
 */
function playSound(soundName) {
    // Skip if sound is disabled
    if (localStorage.getItem('soundDisabled') === 'true') return;
    
    const sounds = {
        'click': 'https://www.soundjay.com/buttons/button-09a.mp3',
        'welcome': 'https://www.soundjay.com/mechanical/sounds/computer-beep-01a.mp3',
        'error': 'https://www.soundjay.com/mechanical/sounds/computer-error-01a.mp3'
    };
    
    const audio = new Audio(sounds[soundName] || sounds.click);
    audio.volume = 0.5; // Reduce volume
    audio.play().catch(e => console.log('Audio play failed:', e));
}

/**
 * Toggle sound on/off
 */
function toggleSound() {
    const isDisabled = localStorage.getItem('soundDisabled') === 'true';
    localStorage.setItem('soundDisabled', !isDisabled);
    
    // Update UI
    const soundButtons = document.querySelectorAll('.sound-toggle');
    soundButtons.forEach(btn => {
        btn.innerHTML = !isDisabled ? '🔇 Sound Off' : '🔊 Sound On';
    });
    
    // Play feedback sound if enabling sound
    if (isDisabled) {
        playSound('click');
    }
}

/**
 * Initialize background effects (animated pixels, etc.)
 */
function initBackgroundEffects() {
    const bg = document.querySelector('.retro-bg');
    if (!bg) return;
    
    // Create animated pixels
    for (let i = 0; i < 20; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${['#ff00ff', '#00ffff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)]};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            pointer-events: none;
            z-index: -1;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: -${Math.random() * 10}s;
        `;
        bg.appendChild(pixel);
    }
    
    // Add keyframe animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize cursor trail effect
 */
function initCursorTrail() {
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00'];
    let cursor = [];
    let cursorSize = 15;
    let cursorCount = 10;
    
    // Create cursor elements
    for (let i = 0; i < cursorCount; i++) {
        let div = document.createElement('div');
        div.className = 'cursor-trail';
        div.style.cssText = `
            position: fixed;
            width: ${cursorSize}px;
            height: ${cursorSize}px;
            background: ${colors[i % colors.length]};
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 999999;
            opacity: ${1 - (i / cursorCount)};
            transition: transform 0.1s ease, opacity 0.3s ease;
        `;
        document.body.appendChild(div);
        cursor.push({
            element: div,
            x: 0,
            y: 0,
            dx: 0,
            dy: 0
        });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor trail
    function animate() {
        let posX = mouseX;
        let posY = mouseY;
        
        cursor.forEach((cursor, index) => {
            const nextCursor = cursor;
            nextCursor.x = posX;
            nextCursor.y = posY;
            
            const next = cursor[index + 1] || cursor[cursor.length - 1];
            posX += (next.x || 0) - posX;
            posY += (next.y || 0) - posY;
            
            nextCursor.element.style.left = `${nextCursor.x}px`;
            nextCursor.element.style.top = `${nextCursor.y}px`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/**
 * Initialize Easter eggs and secret features
 */
function initEasterEggs() {
    // Konami code
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konami[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konami.length) {
                // Konami code activated!
                document.body.classList.add('konami');
                playSound('welcome');
                setTimeout(() => document.body.classList.remove('konami'), 5000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Click effect
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            return; // Skip for links and buttons
        }
        
        const clickEffect = document.createElement('div');
        clickEffect.className = 'click-effect';
        clickEffect.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: ${['#ff00ff', '#00ffff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 99999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: click 0.5s forwards;
        `;
        
        document.body.appendChild(clickEffect);
        
        // Clean up
        setTimeout(() => {
            clickEffect.remove();
        }, 500);
    });
    
    // Add click animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes click {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
        
        .konami {
            animation: rainbow 1s linear infinite;
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Make functions available globally
window.RetroTheme = {
    playSound,
    toggleSound,
    initCursorTrail,
    initEasterEggs
};
