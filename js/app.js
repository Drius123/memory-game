(function () {
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

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined) {
      element.textContent = text;
    }

    return element;
  }

  function createButton(className, text) {
    const button = createElement("button", className, text);
    button.type = "button";
    return button;
  }

  function createHeader() {
    const header = createElement("header", "header");
    const title = createElement("h1", "header__title", "Memory Game");
    const actions = createElement("nav", "header__actions");
    const newGameButton = createButton("button", "Новая игра");
    newGameButton.addEventListener("click", openNewGameModal);
    const leadersButton = createButton("button", "Таблица лидеров");

    actions.setAttribute("aria-label", "Действия");
    actions.append(newGameButton, leadersButton);
    header.append(title, actions);

    return header;
  }

  function createStats() {
    const stats = createElement("section", "stats");
    const moves = createElement("p", "stats__item");
    const movesLabel = createElement("span", "stats__label", "Ходы");
    const movesValue = createElement("span", "stats__value", "0");
    const pairs = createElement("p", "stats__item");
    const pairsLabel = createElement("span", "stats__label", "Найденные пары");
    const pairsValue = createElement("span", "stats__value", "0");
    const pairsTotal = createElement("span", "stats__total", "из 8");

    stats.setAttribute("aria-label", "Счётчики");
    moves.append(movesLabel, movesValue);
    pairs.append(pairsLabel, pairsValue, pairsTotal);
    stats.append(moves, pairs);

    return stats;
  }

  function createBoard() {
    const board = createElement("section", "board");
    board.setAttribute("aria-label", "Игровое поле");
    return board;
  }

  function createMain() {
    const main = createElement("main", "main");
    main.append(createStats(), createBoard());
    return main;
  }

  function createFooter() {
    const footer = createElement("footer", "footer");
    const text = createElement("p", "footer__text", "Найди все пары планет");
    footer.append(text);
    return footer;
  }

  function createModal() {
    const overlay = createElement("div", "modal");
    const dialog = createElement("div", "modal__window");

    overlay.hidden = true;
    dialog.setAttribute("aria-modal", "true");
    overlay.append(dialog);

    function open() {
      overlay.hidden = false;
      document.body.classList.add("is-modal-open");
    }

    function close() {
      overlay.hidden = true;
      document.body.classList.remove("is-modal-open");
    }

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !overlay.hidden) {
        close();
      }
    });

    return { overlay, dialog, open, close };
  }

  function createNewGameModal() {
    const modal = createModal();
    const text = createElement(
      "p",
      "modal__text",
      "Вы точно хотите начать новую игру?",
    );
    const actions = createElement("div", "modal__actions");
    const confirmButton = createButton("button", "Да");
    const cancelButton = createButton("button", "Нет");

    text.id = "new-game-question";
    modal.dialog.setAttribute("aria-label", "new-game-question");
    confirmButton.addEventListener("click", () => {
      modal.close();
      resetGame();
    });
    cancelButton.addEventListener("click", modal.close);
    actions.append(confirmButton, cancelButton);
    modal.dialog.append(text, actions);

    return modal;
  }

  const newGameModal = createNewGameModal();

  function openNewGameModal() {
    newGameModal.open();
  }

  function createGameWinModal() {
    const modal = createModal();
    const text = createElement("p", "modal__text__win", "Поздравляем! Вы нашли все пары!");
    const actions = createElement("div", "modal__actions__win");
    const newGameButton = createButton("button", "Новая игра");

    text.id = "game-win-message";
    modal.dialog.setAttribute("aria-label", "game-win-message");
    newGameButton.addEventListener("click", () => {
      modal.close();
      resetGame();
    });
    actions.append(newGameButton);
    modal.dialog.append(text, actions);

    return modal;
  }

  const gameOverModal = createGameWinModal();

  function openGameWinModal() {
    gameOverModal.open();
  }

  function startGame() {
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

  function resetGame() {
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

  document.body.append(
    createHeader(),
    createMain(),
    createFooter(),
    newGameModal.overlay,
    gameOverModal.overlay,
  );
  
  startGame();
})();
