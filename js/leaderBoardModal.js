import { createButton, createElement } from "./createElement.js";
import { createModal } from "./modal.js";
import { getSavedMoves } from "./movesStorage.js";

function formatDate(timestamp) {
  if (timestamp < 1e11) {
    return "—";
  }

  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

function renderSavedMoves(list) {
  list.replaceChildren();

  const savedMoves = getSavedMoves();

  if (savedMoves.length === 0) {
    list.append(
      createElement("p", "leaderboard__empty", "Пока нет результатов"),
    );
    return;
  }

  const table = createElement("table", "leaderboard");
  const head = createElement("thead");
  const headRow = createElement("tr");

  ["Место", "Ходы", "Дата"].forEach((title) => {
    headRow.append(createElement("th", undefined, title));
  });
  head.append(headRow);

  const body = createElement("tbody");

  savedMoves.forEach((result, index) => {
    const row = createElement("tr");
    row.append(createElement("td", undefined, String(index + 1)));
    row.append(createElement("td", undefined, String(result.moves)));
    row.append(createElement("td", undefined, formatDate(result.playedAt)));
    body.append(row);
  });

  table.append(head, body);
  list.append(table);
}

export function createLeaderBoardModal() {
  const modal = createModal();
  const text = createElement("p", "modal__text", "Таблица лидеров");
  const list = createElement("div", "leaderboard__list");
  const actions = createElement("div", "modal__actions");
  const closeButton = createButton("button", "Закрыть");

  text.id = "game-leaderboard-message";
  modal.dialog.setAttribute("aria-labelledby", "game-leaderboard-message");
  closeButton.addEventListener("click", () => {
    modal.close();
  });
  actions.append(closeButton);
  modal.dialog.append(text, list, actions);

  return { modal, list };
}

const leaderBoard = createLeaderBoardModal();

export const leaderBoardModal = leaderBoard.modal;

export function openLeaderBoardModal() {
  renderSavedMoves(leaderBoard.list);
  leaderBoardModal.open();
}
