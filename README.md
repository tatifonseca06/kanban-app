# Tablero Kanban

Aplicación Kanban (estilo Jira) hecha con React y Vite.

🔗 **Demo:** https://kanban-app-six-gules.vercel.app/

## Funcionalidades

- Crear, editar y eliminar tareas.
- Tres estados: **Pendiente**, **En progreso** y **Completado**.
- Cambiar el estado con el selector de cada tarjeta o arrastrándola a otra columna.
- Las tareas se guardan en `localStorage`.

## Scripts

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm test         # pruebas con Vitest
npm run build    # build de producción
```

## CI/CD

- **GitHub Actions** (`.github/workflows/ci.yml`): en cada `push` y `pull_request` hacia `main` instala dependencias, ejecuta las pruebas y genera el build.
- **Vercel**: despliegue automático conectado al repositorio.
