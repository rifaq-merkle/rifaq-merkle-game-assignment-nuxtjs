export interface Rating {
  average: number | null
  count: number
}

export interface GameSummary {
  id: number
  title: string
  releaseDate: string | null
  genre: string | null
  rating: Rating
  image: string | null
}

export interface Review {
  id: number
  username: string
  text: string
  rating: number
}

export interface GameDetail extends GameSummary {
  description: string
  developer: string | null
  publisher: string | null
  platform: string | null
  featuredImage: string | null
  reviews: Review[]
}

export type SortKey = 'rating' | 'releaseDate'
