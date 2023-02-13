const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 500;
let buttonsSwapped = false; // Keep track of button positions

yesButton.addEventListener('click', () => {
  if(confirm("I knew you'd say yes stinker (;")){
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(canvas.width, canvas.height));
      }
      document.querySelector('span').textContent = 'Stinker';
      document.querySelector('span').classList.add('shiny');
      animate();
  }
});


noButton.addEventListener('click', () => {
    if (buttonsSwapped) {
      // Swap back the buttons
      yesButton.style.order = '1';
      noButton.style.order = '2';
    } else {
      // Swap the buttons
      yesButton.style.order = '2';
      noButton.style.order = '1';
    }
  
    buttonsSwapped = !buttonsSwapped; // Toggle the button positions
  
    // Calculate the difference in position between the buttons
    let buttonDiff = yesButton.getBoundingClientRect().left - noButton.getBoundingClientRect().left;
    buttonDiff = 200
    // Animate the buttons using the calculated difference in position
    yesButton.style.transform = `translateX(${buttonsSwapped ? -buttonDiff : buttonDiff}px)`;
    noButton.style.transform = `translateX(${buttonsSwapped ? buttonDiff : -buttonDiff}px)`;
});

function createParticle(canvasWidth, canvasHeight) {
  const x = Math.random() * canvasWidth;
  const y = Math.random() * canvasHeight;
  const size = Math.random() * 10;
  const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

  return {
    x,
    y,
    size,
    color,
    speed: {
      x: Math.random() * 3 - 1.5,
      y: Math.random() * 3 - 1.5
    },
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 10 - 5
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.x += particle.speed.x;
    particle.y += particle.speed.y;
    particle.rotation += particle.rotationSpeed;

    ctx.save();
    ctx.translate(particle.x + particle.size / 2, particle.y + particle.size / 2);
    ctx.rotate((particle.rotation * Math.PI) / 180);
    
    ctx.fillStyle = particle.color;
    ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);

    ctx.restore();
  });

  particles = particles.filter(particle => particle.size > 0);

  requestAnimationFrame(animate);
}
