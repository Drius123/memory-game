export function getSavedMoves() {
  const savedMoves = localStorage.getItem("moves");

  if (!savedMoves) {
    return [];
  }

  const parsedMoves = JSON.parse(savedMoves);
  return Array.isArray(parsedMoves) ? parsedMoves : [];
}

export function saveMove(movesCount) {
  const moves = getSavedMoves();
  moves.push(movesCount);
  localStorage.setItem("moves", JSON.stringify(moves));
}
