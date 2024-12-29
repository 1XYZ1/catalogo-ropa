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

      const margin = 4;
      const marginTop = 20;
      const colProducto = margin + 25;
      const colColor = margin + 75;
      const colTalla = margin + 110;
      const colCant = margin + 130;
      const colPrecio = margin + 150;
      const colTotal = margin + 180;

      let cursorY = marginTop;
      let totalFinal = 0;

      // Título del PDF
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("Resumen Favoritos", doc.internal.pageSize.width / 2, cursorY, { align: "center" });
      cursorY += 25;

      // Cabecera de la tabla
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setFillColor(240);
      doc.rect(margin, cursorY - 8, doc.internal.pageSize.width - 2 * margin, 12, "F");
      doc.text("Producto", colProducto, cursorY);
      doc.text("Color", colColor, cursorY);
      doc.text("Talla", colTalla, cursorY);
      doc.text("Cant.", colCant, cursorY);
      doc.text("Precio", colPrecio, cursorY);
      doc.text("Total", colTotal, cursorY);
      cursorY += 18;

      // Iterar sobre los productos
      favorites().forEach((product) => {
        product.compra.forEach((compra) => {
          const ogImage = product.ogimage || "";
          const precioUnitario = product.discount > 0
            ? product.price * (1 - product.discount/100)
            : product.price;
          const precioTotal = compra.cantidad * precioUnitario;

          totalFinal += precioTotal;

          // Imagen del producto
          if (ogImage) {
            doc.addImage(ogImage, "JPEG", margin, cursorY - 10, 15, 15);
          }

          // Información del producto
          doc.setFontSize(11);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(0);

          // Nombre del producto con límite de ancho
          const productName = doc.splitTextToSize(product.name, 45);
          doc.text(productName, colProducto, cursorY);

          // Color con manejo de texto largo
          const color = product.color;
          if (color.length > 12) {
            const colorLines = doc.splitTextToSize(color, 30);
            doc.text(colorLines, colColor, cursorY);
          } else {
            doc.text(color, colColor, cursorY);
          }

          doc.text(compra.talla, colTalla, cursorY);
          doc.text(String(compra.cantidad), colCant, cursorY);

          // Precios
          if (product.discount > 0) {
            // Precio original tachado
            doc.setTextColor(128, 128, 128);
            doc.text(`$${product.price.toLocaleString("es-ES")}`, colPrecio, cursorY);
            doc.line(colPrecio, cursorY - 1, colPrecio + 15, cursorY - 1);

            // Precio con descuento
            doc.setTextColor(220, 38, 38);
            doc.setFont("helvetica", "bold");
            doc.text(`$${precioUnitario.toLocaleString("es-ES")}`, colPrecio, cursorY + 5);
            doc.text(`$${precioTotal.toLocaleString("es-ES")}`, colTotal, cursorY);

            // Etiqueta de descuento
            doc.setFontSize(8);

            cursorY += 15;
          } else {
            doc.setTextColor(0);
            doc.setFont("helvetica", "bold");
            doc.text(`$${precioUnitario.toLocaleString("es-ES")}`, colPrecio, cursorY);
            doc.text(`$${precioTotal.toLocaleString("es-ES")}`, colTotal, cursorY);
            cursorY += 15;
          }

          if (cursorY > doc.internal.pageSize.height - margin - 20) {
            doc.addPage();
            cursorY = margin + 10;
          }
        });
      });

      // Total a pagar
      cursorY += 10;
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);

      const totalStartX = colPrecio - 20;
      doc.text("Total a pagar:", totalStartX, cursorY);
      doc.setTextColor(0, 128, 0);
      doc.text(`$${totalFinal.toLocaleString("es-ES")}`, colTotal, cursorY);

      try {
        await doc.save(fileName);
      } catch (error) {
        console.error("Error generando el PDF:", error);
        alert("Ocurrió un error al generar el PDF. Intenta nuevamente.");
      } finally {
        setIsGenerating(false);
        setTimeout(() => setModalVisible(false), 3000);
      }
    }
  };

  return (
    <>
      <button
        class={`w-full py-3 h-12 flex items-center justify-center text-lg border-2 border-black text-black font-semibold rounded-lg hover:bg-gray-100 focus:ring focus:ring-gray-300 transition ${
          isGenerating() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={generatePDF}
        disabled={isGenerating()}
      >
        {isGenerating() ? "Generando PDF..." : title}
      </button>

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