import { createSignal } from "solid-js";
import AddToLocalStorage from "./buttons/AddToLocalStorage";

export default function ProductDetail(props) {
  const { product } = props;

  // Estado para la talla seleccionada
  const initialSize = product.sizes.find((s) => s.stock > 0)?.size ?? product.sizes[0].size;
  const [selectedSize, setSelectedSize] = createSignal(initialSize);

  // Estado para la cantidad seleccionada
  const [selectedQuantity, setSelectedQuantity] = createSignal(1);

  // Función para obtener stock de la talla seleccionada
  function getSelectedStock() {
    const sizeObj = product.sizes.find((s) => s.size === selectedSize());
    return sizeObj ? sizeObj.stock : 0;
  }

  // Función para manejar la actualización de cantidad
  const updateQuantity = (delta) => {
    const newQuantity = Math.min(
      Math.max(selectedQuantity() + delta, 1), // Mínimo 1
      getSelectedStock() // Máximo según stock
    );
    setSelectedQuantity(newQuantity);
  };

  return (
    <div>
      {/* Detalles del producto */}
      <h2 class="text-3xl font-bold mb-3">{product.name}</h2>
      <p class="text-2xl text-gray-800 mb-4">Precio: ${product.price.toLocaleString("es-ES")}</p>

      {/* Descripción */}
      <details class="group border-t pt-4">
        <summary class="flex justify-between items-center cursor-pointer list-none">
          <span class="text-lg font-semibold text-gray-700">Descripción</span>
          <svg
            class="w-5 h-5 transition-transform duration-200 group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </summary>
        <p class="mt-3 text-gray-700">{product.description}</p>
      </details>

      {/* Disponibilidad y Tallas */}
      <section aria-labelledby="availability-and-sizes" class="mt-6">
        <h3 id="availability-and-sizes" class="sr-only">Disponibilidad y Tallas</h3>
        <dl class="grid grid-cols-1 gap-x-4 gap-y-2">
          {/* Stock */}
          <div>
            <dt class="text-sm font-medium text-gray-500">Stock Disponible</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {getSelectedStock() > 0 ? `${getSelectedStock()} unidades` : "Agotado"}
            </dd>
          </div>

          {/* Tallas */}
          <div>
            <dt class="text-sm font-medium text-gray-500">Tallas Disponibles</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <div class="flex space-x-2">
                {product.sizes.map((sz) => (
                  <button
                    class={`px-3 py-1 rounded border transition-colors duration-200 ${
                      sz.size === selectedSize()
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-800 border-gray-300"
                    } ${
                      sz.stock === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-blue-600 active:bg-blue-700"
                    }`}
                    onClick={() => sz.stock > 0 && setSelectedSize(sz.size)}
                  >
                    {sz.size}
                  </button>
                ))}
              </div>
            </dd>
          </div>

          {/* Cantidad */}
          <div>
            <dt class="text-sm font-medium text-gray-500">Cantidad</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <div class="flex items-center space-x-2">
                {/* Botón para disminuir */}
                <button
                  class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 active:bg-gray-400"
                  onClick={() => updateQuantity(-1)}
                  disabled={selectedQuantity() <= 1}
                >
                  -
                </button>

                {/* Cantidad actual */}
                <span class="px-3 py-1 border rounded text-center w-12">
                  {selectedQuantity()}
                </span>

                {/* Botón para aumentar */}
                <button
                  class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 active:bg-gray-400"
                  onClick={() => updateQuantity(1)}
                  disabled={selectedQuantity() >= getSelectedStock()}
                >
                  +
                </button>
              </div>
            </dd>
          </div>

          {/* Medidas */}
          <div>
            <dt class="text-sm font-medium text-gray-500">Medidas</dt>
            <dd class="mt-1 text-sm text-gray-900">{product.measurements}</dd>
          </div>
        </dl>
      </section>

      {/* Botón para agregar a favoritos */}
      <div class="flex justify-center items-start mt-10">
        <AddToLocalStorage
          product={product}
          seleccion={{ talla: selectedSize(), cantidad: selectedQuantity() }}
        />
      </div>
    </div>
  );
}
