# 🐂 Bulltrack Pro

Sistema de gestión y clasificación de genética bovina con ranking automatizado basado en características productivas.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Características](#características)
- [API Documentation](#api-documentation)
- [Mejoras Futuras](#mejoras-futuras)

## 📖 Descripción

Bulltrack Pro es una plataforma full-stack para la gestión y clasificación de toros reproductores. El sistema calcula automáticamente un **Bull Score** basado en características genéticas ponderadas (crecimiento, facilidad de parto, reproducción, moderación, carcasa) y permite a los usuarios:

- Filtrar y buscar bulls por múltiples criterios
- Marcar favoritos
- Visualizar estadísticas en gráficos radar
- Gestionar autenticación de usuarios

## 🛠 Tecnologías

### Backend
- **NestJS** - Framework Node.js progresivo
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación basada en tokens
- **Passport** - Middleware de autenticación
- **Swagger/OpenAPI** - Documentación automática de API
- **Helmet** - Seguridad HTTP headers
- **Throttler** - Rate limiting para protección contra DDoS
- **bcrypt** - Hash de contraseñas
- **class-validator** - Validación de DTOs

### Frontend
- **Next.js 14+** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP
- **Zustand** - State management ligero
- **Recharts** - Visualización de datos
- **Lucide React** - Iconos

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación de contenedores

## 🏗 Arquitectura

### Backend - Clean Architecture / Arquitectura en Capas

```
backend/
├── src/
│   ├── modules/           # Módulos de dominio
│   │   ├── auth/          # Autenticación JWT
│   │   │   ├── dto/       # Data Transfer Objects
│   │   │   ├── guards/    # Guards de autorización
│   │   │   └── strategies/# Estrategias Passport
│   │   ├── bull/          # Gestión de bulls
│   │   │   ├── entities/  # Entidades TypeORM
│   │   │   ├── dto/       # DTOs de validación
│   │   │   └── bull.service.ts
│   │   ├── favorite/      # Sistema de favoritos
│   │   └── user/          # Gestión de usuarios
│   ├── core/              # Funcionalidades core
│   │   └── database/      # Configuración DB y seeds
│   └── config/            # Configuraciones
└── db/migrations/         # Migraciones de BD
```

**Principios aplicados:**
- **Separation of Concerns**: Módulos independientes por dominio
- **Dependency Injection**: IoC container de NestJS
- **Repository Pattern**: Abstracción de acceso a datos
- **DTO Pattern**: Validación y transformación de datos
- **Guard Pattern**: Protección de rutas

### Frontend - Screaming Architecture / Feature-Based

```
frontend/
├── app/
│   ├── (auth)/            # Grupo de rutas: Autenticación
│   │   ├── (stores)/      # Zustand stores
│   │   ├── (hooks)/       # Custom hooks
│   │   └── login/         # Página de login
│   ├── (dashboard)/       # Grupo de rutas: Dashboard
│   │   ├── components/    # Componentes del dashboard
│   │   └── hooks/         # Hooks del dashboard
│   └── layout.tsx         # Layout raíz
├── components/
│   └── ui/                # Componentes reutilizables (Atomic Design)
└── lib/
    ├── api/               # Servicios de API
    ├── types/             # Tipos TypeScript
    └── utils/             # Utilidades

```

**Principios aplicados:**
- **Atomic Design**: Componentes UI modulares y reutilizables
- **Feature-Based Structure**: Organización por features usando Route Groups `()`
- **Custom Hooks**: Lógica de negocio encapsulada
- **Service Layer**: Abstracción de llamadas API
- **Optimistic Updates**: UX mejorada en operaciones asíncronas

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ 
- PostgreSQL 14+
- pnpm (recomendado) o npm
- Docker (opcional)

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd bulltrack
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
```

**Editar `.env`** con tus credenciales:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=bulltrack

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# App
PORT=3000
```

### 3. Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
```

**Editar `.env.local`**:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## ▶️ Ejecución

### Opción 1: Ejecución Local

#### Backend

```bash
cd backend

# Ejecutar migraciones
pnpm migration:run

# Ejecutar seed (datos iniciales)
pnpm seed:run

# Iniciar en modo desarrollo
pnpm start:dev
```

El backend estará disponible en: `http://localhost:3000`

#### Frontend

```bash
cd frontend

# Iniciar en modo desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:3001`

### Opción 2: Docker Compose

```bash
# Desde la raíz del proyecto
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

## ✨ Características

### Backend

- ✅ **Autenticación JWT**: Registro, login, y protección de rutas
- ✅ **CRUD de Bulls**: Consulta con filtrado avanzado
- ✅ **Cálculo Automático**: Bull Score basado en fórmula ponderada
- ✅ **Sistema de Favoritos**: Gestión de bulls favoritos por usuario
- ✅ **Filtrado Server-Side**: Búsqueda, origin, usage, coatColor, sort
- ✅ **Paginación**: Paginación eficiente con metadata completa
- ✅ **Validación**: DTOs con class-validator
- ✅ **Seguridad**:
  - Helmet (HTTP headers)
  - Throttler (rate limiting)
  - CORS configurado
  - Passwords hasheados con bcrypt
- ✅ **Swagger UI**: Documentación interactiva en `/api/docs`
- ✅ **Seeding**: Datos iniciales para desarrollo

### Frontend

- ✅ **Autenticación**: Login con JWT y protección de rutas
- ✅ **Dashboard Interactivo**: Visualización de bulls con filtros
- ✅ **Búsqueda en Tiempo Real**: Con debounce para optimización
- ✅ **Filtros Múltiples**: Origin, usage, color, ordenamiento
- ✅ **Favoritos**: Toggle con actualización optimista
- ✅ **Visualización de Datos**: Gráficos radar con Recharts
- ✅ **Paginación**: Navegación entre páginas
- ✅ **Diseño Responsivo**: UI moderna con Tailwind CSS
- ✅ **Loading States**: Skeletons durante carga
- ✅ **Error Handling**: Manejo graceful de errores
- ✅ **Imágenes Dinámicas**: Carga automática basada en breed/color

## 📚 API Documentation

La documentación completa de la API está disponible en Swagger UI:

**URL**: `http://localhost:3000/api`

### Endpoints Principales

#### Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión
- `GET /auth/profile` - Obtener perfil del usuario (requiere JWT)

#### Bulls
- `GET /bulls` - Listar bulls con filtros y paginación
- `GET /bulls/:id` - Obtener bull por ID

#### Favoritos
- `POST /favorites/:bullId` - Agregar a favoritos
- `DELETE /favorites/:bullId` - Quitar de favoritos
- `GET /favorites` - Listar favoritos del usuario

### Credenciales de Prueba

```
Email: admin@seed28.com
Password: seed28
```

## 🎯 Bull Score

El Bull Score se calcula automáticamente usando la siguiente fórmula:

```
Bull Score = (Growth × 0.30) + 
             (Calving Ease × 0.25) + 
             (Reproduction × 0.20) + 
             (Moderation × 0.15) + 
             (Carcass × 0.10)
```

Este cálculo se ejecuta automáticamente en cada inserción/actualización mediante hooks de TypeORM (`@BeforeInsert`, `@BeforeUpdate`).

## 🔮 Mejoras Futuras

Si el proyecto tuviera **2 semanas adicionales de desarrollo**, se implementarían las siguientes mejoras:

### 1. CRUD Completo de Bulls

**Alcance:** Gestión completa del ciclo de vida de bulls

- **Creación de Bulls**:
  - Formulario con validación completa
  - Cálculo automático de Bull Score
  - Preview del ranking estimado

- **Edición de Bulls**:
  - Actualización de características
  - Recalculo automático de scores
  - Historial de cambios (audit log)

- **Eliminación de Bulls**:
  - Soft delete con recuperación
  - Validación de dependencias (favoritos)
  - Confirmación de eliminación

- **Subida de Fotos**:
  - Upload directo desde el formulario
  - Preview antes de guardar
  - Validación de formato y tamaño

**Tecnologías**:
- `multer` para upload de archivos
- React Dropzone para UI de upload

### 2. Infraestructura Cloud y Optimización

**Alcance:** Mejora de performance y escalabilidad

#### Storage en la Nube
- **Google Cloud Storage** o **AWS S3**:
  - Upload directo de imágenes
  - URLs firmadas para seguridad
  - CDN para distribución global
  - Múltiples tamaños (thumbnails, medium, full)
  - Backup automático

#### Sistema de Caché con Redis
- **Cache de Queries**:
  - Resultados de búsquedas frecuentes
  - Listados con filtros comunes
  - TTL configurable por tipo de query

- **Cache de Imágenes**:
  - URLs de imágenes procesadas
  - Metadata de bulls
  - Reducción de latencia ~70%

- **Session Store**:
  - JWT en Redis para invalidación
  - Refresh tokens
  - Rate limiting distribuido

**Beneficios esperados**:
- ⚡ Reducción de latencia: 60-80%
- 📈 Capacidad de escalar horizontalmente
- 💰 Costos optimizados con caching
- 🌍 Distribución global de assets
- 🔒 Seguridad mejorada con URLs firmadas
- 📊 Monitoring y analytics integrados

### 3. Otras Mejoras Adicionales

- **Testing Completo**:
  - Tests unitarios (Jest)
  - Tests de integración
  - E2E tests (Playwright)
  - Coverage >80%

- **CI/CD Pipeline**:
  - GitHub Actions
  - Pruebas automatizadas
  - Rollback automático

- **Monitoring y Observability**:
  - Logging estructurado (Winston)

- **Funcionalidades de Usuario**:
  - Sistema de notificaciones
  - Exportación de datos (CSV, PDF)
  - Comparación de bulls
  - Reportes personalizados
  - Notas y comentarios

## 📄 Licencia

Este proyecto es privado y confidencial.

---

**Desarrollado con ❤️ por Ariel Perez**
