import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import type { Task } from '../schemas/task.schema'

// Type d'une tâche envoyée sans id (généré automatiquement côté serveur)
interface NewTask {
  title: string
  completed: boolean
}

// Tâche complète avec id retournée par le serveur
// interface Task extends NewTask {
//   id: string
// }

const addTask = (task: NewTask): Promise<AxiosResponse<Task>> => {
  return axios.post<Task>('http://localhost:4000/tasks', task)
}

export const useAddTaskData = () => {
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<Task>, unknown, NewTask>({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}
