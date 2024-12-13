// src/data/products.ts


// Interfaz para las tallas
export interface Size {
  size: string;
  stock: number;
}

// Interfaz para los types

// Interfaz para los productos
export interface Product {
  name: string;
  slug: string;
  images: string[];
  price: number;
  description: string;
  stock: number;
  sizes: Size[];
  measurements?: string;
  link?: string
  gender?: 'hombre' | 'mujer' | 'unisex'
  type?: 'inferior' | 'superior' | 'long-shirt' | 'short-shirt' | 'shorts' | 'pants' | 'hoodie' | 'bra' | 'accesorio',
  discount?: boolean
}

// Lista de productos
export const products: Product[] = [
  {
    name: 'Polera gris manga larga',
    price: 29990,
    slug: 'polera-gris-manga-larga',
    description: `Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo.\n
    Logo bordado duradero que resistirá cada uso\n
    Tela de algodón suave y cómoda\n\n
    TALLA Y AJUSTE\n
    Ajuste regular\n
    El modelo mide 1.85 m y usa talla M\n\n
    MATERIALES Y CUIDADO\n
    100% Algodón`,
    images: ['/images/GRIS/crest-grey-1.webp','/images/GRIS/crest-grey-2.webp' ],
    stock: 10,
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 0 }
    ],
    measurements: "Largo: 70cm, Ancho: 50cm",
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    gender: 'hombre',
    type: 'accesorio',
    discount: true

  },
  {
    name: 'Polera negra manga larga',
    price: 29990,
    slug: 'polera-negra-manga-larga',
    description: `Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo.\n
    Logo bordado duradero que resistirá cada uso\n
    Tela de algodón suave y cómoda\n\n
    TALLA Y AJUSTE\n
    Ajuste regular\n
    El modelo mide 1.85 m y usa talla M\n\n
    MATERIALES Y CUIDADO\n
    100% Algodón`,
    images: ['/images/NEGRO/crest-negro-1.webp','/images/NEGRO/crest-negro-2.webp' ],
    stock: 8,
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 8 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 }
    ],
    measurements: "Largo: 70cm, Ancho: 50cm",
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    gender: 'hombre',
    type:'superior',
    discount: true
  },
  {
    name: 'Polera blanca manga larga',
    price: 29990,
    slug: 'polera-blanca-manga-larga',
    description: `Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo.\n
    Logo bordado duradero que resistirá cada uso\n
    Tela de algodón suave y cómoda\n\n
    TALLA Y AJUSTE\n
    Ajuste regular\n
    El modelo mide 1.85 m y usa talla M\n\n
    MATERIALES Y CUIDADO\n
    100% Algodón`,
    images: ['/images/BLANCO/crest-white-1.webp','/images/BLANCO/crest-white-2.webp' ],
    stock: 2,
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 0 }
    ],
    measurements: "Largo: 70cm, Ancho: 50cm",
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    gender: 'hombre',
    type:'superior'
  },

  {
    name: 'Polera navy manga larga',
    price: 29990,
    slug: 'polera-navy-manga-larga',
    description: `Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo.\n
    Logo bordado duradero que resistirá cada uso\n
    Tela de algodón suave y cómoda\n\n
    TALLA Y AJUSTE\n
    Ajuste regular\n
    El modelo mide 1.85 m y usa talla M\n\n
    MATERIALES Y CUIDADO\n
    100% Algodón`,
    images: ['/images/AZUL_MARINO/crest-navy-1.webp','/images/AZUL_MARINO/crest-navy-2.webp' ],
    stock: 2,
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 0 }
    ],
    measurements: "Largo: 70cm, Ancho: 50cm",
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    gender: 'hombre',
    type:'superior'
  },
  {
    name: 'Polera azul manga larga',
    price: 29990,
    slug: 'polera-azul-manga-larga',
    description: `Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo.\n
    Logo bordado duradero que resistirá cada uso\n
    Tela de algodón suave y cómoda\n\n
    TALLA Y AJUSTE\n
    Ajuste regular\n
    El modelo mide 1.85 m y usa talla M\n\n
    MATERIALES Y CUIDADO\n
    100% Algodón`,
    images: ['/images/AZUL_CLARO/crest-blue-1.webp','/images/AZUL_CLARO/crest-blue-2.webp' ],
    stock: 2,
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 0 }
    ],
    measurements: "Largo: 70cm, Ancho: 50cm",
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    gender: 'hombre',
    type:'superior'
  },
  {
    name: 'Polera blanca manga larga',
    price: 29990,
    slug: 'polera-blanca-manga-larga',
    description: `Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo.\n
    Logo bordado duradero que resistirá cada uso\n
    Tela de algodón suave y cómoda\n\n
    TALLA Y AJUSTE\n
    Ajuste regular\n
    El modelo mide 1.85 m y usa talla M\n\n
    MATERIALES Y CUIDADO\n
    100% Algodón`,
    images: ['/images/BLANCO/crest-white-1.webp','/images/BLANCO/crest-white-2.webp' ],
    stock: 2,
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 0 }
    ],
    measurements: "Largo: 70cm, Ancho: 50cm",
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    gender: 'mujer',
    type:'inferior'
  },

  // Agrega más productos según tus imágenes
];
