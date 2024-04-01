export default function () {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    const createCourse = async (name: string, link_id: string | null) => {
        const { data: course, error } = await supabase.from('course')
            .upsert({ name, user_id: user.value.id, link_id: link_id || null })
            .select('id, link_id')
            .limit(1)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return { courseId: course.link_id ?? course.id };
    }

    const fetchCourses = async () => {
        const { data: courses } = await supabase.from('course')
            .select('name, id, link_id')
            .limit(8);
        return { courses: courses ?? []};
    }

    const fetchCourseData = async (courseId) => {
        const { data: course } = await supabase.from('course')
            .select('name, id, link_id')
            .or(`id.eq.${courseId},link_id.eq.${courseId}`)
            .limit(1)
            .single();
        return course;
    }

    const fetchModulesByCourseId = async (courseId) => {
        const { data: modules } = await supabase.from('module')
            .select('name, id, name, course_id, list_order')
            .eq('course_id', courseId);
        return modules;
    }

    const fetchLessonsByModuleIds = async (moduleIds) => {
        const { data: lessons } = await supabase.from('lesson')
            .select('name, id, module_id, list_order')
            .in('module_id', moduleIds);
        return lessons;
    }

    const fetchStepsByLessonIds = async (lessonIds) => {
        const { data: steps } = await supabase.from('step')
            .select('name, id, lesson_id, list_order')
            .in('lesson_id', lessonIds);
        return steps;
    }

    const fetchCompletedSteps = async (stepIds) => {
        const { data: completedSteps } = await supabase.from('completed')
            .select('step_id')
            .eq('user_id', user.value.id)
            .in('step_id', stepIds);
        return completedSteps.map(item => item.step_id);
    }

    const stepInfoById = async (stepId) => {
        const { data: step } = await supabase.from('step')
            .select('lesson_id')
            .eq('id', stepId)
            .limit(1)
            .single();
        const { data: lesson } = await supabase.from('lesson')
            .select('module_id, id')
            .eq('id', step.lesson_id)
            .limit(1)
            .single();
        const { data: module } = await supabase.from('module')
            .select('course_id')
            .eq('id', lesson.module_id)
            .limit(1)
            .single();
        const { data: course } = await supabase.from('course')
            .select('link_id, id')
            .eq('id', module.course_id)
            .limit(1)
            .single();
        return { courseId: course.link_id ?? course.id, lessonId: lesson.id, stepId };
    }

    const completeStep = async (stepId) => {
        const { error } = await supabase.from('completed').upsert({
            step_id: stepId,
            user_id: user.value.id,
        });

        if (error) {
            throw new Error(error.message);
        }
    }

    // ToDo create a single db query with inner joins
    const fetchAllCourseData = async (courseId) => {
        const [course, modules] = await Promise.all([
            fetchCourseData(courseId),
            fetchModulesByCourseId(courseId),
        ])
        const lessons = await fetchLessonsByModuleIds(modules.map(item => item.id))
        const steps = await fetchStepsByLessonIds(lessons.map(item => item.id))
        const completedSteps = await fetchCompletedSteps(steps.map(item => item.id))
        return { course, modules, lessons, steps, completedSteps };
    }

    const fetchAllUserCourses = async () => {
        const { data: courses } = await supabase.from('course')
            .select('name, id, link_id')
            .eq('user_id', user.value.id)
        return { courses: courses ?? []};
    }

    const updateOrder = async (table, id, list_order) => {
        const { error } = await supabase.from(table)
            .update({ list_order })
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return true;
    }

    const updateModuleOrder = async (moduleId, list_order) => {
        return updateOrder('module', moduleId, list_order);
    }

    const updateLessonOrder = async (lessonId, list_order) => {
        return updateOrder('lesson', lessonId, list_order);
    }

    const editName = async (table, id, name) => {
        const { error } = await supabase.from(table)
            .update({ name })
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return true;
    }

    const updateModuleName = async (moduleId, name) => {
        return editName('module', moduleId, name);
    }

    const updateLessonName = async (lessonId, name) => {
        return editName('lesson', lessonId, name);
    }

    const createModule = async (courseId, list_order) => {
        const { error, data } = await supabase.from('module')
            .insert({ course_id: courseId, list_order, name: `Module ${list_order + 1}` })
            .select('name, id, course_id, list_order')
            .limit(1)
            .single();
        if (error) {
            throw new Error(error.message);
        }

        return { module: data };
    }

    const createLesson = async (moduleId, list_order) => {
        const { error, data } = await supabase.from('lesson')
            .insert({ module_id: moduleId, list_order, name: `Lesson ${list_order + 1}` })
            .select()
            .limit(1)
            .single();
        if (error) {
            throw new Error(error.message);
        }

        const { error: stepError } = await supabase.from('step')
            .insert({ lesson_id: data.id, name: 'Step 1', list_order: 0 })

        if (stepError) {
            throw new Error(stepError.message);
        }

        return { lesson: data };
    }

    return {
        fetchCourseData,
        fetchAllCourseData,
        fetchCourses,
        completeStep,
        stepInfoById,
        fetchAllUserCourses,
        createCourse,
        updateModuleOrder,
        updateLessonOrder,
        updateModuleName,
        updateLessonName,
        createModule,
        createLesson,
    };
}
