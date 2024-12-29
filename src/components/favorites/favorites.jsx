import { createSignal, onMount, createMemo, onCleanup } from "solid-js";
import { createStore } from "solid-js/store"; // Importamos createStore

import { formatPrice, calculateDiscountedPrice, capitalizeFirstLetter } from '../../utils/formatters';
import SendToWhatsApp from "../buttons/SendToWhatsapp";
import GeneratePDF from "../buttons/GeneratePdf";

export default function FavoritesPage() {


  // Reemplazamos el createSignal por createStore para favorites
  const [favorites, setFavorites] = createStore([]);
  const [selectedSize, setSelectedSize] = createSignal({});
  const [quantities, setQuantities] = createSignal({});
  const [showConfirmDialog, setShowConfirmDialog] = createSignal(false);
const [itemToRemove, setItemToRemove] = createSignal(null);


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  // Validación de datos
  const validateFavorites = (data) => {
    return Array.isArray(data) &&
      data.every(item =>
        item.slug &&
        item.name &&
        Array.isArray(item.sizes) &&
        Array.isArray(item.compra)
      );
  };

  // Guardar favoritos con manejo de errores mejorado
  const saveFavorites = (favorites) => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      window.dispatchEvent(new Event("favorites-updated"));
      return true;
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
      // Aquí podrías implementar una notificación al usuario
      return false;
    }
  };

  // Cargar favoritos con validación y manejo de errores
  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        const parsedFavorites = JSON.parse(stored);
        if (validateFavorites(parsedFavorites)) {
          setFavorites(parsedFavorites);

          // Inicializar tallas y cantidades
          const initialSizes = {};
          const initialQuantities = {};

          parsedFavorites.forEach((product) => {
            initialSizes[product.slug] = product.compra[0]?.talla || product.sizes[0]?.size || "";
            initialQuantities[product.slug] = {};
            product.compra.forEach((compra) => {
              initialQuantities[product.slug][compra.talla] = compra.cantidad;
            });
          });

          setSelectedSize(initialSizes);
          setQuantities(initialQuantities);
        } else {
          console.warn('Datos de favoritos inválidos');
          setFavorites([]);
        }
      }
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      setFavorites([]);
      // Aquí podrías implementar una notificación al usuario
    }
  };

  // Inicialización y configuración de eventos
  onMount(() => {
    loadFavorites();

    // Escuchar cambios en otras pestañas
    window.addEventListener('storage', (e) => {
      if (e.key === 'favorites') {
        loadFavorites();
      }
    });

    // Escuchar cambios en la misma pestaña
    window.addEventListener('favorites-updated', () => {
      loadFavorites();
    });

    // Limpiar listeners al desmontar
    onCleanup(() => {
      window.removeEventListener('storage', loadFavorites);
      window.removeEventListener('favorites-updated', loadFavorites);
    });
  });

  // Eliminar un producto de favoritos
  const removeFavorite = (slug) => {
    setFavorites(f => f.filter(product => product.slug !== slug));
    if (!saveFavorites(favorites)) {
      // Si falla el guardado, podrías mostrar un mensaje de error
      console.error('Error al eliminar el producto de favoritos');
    }
  };

  const handleRemoveFavorite = (slug) => {
    setItemToRemove(slug);
    setShowConfirmDialog(true);
  };

  const confirmRemove = () => {
    const slug = itemToRemove();
    setFavorites(f => f.filter(product => product.slug !== slug));
    if (!saveFavorites(favorites)) {
      console.error('Error al eliminar el producto de favoritos');
    }
    setShowConfirmDialog(false);
    setItemToRemove(null);
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

      // Si es la última talla y quiere reducir a 0, mostrar modal de eliminar
      if (newQty <= 0 && product.compra.length === 1) {
        handleRemoveFavorite(slug);
        return;
      }

      // Si no es la última talla y quiere reducir a 0, eliminar la talla
      if (newQty <= 0) {
        setFavorites(
          productIndex,
          "compra",
          c => c.filter(item => item.talla !== talla)
        );
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
                class="flex flex-col border rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 h-full relative max-h-[1000px]"
              >

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
    handleRemoveFavorite(product.slug);
  }}
>
  ✕
</button>

