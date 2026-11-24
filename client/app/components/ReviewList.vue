<script setup lang="ts">
import type { Review } from '~/types/game'

defineProps<{ reviews: Review[] }>()
</script>

<template>
  <section>
    <h2>Reviews ({{ reviews.length }})</h2>
    <ul v-if="reviews.length" class="reviews">
      <li v-for="review in reviews" :key="review.id" class="review">
        <p>
          <strong>{{ review.username }}</strong> · {{ review.rating.toFixed(1) }}/10
        </p>
        <p>{{ review.text || 'No written review.' }}</p>
      </li>
    </ul>
    <p v-else>No reviews yet.</p>
  </section>
</template>

<style lang="scss" scoped>
.reviews {
  display: grid;
  gap: 1rem;
  padding: 0;
  list-style: none;
}

.review {
  @include card;

  padding: 1rem;

  p {
    margin: 0;
  }

  p + p {
    margin-top: 0.5rem;
  }
}
</style>
