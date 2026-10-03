import { createFooter } from "./footer.js";
import { createHeader } from "./header.js";
import { createMain } from "./main.js";
import { newGameModal } from "./newGameModal.js";
import { gameOverModal } from "./winModal.js";
import { startGame } from "./game.js";

document.body.append(
  createHeader(),
  createMain(),
  createFooter(),
  newGameModal.overlay,
  gameOverModal.overlay,
);

startGame();
