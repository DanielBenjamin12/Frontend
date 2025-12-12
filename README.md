# Sistema de Facturación - Frontend

Este es el proyecto frontend para la aplicación **FacturaPro+**, un sistema de gestión de facturación. Permite a los usuarios administrar clientes, productos y crear facturas detalladas.

## ✨ Características

-   **Gestión de Clientes:** Crear, ver, editar y eliminar clientes.
-   **Gestión de Productos:** Crear, ver, editar y eliminar productos del inventario.
-   **Gestión de Facturas:** Crear nuevas facturas, agregar productos y calcular totales.
-   **Interfaz Responsiva:** Diseño limpio y funcional que se adapta a diferentes tamaños de pantalla.

## 🚀 Tecnologías Utilizadas

-   **Framework:** [Angular](https://angular.io/) v19
-   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
-   **Manejo de Asincronía:** [RxJS](https://rxjs.dev/)

## ⚙️ Requisitos y Ejecución

Para ejecutar este proyecto, es fundamental tener el backend correspondiente activo, ya que consume una API para toda la gestión de datos.

### 1. Prerrequisitos

-   [Node.js](https://nodejs.org/) (se recomienda versión 20.x o superior)
-   npm (se instala automáticamente con Node.js)
-   El proyecto backend correspondiente debe estar en ejecución.

### 2. Configuración de la API

Este proyecto se conecta a un backend a través de una URL base definida en un archivo de constantes. Si tu backend se ejecuta en un puerto o dirección diferente, debes modificar este archivo:

-   **Archivo a modificar:** `src/app/Core/Const.ts`
-   **Constante a cambiar:** `BASE_API_URL`

```typescript
// src/app/Core/Const.ts
export const BASE_API_URL = 'https://localhost:7072/api/'; // <-- Cambia esta URL si es necesario
```

### 3. Instalación de Dependencias

Clona el repositorio y navega a la carpeta del proyecto. Luego, instala las dependencias necesarias con npm:

```bash
npm install
```

### 4. Ejecución del Servidor de Desarrollo

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo de Angular:

```bash
npm start
```

El comando `npm start` (o `ng serve`) levantará el servidor. Podrás acceder a la aplicación en tu navegador visitando `http://localhost:4200/`. El servidor se recargará automáticamente cada vez que se detecte un cambio en los archivos fuente.