<template>
  <div class="grid grid-cols-2 gap-12">
    <div>My courses</div>
    <h1>Create course</h1>
    <ul class="flex flex-col gap-4">
      <li
        v-for="course in courses.courses"
        :key="course.id"
        @click="edit(course.link_id ?? course.id)"
      >
        {{ course.name }}
      </li>
    </ul>
    <form
      class="grid gap-2"
      @submit.prevent
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
        @click="create"
      >
        Create new
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const { fetchAllUserCourses, createCourse } = useSupabaseFetching()
const { data: courses, refresh } = await useLazyAsyncData(
    `courses-create`,
    async () => fetchAllUserCourses(),
    {
      default: () => ({}),
      getCachedData: key => tempCachedData(key, 60),
      transform: input => ({ ...input, fetchedAt: new Date() }),
    }
)

const pending = ref(false);
const courseName = ref('');
const courseLink = ref('');
const create = async () => {
  let courseId;
  try {
    pending.value = true;
    const data = await createCourse(courseName.value, courseLink.value);
    courseId = data.courseId;
    // Refresh courses on return back after navigation because of tempCachedData
    refresh().then(console.error);
  } finally {
    pending.value = false;
  }

  if (!courseId) {
    return;
  }
  return navigateTo(`/create/${courseId}`)
}

const edit = (courseId: number) => {
  return navigateTo(`/create/${courseId}`)
}
</script>
