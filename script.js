
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
  const audio = new Audio('https://www.soundjay.com/button/sounds/beep-07.mp3');
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
