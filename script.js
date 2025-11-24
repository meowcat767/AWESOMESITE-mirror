
// Flash image and sound effect at random intervals (30-120 seconds)
function createFlashEffect() {
  const flashContainer = document.createElement('div');
  flashContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.95); display: flex; justify-content: center; align-items: center; z-index: 9999; opacity: 0; transition: opacity 0.3s;';
  
  const flashImage = document.createElement('img');
  flashImage.src = 'https://i.postimg.cc/BntGZcD1/image-removebg-preview.png';
  flashImage.style.cssText = 'max-width: 80%; max-height: 80%; animation: bounce 0.5s ease-in-out;';
  
  flashContainer.appendChild(flashImage);
  document.body.appendChild(flashContainer);
  
  // Play sound
  const audio = new Audio('horn.mp3');
  audio.play();
  
  // Fade in
  setTimeout(() => {
    flashContainer.style.opacity = '1';
  }, 10);
  
  // Fade out and remove after 2 seconds
  setTimeout(() => {
    flashContainer.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(flashContainer);
    }, 300);
  }, 2000);
  
  // Schedule next flash at random interval (30-120 seconds)
  const nextInterval = (Math.random() * 90 + 30) * 1000; // 30-120 seconds in milliseconds
  setTimeout(createFlashEffect, nextInterval);
}

// Add bounce animation
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;
document.head.appendChild(style);

// Start the flash effect cycle (first one after 30-120 seconds)
const initialDelay = (Math.random() * 90 + 30) * 1000;
setTimeout(createFlashEffect, initialDelay);

// Bouncing cat functionality
window.addEventListener('load', function() {
  const catImage = document.querySelector('.cat img');
  if (!catImage) return;

  // Make cat position absolute for bouncing
  catImage.style.position = 'fixed';
  catImage.style.width = '100px';
  catImage.style.height = '100px';
  catImage.style.zIndex = '10';
  
  let catX = Math.random() * (window.innerWidth - 100);
  let catY = Math.random() * (window.innerHeight - 100);
  let catSpeedX = 3;
  let catSpeedY = 3;
  let isExploded = false;

  function updateCatPosition() {
    if (isExploded) return;

    catX += catSpeedX;
    catY += catSpeedY;

    // Bounce off walls
    if (catX <= 0 || catX >= window.innerWidth - 100) {
      catSpeedX = -catSpeedX;
    }
    if (catY <= 0 || catY >= window.innerHeight - 100) {
      catSpeedY = -catSpeedY;
    }

    catImage.style.left = catX + 'px';
    catImage.style.top = catY + 'px';

    // Check collision with bombs
    checkBombCollision();

    requestAnimationFrame(updateCatPosition);
  }

  function checkBombCollision() {
    // Get bombs from the canvas
    const planesCanvas = document.getElementById('planesCanvas');
    if (!planesCanvas) return;

    // Access the bombs array from the global scope
    if (typeof bombs !== 'undefined' && bombs.length > 0) {
      for (let i = 0; i < bombs.length; i++) {
        const bomb = bombs[i];
        const distance = Math.sqrt(
          Math.pow(bomb.x - (catX + 50), 2) + 
          Math.pow(bomb.y - (catY + 50), 2)
        );

        if (distance < 55) {
          explodeCat();
          bombs.splice(i, 1);
          break;
        }
      }
    }
  }

  function explodeCat() {
    isExploded = true;
    
    // Play explosion sound
    const explosionSound = new Audio('explosion.mp3');
    explosionSound.play();

    // Explosion animation
    catImage.style.transition = 'transform 0.3s, opacity 0.3s';
    catImage.style.transform = 'scale(2) rotate(360deg)';
    catImage.style.opacity = '0';

    // Restart cat after 2 seconds
    setTimeout(() => {
      catX = Math.random() * (window.innerWidth - 100);
      catY = Math.random() * (window.innerHeight - 100);
      catImage.style.transition = '';
      catImage.style.transform = '';
      catImage.style.opacity = '1';
      isExploded = false;
      updateCatPosition();
    }, 2000);
  }

  updateCatPosition();
});
