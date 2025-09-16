// Configuración para envío de emails
// IMPORTANTE: Para que funcione, necesitas:
// 1. Crear cuenta en https://www.emailjs.com
// 2. Configurar un servicio de email (Gmail, Outlook, etc)
// 3. Crear una plantilla de email
// 4. Reemplazar estos valores con los tuyos

export const sendEmail = async (formData: any) => {
  // Configuración de EmailJS - REEMPLAZA con tus valores reales
  const SERVICE_ID = 'TU_SERVICE_ID'; // Ej: 'service_abc123'
  const TEMPLATE_ID = 'TU_TEMPLATE_ID'; // Ej: 'template_xyz789'
  const PUBLIC_KEY = 'TU_PUBLIC_KEY'; // Ej: 'user_AbC123XyZ'
  
  // Datos para enviar
  const templateParams = {
    to_email: 'marianatejada@outlook.com', // Email de Mariana
    from_name: formData.nombre,
    from_email: formData.email,
    from_phone: formData.telefono,
    project_type: formData.tipoProyecto,
    project_location: formData.ubicacion,
    message: formData.descripcion,
    reply_to: formData.email
  };

  try {
    // Si EmailJS está configurado
    if (SERVICE_ID !== 'TU_SERVICE_ID') {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: templateParams
        })
      });

      if (!response.ok) {
        throw new Error('Error al enviar el email');
      }

      return { success: true, message: 'Email enviado correctamente' };
    } else {
      // Método alternativo: mailto (abre el cliente de correo)
      const subject = `Nueva consulta de ${formData.nombre} - ${formData.tipoProyecto}`;
      const body = `
        Nombre: ${formData.nombre}
        Email: ${formData.email}
        Teléfono: ${formData.telefono}
        Tipo de Proyecto: ${formData.tipoProyecto}
        Ubicación: ${formData.ubicacion}
        
        Descripción:
        ${formData.descripcion}
      `.trim();

      const mailtoLink = `mailto:marianatejada@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Abrir el cliente de correo
      window.location.href = mailtoLink;
      
      return { success: true, message: 'Se abrirá tu cliente de correo para enviar el mensaje' };
    }
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return { success: false, message: 'Error al enviar el mensaje. Por favor, intenta de nuevo.' };
  }
};

// Plantilla HTML para EmailJS (configurar en el dashboard de EmailJS)
export const EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #f5f5f5; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #333; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Nueva Consulta - Mariana Tejada Arquitectura</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Nombre:</span> {{from_name}}
      </div>
      <div class="field">
        <span class="label">Email:</span> {{from_email}}
      </div>
      <div class="field">
        <span class="label">Teléfono:</span> {{from_phone}}
      </div>
      <div class="field">
        <span class="label">Tipo de Proyecto:</span> {{project_type}}
      </div>
      <div class="field">
        <span class="label">Ubicación:</span> {{project_location}}
      </div>
      <div class="field">
        <span class="label">Descripción:</span><br>
        {{message}}
      </div>
    </div>
  </div>
</body>
</html>
`;