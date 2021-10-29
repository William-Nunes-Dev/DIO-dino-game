const gaiden = document.querySelector('.gaiden');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 250) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          gaiden.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 40;
      gaiden.style.bottom = position + 'px';
    }
  }, 20);
}

function createNaruto() {
  const naruto = document.createElement('div');
  let narutoPosition = 2000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  naruto.classList.add('naruto');
  background.appendChild(naruto);
  naruto.style.left = narutoPosition + 'px';

  let leftTimer = setInterval(() => {
    if (narutoPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(naruto);
    } else if (narutoPosition > 0 && narutoPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';
    } else {
      narutoPosition -= 10;
      naruto.style.left = narutoPosition + 'px';
    }
  }, 20);

  setTimeout(createNaruto, randomTime);
}

createNaruto();


document.addEventListener('keyup', handleKeyUp);