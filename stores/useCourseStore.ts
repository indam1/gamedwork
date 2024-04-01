export const useCourseStore = defineStore('course-store', () => {
    // ToDo organize data fetching and transforming for performance. Probably delete store and make only composable
    const currentCourse = ref();
    const currentLessonId = ref();
    const currentStepId = ref();

    const completedSteps = ref([]);

    const courseModules = ref([]);
    const courseLessons = ref([]);
    const courseSteps = ref([]);

    const currentCourseId = computed(() => currentCourse.value ? currentCourse.value.link_id ?? currentCourse.value.id : '')
    const currentCourseName = computed(() => currentCourse.value ? currentCourse.value.name : '')

    const currentModuleId = computed(() => courseLessons.value.find(item => item.id === currentLessonId.value)?.module_id ?? '')
    const sortedModules = computed(() => courseModules.value.toSorted((a, b) => a.list_order - b.list_order))

    const currentLessons = computed(() => courseLessons.value.filter(item => item.module_id === currentModuleId.value));
    const sortedLessons = computed(() => currentLessons.value.toSorted((a, b) => a.list_order - b.list_order))

    const currentSteps = computed(() => courseSteps.value.filter(item => item.lesson_id === currentLessonId.value));
    const sortedSteps = computed(() => currentSteps.value.toSorted((a, b) => a.list_order - b.list_order))

    const generateRandomLessonStepCombination = () => {
        if (!courseLessons.value.length) {
            return null;
        }

        const lessonId = courseLessons.value[0].id;
        return { lessonId, stepId: courseSteps.value.find(item => item.lesson_id === lessonId).id }
    }

    const currentPath = computed(() => {
        if (!currentLessonId.value || !currentStepId.value) {
            return '';
        }

        return `lesson-${currentLessonId.value}-${currentStepId.value}`
    })

    function changePath(lesson: string | number, step: string | number) {
        currentLessonId.value = parseInt(lesson, 10);
        currentStepId.value = parseInt(step, 10);
    }

    // ToDo do we need store for pages?
    function patchCourse(data: { lessons?: any[], modules?: any[], steps?: any[], course?: any, completedSteps?: any[] }) {
        if (data.course) {
            currentCourse.value = data.course;
        }

        if (data.lessons) {
            courseLessons.value = data.lessons;
        }

        if (data.modules) {
            courseModules.value = data.modules;
        }

        if (data.steps) {
            courseSteps.value = data.steps;
        }

        if (data.completedSteps) {
            completedSteps.value = data.completedSteps;
        }
    }

    function $reset() {
        currentCourse.value = null;
        courseModules.value = [];
        courseLessons.value = [];
        courseSteps.value = [];
        completedSteps.value = [];
    }

    function getNextElement(currentId: number, sortedElements: unknown[]) {
        const currentIndex = sortedElements.findIndex(item => item.id === currentId)
        return sortedElements[currentIndex + 1]
    }

    function getNextStep() {
        if (!currentStepId.value || !currentLessonId.value) {
            throw new Error('No current step');
        }

        let nextLessonId = currentLessonId.value
        let nextStep = getNextElement(currentStepId.value, sortedSteps.value);
        // ToDo extract without nested if
        if (!nextStep) {
            const nextLesson = getNextElement(currentLessonId.value, sortedLessons.value);
            if (!nextLesson) {
                const nextModule = getNextElement(currentModuleId.value, sortedModules.value);
                if (!nextModule) {
                    // ToDo handle end
                    throw new Error('No next module');
                }

                nextLessonId = courseLessons.value.find(item => item.module_id === nextModule.id && item.list_order === 0).id
            } else {
                nextLessonId = nextLesson.id
            }

            nextStep = courseSteps.value.find(item => item.lesson_id === nextLessonId && item.list_order === 0)
        }

        return { lessonId: nextLessonId, stepId: nextStep.id }
    }

    return {
        currentPath,
        currentCourse,
        currentCourseName,
        currentLessonId,
        currentStepId,
        currentCourseId,
        sortedSteps,
        sortedModules,
        courseLessons,
        courseSteps,
        currentSteps,
        sortedLessons,
        completedSteps,
        generateRandomLessonStepCombination,
        changePath,
        patchCourse,
        getNextStep,
        $reset,
    }
})
