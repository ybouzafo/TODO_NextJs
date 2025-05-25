import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

const deleteTask = (id: string): Promise<AxiosResponse<void>> => {
  return axios.delete(`http://localhost:4000/tasks/${id}`)
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<void>, unknown, string>({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}
