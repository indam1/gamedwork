<template>
  <div class="h-full">
    <CourseSideBar>
      <button
        class="bg-gray-200 rounded-3xl"
        @click="isOpenedChat = true"
      >
        Need help? Open chat and ask, somebody definitely can help you.
      </button>
      <AccompanimentChatBox v-if="isOpenedChat || route.query.help" />
      <div>{{ course ? course.course.name : 'Loading...' }}</div>
      <ol class="overflow-y-auto">
        <li
          v-for="module in sortedModules"
          :key="module.id"
          class="mb-4"
        >
          {{ module.name }}
          <ol class="list-inside list-decimal">
            <li
              v-for="lesson in lessons.filter(item => item.module_id === module.id).sort((a, b) => a.list_order - b.list_order)"
              :key="lesson.id"
              class="whitespace-nowrap text-ellipsis overflow-hidden hover:bg-green-100 cursor-pointer"
              :class="lessonStyleColor(lesson.id)"
              @click="clickStep(lesson.id)"
            >
              {{ lesson.name }}
            </li>
          </ol>
        </li>
      </ol>
    </CourseSideBar>

    <CourseHeader>
      <nav class="flex flex-row gap-12">
        <NuxtLink
          v-for="step in sortedSteps"
          :key="step.id"
          class="bg-gray-100"
          :class="stepStyleColor(step.id)"
          :to="buildCourseLink(courseLinkId, courseStore.currentLessonId, step.id)"
        >
          {{ step.id }}
        </NuxtLink>
      </nav>
    </CourseHeader>

    <CourseMain @complete="clickComplete">
      <template #content>
        {{ contentPending ? 'Loading...' : (content?.text ?? 'Content not found') }}
      </template>
      <template #comment>
        ToDo components with some comments
      </template>
    </CourseMain>
  </div>
</template>

<script setup lang="ts">
import type {AllCourseData} from '~/utils/course'

definePageMeta({
  layout: 'process',
  middleware: 'course-process',
})

const isOpenedChat = ref(false)
const route = useRoute()
const courseStore = useCourseStore()

const { fetchAllCourseData, completeStep } = useSupabaseFetching()

// ToDo probably not a good way to cache data
const { data: course } = await useLazyAsyncData<AllCourseData>(
    `courses-lesson-${route.params.id}`,
    async () => fetchAllCourseData(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id),
    {
      default: () => null,
      getCachedData: key => tempCachedData(key, 15),
      transform: input => ({ ...input, fetchedAt: new Date() }),
    }
)

const { getNextStep, completedSteps, steps, courseLinkId, sortedModules, lessons, sortedSteps } = useCourseData(course)

const { data: content, pending: contentPending } = await useLazyFetch(
    '/api/content',
    {
      query: { lesson: route.params.lesson, step: route.params.step },
      default: () => null,
    }
)

async function clickComplete() {
  const { lessonId, stepId } = getNextStep()
  const { currentStepId } = courseStore
  await completeStep(currentStepId)
  course.value?.completedSteps.push(currentStepId)
  return changeStep(lessonId, stepId)
}

function commonStyleColor(isCompleted: boolean, isCurrent: boolean) {
  if (isCompleted && isCurrent) {
    return 'bg-green-600'
  }

  if (isCompleted) {
    return 'bg-green-400'
  }

  if (isCurrent) {
    return 'bg-gray-400'
  }

  return ''
}

function lessonStyleColor(lessonId: number) {
  const isCompleted = steps.value.filter(item => item.lesson_id === lessonId).every(step => completedSteps.value.includes(step.id))
  const isCurrent = courseStore.currentLessonId === lessonId
  return commonStyleColor(isCompleted, isCurrent)
}

function stepStyleColor(stepId: number) {
  const isCompleted = completedSteps.value.includes(stepId)
  const isCurrent = courseStore.currentStepId === stepId
  return commonStyleColor(isCompleted, isCurrent)
}

function changeStep(lessonId: number, stepId: number) {
  return navigateTo(buildCourseLink(courseLinkId.value, lessonId, stepId), { replace: true })
}

function clickStep(lessonId: number) {
  const step = steps.value.find(item => item.lesson_id === lessonId)
  if (!step) {
    throw new Error('No step')
  }
  return changeStep(lessonId, step.id)
}
</script>
