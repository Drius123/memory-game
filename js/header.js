import { createButton, createElement } from "./createElement.js";
import { openNewGameModal } from "./newGameModal.js";

export function createHeader() {
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
