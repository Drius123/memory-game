import { createElement } from "./createElement.js";
import { openGameWinModal } from "./winModal.js";

let isBoardLocked = false;
let closeTimerId = null;

const planets = [
  "earth",
  "jupiter",
  "mars",
  "mercury",
  "neptune",
  "saturn",
  "uranus",
  "venus",
  "earth",
  "jupiter",
  "mars",
  "mercury",
  "neptune",
  "saturn",
  "uranus",
  "venus",
];

export function startGame() {
  planets.sort(() => Math.random() - 0.5);
  const board = document.querySelector(".board");
  planets.forEach((planet) => {
    const card = createElement("button", "card");
    const cardInner = createElement("div", "card__inner");
    const cardFront = createElement("div", "card__front");
    const cardFrontImg = createElement("img");
    cardFrontImg.src = "./assets/card-front.jpg";
    cardFrontImg.alt = "Card front";
    cardFront.append(cardFrontImg);
    const cardBackImg = createElement("img");
    cardBackImg.src = `./assets//${planet}.jpg`;
    cardBackImg.alt = planet;
    const cardBack = createElement("div", "card__back");
    cardBack.append(cardBackImg);
    cardInner.append(cardFront, cardBack);
    card.append(cardInner);
    card.setAttribute("data-planet", planet);
    card.addEventListener("click", () => {
      if (
        isBoardLocked ||
        card.classList.contains("is-open") ||
        card.classList.contains("is-matched")
      ) {
        return;
      }

      card.classList.add("is-open");
      checkSelectedCards();
    });
    board.append(card);
  });
}

export function resetGame() {
  clearTimeout(closeTimerId);
  closeTimerId = null;
  isBoardLocked = false;

  const board = document.querySelector(".board");
  board.replaceChildren();
  const movesValue = document.querySelector(".stats__value");
  movesValue.textContent = "0";
  const pairsValue = document.querySelectorAll(".stats__value")[1];
  pairsValue.textContent = "0";
  startGame();
}

function checkSelectedCards() {
  const selectedCards = document.querySelectorAll(".card.is-open");
  if (selectedCards.length === 2) {
    isBoardLocked = true;

    const movesValue = document.querySelector(".stats__value");
    movesValue.textContent = parseInt(movesValue.textContent, 10) + 1;
    const [firstCard, secondCard] = selectedCards;
    const firstPlanet = firstCard.getAttribute("data-planet");
    const secondPlanet = secondCard.getAttribute("data-planet");
    if (firstPlanet === secondPlanet) {
      const pairsValue = document.querySelectorAll(".stats__value")[1];
      pairsValue.textContent = parseInt(pairsValue.textContent, 10) + 1;
      selectedCards.forEach((card) => card.classList.add("is-matched"));
      selectedCards.forEach((card) => card.classList.remove("is-open"));
      isBoardLocked = false;
      if (pairsValue.textContent === "8") {
        openGameWinModal();
      }
    } else {
      closeTimerId = setTimeout(() => {
        selectedCards.forEach((card) => card.classList.remove("is-open"));
        isBoardLocked = false;
        closeTimerId = null;
      }, 1000);
    }
  }
}
