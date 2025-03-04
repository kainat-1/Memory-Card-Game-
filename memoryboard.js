class MemoryGame {
  constructor() {
    this.flippedCards = [];
    this.moves = document.querySelector("#moves-count");
    this.score = document.querySelector("#score-count");
    this.maxMoves = 5;
    
  }

  flipCard(card) {
    if (this.flippedCards.length < 2) {
      card.classList.add("flipped");
      this.flippedCards.push(card);
      console.log(this.flippedCards);
    }
    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
    this.maximumMoves();
  }
  checkForMatch() {
    const [card1, card2] = this.flippedCards;

    if (card1.dataset.name === card2.dataset.name) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      this.flippedCards = [];
      this.score.textContent = parseInt(this.score.textContent) + 1;
      this.checkForWin();
    } else {
      setTimeout(() => {
        card1.classList.toggle("flipped");
        card2.classList.toggle("flipped");
        this.flippedCards = [];
      }, 1000);
    }
    this.moves.textContent = parseInt(this.moves.textContent) + 1;
  }

  maximumMoves() {
    if (parseInt(this.moves.textContent) >= this.maxMoves) {
      this.endGame(true);
    }
  }
  endGame(isWon) {
    document.getElementById("memory-board").style.display = "none";
    document.getElementById("end-screen").style.display = "flex";
    if (isWon) {
      document.getElementById("win-comment").style.display = "block";
    } else {
      document.getElementById("lost-comment").style.display = "block";
    }
  }
  checkForWin() {
    const totalPairs = cardImages.length;
    const matchedPairs = document.querySelectorAll(".card.matched").length / 2;
    if (matchedPairs === totalPairs) {
      this.endGame(true);
    }
  }
}
document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    location.reload();
  });
