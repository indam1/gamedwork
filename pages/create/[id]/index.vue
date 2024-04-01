<template>
  <div class="flex flex-row w-full py-16">
    <SlickList
      v-model:list="sortedModules"
      use-drag-handle
      class="px-8 w-full"
      axis="y"
      lock-axis="y"
      :lock-to-container-edges="true"
      :lock-offset="0"
      :distance="1"
      @update:list="updateModules"
      @sort-end="disableChangeModules"
    >
      <SlickItem
        v-for="(module, i) in sortedModules"
        :key="module.id"
        :index="i"
        :disabled="pendingChange"
        class="select-none"
      >
        <div class="bg-blue-200 border-[1px] p-1 border-gray-400 z-100 flex flex-row items-center">
          <div>
            <span v-show="!isEditModuleMode(module.id)">{{ module.name }}</span>
            <input
              v-if="isEditModuleMode(module.id)"
              ref="inputModule"
              :disabled="pendingChange"
              :data-module-id="module.id"
              class="bg-blue-200 border-[1px] border-gray-400"
              :value="module.name"
              @input.prevent
            >
          </div>
          <button
            :disabled="pendingChange"
            class="bg-gray-100 p-1 rounded-xl ml-2 text-sm"
            @click.prevent="toggleEditModuleMode(module.id)"
          >
            Edit
          </button>
          <button
            v-show="isEditModuleMode(module.id)"
            :disabled="pendingChange"
            class="bg-gray-100 p-1 rounded-xl ml-2 text-sm"
            @click="editModuleName(i)"
          >
            Save
          </button>
          <button
            :disabled="pendingChange"
            class="bg-gray-100 p-1 rounded-xl ml-auto text-sm"
            @click.prevent="toggleModule(module.id)"
          >
            {{ !sortedLessons[module.id]?.length ? 'No lessons' : 'Show Lessons' }}
          </button>
          <DragHandle class="bg-gray-100 p-1 ml-2 rounded-xl text-sm">
            Drag me
          </DragHandle>
        </div>
        <!-- Lack of distance breaks update -->
        <SlickList
          v-show="isOpenedModule(module.id)"
          v-model:list="sortedLessons[module.id]"
          class="pl-8"
          axis="y"
          lock-axis="y"
          :distance="1"
          group="module"
          use-drag-handle
          @update:list="updateLessons"
          @sort-end="disableChangeLessons"
        >
          <SlickItem
            v-for="(lesson, i2) in sortedLessons[module.id]"
            :key="lesson.id"
            :disabled="pendingChange"
            :index="i2"
          >
            <div class="bg-gray-200 border-[1px] p-1 border-gray-400 select-none flex flex-row items-center">
              <div>
                <span v-show="!isEditLessonMode(lesson.id)">{{ lesson.name }}</span>
                <input
                  v-if="isEditLessonMode(lesson.id)"
                  ref="inputLesson"
                  :disabled="pendingChange"
                  :data-lesson-id="lesson.id"
                  class="bg-gray-200 border-[1px] border-gray-400"
                  :value="lesson.name"
                  @input.prevent
                >
              </div>
              <button
                :disabled="pendingChange"
                class="bg-gray-100 p-1 rounded-xl ml-2 text-sm"
                @click.prevent="toggleEditLessonMode(lesson.id)"
              >
                Edit
              </button>
              <button
                v-show="isEditLessonMode(lesson.id)"
                :disabled="pendingChange"
                class="bg-gray-100 p-1 rounded-xl ml-2 text-sm"
                @click="editLessonName(module.id, i2)"
              >
                Save
              </button>
              <DragHandle class="bg-gray-100 p-1 rounded-xl text-sm ml-auto">
                Drag me
              </DragHandle>
            </div>
          </SlickItem>
          <SlickItem
            :disabled="true"
            :index="sortedLessons[module.id].length"
          >
            <div class="bg-gray-200 border-[1px] p-1 border-gray-400 z-100 flex flex-row items-center">
              <button
                class="bg-gray-100 p-1 rounded-xl text-sm"
                @click.prevent="createNewLesson(module.id)"
              >
                Create new lesson
              </button>
            </div>
          </SlickItem>
        </SlickList>
      </SlickItem>
      <SlickItem
        v-show="!pending"
        :disabled="true"
        :index="sortedModules.length"
      >
        <div class="bg-blue-200 border-[1px] p-1 border-gray-400 z-100 flex flex-row items-center">
          <button
            class="bg-gray-100 p-1 rounded-xl text-sm"
            @click.prevent="createNewModule"
          >
            Create new module
          </button>
        </div>
      </SlickItem>
    </SlickList>
    <div v-show="pendingChange">
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { SlickList, SlickItem, DragHandle } from 'vue-slicksort';
const courseStore = useCourseStore();

