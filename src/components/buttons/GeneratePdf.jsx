import { createSignal } from "solid-js";

export default function GeneratePDF({ favorites, fileName = "document.pdf", title = "Descargar PDF" }) {
  const [isGenerating, setIsGenerating] = createSignal(false);

  const generatePDF = async () => {
    if (typeof window !== "undefined") {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      setIsGenerating(true);

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
      doc.text("Talla", margin + 100, cursorY); // Más espacio a la derecha
      doc.text("Cantidad", margin + 125, cursorY);
      doc.text("Subtotal", margin + 160, cursorY);
      cursorY += 18; // Espaciado después de la cabecera

      // Iterar sobre los productos
      let total = 0;
      favorites().forEach((product) => {
        product.compra.forEach((compra) => {
          const ogImage = product.ogimage || ""; // Ruta de la imagen
          const subtotal = compra.cantidad * product.price;
          total += subtotal;

          // Agregar imagen del producto
          if (ogImage) {
            doc.addImage(ogImage, "JPEG", margin, cursorY - 10, 15, 15);
          }

          // Nombre del producto
          const productName = product.name.length > 30
            ? doc.splitTextToSize(product.name, 70)
            : product.name;

          doc.setFont("helvetica", "normal");
          doc.text(productName, margin + 20, cursorY);

          // Talla, Cantidad y Subtotal
          doc.text(compra.talla, margin + 105, cursorY); // Separada de "Producto"
          doc.text(String(compra.cantidad), margin + 135, cursorY);
          doc.setFont("helvetica", "bold"); // Subtotal en negrita
          doc.text(`$${subtotal.toLocaleString("es-ES")}`, margin + 160, cursorY);

          cursorY += productName.length > 1 ? 20 : 15; // Espaciado dinámico

          // Crear nueva página si es necesario
          if (cursorY > doc.internal.pageSize.height - margin - 20) {
            doc.addPage();
            cursorY = margin + 10;
          }
        });
      });

      // Total al final
      cursorY += 10; // Espaciado adicional antes del total
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Total: ", margin + 130, cursorY); // Texto "Total" en negro y negrita
      doc.setTextColor(0, 128, 0); // Verde para el monto
      doc.text(`$${total.toLocaleString("es-ES")}`, margin + 155, cursorY); // Monto total

      try {
        doc.save(fileName);
      } catch (error) {
        console.error("Error generando el PDF:", error);
        alert("Ocurrió un error al generar el PDF. Intenta nuevamente.");
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <button
      class="w-full py-3 h-12 flex items-center justify-center text-lg border-2 border-black text-black font-semibold rounded-lg hover:bg-gray-100 focus:ring focus:ring-gray-300 transition"
      onClick={generatePDF}
      disabled={isGenerating()}
    >
      {isGenerating() ? "Generando PDF..." : title}
    </button>
  );
}
