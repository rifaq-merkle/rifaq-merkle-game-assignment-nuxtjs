import { describe, expect, it } from 'vitest'
import { sortGames } from '~/utils/sort'
import { makeSummary } from '../../fixtures/games'

const games = [
  makeSummary({ id: 1, title: 'B no data', releaseDate: null, rating: { average: null, count: 0 } }),
  makeSummary({ id: 2, title: 'Old top', releaseDate: '2015-02-01', rating: { average: 9, count: 3 } }),
  makeSummary({ id: 3, title: 'New low', releaseDate: '2017-11-01', rating: { average: 4, count: 1 } }),
  makeSummary({ id: 4, title: 'A no data', releaseDate: null, rating: { average: null, count: 0 } }),
]

const titles = (list: typeof games) => list.map(game => game.title)

describe('sortGames', () => {
  it('sorts highest first, puts missing values last and breaks ties by title', () => {
    expect(titles(sortGames(games, 'rating'))).toEqual(['Old top', 'New low', 'A no data', 'B no data'])
    expect(titles(sortGames(games, 'releaseDate'))).toEqual(['New low', 'Old top', 'A no data', 'B no data'])
    expect(titles(games)[0]).toBe('B no data')
  })
})
