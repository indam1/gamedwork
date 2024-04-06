import type {Ref} from "vue";
import type {AllCourseData} from "~/utils/course";
import type {Tables} from "~/utils/supabase";

export default function (data: Ref<AllCourseData | null>) {
    const courseStore = useCourseStore();

    const course = computed(() => data.value?.course ?? null);
    const modules = computed(() => data.value?.modules ?? []);
    const lessons = computed(() => data.value?.lessons ?? []);
    const steps = computed(() => data.value?.steps ?? []);
    const completedSteps = computed(() => data.value?.completedSteps ?? []);

    const courseLinkId = computed(() => course.value ? (course.value.link_id ?? course.value.id) : '')
    const courseName = computed(() => course.value ? course.value.name : '')

    const currentModuleId = computed(() => lessons.value.find(item => item.id === courseStore.currentLessonId)?.module_id ?? null)
    const sortedModules = computed(() => modules.value.toSorted((a, b) => a.list_order - b.list_order))

    const moduleLessons = computed(() => {
        return lessons.value.reduce<Record<number, Tables<'lesson'>[]>>((acc, item) => {
            if (!item.module_id) {
                return acc;
            }

            if (!acc[item.module_id]) {
                acc[item.module_id] = [];
            }

            acc[item.module_id][item.list_order] = item;
            return acc;
        }, {})

    })

    const currentLessons = computed(() => lessons.value.filter(item => item.module_id === currentModuleId.value));
    const sortedLessons = computed(() => currentLessons.value.toSorted((a, b) => a.list_order - b.list_order))

    const currentSteps = computed(() => steps.value.filter(item => item.lesson_id === courseStore.currentLessonId));
    const sortedSteps = computed(() => currentSteps.value.toSorted((a, b) => a.list_order - b.list_order))

    const generateRandomLessonStepCombination = () => {
        if (!lessons.value.length) {
            throw new Error('No lessons');
        }

        const lesson = lessons.value[0];
        const step = steps.value.find(item => item.lesson_id === lesson.id);
        if (!step) {
            throw new Error('No step');
        }

        return { lessonId: lesson.id, stepId: step.id }
    }


    const getNextElement = <T extends Tables<'module' | 'lesson' | 'step'>>(currentId: number, sortedElements: T[]) => {
        const currentIndex = sortedElements.findIndex(item => item.id === currentId)
        return sortedElements[currentIndex + 1]
    }

    const getNextStep = () => {
        if (!courseStore.currentStepId || !courseStore.currentLessonId) {
            throw new Error('No current step');
        }

        if (!currentModuleId.value) {
            throw new Error('No current module');
        }

        let nextLessonId = courseStore.currentLessonId
        // ToDo extract without nested if
        let nextStep = getNextElement<Tables<'step'>>(courseStore.currentStepId, sortedSteps.value);
        if (!nextStep) {
            let nextLesson = getNextElement<Tables<'lesson'>>(courseStore.currentLessonId, sortedLessons.value);
            if (!nextLesson) {
                const nextModule = getNextElement<Tables<'module'>>(currentModuleId.value, sortedModules.value);
                if (!nextModule) {
                    // ToDo handle end
                    throw new Error('No next module');
                }

                const firstLesson = lessons.value.find(item => item.module_id === nextModule.id && item.list_order === 0);
                if (!firstLesson) {
                    // ToDo handle end
                    throw new Error('No next lesson');
                }
                nextLesson = firstLesson
            }

            const firstStep = steps.value.find(item => item.lesson_id === nextLesson.id && item.list_order === 0);
            if (!firstStep) {
                // ToDo handle end
                throw new Error('No next step');
            }

            nextStep = firstStep
            nextLessonId = nextLesson.id
        }

        return { lessonId: nextLessonId, stepId: nextStep.id }
    }

    return {
        course,
        lessons,
        modules,
        steps,
        completedSteps,
        courseLinkId,
        courseName,
        currentModuleId,
        sortedModules,
        currentLessons,
        sortedLessons,
        currentSteps,
        sortedSteps,
        moduleLessons,
        generateRandomLessonStepCombination,
        getNextStep,
    };
}
