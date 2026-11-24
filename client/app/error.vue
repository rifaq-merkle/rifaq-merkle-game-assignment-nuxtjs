<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const title = props.error.statusCode === 404 ? 'Page not found' : 'Something went wrong'
useHead({ title })
</script>

<template>
  <NuxtLayout>
    <h1>{{ title }}</h1>
    <button type="button" @click="clearError({ redirect: '/' })">Go to All Games</button>
  </NuxtLayout>
</template>
