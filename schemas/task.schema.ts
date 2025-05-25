import { z } from 'zod'

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Le titre est requis'),
  completed: z.boolean(),
})

export type Task = z.infer<typeof TaskSchema>
export const TasksArraySchema = z.array(TaskSchema)
