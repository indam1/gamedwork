type Id = string | number

export function buildCourseLink(courseId?: Id, lessonId?: Id, stepId?: Id) {
    if (!courseId) {
        return '/courses'
    }

    if (!lessonId || !stepId) {
        return `/courses/${courseId}`
    }

    return `/courses/${courseId}/lesson-${lessonId}-${stepId}`
}
