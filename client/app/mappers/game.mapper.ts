import type { ApiGame, ApiImage } from '~/types/api'
import type { GameDetail, GameSummary } from '~/types/game'
import { computeRating } from '~/utils/rating'

function imageUrl(images: ApiImage[] = [], apiBase: string, width: number, height: number): string | null {
  const image = images.find(item => item.image_type === 'Screenshot') ?? images[0]
  if (!image) return null

  const url = new URL(image.image_url, apiBase)
  url.searchParams.set('w', String(width))
  url.searchParams.set('h', String(height))
  return url.toString()
}

export function toGameSummary(game: ApiGame, apiBase: string): GameSummary {
  return {
    id: game.id,
    title: game.title,
    releaseDate: game.release_date,
    genre: game.genre?.name ?? null,
    rating: computeRating((game.reviews ?? []).map(review => review.rating)),
    image: imageUrl(game.images, apiBase, 640, 360),
  }
}

export function toGameDetail(game: ApiGame, apiBase: string): GameDetail {
  return {
    ...toGameSummary(game, apiBase),
    description: game.description ?? '',
    developer: game.developer?.name ?? null,
    publisher: game.publisher?.name ?? null,
    platform: game.platform,
    featuredImage: imageUrl(game.images, apiBase, 1280, 720),
    reviews: (game.reviews ?? []).map(review => ({
      id: review.id,
      username: review.user?.username ?? 'Anonymous',
      text: review.review_text ?? '',
      rating: review.rating,
    })),
  }
}
