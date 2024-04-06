<template>
  <header class="sticky top-0 left-0 z-10 flex flex-row justify-between bg-gray-600 p-4">
    <NuxtLink to="/">
      gamEDwork
    </NuxtLink>

    <slot />

    <div class="flex flex-row gap-2">
      <span @click="isAuthModalOpened = !isAuthModalOpened">Account</span>
      <AuthorizationModal v-if="isAuthModalOpened" />
    </div>
  </header>
</template>

<script setup lang="ts">
const isAuthModalOpened = ref(false)
</script>

<style scoped>

</style>
