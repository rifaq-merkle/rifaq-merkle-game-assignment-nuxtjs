import type { GameSummary, SortKey } from '~/types/game'

function sortValue(game: GameSummary, key: SortKey): number | null {
  if (key === 'rating') return game.rating.average
  return game.releaseDate ? Date.parse(game.releaseDate) : null
}

export function sortGames(games: GameSummary[], key: SortKey): GameSummary[] {
  return [...games].sort((a, b) => {
    const valueA = sortValue(a, key)
    const valueB = sortValue(b, key)
    if (valueA === valueB) return a.title.localeCompare(b.title)
    if (valueA === null) return 1
    if (valueB === null) return -1
    return valueB - valueA
  })
}