const inputLesson = ref<HTMLInputElement[]>([]);
const inputModule = ref<HTMLInputElement[]>([]);
const { interact: toggleModule, isActive: isOpenedModule } = useActiveItems();
const { interact: toggleEditModuleMode, isActive: isEditModuleMode } = useActiveItem();
const { interact: toggleEditLessonMode, isActive: isEditLessonMode } = useActiveItem();
const { pending: pendingEditLesson, edit: editLessonName } = useEditLesson();
const { pending: pendingEditModule, edit: editModuleName } = useEditModule();
const { fetchAllCourseData, updateModuleOrder, updateLessonOrder, createModule, createLesson } = useSupabaseFetching();
const { pending: pendingCreateModule, create: createNewModule } = useCreateModule();
const { pending: pendingCreateLesson, create: createNewLesson } = useCreateLesson();
const { update: updateModules, disable: disableChangeModules, pending: pendingModulesOrder } = useDragSort(updateModuleOrder);
const { update: updateLessons, disable: disableChangeLessons, pending: pendingLessonsOrder } = useDragSort(updateLessonOrder);
const pendingChange = computed(() =>
    pendingModulesOrder.value
    || pendingLessonsOrder.value
    || pendingEditModule.value
    || pendingCreateModule.value
    || pendingCreateLesson.value
    || pendingEditLesson.value
);

const route = useRoute();
const sortedModules = ref([]);
const sortedLessons = ref({});
const { data, pending } = await useLazyAsyncData(
    `courses-edit-${route.params.id}`,
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
    sortedModules.value = courseStore.sortedModules;
    sortedModules.value.forEach(module => {
      sortedLessons.value[module.id] = courseStore.courseLessons.filter(lesson => lesson.module_id === module.id).toSorted((a, b) => a.list_order - b.list_order)
    })
  }
}, { immediate: true })

function useCreateModule() {
  const { currentCourse } = courseStore;
  const pending = ref(false);

  const create = async () => {
    pending.value = true
    const { module } = await createModule(currentCourse.id, sortedModules.value.length);
    sortedModules.value.push(module);
    sortedLessons.value[module.id] = [];
    pending.value = false
  }

  return { pending, create };
}

function useCreateLesson() {
  const pending = ref(false);

  const create = async (moduleId) => {
    pending.value = true;
    const { lesson } = await createLesson(moduleId, sortedLessons.value[moduleId].length);
    sortedLessons.value[moduleId].push(lesson);
    pending.value = false;
  }

  return { pending, create };
}

function useEditLesson() {
  const { updateLessonName } = useSupabaseFetching();

  const pending = ref(false);

  const edit = async (moduleId, lessonIndex) => {
    const lesson = sortedLessons.value[moduleId][lessonIndex];
    const currentInput = inputLesson.value?.find(item => +item.dataset.lessonId === lesson.id);
    const { value } = currentInput;
    pending.value = true;
    await updateLessonName(lesson.id, value);
    sortedLessons.value[moduleId][lessonIndex] = { ...sortedLessons.value[moduleId][lessonIndex], name: value };
    toggleEditLessonMode(lesson.id);
    pending.value = false;
  }

  return { edit, pending };
}

function useEditModule() {
  const { updateModuleName } = useSupabaseFetching();

  const pending = ref(false);

  const edit = async (moduleIndex) => {
    const module = sortedModules.value[moduleIndex];
    const currentInput = inputModule.value?.find(item => +item.dataset.moduleId === module.id);
    const { value } = currentInput;
    pending.value = true;
    await updateModuleName(module.id, value);
    sortedModules.value[moduleIndex] = { ...sortedModules.value[moduleIndex], name: value };
    toggleEditModuleMode(module.id);
    pending.value = false;
  }

  return { edit, pending };
}

function useActiveItem() {
  const openedItem = ref(null);

  const isActive = (itemId) => {
    return openedItem.value === itemId;
  }

  const interact = (itemId) => {
    openedItem.value = openedItem.value === itemId ? null : itemId;
  }

  return { interact, isActive };
}

function useActiveItems() {
  const openedItems = reactive(new Set())

  const isActive = (itemId) => {
    return openedItems.has(itemId);
  }

  const interact = (itemId) => {
    if (openedItems.has(itemId)) {
      openedItems.delete(itemId);
      return;
    }

    openedItems.add(itemId);
  }

  return { interact, isActive };
}

function useDragSort (updateFunction: any) {
  const pending = ref(false);

  const disable = () => {
    pending.value = true;
  }

  // ToDo create a single query with "when case" (can supabase do it?)
  const update = async (arr) => {
    pending.value = true;
    const promises = [];
    arr.forEach((item, index) => {
      if (index === item.list_order) {
        return;
      }

      item.list_order = index;
      promises.push(updateFunction(item.id, index));
    });

    await Promise.all(promises);
    pending.value = false;
  }

  return { update, disable, pending };
}
</script>
