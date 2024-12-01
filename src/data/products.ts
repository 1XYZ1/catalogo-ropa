// src/data/products.ts

// Interfaz para los productos
export interface Product {
  name: string;
  slug: string;
  image: string;
  price: number;
  description: string;
}

// Lista de productos
export const products: Product[] = [
  {
    name: 'Polera gris manga larga',
    image: '/images/GRIS/crest-grey-1.webp',
    price: 25000,
    slug: 'polera-gris-manga-larga',
    description: 'Polera gris manga larga con el logo de la marca en el pecho.',
  },
  {
    name: 'Polera negra manga larga',
    image: '/images/NEGRO/crest-negro-1.webp',
    price: 25000,
    slug: 'polera-gris-manga-larga',
    description: 'Polera gris manga larga con el logo de la marca en el pecho.'
  },
  {
    name: 'Polera blanca manga larga',
    image: '/images/BLANCO/crest-white-1.webp',
    price: 25000,
    slug: 'polera-gris-manga-larga',
    description: 'Polera gris manga larga con el logo de la marca en el pecho.'
  },
  // Agrega más productos según tus imágenes
];
