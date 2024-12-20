import { createSignal, onMount, createMemo } from "solid-js";
import { createStore } from "solid-js/store"; // Importamos createStore
import SendToWhatsApp from "../buttons/SendToWhatsapp";
import GeneratePDF from "../buttons/GeneratePdf";

export default function FavoritesPage() {
  // Reemplazamos el createSignal por createStore para favorites
  const [favorites, setFavorites] = createStore([]);
  const [selectedSize, setSelectedSize] = createSignal({});
  const [quantities, setQuantities] = createSignal({});

  // Cargar favoritos y establecer señales iniciales
  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // Usamos setFavorites para establecer el estado inicial
    setFavorites(storedFavorites);

    const initialSizes = {};
    const initialQuantities = {};

    storedFavorites.forEach((product) => {
      initialSizes[product.slug] = product.compra[0]?.talla || product.sizes[0]?.size || "";
      initialQuantities[product.slug] = {};
      product.compra.forEach((compra) => {
        initialQuantities[product.slug][compra.talla] = compra.cantidad;
      });
    });

    setSelectedSize(initialSizes);
    setQuantities(initialQuantities);
  };

  onMount(() => {
    loadFavorites();
  });

  // Eliminar un producto de favoritos
  const removeFavorite = (slug) => {
    // Filtrar sin recrear todo manualmente:
    // createStore soporta asignaciones directas con una nueva array
    setFavorites(f => f.filter(product => product.slug !== slug));
    localStorage.setItem("favorites", JSON.stringify(favorites));

    const event = new Event("favorites-updated");
    window.dispatchEvent(event);
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (slug, talla, delta) => {
    // Buscar el producto y su index
    const productIndex = favorites.findIndex((p) => p.slug === slug);
    if (productIndex === -1) return;

    const product = favorites[productIndex];
    const compraIndex = product.compra.findIndex((c) => c.talla === talla);

    if (compraIndex !== -1) {
      // Existe la talla, actualizamos la cantidad
      const currentQty = product.compra[compraIndex].cantidad;
      let newQty = currentQty + delta;

      // Aplicar las reglas
      if (newQty <= 0 && product.compra.length > 1) {
        // Eliminar la talla
        setFavorites(
          productIndex,
          "compra",
          c => {
            const newCompra = [...c];
            newCompra.splice(compraIndex, 1);
            return newCompra;
          }
        );
      } else if (newQty <= 0 && product.compra.length === 1) {
        // Mantener al menos 1 si es la última talla
        setFavorites(productIndex, "compra", compraIndex, "cantidad", 1);
      } else {
        // Actualizar cantidad normal
        setFavorites(productIndex, "compra", compraIndex, "cantidad", newQty);
      }
    } else if (delta > 0) {
      // No existe la talla, agregamos una nueva
      setFavorites(
        productIndex,
        "compra",
        c => [...c, { talla, cantidad: delta }]
      );
    }

    // Actualizar localStorage después de mutar con createStore
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Actualizar quantities
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      if (!newQuantities[slug]) newQuantities[slug] = {};
      const currentQty = newQuantities[slug][talla] || 0;
      newQuantities[slug][talla] = currentQty + delta;
      return newQuantities;
    });
  };

  // Calcular el resumen del pago total dinámicamente
  const summary = createMemo(() => {
    return favorites.reduce(
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
    <div class="max-w-8xl mx-auto p-4 sm:p-6 lg:p-6 xl:p-8">
      {/* Contenedor principal */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {/* Lista de Productos */}
        <div class="grid gap-4 sm:grid-cols-1 md:col-span-1 lg:col-span-2 xl:col-span-3 lg:grid-cols-2">
          {favorites.length === 0 ? (
            <p class="text-gray-500 text-center">No tienes productos en favoritos.</p>
          ) : (
            favorites.map((product) => (
              <div
                key={product.slug}
                class="flex flex-col border rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 h-full relative max-h-[800px]"
              >
                <a href={`/producto/${product.slug}`} class="absolute inset-0 z-0" />
                <div class="relative z-10">
                  <a href={`/producto/${product.slug}`}>
                    <img
                      loading="lazy"
                      width="300"
                      height="300"
                      src={product.images[0]}
                      alt={product.name}
                      class="w-full h-auto max-h-100 object-cover opacity-0 hover:scale-105 transition-all duration-300"
                      onLoad={(e) => e.target.classList.add("opacity-100")}
                    />
                  </a>
                  <button
                    class="absolute top-2 right-2 bg-transparent text-black text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(product.slug);
                    }}
                  >
                    ✕
                  </button>
                </div>
                <div class="p-4 flex flex-col flex-1">
                  <h3 class="text-lg font-bold text-center mb-2">{product.name}</h3>
                  <p
                    class={`text-sm text-center mb-4 ${
                      product.discount ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    ${product.price.toLocaleString("es-ES")}
                  </p>
                  <div class="mb-4 relative z-20" onClick={(e) => e.stopPropagation()}>
                    <select
                      class="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                      value={selectedSize()[product.slug]}
                      onChange={(e) => {
                        const newSize = e.target.value;

                        // Actualizar la talla seleccionada
                        setSelectedSize((prev) => ({ ...prev, [product.slug]: newSize }));

                        // Sincronizar cantidades si la talla no existe en el estado
                        setQuantities((prev) => {
                          const updatedQuantities = { ...prev };
                          if (!updatedQuantities[product.slug])
                            updatedQuantities[product.slug] = {};
                          if (!updatedQuantities[product.slug][newSize]) {
                            updatedQuantities[product.slug][newSize] = 0;
                          }
                          return updatedQuantities;
                        });
                      }}
                    >
                      {product.sizes.map((size) => (
                        <option
                          key={size.size}
                          value={size.size}
                          disabled={size.stock === 0}
                        >
                          {size.size} {size.stock === 0 ? "(Sin stock)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    class="flex items-center justify-center space-x-4 relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 active:bg-gray-400 transition-all duration-200"
                      onClick={() =>
                        updateQuantity(product.slug, selectedSize()[product.slug], -1)
                      }
                      disabled={
                        quantities()[product.slug]?.[selectedSize()[product.slug]] <= 0 ||
                        (product.compra.length === 1 &&
                          quantities()[product.slug]?.[selectedSize()[product.slug]] === 1)
                      }
                    >
                      -
                    </button>
                    <span class="px-4 py-2 border rounded text-center">
                      {quantities()[product.slug]?.[selectedSize()[product.slug]] || 0}
                    </span>
                    <button
                      class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 active:bg-gray-400 transition-all duration-200"
                      onClick={() =>
                        updateQuantity(product.slug, selectedSize()[product.slug], 1)
                      }
                      disabled={
                        (quantities()[product.slug]?.[selectedSize()[product.slug]] || 0) >=
                        product.sizes.find(
                          (s) => s.size === selectedSize()[product.slug]
                        )?.stock
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resumen del Pago */}
        <div id="summary-content" class="md:col-span-1 lg:col-span-2 rounded-lg p-4 sm:p-6">

          <div class="bg-white shadow rounded-lg p-6 md:p-4 lg:p-6 sm:p-6">
          <h2 id="pdf-title" class="text-2xl font-bold text-center border-b pb-6">Resumen de Favoritos</h2>
          <div class="w-full ">
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

          {/* <hr class="my-6" /> */}
          <p class="text-xl font-bold text-center pt-6">
            Total a pagar: $
            <span class="text-green-600">{summary().total.toLocaleString("es-ES")}</span>
          </p>

          <div class="mt-10 flex flex-col gap-4 exclude-from-pdf">
            <SendToWhatsApp summary={summary} />
            <GeneratePDF favorites={() => favorites} fileName="resumen_favoritos.pdf" title="Descargar PDF" />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
