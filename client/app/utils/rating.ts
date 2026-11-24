import type { Rating } from '~/types/game'

export function computeRating(scores: number[]): Rating {
  if (!scores.length) return { average: null, count: 0 }
  const sum = scores.reduce((total, score) => total + score, 0)
  return { average: Math.round((sum / scores.length) * 10) / 10, count: scores.length }
}

export function formatRating({ average, count }: Rating): string {
  if (average === null) return 'No ratings yet'
  return `${average.toFixed(1)}/10 (${count} ${count === 1 ? 'rating' : 'ratings'})`
}
