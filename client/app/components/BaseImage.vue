<script setup lang="ts">
defineProps<{
  src: string | null
  width: number
  height: number
  eager?: boolean
}>()

const failed = ref(false)
const image = ref<HTMLImageElement>()

onMounted(() => {
  if (image.value?.complete && image.value.naturalWidth === 0) failed.value = true
})
</script>

<template>
  <div v-if="!src || failed" class="base-image base-image--fallback" aria-hidden="true">No image available</div>
  <img
    v-else
    ref="image"
    class="base-image"
    :src="src"
    alt=""
    :width="width"
    :height="height"
    :loading="eager ? 'eager' : 'lazy'"
    @error="failed = true"
  />
</template>

<style lang="scss" scoped>
.base-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background: $color-border;

  &--fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: $color-muted;
  }
}
</style>
