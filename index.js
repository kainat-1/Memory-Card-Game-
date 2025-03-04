let game;
document.getElementById("start-button").addEventListener("click", function () {
  document.getElementById("memory-board").style.display = "flex";
  document.getElementById("start-screen").style.display = "none";
  game = new MemoryGame();
});

const cardImages = [
  { name: "HERO-1", image: "images/hero-1.jpg" },
  { name: "HERO-2", image: "images/hero-2.jpg" },
  { name: "HERO-3", image: "images/hero-3.jpg" },
  { name: "HERO-4", image: "images/hero-4.jpg" },
  { name: "HERO-5", image: "images/hero-5.jpg" },
  { name: "HERO-6", image: "images/hero-6.jpg" },
  { name: "HERO-7", image: "images/hero-7.jpg" },
  { name: "HERO-8", image: "images/hero-8.jpg" },
  { name: "HERO-9", image: "images/hero-9.jpg" },
  { name: "HERO-10", image: "images/hero-10.jpg" },
  { name: "HERO-11", image: "images/hero-11.jpg" },
  { name: "HERO-12", image: "images/hero-12.jpg" },
  { name: "HERO-13", image: "images/hero-13.jpg" },
  { name: "HERO-14", image: "images/hero-14.jpg" },
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
