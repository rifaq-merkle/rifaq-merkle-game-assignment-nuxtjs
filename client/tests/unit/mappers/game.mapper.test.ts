import { describe, expect, it } from 'vitest'
import { toGameDetail } from '~/mappers/game.mapper'
import { API_BASE, makeApiGame } from '../../fixtures/games'

describe('game mapper', () => {
  it('maps API fields, computes the rating and fills in missing review data', () => {
    const game = makeApiGame({
      reviews: [
        { id: 1, rating: 4.7, review_text: 'Great game!', user: { username: 'SunChaser18' } },
        { id: 2, rating: 8, review_text: null, user: null },
      ],
    })

    expect(toGameDetail(game, API_BASE)).toEqual({
      id: 291,
      title: 'Lost Realm Ultimate',
      releaseDate: '2015-01-03',
      genre: 'Farming Sim',
      rating: { average: 6.4, count: 2 },
      image: 'http://api.test/media/Lost%20Realm%20Ultimate-screenshot-1?w=640&h=360',
      featuredImage: 'http://api.test/media/Lost%20Realm%20Ultimate-screenshot-1?w=1280&h=720',
      description: 'A fast-paced game with exciting combat.',
      developer: 'NCSoft',
      publisher: 'Digital Frontiers',
      platform: 'PC',
      reviews: [
        { id: 1, username: 'SunChaser18', text: 'Great game!', rating: 4.7 },
        { id: 2, username: 'Anonymous', text: '', rating: 8 },
      ],
    })
  })
})
