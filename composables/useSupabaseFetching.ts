import type {AllCourseData} from "~/utils/course";
import type {Database, Tables} from "~/utils/supabase";

// ToDo BLOCK INSERTING NUMERIC VALUES INTO COURSE LINK_ID ON SERVER SIDE
export default function () {
    const supabase = useSupabaseClient<Database>();
    const user = useSupabaseUser();

    const createCourse = async (name: string, link_id: string | null) => {
        if (!user.value?.id) {
            throw new Error('No user');
        }

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
            .select('name, id, link_id, description')
            .limit(8);
        return { courses: courses ?? [] };
    }

    const fetchCourseData = async (courseId: number | string): Promise<Tables<'course'> | null> => {
        let query = supabase.from('course').select('*');
        if (Number.isInteger(courseId)) {
            query = query.eq('id', courseId)
        } else {
            query = query.eq('link_id', courseId)
        }
        const { data: course } = await query.limit(1).single();
        return course;
    }

    const fetchModulesByCourseId = async (courseId: number): Promise<Tables<'module'>[]> => {
        const { data: modules } = await supabase.from('module')
            .select('*')
            // .select('name, id, name, course_id, list_order')
            .eq('course_id', courseId);
        return modules ?? [];
    }

    const fetchLessonsByModuleIds = async (moduleIds: number[]): Promise<Tables<'lesson'>[]> => {
        const { data: lessons } = await supabase.from('lesson')
            .select('*')
            // .select('name, id, module_id, list_order')
            .in('module_id', moduleIds);
        return lessons ?? [];
    }

    const fetchStepsByLessonIds = async (lessonIds: number[]): Promise<Tables<'step'>[]> => {
        const { data: steps } = await supabase.from('step')
            .select('*')
            // .select('name, id, lesson_id, list_order')
            .in('lesson_id', lessonIds);
        return steps ?? [];
    }

    const fetchCompletedSteps = async (stepIds: number[]): Promise<number[]> => {
        if (!user.value?.id) {
            throw new Error('No user');
        }

        const { data: completedSteps } = await supabase.from('completed')
            .select('step_id')
            .eq('user_id', user.value.id)
            .in('step_id', stepIds);
        return completedSteps ? completedSteps.map(item => item.step_id) : [];
    }

    const stepInfoById = async (stepId: number) => {
        const { data: step } = await supabase.from('step')
            .select('lesson_id')
            .eq('id', stepId)
            .limit(1)
            .single();
        if (!step) {
            throw new Error('Step not found');
        }
        const { data: lesson } = await supabase.from('lesson')
            .select('module_id, id')
            .eq('id', step.lesson_id)
            .limit(1)
            .single();
        if (!lesson?.module_id) {
            throw new Error('Lesson not found');
        }
        const { data: module } = await supabase.from('module')
            .select('course_id')
            .eq('id', lesson.module_id)
            .limit(1)
            .single();
        if (!module) {
            throw new Error('Module not found');
        }
        const { data: course } = await supabase.from('course')
            .select('link_id, id')
            .eq('id', module.course_id)
            .limit(1)
            .single();
        if (!course) {
            throw new Error('Course not found');
        }
        return { courseId: course.link_id ?? course.id, lessonId: lesson.id, stepId };
    }

    const completeStep = async (stepId: number) => {
        if (!user.value?.id) {
            throw new Error('No user');
        }

        const { error } = await supabase.from('completed').upsert({
            step_id: stepId,
            user_id: user.value.id,
        });

        if (error) {
            throw new Error(error.message);
        }
    }

    // ToDo create a single db query with inner joins
    const fetchAllCourseData = async (courseId: number): Promise<AllCourseData> => {
        const [course, modules] = await Promise.all([
            fetchCourseData(courseId),
            fetchModulesByCourseId(courseId),
        ])
        if (!course) {
            throw new Error('Course not found');
        }
        const lessons = await fetchLessonsByModuleIds(modules.map(item => item.id))
        const steps = await fetchStepsByLessonIds(lessons.map(item => item.id))
        const completedSteps = await fetchCompletedSteps(steps.map(item => item.id))
        return { course, modules, lessons, steps, completedSteps };
    }

    const fetchAllUserCourses = async () => {
        if (!user.value?.id) {
            throw new Error('No user');
        }

        const { data: courses } = await supabase.from('course')
            .select('name, id, link_id')
            .eq('user_id', user.value.id)
        return { courses: courses ?? []};
    }

    const updateOrder = async (table: 'module' | 'lesson', id: number, list_order: number) => {
        const { error } = await supabase.from(table)
            .update({ list_order })
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return true;
    }

    const updateModuleOrder = async (moduleId: number, list_order: number) => {
        return updateOrder('module', moduleId, list_order);
    }

    const updateLessonOrder = async (lessonId: number, list_order: number) => {
        return updateOrder('lesson', lessonId, list_order);
    }

    const editName = async (table: 'module' | 'lesson', id: number, name: string) => {
        const { error } = await supabase.from(table)
            .update({ name })
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return true;
    }

    const updateModuleName = async (moduleId: number, name: string) => {
        return editName('module', moduleId, name);
    }

    const updateLessonName = async (lessonId: number, name: string) => {
        return editName('lesson', lessonId, name);
    }

    const createModule = async (courseId: number, list_order: number) => {
        const { error, data } = await supabase.from('module')
            .insert({ course_id: courseId, list_order, name: `Module ${list_order + 1}` })
            .select('*')
            .limit(1)
            .single();
        if (error) {
            throw new Error(error.message);
        }

        return { module: data };
    }

    const createLesson = async (moduleId: number, list_order: number) => {
        const { error, data: lesson } = await supabase.from('lesson')
            .insert({ module_id: moduleId, list_order, name: `Lesson ${list_order + 1}` })
            .select('*')
            .limit(1)
            .single();
        if (error) {
            throw new Error(error.message);
        }

        const { error: stepError } = await supabase.from('step')
            .insert({ lesson_id: lesson.id, name: 'Step 1', list_order: 0 })

        if (stepError) {
            throw new Error(stepError.message);
        }

        return { lesson };
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
