import { createSignal, onMount, createMemo } from "solid-js";
import { createStore } from "solid-js/store"; // Importamos createStore

import { formatPrice, calculateDiscountedPrice, capitalizeFirstLetter } from '../../utils/formatters';
import SendToWhatsApp from "../buttons/SendToWhatsapp";
import GeneratePDF from "../buttons/GeneratePdf";

export default function FavoritesPage() {


  // Reemplazamos el createSignal por createStore para favorites
  const [favorites, setFavorites] = createStore([]);
  const [selectedSize, setSelectedSize] = createSignal({});
  const [quantities, setQuantities] = createSignal({});

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
          // Calcula el precio con descuento si existe
          const precioUnitario = product.discount > 0
            ? product.price * (1 - product.discount / 100) // Aplica el descuento
            : product.price;

          const subtotalPorTalla = compra.cantidad * precioUnitario;
          return subtotal + subtotalPorTalla;
        }, 0);

        acc.total += totalPerProduct;
        acc.details.push({
          name: product.name,
          color: product.color,
          compra: product.compra,
          price: product.price,
          discount: product.discount,
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
                <div class="p-4 flex-1 space-y-3 text-center">
                <div class="flex-1 space-y-2 text-center"> {/* Añadido text-center */}
      <h3 class="font-medium text-gray-800 text-lg leading-tight line-clamp-2 group-hover:text-black" title={product.name}>
        {product.name}
      </h3>
      {product.color && (
        <p class="text-sm text-gray-500">
          Color: <span class="text-gray-700">{capitalizeFirstLetter(product.color)}</span>
        </p>
      )}
    </div>
  <div class="h-14 flex flex-col items-center justify-center">
    {product.discount > 0 ? (
      <div class="space-y-1">
        <div class="flex items-center justify-center gap-2">
  <span class="text-xl font-bold text-gray-400 line-through">
    ${formatPrice(product.price)}
  </span>
  <span class="text-xl font-bold text-red-500">
    ${formatPrice(calculateDiscountedPrice(product.price, product.discount))}
  </span>
</div>
        <span class="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
          {product.discount}% OFF
        </span>
      </div>
    ) : (
<div class="flex items-center justify-center gap-2">
<span class="text-xl font-bold text-gray-900">
    ${formatPrice(product.price)}
  </span>
</div>


    )}
  </div>
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

        <div class="bg-white shadow rounded-lg p-6">
  <h2 class="text-2xl font-bold text-center mb-6">Resumen de Favoritos</h2>

  {/* Versión Desktop */}
  <div class="hidden md:block overflow-x-auto">
    <table class="w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-1 py-3 text-left text-sm font-semibold text-gray-900">Producto</th>
          <th class="px-1 py-3 text-left text-sm font-semibold text-gray-900">Color</th>
          <th class="px-2 py-3 text-center text-sm font-semibold text-gray-900">Talla</th>
          <th class="px-2 py-3 text-center text-sm font-semibold text-gray-900">Cantidad</th>
          <th class="px-2 py-3 text-right text-sm font-semibold text-gray-900">Subtotal</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {summary().details.map((detail) =>
          detail.compra.map((compra) => (
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="px-1 py-3 text-sm text-gray-900">{detail.name}</td>
              <td class="px-1 py-3 text-sm text-gray-900">{capitalizeFirstLetter(detail.color)}</td>
              <td class="px-2 py-3 text-sm text-gray-900 text-center">{compra.talla}</td>
              <td class="px-2 py-3 text-sm text-gray-900 text-center">{compra.cantidad}</td>
              <td class="px-2 py-3 text-right">
                {detail.discount > 0 ? (
                  <div class="flex flex-col items-end">
                    <span class="text-sm text-gray-500 line-through">
                      ${(compra.cantidad * detail.price).toLocaleString("es-ES")}
                    </span>
                    <span class="text-sm font-medium text-red-500">
                      ${(compra.cantidad * detail.price * (1 - detail.discount/100)).toLocaleString("es-ES")}
                    </span>

                  </div>
                ) : (
                  <span class="text-sm font-medium text-gray-900">
                    ${(compra.cantidad * detail.price).toLocaleString("es-ES")}
                  </span>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

{/* Versión Mobile: Cards */}
<div class="md:hidden space-y-4">
  {summary().details.map((detail) =>
    detail.compra.map((compra) => (

      <div class="bg-gray-50 rounded-lg p-4">
        {/* Nombre del producto */}
        <h3 class="font-semibold text-gray-900 text-base mb-3">
          {detail.name}
        </h3>

        <div class="flex justify-between">
          {/* Columna izquierda: Detalles */}
          <div class="space-y-1.5">
            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-500">Talla:</span>
              <span class="font-medium text-gray-900">{compra.talla}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-500">Color:</span>
              <span class="font-medium text-gray-900">{capitalizeFirstLetter(detail.color)}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-500">Precio unidad:</span>
              <span class="font-medium text-gray-900">{formatPrice(calculateDiscountedPrice(detail.price, detail.discount))}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-500">Cant:</span>
              <span class="font-medium text-gray-900">{compra.cantidad}</span>
            </div>
          </div>

          {/* Columna derecha: Precios */}
          <div class="text-right">
            <span class="text-xs text-gray-500 block mb-1">Subtotal</span>
            {detail.discount > 0 ? (
              <>
                <span class="text-sm text-gray-500 line-through block">
                  ${formatPrice(compra.cantidad * detail.price)}
                </span>
                <span class="font-bold text-lg text-red-500 block">
                  ${formatPrice(compra.cantidad * calculateDiscountedPrice(detail.price, detail.discount))}
                </span>
                <span class="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full inline-block mt-1">
                  {detail.discount}% OFF
                </span>
              </>
            ) : (
              <span class="font-bold text-lg text-gray-900 block">
                ${formatPrice(compra.cantidad * detail.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    ))
  )}
</div>

  {/* Total  */}

  <div class="mt-6 pt-6 border-t border-gray-200 space-y-6">
    <div class="flex justify-between items-center">
      <span class="text-base font-semibold text-gray-900">Total a pagar</span>
      <span class="text-2xl font-bold text-green-600">
        ${summary().total.toLocaleString("es-ES")}

      </span>
    </div>

      {/* Botones  */}
    <div class="flex flex-col gap-3">
      <SendToWhatsApp
        summary={summary}
        class="w-full"
      />
      <GeneratePDF
        favorites={() => favorites}
        fileName="resumen_favoritos.pdf"
        class="w-full"
      />
    </div>
  </div>
</div>
</div>
        </div>
      </div>

  );
}
