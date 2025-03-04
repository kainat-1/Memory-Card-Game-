class MemoryGame {
  constructor() {
    this.flippedCards = [];
    this.moves = 0;
    this.score = 0;
    this.maxMoves = 20;
    // this.revealCard();
  }
  // revealCard(){
  //   gameCards.forEach((card) =>
  //       card.addEventListener("click", (event) => {
  //         card.classList.add("flipped");
  //       })
  //     );
  // }
  flipCard(card) {
    if (this.flippedCards.length < 2) {
      card.classList.add("flipped");
      this.flippedCards.push(card);
      console.log(this.flippedCards);
    }
    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
  }
  checkForMatch() {
    const [card1, card2] = this.flippedCards;

    if (card1.dataset.name === card2.dataset.name) {
      this.flippedCards = [];
      this.score++;
    } else {
      setTimeout(() => {
        console.log("insideTimeout");
        card1.classList.toggle("flipped");
        card2.classList.toggle("flipped");
        this.flippedCards = [];
      }, 1000);
    }
    this.moves++;
  }
}