{showConfirmDialog() && (
  <div
    class="fixed inset-0 flex items-center justify-center"
    style={{
      "background-color": "rgba(0, 0, 0, 0.75)",
      "z-index": "999999",
      "position": "fixed",
      "top": "0",
      "left": "0",
      "right": "0",
      "bottom": "0",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "isolation": "isolate"
    }}
    onClick={() => setShowConfirmDialog(false)}
  >
    <div
      class="bg-white p-6 rounded-lg shadow-xl"
      style={{
        "z-index": "1000000",
        "position": "relative",
        "width": "90%",
        "max-width": "320px"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div class="text-center">
        <svg
          class="mx-auto mb-4 w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          ¿Eliminar de favoritos?
        </h3>
        <div class="text-sm text-gray-500 mb-4">
          {/* Producto a eliminar */}
          {(() => {
            const product = favorites.find(p => p.slug === itemToRemove());
            if (!product) return null;

            return (
              <>
                <p class="font-medium text-gray-900">{product.name}</p>
                {product.color && (
                  <p class="text-xs mt-1">
                    Color: {capitalizeFirstLetter(product.color)}
                  </p>
                )}
                {/* Mostrar tallas y cantidades */}
                <div class="mt-3 space-y-1">
                  {product.compra.map((item) => (
                    <p class="text-xs">
                      Talla {item.talla}: <span class="font-medium">{item.cantidad} {item.cantidad === 1 ? 'unidad' : 'unidades'}</span>
                    </p>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </div>
      <div class="flex gap-3 justify-center">
        <button
          onClick={() => setShowConfirmDialog(false)}
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Cancelar
        </button>
        <button
          onClick={confirmRemove}
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
)}

                </div>

<div class="p-4 flex-1 space-y-3 text-center">
  {/* Info básica del producto */}
  <div class="flex-1 space-y-2">
    <h3 class="font-medium text-gray-800 text-lg leading-tight line-clamp-2">
      {product.name}
    </h3>
    {product.color && (
      <p class="text-sm text-gray-500">
        Color: <span class="text-gray-700">{capitalizeFirstLetter(product.color)}</span>
      </p>
    )}
  </div>

  {/* Precio con descuento */}
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
      <span class="text-xl font-bold text-gray-900">
        ${formatPrice(product.price)}
      </span>
    )}
  </div>

  {/* Nueva sección de gestión de tallas */}
  {/* Nueva sección de gestión de tallas */}


  <div class="border rounded-lg p-3 bg-gray-50">
  {/* Selector de tallas con botones - Ahora arriba y más compacto */}
  <div class="flex items-center justify-between mb-2">
    <div class="flex gap-1.5">
      {product.sizes.map((size) => {
        const isSelected = selectedSize()[product.slug] === size.size;
        const hasQuantity = product.compra.some(c => c.talla === size.size);
        return (
          <button
            onClick={() => {
              setSelectedSize(prev => ({ ...prev, [product.slug]: size.size }));
            }}
            disabled={size.stock === 0}
            class={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-colors
              ${isSelected
                ? 'bg-black text-white'
                : hasQuantity
                  ? 'bg-gray-200 text-gray-900'
                  : size.stock > 0
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
          >
            {size.size}
          </button>
        );
      })}
    </div>
    <span class="text-xs text-gray-500">
      Stock: {product.sizes.find(s => s.size === selectedSize()[product.slug])?.stock || 0}
    </span>
  </div>

  {/* Control de cantidad - Más compacto */}
  <div class="flex items-center justify-between bg-white rounded-lg border shadow-sm p-2">
    <span class="text-sm font-medium text-gray-800 ml-2">
      Talla {selectedSize()[product.slug] || "---"}
    </span>
    <div class="flex items-center gap-2">
      <button
        class="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 text-sm"
        onClick={() => updateQuantity(product.slug, selectedSize()[product.slug], -1)}
        disabled={!selectedSize()[product.slug] || !product.compra.some(c => c.talla === selectedSize()[product.slug])}
      >
        -
      </button>
      <span class="text-sm font-medium w-6 text-center">
        {product.compra.find(c => c.talla === selectedSize()[product.slug])?.cantidad || 0}
      </span>
      <button
        class="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 text-sm"
        onClick={() => updateQuantity(product.slug, selectedSize()[product.slug], 1)}
        disabled={
          !selectedSize()[product.slug] ||
          (product.compra.find(c => c.talla === selectedSize()[product.slug])?.cantidad || 0) >=
          (product.sizes.find(s => s.size === selectedSize()[product.slug])?.stock || 0)
        }
      >
        +
      </button>
    </div>
  </div>
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
