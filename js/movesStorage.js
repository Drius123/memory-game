const STORAGE_KEY = "moves";
const MAX_RESULTS = 10;

function compareResults(firstResult, secondResult) {
  if (firstResult.moves !== secondResult.moves) {
    return firstResult.moves - secondResult.moves;
  }

  return firstResult.playedAt - secondResult.playedAt;
}

function normalizeResult(entry, index) {
  if (typeof entry === "number") {
    return { moves: entry, playedAt: index };
  }

  if (
    entry &&
    Number.isFinite(entry.moves) &&
    Number.isFinite(entry.playedAt)
  ) {
    return { moves: entry.moves, playedAt: entry.playedAt };
  }

  return null;
}

export function getSavedMoves() {
  const savedMoves = localStorage.getItem(STORAGE_KEY);

  if (!savedMoves) {
    return [];
  }

  try {
    const parsedMoves = JSON.parse(savedMoves);

    if (!Array.isArray(parsedMoves)) {
      return [];
    }

    return parsedMoves
      .map(normalizeResult)
      .filter(Boolean)
      .sort(compareResults)
      .slice(0, MAX_RESULTS);
  } catch {
    return [];
  }
}

export function saveMove(movesCount) {
  const results = getSavedMoves();
  results.push({ moves: movesCount, playedAt: Date.now() });
  results.sort(compareResults);
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(results.slice(0, MAX_RESULTS)),
  );
}
