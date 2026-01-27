
export const WHATSAPP_CLIENT = "5216143277218";
export const WHATSAPP_DEV = "5216143277218";

export const getClinicWA = (service: string = "Valoración General") => {
  const text = `Hola Dr. Enrique Acosta, me interesa agendar una cita para: ${service}. Vi su plataforma Nexora-Optimized.`;
  return `https://wa.me/${WHATSAPP_CLIENT}?text=${encodeURIComponent(text)}`;
};

export const getDevWA = (tag: string = "General_Inquiry") => {
  const text = `[TAG: ${tag}] ¡Hola! Me encantó la App/Landing del Dr. Acosta. Me interesa el plan de entrega mismo día y pago al recibir. Mi negocio es: `;
  return `https://wa.me/${WHATSAPP_DEV}?text=${encodeURIComponent(text)}`;
};
