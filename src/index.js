const cards = [
  { name: 'apple', img: 'apple.png' },
  { name: 'banana', img: 'banana.png' },
  { name: 'blueberry', img: 'blueberry.png' },
  { name: 'cherry', img: 'cherry.png' },
  { name: 'grape', img: 'grapes.png' },
  { name: 'lemon', img: 'lemon.png' },
  { name: 'orange', img: 'orange.png' },
  { name: 'peach', img: 'peach.png' },
  { name: 'pear', img: 'pear.png' },
  { name: 'pineapple', img: 'pineapple.png' },
  { name: 'strawberry', img: 'strawberry.png' },
  { name: 'watermelon', img: 'watermelon.png' },
  { name: 'apple', img: 'apple-txt.png', audio: 'apple.mp3' },
  { name: 'banana', img: 'banana-txt.png' },
  { name: 'blueberry', img: 'blueberry-txt.png' },
  { name: 'cherry', img: 'cherry-txt.png' },
  { name: 'grape', img: 'grape-txt.png' },
  { name: 'lemon', img: 'lemon-txt.png' },
  { name: 'orange', img: 'orange-txt.png' },
  { name: 'peach', img: 'peach-txt.png' },
  { name: 'pear', img: 'pear-txt.png' },
  { name: 'pineapple', img: 'pineapple-txt.png' },
  { name: 'strawberry', img: 'strawberry-txt.png' },
  { name: 'watermelon', img: 'watermelon-txt.png' },
];

const languageGame = new LanguageGame(cards);

window.onload = function () {
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');

  /* function playSound() {
    const sound = new Audio('/sound/apple.mp3');
    sound.play();
  }

  playSound(); */

  startButton.addEventListener('click', function () {
    languageGame.start();

    createGameBoard(languageGame.cards);
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        handleClick(card, languageGame);
      });
    });

    languageGame.timer();
  });

  restartButton.addEventListener('click', () => {
    location.reload();
  });
};

function createGameBoard(cards) {
  let html = '';
  languageGame.cards.forEach(card => {
    html += `
    <div class = "card" data-card-name = "${card.name}" style = "background: url(img/${card.img}) no-repeat">
    </div>
    `;
  });

  document.querySelector('#game-board').innerHTML = html;
}

function handleClick(card, game) {
  console.log('clicked');

  card.classList.toggle('clicked');

  /*if (languageGame.cards.indexOf(`{ name: '', img: 'apple-txt.png', audio: 'apple.mp3' }`)){
    console.log('I have sound');
    const sound = new Audio(`/sound/${game.card.audio}`);
    sound.play();
  }*/

  if (!game.pickedCards.includes(card)) {
    game.pickedCards.push(card);
  }

  if (game.pickedCards.length === 2) {
    firstCard = game.pickedCards[0].getAttribute('data-card-name');
    secondCard = game.pickedCards[1].getAttribute('data-card-name');

    if (game.checkIfPair(firstCard, secondCard)) {
      game.pickedCards.forEach(pickedCard => {
        game.cardPairs.push(pickedCard.getAttribute('data-card-name'));
      });

      game.checkIfFinished();

      game.shuffleCards();

      updateGameBoard(game.cards);
    }
    //   else {
    //   game.pickedCards[0].classList.add('incorrect');
    //   game.pickedCards[1].classList.add('incorrect');

    //   setTimeout(() => {
    //     game.pickedCards[0].classList.remove('incorrect');
    //     game.pickedCards[1].classList.remove('incorrect');
    //   }, 2000);
    // }

    game.pickedCards.length = 0;
  }
}

function updateGameBoard(cards) {
  let newHtml = '';

  cards.forEach(card => {
    if (languageGame.cardPairs.includes(card.name)) {
      newHtml += `<div class = "card" data-card-name = "${card.name}" style = "background-color: acqua"></div>`;
    } else {
      newHtml += `<div class = "card" data-card-name = "${card.name}" style = "background: url(img/${card.img}) no-repeat"></div>`;
    }
  });
  document.querySelector('#game-board').innerHTML = newHtml;

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      handleClick(card, languageGame);
    });
  });
}
