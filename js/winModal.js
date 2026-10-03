import { createButton, createElement } from "./createElement.js";
import { createModal } from "./modal.js";
import { resetGame } from "./game.js";

export function createGameWinModal() {
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

export const gameWinModal = createGameWinModal();

export function openGameWinModal() {
  gameWinModal.open();
}
