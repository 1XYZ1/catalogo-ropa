import { createSignal } from "solid-js";

export default function SendToWhatsApp({ summary }) {
  const [sending, setSending] = createSignal(false);

  const sendTextToWhatsApp = () => {
    setSending(true);

    const summaryDetails = summary.details
      .map(
        (detail) =>
          `Producto: ${detail.name}\n` +
          detail.compra
            .map(
              (compra) =>
                `- Talla: ${compra.talla}, Cantidad: ${compra.cantidad}, Subtotal: $${(
                  compra.cantidad * detail.price
                ).toLocaleString("es-ES")}`
            )
            .join("\n")
      )
      .join("\n\n");

    const total = `Total: $${summary.total.toLocaleString("es-ES")}`;
    const whatsappMessage = `Resumen de Pedido:\n\n${summaryDetails}\n\n${total}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = "+56987866258";
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");

    setSending(false);
  };

  return (
    <button
      onClick={sendTextToWhatsApp}
      disabled={sending()}
      class={`px-6 py-3 h-12 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all ${
        sending() ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {sending() ? "Enviando..." : "Enviar a WhatsApp"}
    </button>
  );
}
