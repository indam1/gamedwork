<template>
  <div>
    <header class="sticky top-0 left-0 flex flex-row justify-between bg-indigo-900 p-8 text-white">
      <NuxtLink to="/">
        gamEDwork
      </NuxtLink>

      <nav class="flex flex-row gap-12">
        <NuxtLink to="/create">
          Create Course
        </NuxtLink>

        <NuxtLink to="/courses">
          Courses
        </NuxtLink>

        <NuxtLink to="/topics">
          Topics
        </NuxtLink>
      </nav>

      <div class="flex flex-row gap-2">
        <span @click="isAuthModalOpened = !isAuthModalOpened">Account</span>
        <AuthorizationModal v-if="isAuthModalOpened" />
      </div>
    </header>

    <main class="container mx-auto">
      <slot />
    </main>

    <footer />
  </div>
</template>

<script setup lang="ts">
const isAuthModalOpened = ref(false);
</script>
<style scoped>

</style>
