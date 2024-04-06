<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 left-0 flex flex-row justify-between bg-indigo-900 p-8 text-white">
      <NuxtLink to="/">
        Your App Name
      </NuxtLink>

      <nav class="flex flex-row gap-12">
        <NuxtLink
          v-for="linkInfo in headerLinks"
          :key="linkInfo.id"
          :to="linkInfo.link"
        >
          {{ linkInfo.title }}
        </NuxtLink>
      </nav>

      <div class="flex flex-row gap-2">
        <span @click="isAuthModalOpened = !isAuthModalOpened">Account</span>
        <AuthorizationModal v-if="isAuthModalOpened" />
      </div>
    </header>

    <main class="container mx-auto flex grow">
      <slot />
    </main>

    <footer class="bg-indigo-900 p-8 text-white flex flex-row justify-between">
      <p>© All rights reserved. Made by Andrei Usanov.</p>

      <nav class="flex flex-row gap-12">
        <NuxtLink
          v-for="linkInfo in footerLinks"
          :key="linkInfo.id"
          :to="linkInfo.link"
        >
          {{ linkInfo.title }}
        </NuxtLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
const isAuthModalOpened = ref(false)

const headerLinks = [
    {
      id: 1,
      title: 'Create Course',
      link: '/create',
    },
    {
      id: 2,
      title: 'Courses',
      link: '/courses',
    },
    {
      id: 3,
      title: 'Topics',
      link: '/topics',
    }
]

const footerLinks = [
  {
    id: 1,
    title: 'Github',
    link: '/create',
  },
  {
    id: 2,
    title: 'LinkedIn',
    link: '/courses',
  },
  {
    id: 3,
    title: 'Telegram',
    link: '/topics',
  }

]
</script>
