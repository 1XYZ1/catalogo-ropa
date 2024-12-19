import { createSignal } from "solid-js";

export default function GeneratePDF({ favorites, fileName = "document.pdf", title = "Descargar PDF" }) {
  const [isGenerating, setIsGenerating] = createSignal(false);
  const [modalVisible, setModalVisible] = createSignal(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    setModalVisible(true);

    if (typeof window !== "undefined") {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      const margin = 10;
      let cursorY = margin;

      // Título del PDF
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("Resumen Favoritos", doc.internal.pageSize.width / 2, cursorY, { align: "center" });
      cursorY += 25; // Espaciado debajo del título

      // Cabecera de la tabla
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.setFillColor(240); // Fondo gris claro
      doc.rect(margin, cursorY - 8, doc.internal.pageSize.width - 2 * margin, 12, "F");
      doc.text("Producto", margin + 5, cursorY);
      doc.text("Talla", margin + 100, cursorY);
      doc.text("Cantidad", margin + 125, cursorY);
      doc.text("Subtotal", margin + 160, cursorY);
      cursorY += 18;

      // Iterar sobre los productos
      let total = 0;
      favorites().forEach((product) => {
        product.compra.forEach((compra) => {
          const ogImage = product.ogimage || "";
          const subtotal = compra.cantidad * product.price;
          total += subtotal;

          if (ogImage) {
            doc.addImage(ogImage, "JPEG", margin, cursorY - 10, 15, 15);
          }

          const productName = product.name.length > 30
            ? doc.splitTextToSize(product.name, 70)
            : product.name;

          doc.setFont("helvetica", "normal");
          doc.text(productName, margin + 20, cursorY);
          doc.text(compra.talla, margin + 105, cursorY);
          doc.text(String(compra.cantidad), margin + 135, cursorY);
          doc.setFont("helvetica", "bold");
          doc.text(`$${subtotal.toLocaleString("es-ES")}`, margin + 160, cursorY);

          cursorY += productName.length > 1 ? 20 : 15;

          if (cursorY > doc.internal.pageSize.height - margin - 20) {
            doc.addPage();
            cursorY = margin + 10;
          }
        });
      });

      // Total
      cursorY += 10;
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Total: ", margin + 130, cursorY);
      doc.setTextColor(0, 128, 0);
      doc.text(`$${total.toLocaleString("es-ES")}`, margin + 155, cursorY);

      try {
        await doc.save(fileName);
      } catch (error) {
        console.error("Error generando el PDF:", error);
        alert("Ocurrió un error al generar el PDF. Intenta nuevamente.");
      } finally {
        setIsGenerating(false);
        setTimeout(() => setModalVisible(false), 3000); // Ocultar modal después de 3 segundos
      }
    }
  };

  return (
    <>
      {/* Botón para generar el PDF */}
      <button
        class="w-full py-3 h-12 flex items-center justify-center text-lg border-2 border-black text-black font-semibold rounded-lg hover:bg-gray-100 focus:ring focus:ring-gray-300 transition"
        onClick={generatePDF}
        disabled={isGenerating()}
      >
        {isGenerating() ? "Generando PDF..." : title}
      </button>

      {/* Modal de feedback */}
      {modalVisible() && (
        <div
          class={`fixed top-0 left-0 w-full bg-green-300 shadow-md rounded-b-md p-5 transform transition-transform duration-300 translate-y-0 opacity-100`}
          style="z-index: 1000;"
        >
          <p class="text-gray-800 font-medium text-center">
            {isGenerating() ? "Generando el PDF, espera un momento..." : "PDF generado exitosamente 🎉"}
          </p>
        </div>
      )}
    </>
  );
}
