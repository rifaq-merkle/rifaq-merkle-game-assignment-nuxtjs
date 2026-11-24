<script setup lang="ts">
import type { GameSummary } from '~/types/game'
import { formatReleaseDate } from '~/utils/date'
import { formatRating } from '~/utils/rating'

defineProps<{ game: GameSummary }>()
</script>

<template>
  <article class="game-card">
    <BaseImage :src="game.image" :width="640" :height="360" />
    <div class="game-card__body">
      <h2 class="game-card__title">
        <NuxtLink :to="`/games/${game.id}`">{{ game.title }}</NuxtLink>
      </h2>
      <p class="game-card__meta">
        <time v-if="game.releaseDate" :datetime="game.releaseDate">{{ formatReleaseDate(game.releaseDate) }}</time>
        <span v-else>Release date unknown</span>
        · {{ game.genre ?? 'Unknown genre' }}
      </p>
      <p class="game-card__rating">{{ formatRating(game.rating) }}</p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.game-card {
  @include card;

  position: relative;
  height: 100%;
  overflow: hidden;

  &:hover {
    border-color: $color-primary;
  }

  &:focus-within {
    outline: 3px solid $color-primary;
    outline-offset: 2px;
  }

  &__body {
    padding: 0.75rem 1rem 1rem;
  }

  &__title {
    margin: 0 0 0.25rem;
    font-size: 1rem;

    a {
      color: inherit;
      text-decoration: none;
      outline: none;

      &::after {
        position: absolute;
        inset: 0;
        content: '';
      }
    }
  }

  &__meta {
    margin: 0;
    font-size: 0.875rem;
    color: $color-muted;
  }

  &__rating {
    margin: 0.5rem 0 0;
    font-weight: 700;
    color: $color-rating;
  }
}
</style>
