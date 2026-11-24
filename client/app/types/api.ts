export interface ApiResource<T> {
  data: T
}

export interface ApiReview {
  id: number
  rating: number
  review_text: string | null
  user?: { username: string } | null
}

export interface ApiImage {
  image_url: string
  image_type: 'Cover' | 'Screenshot' | 'Artwork'
}

export interface ApiGame {
  id: number
  title: string
  description: string | null
  platform: string | null
  release_date: string | null
  genre?: { name: string } | null
  developer?: { name: string } | null
  publisher?: { name: string } | null
  reviews?: ApiReview[]
  images?: ApiImage[]
}
