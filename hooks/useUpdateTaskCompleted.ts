
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import type { Task } from '../schemas/task.schema'

// Définition du payload attendu pour mettre à jour une tâche
interface UpdateTaskPayload {
  id: string
  completed: boolean
}

// Optionnel : réponse attendue du serveur, ici la tâche mise à jour
// interface Task {
//   id: string
//   title: string
//   completed: boolean
// }

const updateCompleted = ({ id, completed }: UpdateTaskPayload): Promise<AxiosResponse<Task>> => {
  return axios.patch<Task>(`http://localhost:4000/tasks/${id}`, { completed })
}

export const useUpdateTaskCompleted = () => {
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<Task>, unknown, UpdateTaskPayload>({
    mutationFn: updateCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}
