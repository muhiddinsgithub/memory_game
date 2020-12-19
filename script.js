const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const IMAGES = [
  "images/cat1.jpg",
  "images/cat2.jpg",
  "images/cat3.jpg",
  "images/cat4.jpg",
  "images/cat5.jpg",
  "images/cat6.jpg",
  "images/cat1.jpg",
  "images/cat2.jpg",
  "images/cat3.jpg",
  "images/cat4.jpg",
  "images/cat5.jpg",
  "images/cat6.jpg",
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(IMAGES);

function createDivsForColors(imagesArray) {
  for (let image of imagesArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(`url(${image})`);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.style.backgroundImage = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function () {
        card1.style.backgroundImage = "";
        card2.style.backgroundImage = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === IMAGES.length) alert("GOOD JOB!");
}

createDivsForColors(shuffledColors);

function getRandomRGB() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
const letters = document.querySelectorAll(".letter");

setInterval(function () {
  for (let letter of letters) {
    letter.style.color = getRandomRGB();
  }
}, 500);
