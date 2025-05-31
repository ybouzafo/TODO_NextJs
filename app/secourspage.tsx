"use client"

import { useState } from 'react'
import { useTasksData } from '../hooks/useTasksData'
import { useAddTaskData } from '../hooks/useAddTaskData'
import { useDeleteTask } from '../hooks/useDeleteTask'
import { useUpdateTaskCompleted } from '../hooks/useUpdateTaskCompleted'
import './globals.css'
import type { Task } from '../schemas/task.schema'
import ThemeToggle from '@/components/ThemeToggle'; // Importez le bouton

export default function Page() {
  const [title, setTitle] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

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
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0891B2] via-[#B5EEF0] to-[#5EEAD4] p-6   dark:from-gray-800 dark:via-gray-900 dark:to-black 
  p-6 transition-colors duration-500">
         <ThemeToggle />

      <section className="w-[450px] max-h-[80vh] bg-white rounded-xl shadow-[0_10px_80px_rgba(14,116,144,0.62),0_10px_10px_rgba(14,116,144,0.13)] overflow-hidden flex flex-col dark:bg-gray-800">
        
        <header className="px-6 pt-6 pb-4 border-b border-gray-300">
          <h2 className="text-3xl  dark:text-white font-extrabold mb-1 text-center drop-shadow-md text-black">
            ToDo List 
            
          </h2>
          <p className="text-black  dark:text-white opacity-70 text-center">
            {data ? `${data.length} Tasks` : '0 Tasks'}
          </p>
  
          {/* Input + buttons */}
          <div className="mt-6 dark:text-white flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-1 min-w-0 bg-transparent border-2 dark:text-white dark:border-white border-black rounded-md px-4 py-2 text-black placeholder-black dark:placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Add a new Task..."
        />
        <button
          onClick={handleAddTaskClick}
          className="bg-[#155E75] rounded-full px-6 py-2 flex items-center justify-center gap-2 text-white font-semibold hover:brightness-110 transition"
          aria-label="Add task"
        >
          <p>Add</p>
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
        </header>
  
        {/* Task List */}
        <section className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-200">
          {data?.length === 0 && (
            <p className="text-center dark:text-white text-gray-400 mt-10">No tasks available</p>
          )}
          {data
            ?.filter(task =>
              task.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(task => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-md border-b dark:text-white border-gray-200 cursor-default
                  ${task.completed ? 'bg-[#99F6E440]' : 'hover:bg-[#99F6E420]'} transition`}
              >
                <label className="flex items-center gap-3 cursor-pointer select-none text-black dark:text-white">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompleted(task.id, task.completed)}
                    className="w-5 h-5 rounded border-2 border-black dark:border-white checked:bg-[#0D9488] checked:border-[#0F766E] focus:ring-0"
                  />
                  <span
                    className={`text-lg ${
                      task.completed ? 'line-through opacity-50' : ''
                    } truncate max-w-xs`}
                    title={task.title}
                  >
                    {task.title || <em className="text-gray-300">Untitled task</em>}
                  </span>
                </label>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-600 hover:text-red-800 font-bold transition"
                  aria-label={`Delete task ${task.title}`}
                >
                  &times;
                </button>
               
              </div>
            ))}
        </section>
  
        {/* Search Input */}
        <footer className="px-6 py-4 border-t border-gray-300">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-transparent border-2 border-black  dark:placeholder-white  dark:border-white dark:text-white rounded-md px-4 py-2 text-black placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </footer>
      </section>
      {/* <ThemeToggle /> Ajoutez le bouton ici, par exemple en bas à droite */}

    </main>
  )
  
}


