let game;
document.getElementById("start-button").addEventListener("click", function () {
  document.getElementById("memory-board").style.display = "flex";
  document.getElementById("start-screen").style.display = "none";
  game = new MemoryGame();
});

const cardImages = [
  { name: "aquaman", image: "images/aquaman.jpg" },
  { name: "batman", image: "images/batman.jpg" },
  { name: "captain-america", image: "images/captain-america.jpg" },
  { name: "fantastic-four", image: "images/fantastic-four.jpg" },
  { name: "thor", image: "images/thor.jpg" },
  { name: "ironman", image: "images/ironman.jpg" },
];
const gameCards = [...cardImages, ...cardImages].map((card, index) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.name = card.name;
  cardElement.dataset.id = index + 1;

  const front = document.createElement("div");
  front.classList.add("card-front");
  front.style.backgroundImage = `url(${card.image})`;
  cardElement.appendChild(front);

  const back = document.createElement("div");
  back.classList.add("card-back");
  cardElement.appendChild(back);

  return cardElement;
});

// Append the dynamically created cards to the memory board
const memoryBoard = document.getElementById("memory-board");
gameCards.forEach((card) => memoryBoard.appendChild(card));

// adding flip
gameCards.forEach((card) =>
  card.addEventListener("click", (event) => {
    game.flipCard(card);
  })
);

// EXAMPLE ADDING EVENT LISTENER FOR ALL CARDS
// gameCards.forEach((card) =>
//   card.addEventListener("click", (e) => {
//     console.log(e.target);
//   })
// );

// EXAMPLE CREATING AN INSTANCE OF MEMORY GAME CLASS
// const memmoryGame = new MemoryGame()
