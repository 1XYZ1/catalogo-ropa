// src/data/products.ts

// Interfaz para los productos
export interface Product {
  name: string;
  slug: string;
  images: string[];
  price: number;
  description: string;
  stock: number;
  sizes: string[];
  measurements?: string;
}

// Lista de productos
export const products: Product[] = [
  {
    name: 'Polera gris manga larga',
    price: 25000,
    slug: 'polera-gris-manga-larga',
    description: 'Polera gris manga larga con el logo de la marca en el pecho.',
    images: ['/images/GRIS/crest-grey-1.webp','/images/GRIS/crest-grey-2.webp' ],
    stock: 10,
    sizes: ['S', 'M', 'L', 'XL'],

  },
  {
    name: 'Polera negra manga larga',
    price: 25000,
    slug: 'polera-negra-manga-larga',
    description: 'Polera gris manga larga con el logo de la marca en el pecho.',
    images: ['/images/NEGRO/crest-negro-1.webp','/images/NEGRO/crest-negro-2.webp' ],
    stock: 10,
    sizes: ['S', 'M', 'L', 'XL'],
    measurements: 'Medidas: S: 50x70cm, M: 53x72cm, L: 56x74cm, XL: 59x76cm'
  },
  {
    name: 'Polera blanca manga larga',
    price: 25000,
    slug: 'polera-blanca-manga-larga',
    description: 'Polera gris manga larga con el logo de la marca en el pecho.',
    images: ['/images/BLANCO/crest-white-1.webp','/images/BLANCO/white-grey-2.webp' ],
    stock: 10,
    sizes: ['S', 'M', 'L', 'XL'],
    measurements: 'Medidas: S: 50x70cm, M: 53x72cm, L: 56x74cm, XL: 59x76cm'
  },
  // Agrega más productos según tus imágenes
];
