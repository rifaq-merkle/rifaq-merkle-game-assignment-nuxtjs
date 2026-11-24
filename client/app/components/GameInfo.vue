<script setup lang="ts">
import type { GameDetail } from '~/types/game'
import { formatReleaseDate } from '~/utils/date'

defineProps<{ game: GameDetail }>()
</script>

<template>
  <section class="game-info">
    <h2>About this game</h2>
    <p>{{ game.description || 'No description available.' }}</p>
    <dl>
      <dt>Release date</dt>
      <dd>
        <time v-if="game.releaseDate" :datetime="game.releaseDate">{{ formatReleaseDate(game.releaseDate) }}</time>
        <span v-else>Unknown</span>
      </dd>
      <dt>Developer</dt>
      <dd>{{ game.developer ?? 'Unknown' }}</dd>
      <dt>Publisher</dt>
      <dd>{{ game.publisher ?? 'Unknown' }}</dd>
      <dt>Platform</dt>
      <dd>{{ game.platform ?? 'Unknown' }}</dd>
      <dt>Genre</dt>
      <dd>{{ game.genre ?? 'Unknown' }}</dd>
    </dl>
  </section>
</template>

<style lang="scss" scoped>
.game-info {
  @include card;

  padding: 1.25rem;

  h2 {
    margin-top: 0;
    font-size: 1.125rem;
  }

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem 1rem;
    margin: 0;
  }

  dt {
    font-weight: 700;
    color: $color-muted;
  }

  dd {
    margin: 0;
  }
}
</style>
