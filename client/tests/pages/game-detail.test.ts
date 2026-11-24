import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { toGameDetail } from '~/mappers/game.mapper'
import GamePage from '~/pages/games/[id].vue'
import { API_BASE, makeApiGame } from '../fixtures/games'

const { getGame } = vi.hoisted(() => ({ getGame: vi.fn() }))

mockNuxtImport('useGamesService', () => () => ({ getGame }))

describe('game detail page', () => {
  beforeEach(() => {
    clearNuxtData()
    getGame.mockReset()
  })

  it('shows all required details, reviews and a back button', async () => {
    getGame.mockResolvedValue(toGameDetail(makeApiGame(), API_BASE))
    const wrapper = await mountSuspended(GamePage, { route: '/games/291' })

    expect(getGame).toHaveBeenCalledWith(291)
    expect(wrapper.get('h1').text()).toBe('Lost Realm Ultimate')
    expect(wrapper.text()).toContain('A fast-paced game with exciting combat.')
    expect(wrapper.get('img').attributes('src')).toContain('screenshot-1?w=1280&h=720')
    expect(wrapper.get('time').text()).toBe('3 January 2015')
    expect(wrapper.text()).toContain('6.4/10 (2 ratings)')
    expect(wrapper.text()).toContain('NCSoft')
    expect(wrapper.text()).toContain('Farming Sim')

    const reviews = wrapper.findAll('.review')
    expect(reviews).toHaveLength(2)
    expect(reviews[0]!.text()).toContain('SunChaser18')
    expect(reviews[0]!.text()).toContain('Great game!')
    expect(reviews[0]!.text()).toContain('4.7/10')

    expect(wrapper.get('.back-button').text()).toBe('Go to All Games')
  })

  it('shows a retry state for non 404 errors', async () => {
    getGame.mockRejectedValue(Object.assign(new Error('boom'), { statusCode: 500 }))
    const wrapper = await mountSuspended(GamePage, { route: '/games/291' })

    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(wrapper.find('.back-button').exists()).toBe(true)
  })
})
