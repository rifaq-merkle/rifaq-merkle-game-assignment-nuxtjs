import { createGamesService } from '~/services/games'

export function useGamesService() {
  const { apiBase } = useRuntimeConfig().public
  const api = $fetch.create({
    baseURL: `${apiBase}/api/v1`,
    timeout: 4000,
    retry: 3,
    retryDelay: 500,
  })
  return createGamesService(api, apiBase)
}
