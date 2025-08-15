# Contribución – Mueblería Hermanos Jota

## Flujo de trabajo
1. Tomá una tarea del Project (columna Ready), asignate y movela a **In progress**.
2. Creá una rama desde `main` (ver convención abajo).
3. Hacé commits pequeños y claros.
4. Abrí un PR a `main` cuando termines. **Se requieren 2 aprobaciones.**
5. Al mergear, la tarjeta pasa a **Done**. Eliminá la rama.

## Convención de ramas
- `feat/<breve-descripcion>` – nueva funcionalidad  
- `fix/<breve-descripcion>` – corrección  
- `chore/<breve-descripcion>` – mantenimiento/configuración  
- `docs/<breve-descripcion>` – documentación

**Ejemplos**
- `feat/home-hero`
- `feat/productos-grid`
- `fix/navbar-responsive`
- `chore/add-gitignore`
- `docs/readme-raiz`

## Convención de commits (Conventional Commits)
`tipo(scope): resumen`

**Tipos**: `feat`, `fix`, `chore`, `docs`, `refactor`, `style` (solo formato), `test`

**Ejemplos**
- `feat(home): sección de destacados`
- `fix(navbar): corrige overflow en mobile`
- `chore: agrega .gitkeep y .gitignore`
- `docs: actualiza README`

## Pull Requests
- **Título**: mismo estilo que el commit principal.  
- **Descripción**: qué cambia y por qué.  
- **Checklist** del template completo.  
- Referenciá la issue: `Closes #12`.  
- **No** se hace push directo a `main` (rama protegida).

