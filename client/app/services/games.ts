import type { $Fetch } from 'nitropack/types'
import type { ApiGame, ApiResource } from '~/types/api'
import type { GameSummary } from '~/types/game'
import { toGameDetail, toGameSummary } from '~/mappers/game.mapper'

const MAX_ROUNDS = 3

interface RandomGamesOptions {
  count: number
  range: { from: string; to: string }
  random?: () => number
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items]
  for (let i = 0; i < result.length; i++) {
    const j = i + Math.floor(random() * (result.length - i))
    ;[result[i], result[j]] = [result[j]!, result[i]!]
  }
  return result
}

export function createGamesService(api: $Fetch, apiBase: string) {
  const fetchGame = (id: number) => api<ApiResource<ApiGame>>(`/games/${id}`).then(response => response.data)

  async function getGame(id: number) {
    return toGameDetail(await fetchGame(id), apiBase)
  }

  async function getRandomGames({ count, range, random = Math.random }: RandomGamesOptions): Promise<GameSummary[]> {
    const { ids } = await api<{ ids: number[] }>('/games/by-date-range', { query: range })
    const pool = shuffle(ids, random)
    const games: GameSummary[] = []
    let lastError: unknown

    for (let round = 0; round < MAX_ROUNDS && games.length < count && pool.length; round++) {
      const batch = pool.splice(0, count - games.length)
      const results = await Promise.allSettled(batch.map(fetchGame))

      for (const result of results) {
        if (result.status === 'fulfilled') games.push(toGameSummary(result.value, apiBase))
        else lastError = result.reason
      }
    }

    if (!games.length && lastError) throw lastError
    return games
  }

  return { getGame, getRandomGames }
}
