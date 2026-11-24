import type { ApiGame } from '~/types/api'
import type { GameSummary } from '~/types/game'

export const API_BASE = 'http://api.test'

export function makeApiGame(overrides: Partial<ApiGame> = {}): ApiGame {
  return {
    id: 291,
    title: 'Lost Realm Ultimate',
    description: 'A fast-paced game with exciting combat.',
    platform: 'PC',
    release_date: '2015-01-03',
    genre: { name: 'Farming Sim' },
    developer: { name: 'NCSoft' },
    publisher: { name: 'Digital Frontiers' },
    reviews: [
      { id: 1, rating: 4.7, review_text: 'Great game!', user: { username: 'SunChaser18' } },
      { id: 2, rating: 8, review_text: 'Loved it', user: { username: 'PixelPilot' } },
    ],
    images: [
      { image_url: '/media/Lost%20Realm%20Ultimate-cover?w=300&h=400', image_type: 'Cover' },
      { image_url: '/media/Lost%20Realm%20Ultimate-screenshot-1?w=800&h=450', image_type: 'Screenshot' },
    ],
    ...overrides,
  }
}

export function makeSummary(overrides: Partial<GameSummary> = {}): GameSummary {
  return {
    id: 1,
    title: 'Game',
    releaseDate: '2016-06-01',
    genre: 'Action',
    rating: { average: 5, count: 1 },
    image: null,
    ...overrides,
  }
}
