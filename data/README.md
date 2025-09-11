# Base de Datos JSON - Asistente Empresarial

Este directorio contiene los archivos JSON que simulan la base de datos para el sistema de Asistente Empresarial. Estos archivos están diseñados para ser consumidos por la futura API de IA.

## Estructura de Archivos

### 📊 `analytics.json`
Contiene métricas y datos analíticos del dashboard:
- Métricas de ventas, clientes, proyectos y equipo
- Análisis de conversaciones de chat
- Inteligencia de negocio y tendencias del mercado
- Análisis predictivo y pronósticos

### 💬 `conversations.json`
Almacena las conversaciones del chat:
- Historial completo de conversaciones
- Mensajes con timestamps y roles (usuario/asistente)
- Metadatos como títulos, tags y estado
- Estructura preparada para integración con IA

### 🤖 `ai_responses.json`
Plantillas y respuestas del asistente de IA:
- Templates de respuestas por categoría
- Respuestas contextuales por tema empresarial
- Preguntas de seguimiento inteligentes
- Respuestas adaptadas por horario del día

### 👥 `users.json`
Información de usuarios del sistema:
- Perfiles de usuarios con roles y permisos
- Preferencias personales y configuraciones
- Datos de autenticación y actividad
- Estructura de departamentos y jerarquías

### 📚 `knowledge_base.json`
Base de conocimiento empresarial:
- Artículos organizados por categorías
- FAQs frecuentes con respuestas
- Templates de documentos empresariales
- Guías y mejores prácticas

## Uso Futuro con API de IA

Estos archivos están estructurados para facilitar la integración con una API de IA:

1. **Conversaciones**: El sistema de chat puede cargar y guardar conversaciones
2. **Respuestas Inteligentes**: La IA puede usar las plantillas para generar respuestas contextuales
3. **Análisis**: Los datos analíticos pueden alimentar reportes automáticos
4. **Personalización**: Los perfiles de usuario permiten respuestas personalizadas
5. **Conocimiento**: La base de conocimiento puede ser consultada por la IA

## Formato de Datos

Todos los archivos siguen un formato JSON consistente con:
- IDs únicos para cada elemento
- Timestamps en formato ISO 8601
- Estructura jerárquica clara
- Metadatos para facilitar búsquedas y filtros
- Campos de estado para gestión de datos

## Extensibilidad

La estructura está diseñada para ser fácilmente extensible:
- Nuevas categorías de conversaciones
- Métricas adicionales de analytics
- Más tipos de usuarios y roles
- Expansión de la base de conocimiento
- Nuevas plantillas de respuestas

## Notas Técnicas

- Los archivos están optimizados para lectura rápida
- La estructura permite consultas eficientes por ID, fecha, o categoría
- Los datos están preparados para indexación en bases de datos
- Compatible con sistemas de caché y sincronización
