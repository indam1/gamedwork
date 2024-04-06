<template>
  <div class="flex flex-row gap-12 p-12">
    <h1>{{ pending ? 'Loading' : courseName }}</h1>
    <div v-if="!pending">
      <h2>Program plan</h2>
      <ol class="list-decimal">
        <li
          v-for="module in sortedModules"
          :key="module.id"
        >
          {{ module.name }}
          <ol class="list-inside list-decimal">
            <li
              v-for="lesson in lessons.filter(item => item.module_id === module.id).sort((a, b) => a.list_order - b.list_order)"
              :key="lesson.id"
            >
              {{ lesson.name }}
            </li>
          </ol>
        </li>
      </ol>
    </div>
    <button
      v-if="!pending"
      class="bg-green-400 rounded-2xl p-4 h-12"
      @click="startCourse"
    >
      Start
    </button>
  </div>
</template>

<script setup lang="ts">
import type {AllCourseData} from "~/utils/course"

const route = useRoute()

const { fetchAllCourseData } = useSupabaseFetching()
const { data, pending } = await useLazyAsyncData<AllCourseData>(
    `courses-item-${route.params.id}`,
    async () => fetchAllCourseData(route.params.id),
    {
      default: () => null,
    }
)

const { generateRandomLessonStepCombination, courseLinkId, courseName, sortedModules, lessons } = useCourseData(data)

useServerSeoMeta({
  title: courseName.value,
})

function startCourse() {
  const combination = generateRandomLessonStepCombination()
  const { lessonId, stepId } = combination
  return navigateTo(buildCourseLink(courseLinkId.value, lessonId, stepId))
}
</script>
