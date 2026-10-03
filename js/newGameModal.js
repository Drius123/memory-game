import { createButton, createElement } from "./createElement.js";
import { createModal } from "./modal.js";
import { resetGame } from "./game.js";

export function createNewGameModal() {
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

export const newGameModal = createNewGameModal();

export function openNewGameModal() {
  newGameModal.open();
}
