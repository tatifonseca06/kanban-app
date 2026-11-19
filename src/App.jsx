import { useEffect, useState } from 'react'
import Column from './components/Column'
import TaskForm from './components/TaskForm'
import { STATUSES, addTask, createTask, deleteTask, moveTask, tasksByStatus, updateTask } from './tasks'

const STORAGE_KEY = 'kanban-tasks'

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tablero Kanban</h1>
        <p>Organiza tus tareas por estado</p>
      </header>

      <TaskForm onSubmit={(data) => setTasks((ts) => addTask(ts, createTask(data)))} />

      <main className="board">
        {STATUSES.map((status) => (
          <Column
            key={status.id}
            status={status}
            tasks={tasksByStatus(tasks, status.id)}
            onUpdate={(id, changes) => setTasks((ts) => updateTask(ts, id, changes))}
            onDelete={(id) => setTasks((ts) => deleteTask(ts, id))}
            onMove={(id, newStatus) => setTasks((ts) => moveTask(ts, id, newStatus))}
          />
        ))}
      </main>
    </div>
  )
}
