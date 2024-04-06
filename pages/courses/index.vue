<template>
  <div>
    <h1>Courses</h1>

    <div class="grid grid-cols-4 grid-rows-2 gap-16">
      <div v-if="pending">
        Loading...
      </div>
      <UCard
        v-for="course in data.courses"
        v-else
        :key="course.id"
        class="bg-gray-100 min-h-52 rounded-2xl flex flex-col justify-between items-center p-8 shadow-2xl"
        @click="navigateTo(`/courses/${course.link_id ?? course.id}`)"
      >
        <template #header />
        <template #default>
          {{ course.name }}
        </template>
        <template #footer>
          {{ course.description }}
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchCourses } = useSupabaseFetching()

const { data, pending } = await useLazyAsyncData(
  'courses',
  async () => fetchCourses(),
  {
    getCachedData: key => tempCachedData(key, 120),
    transform: input => ({ ...input, fetchedAt: new Date() }),
  },
)
</script>

<style scoped>

</style>
