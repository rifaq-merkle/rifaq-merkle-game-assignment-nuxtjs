import { describe, expect, it, vi } from 'vitest'
import type { $Fetch } from 'nitropack/types'
import { createGamesService } from '~/services/games'
import { API_BASE, makeApiGame } from '../../fixtures/games'

const RANGE = { from: '2015-01-01', to: '2017-12-31' }

function fakeApi(handler: (path: string) => unknown) {
  return vi.fn(async (path: string) => handler(path)) as unknown as $Fetch & ReturnType<typeof vi.fn>
}

const gameFromPath = (path: string) => {
  const id = Number(path.split('/').pop())
  return { data: makeApiGame({ id, title: `Game ${id}` }), _links: [] }
}

describe('games service', () => {
  it('picks a random subset from the date range and maps it to cards', async () => {
    const api = fakeApi(path => (path === '/games/by-date-range' ? { ids: [10, 20, 30, 40] } : gameFromPath(path)))
    const alwaysPickLast = () => 0.99

    const games = await createGamesService(api, API_BASE).getRandomGames({
      count: 2,
      range: RANGE,
      random: alwaysPickLast,
    })

    expect(api).toHaveBeenCalledWith('/games/by-date-range', { query: RANGE })
    expect(api).toHaveBeenCalledTimes(3)
    expect(games.map(g => g.id)).toEqual([40, 10])
    expect(games[0]).toMatchObject({ title: 'Game 40', rating: { average: 6.4, count: 2 } })
  })

  it('replaces games that fail with other games from the range', async () => {
    const api = fakeApi(path => {
      if (path === '/games/by-date-range') return { ids: [1, 2, 3, 4, 5] }
      if (path === '/games/2') throw new Error('500')
      return gameFromPath(path)
    })

    const games = await createGamesService(api, API_BASE).getRandomGames({ count: 3, range: RANGE, random: () => 0 })

    expect(games.map(g => g.id)).toEqual([1, 3, 4])
  })
})
