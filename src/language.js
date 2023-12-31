class LanguageGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.cardPairs = [];
    this.time = 59;
    this.score = 0;
    this.startScreen = document.getElementById('game-intro');
    this.loadingScreen = document.getElementById('game-loading');
    this.gameScreen = document.getElementById('game-screen');
    this.timeDisplay = document.getElementById('timer');
    this.startTime = null;
    this.endTime = null;
    this.realTimeScore = document.getElementById('currentScore');
    this.gameBoard = document.getElementById('game-board');
    this.gameEndScreen = document.getElementById('game-end');
    this.winScreen = document.getElementById('win-game-end');
    this.loseScreen = document.getElementById('lose-game-end');
    this.backgroundSound = document.getElementById('background-sound');
    this.endGameAudio = document.getElementById('game-end-audio');
    this.shuffleCards();
  }

  start() {
    this.gameScreen.style.display = 'block';
    this.loadingScreen.style.display = 'flex';
    this.startScreen.style.display = 'none';
    this.backgroundSound.play();
    this.createGameBoard();
    setTimeout(() => {
      this.timer();
      this.loadingScreen.style.display = 'none';
      this.startTime = new Date();
      this.backgroundSound.volume = 0.1;
    }, 5000);
  }

  createGameBoard() {
    let html = '';
    this.cards.forEach(card => {
      html += `
      <div class = "card" data-card-name = "${card.name}" type = "${card.type}" style = "background: url(img/${card.img}) no-repeat">
      </div>
      `;
    });
    this.gameBoard.innerHTML = html;
  }
  updateGameBoard() {
    let newHtml = '';
    this.cards.forEach(card => {
      if (this.cardPairs.includes(card.name)) {
        newHtml += `<div class="card matched card-reshuffle-animation" data-card-name="${card.name}"></div>`;
      } else {
        newHtml += `<div class="card card-reshuffle-animation" data-card-name="${card.name}" type="${card.type}" style="background: url(img/${card.img}) no-repeat"></div>`; // Add the 'card-reshuffle-animation' class here
      }
    });
    this.gameBoard.innerHTML = newHtml;
    this.pickedCards.length = 0;
  }

  selectCard(clickedCard) {
    const clickedCardName = clickedCard.getAttribute('data-card-name');
    const typeOfCard = clickedCard.getAttribute('type');

    if (!this.pickedCards.includes(clickedCard)) {
      clickedCard.classList.add('clicked');
      this.pickedCards.push(clickedCard);

      if (typeOfCard === 'text') {
        const sound = new Audio(`/sound/${clickedCardName}.mp3`);
        sound.play();
      }
    }
  }
  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  checkIfPair(card1, card2) {
    if (card1 === card2) {
      return true;
    } else {
      return false;
    }
  }

  matchCards() {
    const firstCardName = this.pickedCards[0].getAttribute('data-card-name');
    const secondCardName = this.pickedCards[1].getAttribute('data-card-name');
    if (this.checkIfPair(firstCardName, secondCardName)) {
      setTimeout(() => {
        this.correctMatch();
        document.querySelectorAll('.card').forEach(card => {
          card.addEventListener('click', () => {
            handleClick(card);
          });
        });
        this.pickedCards.forEach(pickedCard => {
          pickedCard.classList.remove('card-reshuffle-animation');
        });
      }, 500);
    } else {
      this.incorrectMatch();
    }
  }

  correctMatch() {
      this.pickedCards.forEach(pickedCard => {
        this.cardPairs.push(pickedCard.getAttribute('data-card-name'));
        pickedCard.classList.add('card-reshuffle-animation');
      });
      this.realTimeScore.innerText = parseInt(this.realTimeScore.innerText) + 1;
      this.checkIfWon();
      this.shuffleCards();
      this.updateGameBoard();
    }
  checkIfWon() {
    if (this.cardPairs.length === this.cards.length) {
      this.winGame();
    }
  }
  incorrectMatch() {
    this.pickedCards.forEach(pickedCard => {
      pickedCard.classList.add('incorrect', 'wrong-match-animation');
    });
  
    setTimeout(() => {
      this.pickedCards.forEach(pickedCard => {
        pickedCard.classList.remove('incorrect', 'clicked', 'wrong-match-animation', 'card-reshuffle-animation');
      });
      this.pickedCards.length = 0;
    }, 500);
  }  

  timer() {
    const timeLeft = setInterval(() => {
      this.timeDisplay.innerText = this.time;
      this.time--;
      if (this.time < 0) {
        clearInterval(timeLeft);
        this.loseGame();
      }
    }, 1000);
  }

  winGame() {
    this.endTime = new Date();
    this.backgroundSound.volume = 1;
    this.gameScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'block';
    this.winScreen.style.display = 'flex';
    const elapsedTime = Math.floor((this.endTime - this.startTime) / 1000);
    const totalTime = document.getElementById('timeTotal');
    totalTime.innerText = elapsedTime;
    this.loseScreen.remove();
  }

  loseGame() {
    this.backgroundSound.volume = 1;
    this.gameScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'block';
    this.loseScreen.style.display = 'flex';
    const totalScore = document.getElementById('scoreTotal');
    totalScore.innerText = this.realTimeScore.innerText;
    this.winScreen.style.display = 'none';
  }
}