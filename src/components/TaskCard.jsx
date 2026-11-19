import { useState } from 'react'
import { STATUSES } from '../tasks'
import TaskForm from './TaskForm'

export default function TaskCard({ task, onUpdate, onDelete, onMove }) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <article className="card editing">
        <TaskForm
          initial={task}
          submitLabel="Guardar"
          onSubmit={(changes) => {
            onUpdate(task.id, { title: changes.title.trim(), description: changes.description.trim() })
            setEditing(false)
          }}
          onCancel={() => setEditing(false)}
        />
      </article>
    )
  }

  return (
    <article
      className={`card status-${task.status}`}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
    >
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div className="card-footer">
        <select
          aria-label={`Estado de ${task.title}`}
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        <div className="card-actions">
          <button className="btn small" onClick={() => setEditing(true)}>Editar</button>
          <button className="btn small danger" onClick={() => onDelete(task.id)}>Eliminar</button>
        </div>
      </div>
    </article>
  )
}
