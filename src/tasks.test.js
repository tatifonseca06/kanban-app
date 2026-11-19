import { describe, expect, it } from 'vitest'
import { addTask, createTask, deleteTask, moveTask, tasksByStatus, updateTask } from './tasks'

describe('lógica de tareas', () => {
  it('crea una tarea nueva en estado Pendiente', () => {
    const task = createTask({ title: '  Diseñar login  ', description: 'Mockup' })
    expect(task.title).toBe('Diseñar login')
    expect(task.status).toBe('todo')
    expect(task.id).toBeTruthy()
  })

  it('edita una tarea existente', () => {
    const task = createTask({ title: 'Original' })
    const tasks = updateTask([task], task.id, { title: 'Editada' })
    expect(tasks[0].title).toBe('Editada')
  })

  it('elimina una tarea', () => {
    const a = createTask({ title: 'A' })
    const b = createTask({ title: 'B' })
    const tasks = deleteTask(addTask([a], b), a.id)
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe('B')
  })

  it('cambia el estado de una tarea', () => {
    const task = createTask({ title: 'Mover' })
    const tasks = moveTask([task], task.id, 'in-progress')
    expect(tasksByStatus(tasks, 'in-progress')).toHaveLength(1)
    expect(tasksByStatus(tasks, 'todo')).toHaveLength(0)
  })

  it('ignora estados inválidos', () => {
    const task = createTask({ title: 'X' })
    expect(moveTask([task], task.id, 'otro')[0].status).toBe('todo')
  })
})
