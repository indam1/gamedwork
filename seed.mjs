import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'
import 'dotenv/config'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    auth: { persistSession: false },
  },
)

const { data: { users } } = await supabase.auth.admin.listUsers()
const userIds = users.map(user => user.id)

async function seedTransactions() {
  const { error: completedStepError } = await supabase.from('completed').delete().gte('id', 0)
  if (completedStepError) {
    throw new Error(`Error deleting existing data: ${completedStepError.message}`)
  }

  for (const table of ['step', 'lesson', 'module', 'course']) {
    // Delete existing data
    const { error } = await supabase.from(table).delete().gte('id', 0)
    if (error)
      throw new Error(`Error deleting existing data: ${error.message}`)
  }

  for (const userId of userIds) {
    const courses = []
    const modules = []
    const lessons = []
    const steps = []

    for (let i = 0; i < faker.helpers.rangeToNumber({ min: 8, max: 12 }); i++) {
      const courseName = faker.commerce.productName()
      courses.push({
        name: courseName,
        user_id: userId,
      })
    }

    const { error: courseInsertError, data: courseData } = await supabase.from('course').upsert(courses).select()
    if (courseInsertError)
      throw new Error(`Error inserting courses data: ${courseInsertError.message}`)
    else
      console.info('Courses data inserted successfully.')

    for (const course of courseData) {
      for (let i = 0; i < faker.helpers.rangeToNumber({ min: 5, max: 20 }); i++) {
        modules.push({
          name: faker.location.city(),
          course_id: course.id,
          list_order: i,
        })
      }
    }

    const { error: moduleInsertError, data: moduleData } = await supabase.from('module').upsert(modules).select()
    if (moduleInsertError)
      throw new Error(`Error inserting modules data: ${moduleInsertError.message}`)
    else
      console.info('Modules data inserted successfully.')

    for (const module of moduleData) {
      for (let i = 0; i < faker.helpers.rangeToNumber({ min: 5, max: 20 }); i++) {
        lessons.push({
          name: faker.location.country(),
          module_id: module.id,
          list_order: i,
        })
      }
    }

    const { error: lessonInsertError, data: lessonData } = await supabase.from('lesson').upsert(lessons).select()
    if (lessonInsertError)
      throw new Error(`Error inserting lessons data: ${lessonInsertError.message}`)
    else
      console.info('Lessons data inserted successfully.')

    for (const lesson of lessonData) {
      for (let i = 0; i < faker.helpers.rangeToNumber({ min: 1, max: 10 }); i++) {
        steps.push({
          name: faker.commerce.productName(),
          lesson_id: lesson.id,
          list_order: i,
        })
      }
    }

    const { error: stepInsertError, data: stepData } = await supabase.from('step').upsert(steps).select()
    if (stepInsertError)
      throw new Error(`Error inserting steps data: ${stepInsertError.message}`)
    else
      console.info('Steps data inserted successfully.')

    console.info('All data inserted successfully.')
  }
}

seedTransactions().catch(console.error)
