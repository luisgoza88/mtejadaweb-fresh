# Configuración del Sistema de Email

El formulario de contacto está configurado para enviar emails a marianatejada@outlook.com. Actualmente hay dos opciones:

## Opción 1: Configurar EmailJS (Recomendado)

EmailJS permite enviar emails directamente desde el frontend sin necesidad de un servidor backend.

### Pasos para configurar:

1. **Crear cuenta en EmailJS**
   - Ve a https://www.emailjs.com/
   - Regístrate con una cuenta gratuita (200 emails/mes gratis)

2. **Configurar un servicio de email**
   - En el dashboard, ve a "Email Services"
   - Click en "Add New Service"
   - Selecciona tu proveedor (Gmail, Outlook, etc.)
   - Sigue las instrucciones para conectar tu cuenta

3. **Crear una plantilla de email**
   - Ve a "Email Templates"
   - Click en "Create New Template"
   - Configura:
     - To Email: marianatejada@outlook.com
     - From Name: {{from_name}}
     - Subject: Nueva consulta de {{from_name}} - {{project_type}}
   - En el contenido, puedes usar el HTML proporcionado en `emailService.ts`

4. **Obtener las credenciales**
   - Service ID: Lo encuentras en "Email Services"
   - Template ID: Lo encuentras en "Email Templates"
   - Public Key: Ve a "Account" → "API Keys"

5. **Actualizar el código**
   Edita el archivo `src/services/emailService.ts` y reemplaza:
   ```typescript
   const SERVICE_ID = 'TU_SERVICE_ID_AQUI';
   const TEMPLATE_ID = 'TU_TEMPLATE_ID_AQUI';
   const PUBLIC_KEY = 'TU_PUBLIC_KEY_AQUI';
   ```

## Opción 2: Usar mailto (Actual)

Si no configuras EmailJS, el sistema usará automáticamente `mailto:` que abre el cliente de correo del usuario con la información prellenada.

**Ventajas:**
- No requiere configuración
- Funciona inmediatamente

**Desventajas:**
- Requiere que el usuario tenga configurado un cliente de correo
- El usuario debe enviar manualmente el email

## Datos del destinatario

Todos los emails se envían a:
- **Email:** marianatejada@outlook.com
- **Nombre:** Mariana Tejada

## Información que se envía

El formulario captura y envía:
- Nombre completo
- Email
- Teléfono
- Tipo de proyecto
- Ubicación del proyecto
- Descripción detallada

## Notas importantes

- El sistema está configurado para mostrar mensajes de éxito/error al usuario
- El formulario se limpia automáticamente después de un envío exitoso
- Hay validación en todos los campos requeridos
- El botón de envío se deshabilita mientras se procesa la solicitud