// ProductDetail.jsx
import { createSignal, onMount } from "solid-js";
import AddToLocalStorage from "./buttons/AddToLocalStorage";
import { products } from '../data/products';

export default function ProductDetail(props) {
  const { product } = props;

  const [selectedSize, setSelectedSize] = createSignal(null);
  const [selectedQuantity, setSelectedQuantity] = createSignal(1);
  const [dynamicStock, setDynamicStock] = createSignal(
    // Inicializamos el stock directamente
    product.sizes.reduce((acc, size) => {
      acc[size.size] = size.stock;
      return acc;
    }, {})
  );

  // Simplificamos la función de stock
  const getSelectedStock = () => {
    const size = selectedSize();
    return size ? dynamicStock()[size] || 0 : 0;
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedQuantity(1);
  };

  const updateQuantity = (delta) => {
    setSelectedQuantity(prev =>
      Math.min(Math.max(prev + delta, 1), getSelectedStock())
    );
  };

  // Movemos el cálculo del localStorage a onMount
  onMount(() => {
    try {
      const storedProducts = JSON.parse(localStorage.getItem("favorites")) || [];
      const storedProduct = storedProducts.find(p => p.slug === product.slug);

      if (storedProduct) {
        setDynamicStock(prev => {
          const updated = { ...prev };
          storedProduct.compra.forEach(({ talla, cantidad }) => {
            updated[talla] = Math.max((prev[talla] || 0) - cantidad, 0);
          });
          return updated;
        });
      }

      window.addEventListener("favorites-updated", () => {
        const products = JSON.parse(localStorage.getItem("favorites")) || [];
        const prod = products.find(p => p.slug === product.slug);

        if (prod) {
          setDynamicStock(prev => {
            const updated = { ...prev };
            prod.compra.forEach(({ talla, cantidad }) => {
              updated[talla] = Math.max((updated[talla] || 0) - cantidad, 0);
            });
            return updated;
          });
        }
      });
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  });

  // Encuentra los “hermanos” (otros slugs con el mismo name)
  const isBlack = (hex) => hex.toLowerCase() === '#000000';
  const colorVariants = products.filter(
    (p) => p.name === product.name && p.slug !== product.slug
  );

  const totalColors = 1 + colorVariants.filter(variant =>
    variant.sizes.some(size => size.stock > 0)
  ).length;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (




<div class="space-y-6">
  {/* Encabezado */}
  <header class="space-y-2 text-center">
    <h1 class="text-2xl font-bold">{product.name} - {capitalizeFirstLetter(product.color)}</h1>
    <p class="text-2xl font-medium text-gray-900">${product.price.toLocaleString("es-ES")}</p>
  </header>

    {/* Mostrar el color actual y variantes */}
    <section class="space-y-3">
    <div class="mt-6 flex flex-col items-center justify-center">
    <p class="text-sm font-medium text-gray-700 mb-3">
      {totalColors === 1 ? 'Color disponible' : 'Colores disponibles'}
    </p>

    <div class="flex items-center justify-center gap-3">
    {/* Color actual con SVG */}
    <div
      class="relative w-8 h-8"
      title={`Color actual: ${capitalizeFirstLetter(product.color)}`}
    >
      <div
        class={`relative w-full h-full rounded-full border-2 flex items-center justify-center
          ${isBlack(product.colorHex) ? 'border-white' : 'border-neutral-900'}`}
        style={{ "background-color": product.colorHex }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          class="absolute"
        >
          <g
            fill="none"
            stroke={isBlack(product.colorHex) ? '#fff' : '#000'}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          >
            <path d="M7.4 7H4.6a.6.6 0 0 0-.6.6v8.8a.6.6 0 0 0 .6.6h2.8a.6.6 0 0 0 .6-.6V7.6a.6.6 0 0 0-.6-.6m12 0h-2.8a.6.6 0 0 0-.6.6v8.8a.6.6 0 0 0 .6.6h2.8a.6.6 0 0 0 .6-.6V7.6a.6.6 0 0 0-.6-.6"/>
            <path d="M1 14.4V9.6a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6H1.6a.6.6 0 0 1-.6-.6m22 0V9.6a.6.6 0 0 0-.6-.6h-1.8a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6h1.8a.6.6 0 0 0 .6-.6M8 12h8"/>
          </g>
        </svg>
      </div>
    </div>

    {/* Variantes de color */}
    {colorVariants
      .filter(variant => variant.sizes.some(size => size.stock > 0))
      .map((variant) => (
        <a
          href={`/producto/${variant.slug}`}
          class="w-8 h-8 rounded-full border border-neutral-900/20 transition-all hover:scale-110"
          style={{ "background-color": variant.colorHex }}
          title={`Ver en color ${capitalizeFirstLetter(variant.color)}`}
        />
      ))}
  </div>
    </div>
    </section>

      {/* Descripción sin hover en el summary */}
    <details class="group">
        <summary class="flex justify-between items-center cursor-pointer list-none p-4 bg-gray-50 rounded-lg">
          <span class="text-lg font-semibold text-gray-700">Descripción</span>
          <svg
            class="w-5 h-5 transition-transform duration-200 group-open:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div class="mt-4 px-4">
          <p class="text-gray-700 leading-relaxed">{product.description}</p>
          <a
            href={product.link}
            target="_blank"
            class="inline-block mt-4 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            Ver en Gymshark
          </a>
        </div>
    </details>

      {/* Stock disponible con texto condicional para unidades */}
    <section class="space-y-6">

      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-sm font-medium text-gray-700">Stock Disponible</p>
        <p class="mt-1 text-sm font-semibold text-gray-900">
          {selectedSize()
            ? `${getSelectedStock()} ${getSelectedStock() === 1 ? 'unidad' : 'unidades'}`
            : "Selecciona una talla"
          }
        </p>
      </div>

      {/* Selector de tallas centrado */}
      <div>
      <div class="w-full text-center">
        <p class="text-sm font-medium text-gray-700 mb-3">Tallas</p>
        <div class="flex flex-wrap justify-center gap-3">
          {product.sizes.map((sz) => (
            <button
              class={`min-w-[3rem] px-4 py-2.5 rounded-lg transition-all duration-200 font-medium
                ${sz.size === selectedSize()
                  ? "bg-black text-white scale-105 shadow-lg"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                } ${dynamicStock()[sz.size] === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
                }`}
              onClick={() => dynamicStock()[sz.size] > 0 && handleSizeChange(sz.size)}
              disabled={dynamicStock()[sz.size] === 0}
            >
              {sz.size}
            </button>
          ))}
        </div>
      </div>
      </div>
      {/* Selector de cantidad centrado */}
      {selectedSize() && (
        <div class="w-full text-center">
          <p class="text-sm font-medium text-gray-700 mb-3">Cantidad</p>
          <div class="flex items-center justify-center space-x-6">
            <button
              class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => updateQuantity(-1)}
              disabled={selectedQuantity() <= 1}
            >
              <span class="text-xl font-medium">-</span>
            </button>
            <span class="w-12 text-center text-lg font-medium">{selectedQuantity()}</span>
            <button
              class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => updateQuantity(1)}
              disabled={selectedQuantity() >= getSelectedStock()}
            >
              <span class="text-xl font-medium">+</span>
            </button>
          </div>
        </div>
      )}
    </section>









      <div class="w-full flex justify-center">
        <AddToLocalStorage
          product={product}
          seleccion={() => ({
            talla: selectedSize(),
            cantidad: selectedQuantity()
          })}
          onAddToCart={(talla, cantidad) => {
            setDynamicStock(prev => ({
              ...prev,
              [talla]: Math.max((prev[talla] || 0) - cantidad, 0)
            }));
          }}
        />
      </div>
    </div>
  );
}