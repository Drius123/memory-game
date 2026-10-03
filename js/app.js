(function () {
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
        card.classList.toggle("is-open");
      });
      board.append(card);
    });
  }

  document.body.append(createHeader(), createMain(), createFooter());
  startGame();
})();
