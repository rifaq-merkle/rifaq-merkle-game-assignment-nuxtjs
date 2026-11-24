<script setup lang="ts">
import type { SortKey } from '~/types/game'
import { sortGames } from '~/utils/sort'

useHead({ title: 'Merkle Games Assignment' })

const route = useRoute()
const router = useRouter()
const { data: games, status, error, refresh } = await useRandomGames()

const sortBy = computed<SortKey>({
  get: () => (route.query.sort === 'releaseDate' ? 'releaseDate' : 'rating'),
  set: value => router.replace({ query: value === 'rating' ? {} : { sort: value } }),
})

const sortedGames = computed(() => sortGames(games.value ?? [], sortBy.value))
</script>

<template>
  <div>
    <div class="header">
      <div>
        <h1>Merkle Games Assignment</h1>
        <p class="header__intro">15 random games released between 2015 and 2017.</p>
      </div>
      <SortSelect v-model="sortBy" />
    </div>

    <p v-if="status === 'pending'" role="status">Loading games...</p>
    <ErrorState v-else-if="error" @retry="refresh()" />
    <p v-else-if="!sortedGames.length">No games found for this period.</p>
    <ul v-else class="grid">
      <li v-for="game in sortedGames" :key="game.id">
        <GameCard :game="game" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;

  h1 {
    margin: 0;
  }

  &__intro {
    margin: 0.25rem 0 0;
    color: $color-muted;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
