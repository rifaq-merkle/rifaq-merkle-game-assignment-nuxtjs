import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import GameCard from '~/components/GameCard.vue'
import { makeSummary } from '../fixtures/games'

describe('GameCard', () => {
  it('shows the game summary and links the whole card to the detail page', async () => {
    const game = makeSummary({
      id: 291,
      title: 'Lost Realm Ultimate',
      releaseDate: '2015-01-03',
      genre: 'Farming Sim',
      rating: { average: 6.4, count: 2 },
      image: 'http://api.test/media/screenshot.webp',
    })
    const wrapper = await mountSuspended(GameCard, { props: { game } })

    expect(wrapper.get('img').attributes('src')).toBe('http://api.test/media/screenshot.webp')
    expect(wrapper.get('h2').text()).toBe('Lost Realm Ultimate')
    expect(wrapper.get('time').text()).toBe('3 January 2015')
    expect(wrapper.text()).toContain('6.4/10 (2 ratings)')
    expect(wrapper.text()).toContain('Farming Sim')

    const links = wrapper.findAll('a')
    expect(links).toHaveLength(1)
    expect(links[0]!.attributes('href')).toBe('/games/291')
  })
})
