import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'
import { makeSummary } from '../fixtures/games'

const { getRandomGames } = vi.hoisted(() => ({ getRandomGames: vi.fn() }))

mockNuxtImport('useGamesService', () => () => ({ getRandomGames }))

const games = [
  makeSummary({ id: 3, title: 'Unrated', releaseDate: '2016-06-01', rating: { average: null, count: 0 } }),
  makeSummary({ id: 1, title: 'Older but loved', releaseDate: '2015-02-01', rating: { average: 9, count: 4 } }),
  makeSummary({ id: 2, title: 'Newest', releaseDate: '2017-11-01', rating: { average: 4, count: 2 } }),
]

const titles = (wrapper: Awaited<ReturnType<typeof mountSuspended>>) =>
  wrapper.findAll('.game-card h2').map(h => h.text())

describe('index page', () => {
  beforeEach(() => {
    clearNuxtState()
    clearNuxtData()
    getRandomGames.mockReset()
  })

  it('loads 15 games from 2015 to 2017, sorts by rating and can switch to release date', async () => {
    getRandomGames.mockResolvedValue(games)
    const wrapper = await mountSuspended(IndexPage, { route: '/' })

    expect(getRandomGames).toHaveBeenCalledWith({ count: 15, range: { from: '2015-01-01', to: '2017-12-31' } })
    expect((wrapper.get('select').element as HTMLSelectElement).value).toBe('rating')
    expect(titles(wrapper)).toEqual(['Older but loved', 'Newest', 'Unrated'])

    await wrapper.get('select').setValue('releaseDate')

    await vi.waitFor(() => expect(titles(wrapper)).toEqual(['Newest', 'Unrated', 'Older but loved']))
    expect(useRouter().currentRoute.value.query.sort).toBe('releaseDate')
  })

  it('shows an error state and reloads the games on retry', async () => {
    getRandomGames.mockRejectedValueOnce(new Error('API down')).mockResolvedValueOnce(games)
    const wrapper = await mountSuspended(IndexPage, { route: '/' })

    expect(wrapper.find('[role="alert"]').exists()).toBe(true)

    await wrapper.get('[role="alert"] button').trigger('click')

    await vi.waitFor(() => expect(titles(wrapper)).toHaveLength(3))
    expect(getRandomGames).toHaveBeenCalledTimes(2)
  })
})
