
let dogCounter = 0;
const marquee = document.querySelector('.dog marquee');
const counterDisplay = document.createElement('div');

counterDisplay.id = 'dogCounter';
counterDisplay.style.cssText = 'position: fixed; top: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 15px 25px; border-radius: 10px; font-family: sans-serif; font-size: 24px; font-weight: bold; color: #333; z-index: 1000; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
counterDisplay.textContent = `Dog Trips: ${dogCounter}`;
document.body.appendChild(counterDisplay);

function checkMarqueePosition() {
  const marqueeRect = marquee.getBoundingClientRect();
  
  // Check if the marquee has reached the right edge
  if (marqueeRect.right >= window.innerWidth - 10) {
    dogCounter++;
    counterDisplay.textContent = `Dog Trips: ${dogCounter}`;
  }
}

setInterval(checkMarqueePosition, 100);
