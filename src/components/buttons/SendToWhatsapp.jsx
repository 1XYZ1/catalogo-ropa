import { createSignal, createEffect } from "solid-js";

export default function SendToWhatsApp({ summary, class: className }) {
  const [whatsappMessage, setWhatsappMessage] = createSignal(""); // Mensaje dinámico
  const [isButtonDisabled, setIsButtonDisabled] = createSignal(true); // Estado del botón

  // Escuchar cambios en summary
  createEffect(() => {
    const currentSummary = summary(); // Accede al valor reactivo
    if (!currentSummary.details || currentSummary.details.length === 0) {
      setWhatsappMessage(""); // Limpia mensaje si no hay datos
      setIsButtonDisabled(true);
      return;
    }

    const summaryDetails = currentSummary.details
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

    const total = `Total: $${currentSummary.total.toLocaleString("es-ES")}`;
    setWhatsappMessage(`Resumen de Pedido:\n\n${summaryDetails}\n\n${total}`);
    setIsButtonDisabled(false);
  });

  const sendTextToWhatsApp = () => {
    const message = whatsappMessage();
    if (!message) {
      alert("No hay productos para enviar.");
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "+56987866258";
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <button
      onClick={sendTextToWhatsApp}
      disabled={isButtonDisabled()}
      class={`w-full px-4 py-3 rounded-lg transition-all duration-200 font-medium
        ${isButtonDisabled()
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-black text-white hover:bg-gray-900 active:bg-gray-800"
        } ${className || ""}`}
    >
      Cotizar por WhatsApp
    </button>
  );
}
