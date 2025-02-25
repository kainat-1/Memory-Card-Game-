document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-button");
  const startScreen = document.getElementById("start-screen");
  const memoryBoard = document.getElementById("memory-board");

  startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    memoryBoard.style.display = "flex";
  });
});

let memoBoard = document.getElementById("memory-board");
const cards = document.querySelectorAll(".card");
const cardImages = [
  { name: "ironman", image: "images/iron-man.webp" },
  { name: "captain-Marvel", image: "images/captin.jpg" },
  { name: "hulk", image: "images/hulk.webp" },
  { name: "spiderman", image: "images/il_570xN.3271341593_30ei.webp" },
  { name: "thor", image: "images/thor.avif" },
];

// Assign images to each card
cards.forEach((card, index) => {
  const front = card.querySelector(".card-front");
  const back = card.querySelector(".card-back");
  front.style.backgroundImage = `url(${cardImages[index].image})`;
  card.setAttribute("data-name", cardImages[index].name);
});
let flippedCards = [];
let moves = 0;

memoBoard.addEventListener("click", function (event) {
  const clickedCard = event.target.closest(".card");

  if (!clickedCard || flippedCards.length === 2) return; // Prevent double flip

  clickedCard.classList.add("flip");
  flippedCards.push(clickedCard);

  // Check for match
  if (flippedCards.length === 2) {
    moves++;
    document.getElementById("moves-count").textContent = moves;

    const [card1, card2] = flippedCards;

    if (card1.getAttribute("data-name") === card2.getAttribute("data-name")) {
      flippedCards = []; // Reset the flipped cards array
    } else {
      setTimeout(() => {
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        flippedCards = []; // Reset the flipped cards array
      }, 1000); // Delay before flipping back
    }
  }
});
