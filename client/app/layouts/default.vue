<template>
  <div>
    <header class="header">
      <div class="container">
        <NuxtLink to="/" class="header__brand">Rifaq Merkle Games</NuxtLink>
      </div>
    </header>

    <main class="container main">
      <slot />
    </main>

    <footer class="container footer">
      <p>Game assignment developed by Rifaq</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 1rem 0;
  background: $color-surface;
  border-bottom: 1px solid $color-border;

  &__brand {
    font-size: 1.25rem;
    font-weight: 700;
    color: $color-text;
    text-decoration: none;
  }
}

.main {
  min-height: 70vh;
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.footer {
  font-size: 0.875rem;
  color: $color-muted;
}
</style>
