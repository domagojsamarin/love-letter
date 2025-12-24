// Create falling snowflakes
function createSnowflakes() {
    const snowflakesContainer = document.getElementById('snowflakes');
    const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❉'];
    const numberOfSnowflakes = 50;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];

        // Random position and animation properties
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
        snowflake.style.animationDelay = (Math.random() * 10) + 's';

        snowflakesContainer.appendChild(snowflake);
    }
}

// Gift unwrapping functionality
function initGiftButton() {
    const giftBtn = document.getElementById('giftBtn');
    const giftOverlay = document.getElementById('giftOverlay');
    const giftWrapper = giftOverlay.querySelector('.gift-wrapper');

    let isOpen = false;

    giftBtn.addEventListener('click', () => {
        if (!isOpen) {
            openGift();
        }
    });

    giftOverlay.addEventListener('click', (e) => {
        if (isOpen && e.target !== giftWrapper && !giftWrapper.contains(e.target)) {
            closeGift();
        }
    });

    // Also close when clicking on the coupon container
    giftOverlay.querySelector('.coupon-container').addEventListener('click', () => {
        if (isOpen) {
            closeGift();
        }
    });

    function openGift() {
        isOpen = true;
        giftOverlay.classList.add('active');

        // Trigger unwrapping animation after overlay appears
        setTimeout(() => {
            giftWrapper.classList.add('unwrapping');
        }, 100);

        // Add some sparkle effects
        createSparkles();
    }

    function closeGift() {
        isOpen = false;
        giftWrapper.classList.remove('unwrapping');

        setTimeout(() => {
            giftOverlay.classList.remove('active');
        }, 300);
    }
}

// Create sparkle effects when gift opens
function createSparkles() {
    const overlay = document.getElementById('giftOverlay');
    const sparkleChars = ['✨', '⭐', '💫', '🌟'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                font-size: ${Math.random() * 2 + 1}rem;
                pointer-events: none;
                z-index: 100;
                animation: sparkleFloat 2s ease-out forwards;
            `;
            overlay.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 2000);
        }, i * 100);
    }
}

// Add sparkle animation dynamically
function addSparkleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1.5) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg) translateY(-100px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    initGiftButton();
    addSparkleAnimation();
});
