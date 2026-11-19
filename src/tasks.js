export const STATUSES = [
  { id: 'todo', label: 'Pendiente' },
  { id: 'in-progress', label: 'En progreso' },
  { id: 'done', label: 'Completado' },
]

export function createTask({ title, description = '' }) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: description.trim(),
    status: 'todo',
    createdAt: Date.now(),
  }
}

export function addTask(tasks, task) {
  return [...tasks, task]
}

export function updateTask(tasks, id, changes) {
  return tasks.map((t) => (t.id === id ? { ...t, ...changes } : t))
}

export function deleteTask(tasks, id) {
  return tasks.filter((t) => t.id !== id)
}

export function moveTask(tasks, id, status) {
  if (!STATUSES.some((s) => s.id === status)) return tasks
  return updateTask(tasks, id, { status })
}

export function tasksByStatus(tasks, status) {
  return tasks.filter((t) => t.status === status)
}
