<template>
  <div class="h-full">
    <CourseSideBar>
      <button
        class="bg-gray-200 rounded-3xl"
        @click="isOpenedChat = true"
      >
        Need help? Open chat and ask, somebody definitely can help you.
      </button>
      <WebSocketChatBox v-if="isOpenedChat" />
      <div>{{ courseStore.currentCourseName }}</div>
      <ol class="overflow-y-auto">
        <li
          v-for="module in courseStore.sortedModules"
          :key="module.id"
          class="mb-4"
        >
          {{ module.name }}
          <ol class="list-inside list-decimal">
            <li
              v-for="lesson in courseStore.courseLessons.filter(item => item.module_id === module.id).sort((a, b) => a.list_order - b.list_order)"
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
          v-for="step in courseStore.sortedSteps"
          :key="step.id"
          class="bg-gray-100"
          :class="stepStyleColor(step.id)"
          :to="buildCourseLink(courseStore.currentCourseId, courseStore.currentLessonId, step.id)"
        >
          {{ step.id }}
        </NuxtLink>
      </nav>
    </CourseHeader>

    <CourseMain @complete="clickComplete">
      <template #content>
        {{ contentPending ? 'Loading...' : content.text }}
      </template>
      <template #comment>
        ToDo components with some comments
      </template>
    </CourseMain>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'process',
  middleware: 'course-process',
})

const isOpenedChat = ref(false)
const route = useRoute()
const courseStore = useCourseStore()

const { fetchAllCourseData, completeStep } = useSupabaseFetching()
const { data: course, pending: coursePending } = await useLazyAsyncData(
    `courses-process-${route.params.id}`,
    async () => fetchAllCourseData(route.params.id),
    {
      default: () => ({}),
      getCachedData: key => tempCachedData(key, 60),
      transform: input => ({ ...input, fetchedAt: new Date() }),
    }
)

const { data: content, pending: contentPending } = await useLazyFetch(
    `/api/content`,
    {
      query: { lesson: route.params.lesson, step: route.params.step },
      default: () => ({}),
      getCachedData: key => tempCachedData(key, 120),
      transform: input => ({ ...input, fetchedAt: new Date() }),
    }
)

watch(coursePending, (val) => {
  if (!val) {
    courseStore.patchCourse(course.value);
  }
}, { immediate: true })

async function clickComplete() {
  const { lessonId, stepId } = courseStore.getNextStep();
  await completeStep(courseStore.currentStepId);
  courseStore.$patch((state) => state.completedSteps.push(courseStore.currentStepId));
  return navigateTo(buildCourseLink(courseStore.currentCourseId, lessonId, stepId))
}

function commonStyleColor(isCompleted: boolean, isCurrent: boolean) {
  if (isCompleted && isCurrent) {
    return 'bg-green-600';
  }

  if (isCompleted) {
    return 'bg-green-400';
  }

  if (isCurrent) {
    return 'bg-gray-400';
  }

  return '';
}

function lessonStyleColor(lessonId: string | number) {
  const isCompleted = courseStore.courseSteps.filter(item => item.lesson_id === lessonId).every(step => courseStore.completedSteps.includes(step.id));
  const isCurrent = courseStore.currentLessonId === lessonId;
  return commonStyleColor(isCompleted, isCurrent);
}

function stepStyleColor(stepId: string | number) {
  const isCompleted = courseStore.completedSteps.includes(stepId);
  const isCurrent = courseStore.currentStepId === stepId;
  return commonStyleColor(isCompleted, isCurrent);
}

function clickStep(lessonId: string | number) {
  return navigateTo(buildCourseLink(courseStore.currentCourseId, lessonId, courseStore.courseSteps.find(item => item.lesson_id === lessonId)?.id))
}
</script>
