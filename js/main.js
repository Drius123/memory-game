import { createElement } from "./createElement.js";

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

export function createMain() {
  const main = createElement("main", "main");
  main.append(createStats(), createBoard());
  return main;
}
