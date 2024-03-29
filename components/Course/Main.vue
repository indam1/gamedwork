<template>
  <div class="flex flex-col items-center h-full">
    <main class="flex flex-col items-center container mx-auto px-24 py-8 gap-4 whitespace-pre-line">
      <slot name="content" />
      <button
        class="bg-green-400 p-2 rounded-2xl"
        @click="$emit('complete')"
      >
        Complete
      </button>
    </main>

    <footer class="flex mt-auto flex-col items-center border-t-2 border-gray-600 w-full bg-gray-300 h-[75%]">
      <span>Commentaries</span>
      <slot name="comment" />
    </footer>
  </div>
</template>

<script setup lang="ts">
defineEmits(['complete'])
</script>

<style scoped>

</style>
