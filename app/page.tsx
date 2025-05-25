"use client"

import { useState } from 'react'
import { useTasksData } from '../hooks/useTasksData'
import { useAddTaskData } from '../hooks/useAddTaskData'
import { useDeleteTask } from '../hooks/useDeleteTask'
import { useUpdateTaskCompleted } from '../hooks/useUpdateTaskCompleted'
import './globals.css'
import type { Task } from '../schemas/task.schema'

// interface Task {
//   id: string
//   title: string
//   completed: boolean
// }

export default function Page() {
  const [title, setTitle] = useState<string>('')

  const { mutate: addTask } = useAddTaskData()
  const { mutate: deleteTask } = useDeleteTask()
  const { mutate: updateCompleted } = useUpdateTaskCompleted()

  const { isLoading, data, isError, error, refetch } = useTasksData(
    () => console.log('success'),
    (err: unknown) => console.log(err)
  )

  const handleAddTaskClick = () => {
    if (!title.trim()) return

    const maxId = data?.reduce((max: number, task: Task) => Math.max(max, Number(task.id)), 0) || 0
    const newId = (maxId + 1).toString()

    const newTask: Task = { id: newId, title, completed: false }
    addTask(newTask)
    setTitle('')
  }

  const handleDeleteTask = (id: string) => {
    deleteTask(id)
  }

  const handleToggleCompleted = (id: string, currentCompleted: boolean) => {
    updateCompleted({ id, completed: !currentCompleted })
  }

  if (isLoading) return <h2>Loading...</h2>
  if (isError) return <h2>{(error as Error).message}</h2>

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl shadow-lg text-black">
      <h2 className="text-3xl font-extrabold mb-6 text-center drop-shadow-lg">React Query Todo List</h2>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New task"
          className="flex-grow px-4 py-2 rounded-md border-2 border-black bg-white bg-opacity-20 placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white text-black"
        />
        <button
          onClick={handleAddTaskClick}
          className="bg-white bg-opacity-90 text-purple-600 font-semibold px-4 py-2 rounded-md hover:bg-white hover:text-purple-700 transition"
        >
          Add Task
        </button>
        <button
          onClick={refetch}
          className="bg-white bg-opacity-50 text-white font-semibold px-4 py-2 rounded-md hover:bg-white hover:text-purple-700 transition"
        >
          Fetch Tasks
        </button>
      </div>

      <div className="space-y-4">
        {data?.map((task: Task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-white bg-opacity-20 rounded-md p-3 shadow-md hover:bg-opacity-30 transition"
          >
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompleted(task.id, task.completed)}
                className="w-5 h-5 rounded border-2 border-white checked:bg-purple-600 checked:border-purple-600 focus:ring-0"
              />
              <span className={`text-lg ${task.completed ? 'line-through opacity-70' : ''}`}>
                {task.title || <em className="text-gray-300">Untitled task</em>}
              </span>
            </label>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-red-400 hover:text-red-600 font-bold transition"
              aria-label={`Delete task ${task.title}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
