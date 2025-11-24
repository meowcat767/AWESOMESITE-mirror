
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
  
  let cats = [{
    element: catImage,
    x: Math.random() * (window.innerWidth - 100),
    y: Math.random() * (window.innerHeight - 100),
    speedX: 3,
    speedY: 3,
    isExploded: false
  }];

  function createNewCat() {
    const newCat = document.createElement('img');
    newCat.src = catImage.src;
    newCat.style.position = 'fixed';
    newCat.style.width = '100px';
    newCat.style.height = '100px';
    newCat.style.zIndex = '10';
    document.body.appendChild(newCat);
    
    const catObj = {
      element: newCat,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      speedX: (Math.random() - 0.5) * 6,
      speedY: (Math.random() - 0.5) * 6,
      isExploded: false
    };
    cats.push(catObj);
    return catObj;
  }

  function updateCatPosition() {
    cats.forEach(cat => {
      if (cat.isExploded) return;

      cat.x += cat.speedX;
      cat.y += cat.speedY;

      // Bounce off walls
      if (cat.x <= 0 || cat.x >= window.innerWidth - 100) {
        cat.speedX = -cat.speedX;
      }
      if (cat.y <= 0 || cat.y >= window.innerHeight - 100) {
        cat.speedY = -cat.speedY;
      }

      cat.element.style.left = cat.x + 'px';
      cat.element.style.top = cat.y + 'px';

      // Check collision with bombs
      checkBombCollision(cat);
      
      // Check collision with dog
      checkDogCollision(cat);
    });

    requestAnimationFrame(updateCatPosition);
  }
  
  function checkDogCollision(cat) {
    const dogImage = document.querySelector('.dog img');
    if (!dogImage) return;
    
    const dogRect = dogImage.getBoundingClientRect();
    const catRect = {
      left: cat.x,
      right: cat.x + 100,
      top: cat.y,
      bottom: cat.y + 100
    };
    
    if (catRect.left < dogRect.right &&
        catRect.right > dogRect.left &&
        catRect.top < dogRect.bottom &&
        catRect.bottom > dogRect.top) {
      // Collision detected - create new cat
      createNewCat();
    }
  }

  function checkBombCollision(cat) {
    // Get bombs from the canvas
    const planesCanvas = document.getElementById('planesCanvas');
    if (!planesCanvas) return;

    // Access the bombs array from the global scope
    if (typeof bombs !== 'undefined' && bombs.length > 0) {
      for (let i = 0; i < bombs.length; i++) {
        const bomb = bombs[i];
        const distance = Math.sqrt(
          Math.pow(bomb.x - (cat.x + 50), 2) + 
          Math.pow(bomb.y - (cat.y + 50), 2)
        );

        if (distance < 55) {
          explodeCat(cat);
          bombs.splice(i, 1);
          break;
        }
      }
    }
  }

  function explodeCat(cat) {
    cat.isExploded = true;
    
    // Play explosion sound
    const explosionSound = new Audio('explosion.mp3');
    explosionSound.play();

    // Explosion animation
    cat.element.style.transition = 'transform 0.3s, opacity 0.3s';
    cat.element.style.transform = 'scale(2) rotate(360deg)';
    cat.element.style.opacity = '0';

    // Restart cat after 2 seconds
    setTimeout(() => {
      cat.x = Math.random() * (window.innerWidth - 100);
      cat.y = Math.random() * (window.innerHeight - 100);
      cat.element.style.transition = '';
      cat.element.style.transform = '';
      cat.element.style.opacity = '1';
      cat.isExploded = false;
    }, 2000);
  }

  updateCatPosition();
});
