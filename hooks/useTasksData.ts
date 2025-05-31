import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'
import { Task, TasksArraySchema } from '../schemas/task.schema'

const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get('http://localhost:4000/tasks')
  const validated = TasksArraySchema.parse(response.data)
  return validated
}

export const useTasksData = (
  onSuccess?: (data: Task[]) => void,
  onError?: (error: unknown) => void
): UseQueryResult<Task[], unknown> => {
  return useQuery<Task[], unknown>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    onSuccess,
    onError,
  })
}
