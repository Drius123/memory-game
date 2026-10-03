import { createButton, createElement } from "./createElement.js";
import { createModal } from "./modal.js";
import { getSavedMoves } from "./movesStorage.js";

function renderSavedMoves(list) {
  list.replaceChildren();

  const savedMoves = [...getSavedMoves()].sort((a, b) => a - b);

  if (savedMoves.length === 0) {
    list.append(
      createElement(
        "p",
        "modal__text__leaderboard__move",
        "Пока нет результатов",
      ),
    );
    return;
  }

  savedMoves.forEach((move, index) => {
    const moveElement = createElement(
      "p",
      "modal__text__leaderboard__move",
      `${index + 1}. ${move} ходов`,
    );
    list.append(moveElement);
  });
}

export function createLeaderBoardModal() {
  const modal = createModal();
  const text = createElement("p", "modal__text__leaderboard", "Таблица лидеров");
  const list = createElement("div", "modal__actions__leaderboard");
  const resumeGameButton = createButton("button", "Выйти из таблицы лидеров");

  text.id = "game-leaderboard-message";
  modal.dialog.setAttribute("aria-label", "game-leaderboard-message");
  resumeGameButton.addEventListener("click", () => {
    modal.close();
  });
  modal.dialog.append(text, list, resumeGameButton);

  return { modal, list };
}

const leaderBoard = createLeaderBoardModal();

export const leaderBoardModal = leaderBoard.modal;

export function openLeaderBoardModal() {
  renderSavedMoves(leaderBoard.list);
  leaderBoardModal.open();
}
