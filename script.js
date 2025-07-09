const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const resultPopup = document.getElementById('resultPopup');
const startBtn = document.getElementById('startBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const medalText = document.getElementById('medal');
const messageText = document.getElementById('message');
const finalScore = document.getElementById('finalScore');

const emojis = ['😀','😎','👻','💥','🥶','🐸','🦄','🍕','🧠','👾'];
let score = 0;
let timeLeft = 10;
let gameActive = false;
let gameTimer, emojiInterval;

function startGame() {
  score = 0;
  timeLeft = 10;
  scoreBoard.textContent = `Score: 0 | Time: 10s`;
  startBtn.disabled = true;
  resultPopup.classList.remove('show');
  gameActive = true;

  gameTimer = setInterval(() => {
    if (timeLeft <= 0) {
      endGame();
    } else {
      timeLeft--;
      scoreBoard.textContent = `Score: ${score} | Time: ${timeLeft}s`;
    }
  }, 1000);

  emojiInterval = setInterval(spawnEmoji, 800);
}

function spawnEmoji() {
  if (!gameActive) return;

  const emoji = document.createElement('span');
  emoji.className = 'emoji';
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  const { width, height } = gameArea.getBoundingClientRect();
  const x = Math.random() * (width - 40);
  const y = Math.random() * (height - 40);
  emoji.style.left = `${x}px`;
  emoji.style.top = `${y}px`;

  emoji.onclick = () => {
    emoji.classList.add('clicked');
    score++;
    scoreBoard.textContent = `Score: ${score} | Time: ${timeLeft}s`;
    setTimeout(() => emoji.remove(), 150);
  };

  gameArea.appendChild(emoji);
  setTimeout(() => emoji.remove(), 2000);
}

function endGame() {
  gameActive = false;
  clearInterval(gameTimer);
  clearInterval(emojiInterval);
  document.querySelectorAll('.emoji').forEach(e => e.remove());

  let medal = '';
  let message = '';

  if (score <= 10) {
    medal = '🥉 Bronze';
    message = 'You click like a sleepy sloth 😴';
  } else if (score <= 20) {
    medal = '🥈 Silver';
    message = 'Fast but not furious ⚡';
  } else {
    medal = '🥇 Gold';
    message = 'Lightning Fingers! Are you even human? 🦾';
  }

  medalText.textContent = medal;
  messageText.textContent = message;
  finalScore.textContent = `Final Score: ${score}`;
  resultPopup.classList.add('show');
  startBtn.disabled = false;

  // Optional confetti burst
  confetti && confetti();
}

startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', startGame);