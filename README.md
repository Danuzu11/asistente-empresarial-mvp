## Asistente-Empresarial (Next.js)

Aplicación Next.js que expone APIs de negocio (empleados, clientes, proveedores, documentos) y un endpoint de chat que orquesta descargas reales de documentos cuando la IA lo solicita.

### 🚀 Arranque local

```bash
npm run dev
# http://localhost:3000
```

### 🔧 Variables de entorno

- `MCP_SERVICE_URL` (opcional): URL del servicio Gemini-MCP Web. Por defecto `http://localhost:3003`.
- Otras variables que agregues para tus propias integraciones.

### 🔌 Endpoints principales

- `POST /api/chat`
  - Orquesta la conversación con el servicio MCP. Si detecta una intención de descarga válida, adjunta al response el documento real en base64 y `downloadUrl`.
  - Request: `{ message: string, history?: any[] }`
  - Response: `{ message: string, documentAttachment?: { filename, content, contentType, size, downloadUrl }, ... }`

- `GET /api/documentos`
  - Lista documentos disponibles. Retorna: `{ success, data: { id, nombre, descripcion, categoria, ... }[] }`.

- `GET /api/documentos/:filename`
  - Descarga directa del PDF.
  - Soporta `?format=base64` para obtener `{ content, contentType, size }`.

### 📄 Flujo de descargas (sin adjuntos simulados)

1. La IA (en Gemini-MCP) devuelve exclusivamente el nombre exacto del documento (p. ej., `ORDENES DE COMPRA.pdf`).
2. El servidor web Gemini-MCP detecta ese nombre y llama a `POST /api/chat` con el mensaje: `"Descarga <NOMBRE>.pdf"` y el historial.
3. Este servicio obtiene el documento desde `/api/documentos/:filename` (o en base64) y adjunta el archivo real en la respuesta.
4. El frontend muestra botones de Ver/Descargar usando `documentAttachment`.

### 🧩 Configurabilidad

Las rutas y fuentes de datos están desacopladas para facilitar su reutilización. Puedes apuntar `MCP_SERVICE_URL` y/o sustituir las implementaciones de `/api/*` a tus propios servicios. El flujo seguirá funcionando mientras respetes las formas de respuesta descritas.

### 🛠️ Notas de implementación

- `app/api/chat/route.ts` contiene la lógica de detección de intención (palabras clave y contexto reciente) y la integración con el servicio MCP.
- `app/api/documentos/route.ts` centraliza la lista de documentos disponibles y soporta filtros por `categoria` y `nombre`.

