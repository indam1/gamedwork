<template>
  <div class="flex flex-row w-full py-16">
    <div class="flex flex-col w-full gap-4">
      <SlickList
        v-model:list="sortedModules"
        use-drag-handle
        class="px-8 w-full flex flex-col gap-4"
        axis="y"
        lock-axis="y"
        :lock-to-container-edges="true"
        :lock-offset="0"
        :distance="1"
        @update:list="updateModules<Tables<'module'>>"
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
              <div v-show="!isEditModuleMode(module.id)">
                <span class="text-gray-800 font-bold mr-2">{{ i + 1 }}.</span>
                <span>{{ module.name }}</span>
              </div>
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
              {{ !moduleLessons[module.id]?.length ? 'No lessons' : 'Show Lessons' }}
            </button>
            <DragHandle class="bg-gray-100 p-1 ml-2 rounded-xl text-sm">
              Drag me
            </DragHandle>
          </div>
          <!-- Lack of distance breaks update -->
          <SlickList
            v-if="moduleLessons[module.id]"
            v-show="isOpenedModule(module.id)"
            v-model:list="moduleLessons[module.id]"
            class="pl-8"
            axis="y"
            lock-axis="y"
            :distance="1"
            group="module"
            use-drag-handle
            @update:list="updateLessons<Tables<'lesson'>>"
            @sort-end="disableChangeLessons"
          >
            <SlickItem
              v-for="(lesson, i2) in moduleLessons[module.id]"
              :key="lesson.id"
              :disabled="pendingChange"
              :index="i2"
              class="select-none"
            >
              <div class="bg-gray-200 border-[1px] p-1 border-gray-400 flex flex-row items-center">
                <div>
                  <div v-show="!isEditLessonMode(lesson.id)">
                    <span class="text-gray-800 font-bold mr-2">{{ i + 1 }}.{{ i2 + 1 }}</span>
                    <span>{{ lesson.name }}</span>
                  </div>
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
          </SlickList>
          <div
            v-show="isOpenedModule(module.id)"
            class="ml-8 bg-gray-200 border-[1px] p-1 border-gray-400 z-100 flex flex-row items-center"
          >
            <button
              class="bg-gray-100 p-1 rounded-xl text-sm"
              @click.prevent="createNewLesson(module.id)"
            >
              Create new lesson
            </button>
          </div>
        </SlickItem>
      </SlickList>
      <div class="mx-8 px-8 bg-blue-200 border-[1px] py-1 border-gray-400 z-100 flex flex-row items-center">
        <button
          class="bg-gray-100 p-1 rounded-xl text-sm"
          @click.prevent="createNewModule"
        >
          Create new module
        </button>
      </div>
    </div>
    <div
      v-show="pendingChange"
      class="fixed"
    >
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { SlickList, SlickItem, DragHandle } from 'vue-slicksort';
import type {AllCourseData} from "~/utils/course";
import type {Tables} from "~/utils/supabase";

definePageMeta({
  middleware: 'course-create',
})

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
const { data } = await useLazyAsyncData<AllCourseData>(
    `courses-create-${route.params.id}`,
    async () => fetchAllCourseData(route.params.id),
    {
      default: () => null,
      getCachedData: key => tempCachedData(key, 15),
      transform: input => ({ ...input, fetchedAt: new Date() }),
    }
)

const { sortedModules, course, moduleLessons } = useCourseData(data);

function useCreateModule() {
  const pending = ref(false);

  const create = async () => {
    if (!course.value?.id) {
      throw new Error('Course not found');
    }
    pending.value = true
    const { module } = await createModule(course.value.id, sortedModules.value.length);
    data.value?.modules.push(module);
    pending.value = false
  }

  return { pending, create };
}

function useCreateLesson() {
  const pending = ref(false);

  const create = async (moduleId: number) => {
    pending.value = true;
    const { lesson } = await createLesson(moduleId, moduleLessons.value[moduleId]?.length ?? 0);
    data.value?.lessons.push(lesson);
    pending.value = false;
  }

  return { pending, create };
}

function useEditLesson() {
  const { updateLessonName } = useSupabaseFetching();

  const pending = ref(false);

  const edit = async (moduleId: number, lessonIndex: number) => {
    const lessonFromSorted = moduleLessons.value[moduleId][lessonIndex];
    const lesson = data.value?.lessons.find(item => item.id === lessonFromSorted.id);
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    const currentInput = inputLesson.value?.find(item => +item.dataset.lessonId === lesson.id);
    if (!currentInput) {
      throw new Error('Input not found');
    }

    const { value } = currentInput;
    pending.value = true;
    await updateLessonName(lesson.id, value);
    lesson.name = value;
    toggleEditLessonMode(lesson.id);
    pending.value = false;
  }

  return { edit, pending };
}

function useEditModule() {
  const { updateModuleName } = useSupabaseFetching();

  const pending = ref(false);

  const edit = async (moduleIndex: number) => {
    const moduleFromSorted = sortedModules.value[moduleIndex];
    const module = data.value?.modules.find(item => item.id === moduleFromSorted.id);
    if (!module) {
      throw new Error('Module not found');
    }
    // const module = sortedModules.value[moduleIndex];
    const currentInput = inputModule.value?.find(item => +item.dataset.moduleId === module.id);
    if (!currentInput) {
      throw new Error('Input not found');
    }

    const { value } = currentInput;
    pending.value = true;
    await updateModuleName(module.id, value);
    module.name = value;
    toggleEditModuleMode(module.id);
    pending.value = false;
  }

  return { edit, pending };
}

function useDragSort (updateFunction: any) {
  const pending = ref(false);

  const disable = () => {
    pending.value = true;
  }

  // ToDo create a single query with "when case" (can supabase do it?)
  const update = async <T extends Tables<'lesson' | 'module'>> (arr: T[]) => {
    pending.value = true;
    const promises: Array<Promise<boolean>> = [];
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
