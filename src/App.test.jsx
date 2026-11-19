import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

async function crearTarea(user, title) {
  await user.type(screen.getByLabelText('Título'), title)
  await user.click(screen.getByRole('button', { name: 'Agregar tarea' }))
}

describe('App Kanban', () => {
  it('muestra las tres columnas', () => {
    render(<App />)
    expect(screen.getByRole('region', { name: 'Pendiente' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'En progreso' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Completado' })).toBeInTheDocument()
  })

  it('agrega una tarea a la columna Pendiente', async () => {
    const user = userEvent.setup()
    render(<App />)
    await crearTarea(user, 'Estudiar React')
    const pendiente = screen.getByRole('region', { name: 'Pendiente' })
    expect(within(pendiente).getByText('Estudiar React')).toBeInTheDocument()
  })

  it('mueve una tarea a Completado', async () => {
    const user = userEvent.setup()
    render(<App />)
    await crearTarea(user, 'Entregar tarea')
    await user.selectOptions(screen.getByLabelText('Estado de Entregar tarea'), 'done')
    const completado = screen.getByRole('region', { name: 'Completado' })
    expect(within(completado).getByText('Entregar tarea')).toBeInTheDocument()
  })

  it('edita y elimina una tarea', async () => {
    const user = userEvent.setup()
    render(<App />)
    await crearTarea(user, 'Borrador')
    await user.click(screen.getByRole('button', { name: 'Editar' }))
    const input = screen.getAllByLabelText('Título')[1]
    await user.clear(input)
    await user.type(input, 'Final')
    await user.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(screen.getByText('Final')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(screen.queryByText('Final')).not.toBeInTheDocument()
  })
})
