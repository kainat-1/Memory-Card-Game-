document.getElementById("start-button").addEventListener("click", function () {
  document.getElementById("memory-board").style.display = "flex";
  document.getElementById("start-screen").style.display = "none";
});

// const cardImages = [
//   { name: "aquaman", image: "images/aquaman.jpg" },
//   { name: "batman", image: "images/batman.jpg" },
//   { name: "captain-america", image: "images/captain-america.jpg" },
//   { name: "fantastic-four", image: "images/fantastic-four.jpg" },
//   { name: "thor", image: "images/thor.jpg" },
//   { name: "ironman", image: "images/ironman.jpg" },
// ];
// const gameCards = [...cardImages, ...cardImages].map((card, index) => {
//   const cardElement = document.createElement("div");
//   cardElement.classList.add("card");
//   cardElement.dataset.name = card.name;
//   cardElement.dataset.id = index + 1;

//   const front = document.createElement("div");
//   front.classList.add("card-front");
//   front.style.backgroundImage = `url(${card.image})`;
//   cardElement.appendChild(front);

//   const back = document.createElement("div");
//   back.classList.add("card-back");
//   cardElement.appendChild(back);

//   return cardElement;
// });

// // Append the dynamically created cards to the memory board
// const memoryBoard = document.getElementById("memory-board");
// gameCards.forEach((card) => memoryBoard.appendChild(card));

class Card {
  constructor(element, name) {
    this.element = element;
    this.name = name;
    this.isFlipped = false;
    this.locked = false;
    this.element.addEventListener("click", () => this.flipCard());
  }

  flipCard() {
    if (this.locked || this.isFlipped || game.flippedCards.length === 2) return;
    this.isFlipped = true;
    this.element.classList.add("flip");
    game.handleCardFlip(this);
  }

  unflip() {
    this.isFlipped = false;
    this.element.classList.remove("flip");
  }

  lockCard() {
    this.locked = true;
  }
}

class MemoryGame {
  constructor(maxMoves) {
    this.cards = [];
    this.moves = 0;
    this.score = 0;
    this.maxMoves = maxMoves;
    this.flippedCards = [];
    this.startButton = document.getElementById("start-button");
    this.restartButton = document.getElementById("restart-button");
    this.memoryBoard = document.getElementById("memory-board");
    this.startScreen = document.getElementById("start-screen");
    this.endScreen = document.getElementById("end-screen");
    this.movesCount = document.getElementById("moves-count");
    this.scoreCount = document.getElementById("score-count");
    this.winComment = document.getElementById("win-comment");
    this.lostComment = document.getElementById("lost-comment");

    this.startButton.addEventListener("click", () => this.startGame());
    this.restartButton.addEventListener("click", () => this.resetGame());
  }

  startGame() {
    this.startScreen.style.display = "none";
    this.memoryBoard.style.display = "flex";
    this.initializeGame();
  }

  initializeGame() {
    this.cards = [];
    this.moves = 0;
    this.score = 0;
    this.movesCount.textContent = this.moves;
    this.scoreCount.textContent = this.score;
    this.endScreen.style.display = "none";

    const cardElements = document.querySelectorAll(".card");
    let cardImages = [
      "aquaman",
      "batman",
      "captain-america",
      "fantastic-four",
      "thor",
      "ironman",
    ];
    let gameCards = [...cardImages, ...cardImages].map((name, index) => ({
      name,
      element: cardElements[index],
    }));
    this.shuffleCards(gameCards);

    gameCards.forEach(({ name, element }) => {
      element.setAttribute("data-name", name);
      element.classList.remove("flip");
      this.cards.push({ name, element });
    });
  }

  shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  handleCardFlip(card) {
    this.flippedCards.push(card);
    if (this.flippedCards.length === 2) {
      this.moves++;
      this.movesCount.textContent = this.moves;

      const [card1, card2] = this.flippedCards;
      if (card1.name === card2.name) {
        card1.lockCard();
        card2.lockCard();
        this.flippedCards = [];
        this.score++;
        this.scoreCount.textContent = this.score;
        if (this.score === this.cards.length / 2) {
          this.endGame(true);
        }
      } else {
        setTimeout(() => {
          card1.unflip();
          card2.unflip();
          this.flippedCards = [];
        }, 1000);
      }

      if (this.moves >= this.maxMoves) {
        this.endGame(false);
      }
    }
  }

  endGame(win) {
    setTimeout(() => {
      this.memoryBoard.style.display = "none";
      this.endScreen.style.display = "flex";
      if (win) {
        this.winComment.style.display = "block";
        this.lostComment.style.display = "none";
      } else {
        this.winComment.style.display = "none";
        this.lostComment.style.display = "block";
      }
    }, 1000);
  }

  resetGame() {
    this.startScreen.style.display = "flex";
    this.memoryBoard.style.display = "none";
    this.endScreen.style.display = "none";
    this.winComment.style.display = "none";
    this.lostComment.style.display = "none";
    this.initializeGame();
  }
}

const game = new MemoryGame(20);
