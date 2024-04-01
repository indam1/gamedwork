<template>
  <div
    v-show="isShownSideBar || isTempShownSideBar"
    class="fixed flex flex-col h-full top-0 z-10 bg-gray-300 overflow-y-auto pt-16 pl-4 gap-4 w-[240px]"
    @mouseover="isTempShownSideBar = true"
    @mouseleave="isTempShownSideBar = false"
  >
    <button
      class="bg-green-400"
      @click="isShownSideBar = !isShownSideBar"
    >
      Pin
    </button>

    <slot />
  </div>
  <div
    v-show="!isShownSideBar && !isTempShownSideBar"
    class="fixed h-full top-0 z-10 bg-gray-100 flex items-center justify-center"
    @mouseover="isTempShownSideBar = true"
  >
    <span class="-rotate-90">Content</span>
  </div>
</template>

<script setup lang="ts">
const isShownSideBar = ref(true);
const isTempShownSideBar = ref(false);
</script>
