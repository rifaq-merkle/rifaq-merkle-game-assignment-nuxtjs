<script setup lang="ts">
defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="error-state" role="alert">
    <p>Something went wrong while loading. Please try again.</p>
    <button type="button" @click="$emit('retry')">Try again</button>
  </div>
</template>

<style lang="scss" scoped>
.error-state {
  padding: 1rem 1.5rem 1.5rem;
  color: $color-danger;
  border: 1px solid $color-danger;
  border-radius: $radius;
}
</style>
