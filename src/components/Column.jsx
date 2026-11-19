import { useState } from 'react'
import TaskCard from './TaskCard'

export default function Column({ status, tasks, onUpdate, onDelete, onMove }) {
  const [over, setOver] = useState(false)

  return (
    <section
      className={`column ${over ? 'drag-over' : ''}`}
      aria-label={status.label}
      onDragOver={(e) => {
        e.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setOver(false)
        onMove(e.dataTransfer.getData('text/plain'), status.id)
      }}
    >
      <header className={`column-header status-${status.id}`}>
        <h2>{status.label}</h2>
        <span className="count" aria-label={`${tasks.length} tareas`}>{tasks.length}</span>
      </header>
      <div className="column-body">
        {tasks.length === 0 && <p className="empty">Sin tareas</p>}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} onMove={onMove} />
        ))}
      </div>
    </section>
  )
}
