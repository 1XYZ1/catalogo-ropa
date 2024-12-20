import { createMemo } from "solid-js";
import SendToWhatsApp from "../components/buttons/SendToWhatsapp";
import GeneratePDF from "../components/buttons/GeneratePdf";

export default function SummaryComponent({ favorites }) {
  // Calcular el resumen del pago total dinámicamente
  const summary = createMemo(() => {
    return favorites().reduce(
      (acc, product) => {
        const totalPerProduct = product.compra.reduce((subtotal, compra) => {
          const subtotalPorTalla = compra.cantidad * product.price;
          return subtotal + subtotalPorTalla;
        }, 0);

        acc.total += totalPerProduct;
        acc.details.push({
          name: product.name,
          compra: product.compra,
          price: product.price,
        });
        return acc;
      },
      { total: 0, details: [] }
    );
  });

  return (
    <div id="summary-content" class="md:col-span-1 lg:col-span-2 bg-white shadow rounded-lg p-4 sm:p-6 md:p-8">
      <h2 id="pdf-title" class="text-2xl font-bold mb-6 text-center border-b pb-4">Resumen de Favoritos</h2>
      <div class="w-full">
        <table class="w-full border-collapse text-center bg-white">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-2 px-2 md:px-1 lg:px-2 text-gray-700 font-semibold border-b">Producto</th>
              <th class="py-2 px-2 md:px-1 lg:px-2 text-gray-700 font-semibold border-b">Talla</th>
              <th class="py-2 px-2 md:px-1 lg:px-2 text-gray-700 font-semibold border-b">Cantidad</th>
              <th class="py-2 px-2 md:px-1 lg:px-2 text-gray-700 font-semibold border-b">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {summary().details.map((detail) =>
              detail.compra.map((compra, index) => (
                <tr
                  key={`${detail.name}-${compra.talla}`}
                  class={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td class="py-2 px-2 md:px-0 lg:px-2 text-gray-800 font-medium border-b">{detail.name}</td>
                  <td class="py-2 px-2 md:px-0 lg:px-2 text-gray-700 border-b">{compra.talla}</td>
                  <td class="py-2 px-2 md:px-0 lg:px-2 text-gray-700 border-b">{compra.cantidad}</td>
                  <td class="py-2 px-2 md:px-0 lg:px-2 text-gray-800 font-bold border-b">
                    ${(compra.cantidad * detail.price).toLocaleString("es-ES")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <hr class="my-6" />
      <p class="text-lg font-bold text-center">
        Total a pagar: $
        <span class="text-green-600">{summary().total.toLocaleString("es-ES")}</span>
      </p>

      <div class="mt-10 flex flex-col gap-4 exclude-from-pdf">
        {/* Puedes agregar más funcionalidades aquí si lo necesitas */}

      <SendToWhatsApp summary={summary} />
      <GeneratePDF favorites={favorites} fileName="resumen_favoritos.pdf" title="Descargar PDF" />


      </div>
    </div>
  );
}
