import { createFooter } from "./footer.js";
import { createHeader } from "./header.js";
import { createMain } from "./main.js";
import { newGameModal } from "./newGameModal.js";
import { gameWinModal } from "./winModal.js";
import {leaderBoardModal} from "./leaderBoardModal.js";
import { startGame } from "./game.js";

document.body.append(
  createHeader(),
  createMain(),
  createFooter(),
  newGameModal.overlay,
  gameWinModal.overlay,
  leaderBoardModal.overlay,
);

startGame();
