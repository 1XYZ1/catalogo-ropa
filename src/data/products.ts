// src/data/products.ts

// Interfaz para las tallas
export interface Size {
  size: string;
  stock: number;
}

// Enum para tipos de productos
export enum ProductType {
  SUPERIOR = 'superior',
  INFERIOR = 'inferior',
  ACCESORIO = 'accesorio'
}

// Interfaz para los productos
export interface Product {
  description: string;
  discount?: boolean;
  gender?: 'hombre' | 'mujer' | 'unisex';
  images: string[];
  ogimage?: string;
  link?: string;
  measurements?: string;
  name: string;
  price: number;
  shortDescription?: string;
  sizes: Size[];
  slug: string;
  stock: number;
  type?: ProductType;
}

// Lista de productos
export const products: Product[] = [
  {
    description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
    discount: true,
    gender: 'hombre',
    images: ['/images/GRIS/crest-grey-1.webp', '/images/GRIS/crest-grey-2.webp'],
    ogimage: '/images/GRIS/jpg/crest-grey-1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    measurements: 'Largo: 70cm, Ancho: 50cm',
    name: 'Polera gris manga larga',
    price: 29990,
    shortDescription: 'Polera gris manga larga, cómoda y elegante para cualquier ocasión.',
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 0 },
    ],
    slug: 'polera-gris-manga-larga',
    stock: 10,
    type: ProductType.ACCESORIO,
  },
  {
    description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
    discount: true,
    gender: 'hombre',
    images: ['/images/NEGRO/crest-negro-1.webp', '/images/NEGRO/crest-negro-2.webp'],
    ogimage: '/images/NEGRO/jpg/crest-negro-1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    measurements: 'Largo: 70cm, Ancho: 50cm',
    name: 'Polera negra manga larga',
    price: 29990,
    shortDescription: 'Polera negra manga larga, resistente y estilizada para un look casual duradero.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 },
    ],
    slug: 'polera-negra-manga-larga',
    stock: 8,
    type: ProductType.SUPERIOR,
  },
  {
    description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
    gender: 'hombre',
    images: ['/images/BLANCO/crest-white-1.webp', '/images/BLANCO/crest-white-2.webp'],
    ogimage: '/images/BLANCO/jpg/crest-white-1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    measurements: 'Largo: 70cm, Ancho: 50cm',
    name: 'Polera blanca manga larga',
    price: 29990,
    shortDescription: 'Polera blanca manga larga, suave y cómoda para un estilo elegante y casual.',
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 0 },
    ],
    slug: 'polera-blanca-manga-larga',
    stock: 2,
    type: ProductType.SUPERIOR,
  },
  {
    description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
    gender: 'mujer',
    images: ['/images/AZUL_MARINO/crest-navy-1.webp', '/images/AZUL_MARINO/crest-navy-2.webp'],
    ogimage: '/images/AZUL_MARINO/jpg/crest-navy-1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    measurements: 'Largo: 70cm, Ancho: 50cm',
    name: 'Polera navy manga larga',
    price: 29990,
    shortDescription: 'Polera navy manga larga, elegante y duradera para un look casual sofisticado.',
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 0 },
    ],
    slug: 'polera-navy-manga-larga',
    stock: 2,
    type: ProductType.SUPERIOR,
  },
  {
    description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
    gender: 'hombre',
    images: ['/images/AZUL_CLARO/crest-blue-1.webp', '/images/AZUL_CLARO/crest-blue-2.webp'],
    ogimage: '/images/AZUL_CLARO/jpg/crest-blue-1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    measurements: 'Largo: 70cm, Ancho: 50cm',
    name: 'Polera azul manga larga',
    price: 29990,
    shortDescription: 'Polera azul manga larga, fresca y cómoda para un estilo casual diario.',
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 0 },
    ],
    slug: 'polera-azul-manga-larga',
    stock: 2,
    type: ProductType.INFERIOR,
  },




  // Estructura de producto
  // {
  //   description: '',
  //   discount: false,
  //   gender: 'hombre',
  //   images: [
  //     '/images/default1.jpg',
  //     '/images/default2.jpg',
  //   ],
  //   link: '',
  //   measurements: '',
  //   name: '',
  //   price: 0,
  //   shortDescription: '',
  //   sizes: [
  //     { size: 'S', stock: 0 },
  //     { size: 'M', stock: 0 },
  //     { size: 'L', stock: 0 },
  //     { size: 'XL', stock: 0 },
  //   ],
  //   slug: '',
  //   stock: 0,
  //   type: 'superior',
  // }

  // Agrega más productos según tus imágenes
];
