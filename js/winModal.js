import { createButton, createElement } from "./createElement.js";
import { createModal } from "./modal.js";
import { resetGame } from "./game.js";

export function createGameWinModal() {
  const modal = createModal();
  const text = createElement("p", "modal__text", "Поздравляем! Вы нашли все пары!");
  const moves = createElement("p", "modal__moves");
  const actions = createElement("div", "modal__actions");
  const newGameButton = createButton("button", "Новая игра");
  const closeButton = createButton("button", "Закрыть");

  text.id = "game-win-message";
  modal.dialog.setAttribute("aria-labelledby", "game-win-message");
  newGameButton.addEventListener("click", () => {
    modal.close();
    resetGame();
  });
  closeButton.addEventListener("click", modal.close);
  actions.append(newGameButton, closeButton);
  modal.dialog.append(text, moves, actions);

  return { modal, moves };
}

const gameWin = createGameWinModal();

export const gameWinModal = gameWin.modal;

export function openGameWinModal(movesCount) {
  gameWin.moves.textContent = `Ходов: ${movesCount}`;
  gameWinModal.open();
}
