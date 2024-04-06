import type {Tables} from "~/utils/supabase";

export type AllCourseData = {
    course: Tables<'course'>,
    modules: Tables<'module'>[],
    lessons: Tables<'lesson'>[],
    steps: Tables<'step'>[],
    completedSteps: number[],
}

export function buildCourseLink(courseId?: number | string, lessonId?: number, stepId?: number) {
    if (!courseId) {
        return '/courses'
    }

    if (!lessonId || !stepId) {
        return `/courses/${courseId}`
    }

    return `/courses/${courseId}/lesson-${lessonId}-${stepId}`
}
