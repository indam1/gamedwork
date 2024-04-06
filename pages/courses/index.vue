<template>
  <div class="flex flex-col py-12 items-center w-full gap-12">
    <h1 class="font-bold text-4xl">
      All Courses
    </h1>

    <div class="grid grid-cols-4 grid-rows-2 gap-16 w-full">
      <UCard
        v-for="course in courses"
        :key="course.id"
        class="bg-gray-100 hover:scale-105 transition duration-500 rounded-2xl flex flex-col justify-between items-center p-8 shadow-2xl cursor-pointer"
        @click="navigateTo(`/courses/${course.link_id ?? course.id}`)"
      >
        <template #header>
          <!-- ToDo Use CDN-->
          <NuxtImg
            src="/vue-logo.png"
            alt="Course logo"
            format="webp"
            width="72"
            height="64"
          />
        </template>
        <template #default>
          <template v-if="pending">
            <USkeleton
              class="h-8 w-[250px]"
              :ui="{ background: 'bg-gray-400' }"
            />
          </template>
          <p
            v-else
            class="h-8"
          >
            {{ course.name }}
          </p>
        </template>
        <template #footer>
          <div
            v-if="pending"
            class="flex flex-col gap-[11px]"
          >
            <USkeleton
              v-for="i in 4"
              :key="i"
              class="h-4 w-[250px]"
              :ui="{ background: 'bg-gray-400' }"
            />
          </div>
          <p
            v-else
            class="h-[96px] line-clamp-4"
          >
            {{ course.description }}
          </p>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchCourses } = useSupabaseFetching()

const amount = 8
const { data, pending: pendingData } = await useLazyAsyncData(
  'courses',
  async () => fetchCourses(amount),
  {
    getCachedData: key => tempCachedData(key, 120),
    transform: input => ({ ...input, fetchedAt: new Date() }),
  },
)

const pending = computed(() => pendingData.value || !data.value?.courses?.length)
const courses = computed(() => pending.value
    ? Array.from({ length: amount }).map((_, i) => ({ id: i }))
    : data.value.courses
)
</script>
