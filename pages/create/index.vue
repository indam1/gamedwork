<template>
  <div class="flex flex-row p-12 justify-between w-full gap-12">
    <div class="flex flex-col gap-8 w-full">
      <p class="font-bold text-2xl">
        My courses
      </p>
      <ul class="flex flex-col gap-2 w-full">
        <li
          v-for="course in courses.courses"
          :key="course.id"
          class="bg-gray-100 rounded p-2 w-full hover:bg-green-100 cursor-pointer"
          @click="edit(course.link_id ?? course.id)"
        >
          {{ course.name }}
        </li>
      </ul>
    </div>
    <div>
      <p>Create new course</p>
      <form
        class="grid gap-2"
        @submit.prevent="create"
      >
        <label for="name">Name</label>
        <input
          id="name"
          v-model="courseName"
          placeholder="name"
          :disabled="pending"
        >
        <label for="link">Link</label>
        <input
          id="link"
          v-model="courseLink"
          placeholder="link"
          :disabled="pending"
        >
        <button
          class="bg-green-400"
          :disabled="pending"
        >
          Create new
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchAllUserCourses, createCourse } = useSupabaseFetching()
const { data: courses, refresh } = await useLazyAsyncData(
    'courses-create',
    async () => fetchAllUserCourses(),
    {
      default: () => ({}),
      getCachedData: key => tempCachedData(key, 60),
      transform: input => ({ ...input, fetchedAt: new Date() }),
    }
)

const pending = ref(false)
const courseName = ref('')
const courseLink = ref('')

const edit = (courseId: number | string) => {
  return navigateTo(`/create/${courseId}`)
}

const create = async () => {
  let courseId
  try {
    pending.value = true
    const data = await createCourse(courseName.value, courseLink.value)
    courseId = data.courseId
    if (!courseId) {
      throw new Error('Course not created')
    }

    // Refresh courses on return back after navigation because of tempCachedData
    refresh().then(console.error)
    return edit(courseId)

  } finally {
    pending.value = false
  }
}
</script>
