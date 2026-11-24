<script setup lang="ts">
import type { SortKey } from '~/types/game'

const sortBy = defineModel<SortKey>({ required: true })
</script>

<template>
  <div class="sort-select">
    <label for="sort-by">Sort by</label>
    <select id="sort-by" v-model="sortBy">
      <option value="rating">Average rating (highest first)</option>
      <option value="releaseDate">Release date (newest first)</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.sort-select {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;

  select {
    padding: 0.5rem;
    font: inherit;
    border-radius: $radius;
  }
}
</style>
