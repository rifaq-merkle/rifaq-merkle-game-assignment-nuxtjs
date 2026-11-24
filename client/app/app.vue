<script setup lang="ts">
useHead({
  titleTemplate: title => (title ? `${title} | Merkle Games` : 'Merkle Games'),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
