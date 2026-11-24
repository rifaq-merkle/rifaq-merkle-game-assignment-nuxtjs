import type { GameSummary } from '~/types/game'

export function useRandomGames() {
  const savedGames = useState<GameSummary[] | null>('saved-random-games', () => null)
  const { getRandomGames } = useGamesService()

  return useAsyncData(
    'random-games',
    async () => {
      savedGames.value = await getRandomGames({ count: 15, range: { from: '2015-01-01', to: '2017-12-31' } })
      return savedGames.value
    },
    { getCachedData: () => savedGames.value ?? undefined },
  )
}
