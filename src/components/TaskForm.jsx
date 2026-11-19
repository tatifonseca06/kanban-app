import { useState } from 'react'

export default function TaskForm({ initial, onSubmit, onCancel, submitLabel = 'Agregar tarea' }) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title, description })
    if (!initial) {
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        aria-label="Título"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        aria-label="Descripción"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit" className="btn primary">{submitLabel}</button>
        {onCancel && (
          <button type="button" className="btn" onClick={onCancel}>Cancelar</button>
        )}
      </div>
    </form>
  )
}
