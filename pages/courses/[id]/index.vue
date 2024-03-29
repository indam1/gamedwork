<template>
  <div class="flex flex-row gap-12 p-12">
    <h1>{{ !courseLink ? 'Loading' : courseStore.currentCourseName }}</h1>
    <div v-if="courseLink">
      <h2>Program plan</h2>
      <ol class="list-decimal">
        <li
          v-for="module in courseStore.sortedModules"
          :key="module.id"
        >
          {{ module.name }}
          <ol class="list-inside list-decimal">
            <li
              v-for="lesson in courseStore.courseLessons.filter(item => item.module_id === module.id).sort((a, b) => a.list_order - b.list_order)"
              :key="lesson.id"
            >
              {{ lesson.name }}
            </li>
          </ol>
        </li>
      </ol>
    </div>
    <NuxtLink
      v-show="courseLink"
      class="bg-green-400 rounded-2xl p-4 h-12"
      :to="courseLink"
    >
      {{ 'Start' }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'course-page',
})

const route = useRoute()
const courseStore = useCourseStore()

useServerSeoMeta({
  title: courseStore.currentCourseName,
})

const { fetchAllCourseData } = useSupabaseFetching()
const { data, pending } = await useLazyAsyncData(
    `courses-${route.params.id}`,
    async () => fetchAllCourseData(route.params.id),
    {
      default: () => ({}),
      getCachedData: key => tempCachedData(key, 15),
      transform: input => ({ ...input, fetchedAt: new Date() }),
    }
)

watch(pending, (val) => {
  if (!val) {
    courseStore.patchCourse(data.value);
  }
}, { immediate: true })

const courseLink = computed(() => {
  const combination = courseStore.generateRandomLessonStepCombination();
  if (!combination) {
    return '';
  }
  const { lessonId, stepId } = combination;
  return buildCourseLink(courseStore.currentCourseId, lessonId, stepId);
})
</script>

<style scoped>

</style>
