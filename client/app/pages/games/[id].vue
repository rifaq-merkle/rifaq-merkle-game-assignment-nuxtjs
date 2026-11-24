<script setup lang="ts">
import { formatRating } from '~/utils/rating'

definePageMeta({
  validate: route => /^\d+$/.test(String(route.params.id)),
})

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const { getGame } = useGamesService()

const { data: game, status, error, refresh } = await useAsyncData(`game-${id}`, () => getGame(id))

if (error.value?.statusCode === 404) {
  throw createError({ statusCode: 404, statusMessage: 'Game not found', fatal: true })
}

useHead({ title: () => game.value?.title ?? 'Game details' })

function goBack(event: MouseEvent) {
  if (window.history.state?.back) {
    event.preventDefault()
    router.back()
  }
}
</script>

<template>
  <div>
    <NuxtLink to="/" class="back-button" @click="goBack">Go to All Games</NuxtLink>

    <p v-if="status === 'pending'" role="status">Loading game...</p>
    <ErrorState v-else-if="error || !game" @retry="refresh()" />

    <article v-else>
      <h1 class="title">{{ game.title }}</h1>
      <p class="rating">{{ formatRating(game.rating) }}</p>

      <div class="overview">
        <BaseImage class="overview__image" :src="game.featuredImage" :width="1280" :height="720" eager />
        <GameInfo :game="game" />
      </div>

      <ReviewList :reviews="game.reviews" />
    </article>
  </div>
</template>

<style lang="scss" scoped>
.back-button {
  display: inline-block;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.title {
  margin: 0;
}

.rating {
  margin: 0.25rem 0 1.5rem;
  font-weight: 700;
  color: $color-rating;
}

.overview {
  display: grid;
  gap: 1.5rem;

  @media (min-width: $breakpoint-desktop) {
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    align-items: start;
  }

  &__image {
    border-radius: $radius;
  }
}
</style>
