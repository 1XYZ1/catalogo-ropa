import { createSignal, createEffect } from "solid-js";

export default function SendToWhatsApp({ summary, class: className }) {
  const [whatsappMessage, setWhatsappMessage] = createSignal("");
  const [isButtonDisabled, setIsButtonDisabled] = createSignal(true);

  createEffect(() => {
    const currentSummary = summary();
    if (!currentSummary.details || currentSummary.details.length === 0) {
      setWhatsappMessage("");
      setIsButtonDisabled(true);
      return;
    }

    const summaryDetails = currentSummary.details
      .map((detail) => {
        // Cabecera del producto
        let productText = `Producto: ${detail.name}\n`;
        productText += `Color: ${detail.color}\n`;

        // Detalles de compra con precios
        const compraDetails = detail.compra
          .map((compra) => {
            const precioOriginal = compra.cantidad * detail.price;

            if (detail.discount > 0) {
              const precioConDescuento = precioOriginal * (1 - detail.discount/100);
              return `- Talla: ${compra.talla}
- Cantidad: ${compra.cantidad}
- Precio original: $${precioOriginal.toLocaleString("es-ES")}
- Descuento: ${detail.discount}% OFF
- Subtotal final: $${precioConDescuento.toLocaleString("es-ES")}`;
            } else {
              return `- Talla: ${compra.talla}
- Cantidad: ${compra.cantidad}
- Subtotal: $${precioOriginal.toLocaleString("es-ES")}`;
            }
          })
          .join("\n");

        return `${productText}${compraDetails}`;
      })
      .join("\n\n");

    const total = `Total a pagar: $${currentSummary.total.toLocaleString("es-ES")}`;
    setWhatsappMessage(`¡Hola! Me interesa el siguiente pedido:\n\n${summaryDetails}\n\n${total}`);
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