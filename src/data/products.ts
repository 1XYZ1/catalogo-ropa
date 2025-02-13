// src/data/products.ts
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
  color?: string;
  colorHex?: string;
  description: string;
  discount?: number;
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

export const products: Product[] = [
  // ==========================================
  //          PRODUCTOS SUPERIORES
  // ==========================================


  // === Impact Drop Arm Tank ===
  {
    color: 'negro',
    colorHex: '#000000',
    description: 'Tank top con diseño de manga caída para entrenamientos intensos. Material ligero y transpirable.',
    discount: 20,
    gender: 'hombre',
    images: ['/images/impact-tank/BLACK/1.webp', '/images/impact-tank/BLACK/2.webp', '/images/impact-tank/BLACK/3.webp', '/images/impact-tank/BLACK/4.webp', '/images/impact-tank/BLACK/5.webp',  '/images/impact-tank/BLACK/6.webp'],
    ogimage: '/images/impact-tank/BLACK/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-impact-drop-arm-tank-black-ss24',
    measurements: '',
    name: 'Impact Drop Arm Tank',
    price: 30000,
    shortDescription: 'Tank top con diseño de manga caída para entrenamientos intensos',
    sizes: [
      { size: 'S', stock: 1 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 0 }
    ],
    stock: 7,
    type: ProductType.SUPERIOR,
    slug: 'impact-drop-arm-tank'
  },

  // === British Iron OVER ===
  {
    color: 'negro',
    colorHex: '#000000',
    description: 'Estilos versátiles y gráficos auténticos para levantamiento. Mejora tus básicos con nuestros diseños gráficos.',
    discount: 10,
    gender: 'hombre',
    images: ['/images/british-iron/1.webp', '/images/british-iron/2.webp', '/images/british-iron/3.webp', '/images/british-iron/4.webp', '/images/british-iron/5.webp', '/images/british-iron/6.webp', '/images/british-iron/7.webp', ],
    ogimage: '/images/british-iron/jpg/1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-british-iron-t-shirt-black-aw24',
    measurements: '',
    name: 'British Iron T-Shirt',
    price: 50000,
    shortDescription: 'Estilos versátiles y gráficos auténticos para levantamiento. Mejora tus básicos con nuestros diseños gráficos.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 1 },
      { size: 'XL', stock: 0 }
    ],
    stock: 7,
    type: ProductType.SUPERIOR,
    slug: 'british-iron-tshirt'
  },

  // === Crest Oversized Fit ===
  {
    color: 'Rosa Vintage',
    colorHex: '#d5596a',
    description: 'DÍA DE DESCANSO AL ESTILO CREST Cómodo y con estilo casual, puedes usar Crest en cualquier lugar y combinarlo con todo. • Interior de forro polar cepillado, suave y cómodo • Logo bordado duradero que resistirá cada uso • Capucha ajustable con cordón • Bolsillo tipo canguro para guardar tus cosas TALLA Y AJUSTE • Corte holgado • El modelo mide 183 cm y usa talla M MATERIALES Y CUIDADO • 80% Algodón, 20% Poliéster',
    discount: 10,
    gender: 'hombre',
    images: ['/images/hoodie-oversized/ROSA/1.webp', '/images/hoodie-oversized/ROSA/2.webp', '/images/hoodie-oversized/ROSA/3.webp', '/images/hoodie-oversized/ROSA/4.webp'],
    ogimage: '/images/hoodie-oversized/ROSA//jpg/1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-crest-oversized-hoodie-vintage-pink-ss24',
    measurements: '',
    name: 'Crest Oversized Fit',
    price: 40000,
    shortDescription: 'Crest: cómodo, estiloso y versátil, con felpa suave, logo bordado duradero, capucha ajustable y bolsillo canguro. 80% algodón, 20% poliéster.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 2 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 }
    ],
    stock: 2,
    type: ProductType.SUPERIOR,
    slug: 'crest-oversized-pink'
  },
  {
    color: 'beige',
    colorHex: '#dbd5c7',
    description: 'DÍA DE DESCANSO AL ESTILO CREST Cómodo y con estilo casual, puedes usar Crest en cualquier lugar y combinarlo con todo. • Interior de forro polar cepillado, suave y cómodo • Logo bordado duradero que resistirá cada uso • Capucha ajustable con cordón • Bolsillo tipo canguro para guardar tus cosas TALLA Y AJUSTE • Corte holgado • El modelo mide 183 cm y usa talla M MATERIALES Y CUIDADO • 80% Algodón, 20% Poliéster',
    discount: 0,
    gender: 'hombre',
    images: ['/images/hoodie-oversized/BEIGE/1.webp', '/images/hoodie-oversized/BEIGE/2.webp', '/images/hoodie-oversized/BEIGE/3.webp', '/images/hoodie-oversized/BEIGE/4.webp', '/images/hoodie-oversized/BEIGE/5.webp', '/images/hoodie-oversized/BEIGE/6.webp'],
    ogimage: '/images/hoodie-oversized/BEIGE/jpg/1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-crest-oversized-hoodie-khaki-yellow-ss24',
    measurements: '',
    name: 'Crest Oversized Fit',
    price: 40000,
    shortDescription: 'Crest: cómodo, estiloso y versátil, con felpa suave, logo bordado duradero, capucha ajustable y bolsillo canguro. 80% algodón, 20% poliéster.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 }
    ],
    stock: 1,
    type: ProductType.SUPERIOR,
    slug: 'crest-oversized-beige'
  },
  {
    color: 'vino',
    colorHex: '#844447',
    description: 'DÍA DE DESCANSO AL ESTILO CREST Cómodo y con estilo casual, puedes usar Crest en cualquier lugar y combinarlo con todo. • Interior de forro polar cepillado, suave y cómodo • Logo bordado duradero que resistirá cada uso • Capucha ajustable con cordón • Bolsillo tipo canguro para guardar tus cosas TALLA Y AJUSTE • Corte holgado • El modelo mide 183 cm y usa talla M MATERIALES Y CUIDADO • 80% Algodón, 20% Poliéster',
    discount: 0,
    gender: 'hombre',
    images: ['/images/hoodie-oversized/VINO/1.webp', '/images/hoodie-oversized/VINO/2.webp', '/images/hoodie-oversized/VINO/3.webp', '/images/hoodie-oversized/VINO/4.webp'],
    ogimage: '/images/hoodie-oversized/VINO/jpg/1.jpg',
    link: 'https://nl.gymshark.com/products/gymshark-crest-oversized-hoodie-burgundy-brown-ss24',
    measurements: '',
    name: 'Crest Oversized Fit',
    price: 40000,
    shortDescription: 'Crest: cómodo, estiloso y versátil, con felpa suave, logo bordado duradero, capucha ajustable y bolsillo canguro. 80% algodón, 20% poliéster.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 }
    ],
    stock: 1,
    type: ProductType.SUPERIOR,
    slug: 'crest-oversized-wine'
  },
  {
    color: 'navy',
    colorHex: '#232e3c',
    description: 'DÍA DE DESCANSO AL ESTILO CREST Cómodo y con estilo casual, puedes usar Crest en cualquier lugar y combinarlo con todo. • Interior de forro polar cepillado, suave y cómodo • Logo bordado duradero que resistirá cada uso • Capucha ajustable con cordón • Bolsillo tipo canguro para guardar tus cosas TALLA Y AJUSTE • Corte holgado • El modelo mide 183 cm y usa talla M MATERIALES Y CUIDADO • 80% Algodón, 20% Poliéster',
    discount: 20,
    gender: 'hombre',
    images: ['/images/hoodie-oversized/NAVY/1.webp', '/images/hoodie-oversized/NAVY/2.webp', '/images/hoodie-oversized/NAVY/3.webp', '/images/hoodie-oversized/NAVY/4.webp', '/images/hoodie-oversized/NAVY/5.webp'],
    ogimage: '/images/hoodie-oversized/NAVY/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-crest-oversized-hoodie-navy-ss24',
    measurements: '',
    name: 'Crest Oversized Fit',
    price: 40000,
    shortDescription: 'Crest: cómodo, estiloso y versátil, con felpa suave, logo bordado duradero, capucha ajustable y bolsillo canguro. 80% algodón, 20% poliéster.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 1 },
      { size: 'XL', stock: 0 }
    ],
    stock: 3,
    type: ProductType.SUPERIOR,
    slug: 'crest-oversized-dark-blue'
  },
  {
    color: 'azul claro',
    colorHex: '#6594ab',
    description: 'La sudadera con capucha Crest es una capa esencial para ir al gimnasio o complementar cualquier estilo deportivo. Con un interior cálido y extremadamente suave, capucha ajustable para mayor comodidad y un diseño minimalista, es una elección infalible. • Ajuste ceñido • Capucha de tres piezas con cordón ajustable • Bolsillo delantero tipo canguro • Dobladillo y puños acanalados para un ajuste limpio • Logo bordado duradero de Gymshark • Tela suave y cepillada en el interior • 80% Algodón, 20% Poliéster',
    discount: 20,
    gender: 'hombre',
    images: ['/images/hoodie-slim/BLUE/1.webp', '/images/hoodie-slim/BLUE/2.webp', '/images/hoodie-slim/BLUE/3.webp', '/images/hoodie-slim/BLUE/4.webp'],
    ogimage: '/images/hoodie-slim/BLUE/jpg/1.jpg',
    link: 'https://ca.gymshark.com/products/gymshark-crest-hoodie-faded-blue-ss24',
    measurements: '',
    name: 'Crest Slim Fit',
    price: 40000,
    shortDescription: 'Crest Hoodie: esencial y versátil, con interior cálido, capucha ajustable, diseño minimalista y logo bordado duradero. 80% algodón, 20% poliéster.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 }
    ],
    stock: 2,
    type: ProductType.SUPERIOR,
    slug: 'crest-slim-light-blue'
  },
  {
    color: 'negro',
    colorHex: '#000000',
    description: 'DÍA DE DESCANSO AL ESTILO CREST Cómodo y con estilo casual, puedes usar Crest en cualquier lugar y combinarlo con todo. • Interior de forro polar cepillado, suave y cómodo • Logo bordado duradero que resistirá cada uso • Capucha ajustable con cordón • Bolsillo tipo canguro para guardar tus cosas TALLA Y AJUSTE • Corte holgado • El modelo mide 183 cm y usa talla M MATERIALES Y CUIDADO • 80% Algodón, 20% Poliéster',
    discount: 0,
    gender: 'hombre',
    images: ['/images/hoodie-oversized/NEGRO/1.webp', '/images/hoodie-oversized/NEGRO/2.webp', '/images/hoodie-oversized/NEGRO/3.webp', '/images/hoodie-oversized/NEGRO/4.webp', '/images/hoodie-oversized/NEGRO/5.webp'],
    ogimage: '/images/hoodie-oversized/NEGRO/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-crest-oversized-hoodie-black-ss24',
    measurements: '',
    name: 'Crest Oversized Fit',
    price: 40000,
    shortDescription: 'Crest: cómodo, estiloso y versátil, con felpa suave, logo bordado duradero, capucha ajustable y bolsillo canguro. 80% algodón, 20% poliéster.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 }
    ],
    stock: 2,
    type: ProductType.SUPERIOR,
    slug: 'crest-oversized-black'
  },

  // === Power Zip Hoodie ===
  {
    color: 'café tierra',
    colorHex: '#a49a87',
    description: 'Poleron con cierre para entrenamiento de alta calidad y durabilidad.',
    discount: 20,
    gender: 'hombre',
    images: ['/images/hoodie-zip-power/MARRON/1.webp', '/images/hoodie-zip-power/MARRON/2.webp', '/images/hoodie-zip-power/MARRON/3.webp', '/images/hoodie-zip-power/MARRON/4.webp', '/images/hoodie-zip-power/MARRON/5.webp', '/images/hoodie-zip-power/MARRON/6.webp',],
    ogimage: '/images/hoodie-zip-power/MARRON/jpg/1.jpg',
    link: 'https://ca.gymshark.com/products/gymshark-power-zip-hoodie-earthy-brown-aw23',
    measurements: '',
    name: 'Power Zip Hoodie',
    price: 60000,
    shortDescription: 'Poleron con cierre para entrenamiento',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 }
    ],
    stock: 2,
    type: ProductType.SUPERIOR,
    slug: 'power-zip-hoodie-earth-brown'
  },

  // === Rest Day Essential Crew ===
  {
    color: 'negro',
    colorHex: '#000000',
    description: 'Poleron crew diseñado para máxima comodidad en días de descanso.',
    discount: 20,
    gender: 'hombre',
    images: ['/images/rest-day/NEGRO/1.webp', '/images/rest-day/NEGRO/2.webp', '/images/rest-day/NEGRO/3.webp','/images/rest-day/NEGRO/4.webp','/images/rest-day/NEGRO/5.webp',],
    ogimage: '/images/rest-day/NEGRO/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-rest-day-essential-crew-black-aw23',
    measurements: '',
    name: 'Rest Day Essential Crew',
    price: 30000,
    shortDescription: 'Poleron crew para días de descanso',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 }
    ],
    stock: 1,
    type: ProductType.SUPERIOR,
    slug: 'rest-day-crew-black'
  },
  {
    color: 'gris',
    colorHex: '#d9d9d9',
    description: 'Poleron crew diseñado para máxima comodidad en días de descanso.',
    discount: 20,
    gender: 'hombre',
    images: ['/images/rest-day/GRIS/1.webp', '/images/rest-day/GRIS/2.webp', '/images/rest-day/GRIS/3.webp','/images/rest-day/GRIS/4.webp','/images/rest-day/GRIS/5.webp', '/images/rest-day/GRIS/6.webp'],
    ogimage: '/images/rest-day/GRIS/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-rest-day-essential-crew-light-grey-core-marl-aw23',
    measurements: '',
    name: 'Rest Day Essential Crew',
    price: 30000,
    shortDescription: 'Poleron crew para días de descanso',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 }
    ],
    stock: 1,
    type: ProductType.SUPERIOR,
    slug: 'rest-day-crew-grey'
  },

  // === Legacy Drop Arm Hoodie ===
  // {
  //   color: 'negro',
  //   colorHex: '#000000',
  //   description: 'Poleron con diseño de manga caída para un look moderno y deportivo.',
  //   discount: 0,
  //   gender: 'hombre',
  //   images: ['/images/legacy-tank-hoodie/NEGRO/1.webp','/images/legacy-tank-hoodie/NEGRO/2.webp','/images/legacy-tank-hoodie/NEGRO/3.webp','/images/legacy-tank-hoodie/NEGRO/4.webp','/images/legacy-tank-hoodie/NEGRO/5.webp','/images/legacy-tank-hoodie/NEGRO/6.webp','/images/legacy-tank-hoodie/NEGRO/7.webp','/images/legacy-tank-hoodie/NEGRO/8.webp',],
  //   ogimage: '/images/legacy-tank-hoodie/NEGRO/jpg/1.jpg',
  //   link: 'https://www.gymshark.com/products/gymshark-legacy-drop-arm-hoodie-black-aw23',
  //   measurements: '',
  //   name: 'Legacy Drop Arm Hoodie',
  //   price: 24000,
  //   shortDescription: 'Poleron con diseño de manga caída',
  //   sizes: [
  //     { size: 'S', stock: 1 },
  //     { size: 'M', stock: 0 },
  //     { size: 'L', stock: 0 },
  //     { size: 'XL', stock: 0 }
  //   ],
  //   stock: 1,
  //   type: ProductType.SUPERIOR,
  //   slug: 'legacy-drop-arm-black'
  // },
  // {
  //   color: 'rojo',
  //   colorHex: '#FF0000',
  //   description: 'Poleron con diseño de manga caída para un look moderno y deportivo.',
  //   discount: 0,
  //   gender: 'hombre',
  //   images: [],
  //   ogimage: '',
  //   link: '',
  //   measurements: '',
  //   name: 'Legacy Drop Arm Hoodie',
  //   price: 49990,
  //   shortDescription: 'Poleron con diseño de manga caída',
  //   sizes: [
  //     { size: 'S', stock: 1 },
  //     { size: 'M', stock: 0 },
  //     { size: 'L', stock: 0 },
  //     { size: 'XL', stock: 0 }
  //   ],
  //   stock: 1,
  //   type: ProductType.SUPERIOR,
  //   slug: 'legacy-drop-arm-red'
  // },

  // === Super Natural Cut Off T-Shirt ===
  // {
  //   color: 'gris',
  //   colorHex: '#7f7f7f',
  //   description: 'Polera corta de diseño natural para un look casual y cómodo.',
  //   discount: 0,
  //   gender: 'hombre',
  //   images: ['/images/super-natural-cutoff/GRIS/1.webp','/images/super-natural-cutoff/GRIS/2.webp','/images/super-natural-cutoff/GRIS/3.webp','/images/super-natural-cutoff/GRIS/4.webp','/images/super-natural-cutoff/GRIS/5.webp','/images/super-natural-cutoff/GRIS/6.webp','/images/super-natural-cutoff/GRIS/7.webp','/images/super-natural-cutoff/GRIS/8.webp',],
  //   ogimage: '/images/super-natural-cutoff/GRIS/jpg/1.jpg',
  //   link: 'https://www.gymshark.com/products/gymshark-super-natural-cut-off-tank-brushed-grey-ss24',
  //   measurements: '',
  //   name: 'Super Natural Cut Off T-Shirt',
  //   price: 24000,
  //   shortDescription: 'Polera corta de diseño natural',
  //   sizes: [
  //     { size: 'S', stock: 1 },
  //     { size: 'M', stock: 0 },
  //     { size: 'L', stock: 0 },
  //     { size: 'XL', stock: 0 }
  //   ],
  //   stock: 1,
  //   type: ProductType.SUPERIOR,
  //   slug: 'super-natural-cutoff-grey'
  // },



  // === Crest Long Sleeve T-Shirt ===
  {
      color: "gris",
      colorHex: "#d5d7d8",
      description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
      gender: 'hombre',
      images: ['/images/long-sleeve/GRIS/1.webp', '/images/long-sleeve/GRIS/2.webp', '/images/long-sleeve/GRIS/3.webp', '/images/long-sleeve/GRIS/4.webp'],
      ogimage: '/images/long-sleeve/GRIS/jpg/1.jpg',
      link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
      measurements: 'Largo: 70cm, Ancho: 50cm',
      name: 'Crest Long Sleeve T-Shirt',
      price: 30000,
      shortDescription: 'Polera gris manga larga, cómoda y elegante para cualquier ocasión.',
      sizes: [
        { size: 'S', stock: 0 },
        { size: 'M', stock: 1 },
        { size: 'L', stock: 1 },
        { size: 'XL', stock: 0 },
      ],
      slug: 'polera-gris-manga-larga',
      stock: 2,
      type: ProductType.SUPERIOR,

    },
    {
      description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
      gender: 'hombre',
      images: ['/images/long-sleeve/NEGRO/1.webp', '/images/long-sleeve/NEGRO/2.webp', '/images/long-sleeve/NEGRO/3.webp', '/images/long-sleeve/NEGRO/4.webp'],
      ogimage: '/images/long-sleeve/NEGRO/jpg/1.jpg',
      link: 'https://row.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-black-ss22',
      measurements: 'Largo: 70cm, Ancho: 50cm',
      name: 'Crest Long Sleeve T-Shirt',
      price: 30000,
      shortDescription: 'Polera negra manga larga, resistente y estilizada para un look casual duradero.',
      sizes: [
        { size: 'S', stock: 0 },
        { size: 'M', stock: 7 },
        { size: 'L', stock: 0 },
        { size: 'XL', stock: 0 },
      ],
      slug: 'polera-negra-manga-larga',
      stock: 8,
      type: ProductType.SUPERIOR,
      color: "negro",
      colorHex: "#000000"
    },
    {
      description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
      gender: 'hombre',
      images: ['/images/long-sleeve/BLANCO/1.webp', '/images/long-sleeve/BLANCO/2.webp', '/images/long-sleeve/BLANCO/3.webp', '/images/long-sleeve/BLANCO/4.webp'],
      ogimage: '/images/long-sleeve/BLANCO/jpg/1.jpg',
      link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
      measurements: 'Largo: 70cm, Ancho: 50cm',
      name: 'Crest Long Sleeve T-Shirt',
      price: 30000,
      shortDescription: 'Polera blanca manga larga, suave y cómoda para un estilo elegante y casual.',
      sizes: [
        { size: 'S', stock: 0 },
        { size: 'M', stock: 1 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 2 },
      ],
      slug: 'polera-blanca-manga-larga',
      stock: 2,
      type: ProductType.SUPERIOR,
      color: "blanco",
      colorHex: "#FFFFFF"
    },
    {
      description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
      gender: 'hombre',
      images: ['/images/long-sleeve/NAVY/1.webp', '/images/long-sleeve/NAVY/2.webp'],
      ogimage: '/images/long-sleeve/NAVY/jpg/1.jpg',
      link: 'https://row.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-navy-aw22',
      measurements: 'Largo: 70cm, Ancho: 50cm',
      name: 'Crest Long Sleeve T-Shirt',
      price: 30000,
      shortDescription: 'Polera navy manga larga, elegante y duradera para un look casual sofisticado.',
      sizes: [
        { size: 'S', stock: 2 },
        { size: 'M', stock: 0 },
        { size: 'L', stock: 0 },
        { size: 'XL', stock: 0 },
      ],
      slug: 'polera-navy-manga-larga',
      stock: 2,
      type: ProductType.SUPERIOR,
      color: "navy",
      colorHex: "#233340"
    },
    {
      description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
      gender: 'hombre',
      images: ['/images/long-sleeve/BLUE/1.webp', '/images/long-sleeve/BLUE/2.webp', '/images/long-sleeve/BLUE/3.webp', '/images/long-sleeve/BLUE/4.webp'],
      ogimage: '/images/long-sleeve/BLUE/jpg/1.jpg',
      link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
      measurements: 'Largo: 70cm, Ancho: 50cm',
      name: 'Crest Long Sleeve T-Shirt',
      price: 30000,
      shortDescription: 'Polera azul manga larga, fresca y cómoda para un estilo casual diario.',
      sizes: [
        { size: 'S', stock: 1 },
        { size: 'M', stock: 3 },
        { size: 'L', stock: 0 },
        { size: 'XL', stock: 0 },
      ],
      slug: 'polera-azul-manga-larga',
      stock: 2,
      type: ProductType.SUPERIOR,
      color: "azul",
      colorHex: "#6699ae",
      discount: 0
    },

  // === Essential Oversized T-Shirt ===
  {
    color: 'navy',
    colorHex: '#213a4b',
    description: 'Polera oversized esencial con un ajuste holgado y cómodo.',
    discount: 10,
    gender: 'hombre',
    images: ['/images/essential-oversized/NAVY/1.webp', '/images/essential-oversized/NAVY/2.webp', '/images/essential-oversized/NAVY/3.webp', '/images/essential-oversized/NAVY/4.webp'],
    ogimage: '',
    link: '',
    measurements: '',
    name: 'Essential Oversized T-Shirt',
    price: 30000,
    shortDescription: 'Polera oversized esencial',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 }
    ],
    stock: 1,
    type: ProductType.SUPERIOR,
    slug: 'essential-oversized-navy'
  },
  {
    color: 'azul claro',
    colorHex: '#6f9fbc',
    description: 'Polera oversized esencial con un ajuste holgado y cómodo.',
    discount: 10,
    gender: 'hombre',
    images: ['/images/essential-oversized/BLUE/1.webp', '/images/essential-oversized/BLUE/2.webp', '/images/essential-oversized/BLUE/3.webp', '/images/essential-oversized/BLUE/4.webp'],
    ogimage: '/images/essential-oversized/BLUE/jpg/1.jpg',
    link: '',
    measurements: '',
    name: 'Essential Oversized T-Shirt',
    price: 30000,
    shortDescription: 'Polera oversized esencial',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 }
    ],
    stock: 1,
    type: ProductType.SUPERIOR,
    slug: 'essential-oversized-light-blue'
  },

  {
    color: 'negro',
    colorHex: '#000000',
    description: 'Polera oversized esencial con un ajuste holgado y cómodo.',
    discount: 20,
    gender: 'hombre',
    images: ['/images/essential-oversized/NEGRO/1.webp', '/images/essential-oversized/NEGRO/2.webp', '/images/essential-oversized/NEGRO/3.webp', '/images/essential-oversized/NEGRO/4.webp'],
    ogimage: '/images/essential-oversized/NEGRO/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-oversized-t-shirt-black-aw21',
    measurements: '',
    name: 'Essential Oversized T-Shirt',
    price: 30000,
    shortDescription: 'Polera oversized esencial',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 1 },
      { size: 'XL', stock: 0 }
    ],
    stock: 1,
    type: ProductType.SUPERIOR,
    slug: 'essential-oversized-negro'
  },

  // === Polera con letras en la espalda ===
  {
    color: 'negro',
    colorHex: '#000000',
    description: 'Polera con diseño de letras en la espalda, estilo moderno y deportivo.',
    discount: 0,
    gender: 'hombre',
    images: ['/images/power-tshirt/NEGRO/1.webp', '/images/power-tshirt/NEGRO/2.webp', '/images/power-tshirt/NEGRO/3.webp', '/images/power-tshirt/NEGRO/4.webp', '/images/power-tshirt/NEGRO/5.webp', '/images/power-tshirt/NEGRO/6.webp', ],
    ogimage: '/images/power-tshirt/NEGRO/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-power-t-shirt-black-aw23',
    measurements: '',
    name: 'Polera con letras en la espalda',
    price: 30000,
    shortDescription: 'Polera con diseño de letras en la espalda',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 }
    ],
    stock: 1,
    type: ProductType.SUPERIOR,
    slug: 'power-tshirt-black'
  },
  // {
  //   color: 'azul',
  //   colorHex: '#1f2631',
  //   description: 'Polera con diseño de letras en la espalda, estilo moderno y deportivo.',
  //   discount: 0,
  //   gender: 'hombre',
  //   images: ['/images/power-tshirt/NAVY/1.webp', '/images/power-tshirt/NAVY/2.webp', '/images/power-tshirt/NAVY/3.webp', '/images/power-tshirt/NAVY/4.webp', '/images/power-tshirt/NAVY/5.webp', '/images/power-tshirt/NAVY/6.webp', ],
  //   ogimage: '/images/power-tshirt/NAVY/jpg/1.jpg',
  //   link: 'https://row.gymshark.com/products/gymshark-power-t-shirt-navy-aw23',
  //   measurements: '',
  //   name: 'Polera con letras en la espalda',
  //   price: 30000,
  //   shortDescription: 'Polera con diseño de letras en la espalda',
  //   sizes: [
  //     { size: 'S', stock: 0 },
  //     { size: 'M', stock: 0 },
  //     { size: 'L', stock: 1 },
  //     { size: 'XL', stock: 0 }
  //   ],
  //   stock: 1,
  //   type: ProductType.SUPERIOR,
  //   slug: 'power-tshirt-blue'
  // },

  // ==========================================
  //          PRODUCTOS INFERIORES
  // ==========================================

  // === Adapt Camo Seamless Shorts ===
  // {
  //   color: 'negro',
  //   colorHex: '#000000',
  //   description: 'Shorts sin costuras con diseño camuflado, perfectos para cualquier tipo de entrenamiento.',
  //   discount: 0,
  //   gender: 'mujer',
  //   images: ['/images/short-leggins-camo/NEGRO/1.webp', '/images/short-leggins-camo/NEGRO/2.webp', '/images/short-leggins-camo/NEGRO/3.webp','/images/short-leggins-camo/NEGRO/4.webp','/images/short-leggins-camo/NEGRO/5.webp',],
  //   ogimage: '/images/short-leggins-camo/NEGRO/jpg/1.jpg',
  //   link: 'https://row.gymshark.com/products/gymshark-adapt-camo-seamless-shorts-black-asphalt-grey-aw24',
  //   measurements: '',
  //   name: 'Adapt Camo Seamless Shorts',
  //   price: 40000,
  //   shortDescription: 'Shorts sin costuras con diseño camuflado',
  //   sizes: [
  //     { size: 'S', stock: 0 },
  //     { size: 'M', stock: 1 },
  //     { size: 'L', stock: 0 },
  //     { size: 'XL', stock: 0 }
  //   ],
  //   stock: 1,
  //   type: ProductType.INFERIOR,
  //   slug: 'adapt-camo-shorts-black'
  // },
  // {
  //   color: 'azul medianoche',
  //   colorHex: '#2e4761',
  //   description: 'Shorts sin costuras con diseño camuflado, perfectos para cualquier tipo de entrenamiento.',
  //   discount: 0,
  //   gender: 'mujer',
  //   images: ['/images/short-leggins-camo/BLUE/1.webp', '/images/short-leggins-camo/BLUE/2.webp', '/images/short-leggins-camo/BLUE/3.webp','/images/short-leggins-camo/BLUE/4.webp','/images/short-leggins-camo/BLUE/5.webp',],
  //   ogimage: '/images/short-leggins-camo/BLUE/jpg/1.jpg',
  //   link: 'https://row.gymshark.com/products/gymshark-adapt-camo-seamless-ribbed-shorts-midnight-blue-ash-blue-aw23',
  //   measurements: '',
  //   name: 'Adapt Camo Seamless Shorts',
  //   price: 40000,
  //   shortDescription: 'Shorts sin costuras con diseño camuflado',
  //   sizes: [
  //     { size: 'S', stock: 0 },
  //     { size: 'M', stock: 1 },
  //     { size: 'L', stock: 0 },
  //     { size: 'XL', stock: 0 }
  //   ],
  //   stock: 1,
  //   type: ProductType.INFERIOR,
  //   slug: 'adapt-camo-shorts-midnight-blue'
  // },

  // === Crest Short Algodón ===
  {
    color: 'negro',
    colorHex: '#000000',
    description: 'Shorts de algodón con logo Crest, comodidad y estilo para tu entrenamiento.',
    discount: 0,
    gender: 'hombre',
    images: ['/images/shorts/crest/NEGRO/1.webp', '/images/shorts/crest/NEGRO/2.webp', '/images/shorts/crest/NEGRO/3.webp', '/images/shorts/crest/NEGRO/4.webp', '/images/shorts/crest/NEGRO/5.webp',],
    ogimage: '/images/shorts/crest/NEGRO/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-crest-7-shorts-black-ss22',
    measurements: '',
    name: 'Crest Short Algodón',
    price: 30000,
    shortDescription: 'Shorts de algodón con logo Crest',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 1 },
      { size: 'XL', stock: 0 }
    ],
    stock: 1,
    type: ProductType.INFERIOR,
    slug: 'crest-cotton-shorts-black'
  },

  // === Sport 7 Short ===
  {
    color: 'gris',
    colorHex: '#6c6b70',
    description: 'Shorts deportivos de 7 pulgadas, diseñados para máximo rendimiento.',
    discount: 0,
    gender: 'hombre',
    images: ['/images/shorts/sport7/GRIS/1.webp', '/images/shorts/sport7/GRIS/2.webp', '/images/shorts/sport7/GRIS/3.webp', '/images/shorts/sport7/GRIS/4.webp', '/images/shorts/sport7/GRIS/5.webp',],
    ogimage: '/images/shorts/sport7/GRIS/1.jpg',
    link: '',
    measurements: '',
    name: 'Sport 7 Short',
    price: 30000,
    shortDescription: 'Shorts deportivos de 7 pulgadas',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 1 }
    ],
    stock: 1,
    type: ProductType.INFERIOR,
    slug: 'sport-7-short-silhouette-grey'
  },
  // {
  //   color: 'naranja',
  //   colorHex: '#e2784c',
  //   description: 'Shorts deportivos de 7 pulgadas, diseñados para máximo rendimiento.',
  //   discount: 0,
  //   gender: 'hombre',
  //   images: ['/images/shorts/sport7/NARANJA/1.webp', '/images/shorts/sport7/NARANJA/2.webp', '/images/shorts/sport7/NARANJA/3.webp', '/images/shorts/sport7/NARANJA/4.webp', '/images/shorts/sport7/NARANJA/5.webp',],
  //   ogimage: '/images/shorts/sport7/NARANJA/1.jpg',
  //   link: '',
  //   measurements: '',
  //   name: 'Sport 7 Short',
  //   price: 30000,
  //   shortDescription: 'Shorts deportivos de 7 pulgadas',
  //   sizes: [
  //     { size: 'S', stock: 0 },
  //     { size: 'M', stock: 1 },
  //     { size: 'L', stock: 0 },
  //     { size: 'XL', stock: 0 }
  //   ],
  //   stock: 1,
  //   type: ProductType.INFERIOR,
  //   slug: 'sport-7-short-orange'
  // },

  // === Arrival 7 Shorts ===
  {
    color: 'navy',
    colorHex: '#223649',
    description: 'Shorts deportivos versátiles de 7 pulgadas, perfectos para cualquier actividad.',
    discount: 0,
    gender: 'hombre',
    images: ['/images/shorts/arrival7/NAVY/1.webp', '/images/shorts/arrival7/NAVY/2.webp', '/images/shorts/arrival7/NAVY/3.webp'],
    ogimage: '/images/shorts/arrival7/NAVY/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-arrival-7-shorts-navy-ss22',
    measurements: '',
    name: 'Arrival 7 Shorts',
    price: 30000,
    shortDescription: 'Shorts deportivos versátiles de 7 pulgadas',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 3 },
      { size: 'L', stock: 1 },
      { size: 'XL', stock: 0 }
    ],
    stock: 3,
    type: ProductType.INFERIOR,
    slug: 'arrival-7-shorts-navy'
  },
  {
    color: 'negro',
    colorHex: '#000000',
    description: 'Shorts deportivos versátiles de 7 pulgadas, perfectos para cualquier actividad.',
    discount: 0,
    gender: 'hombre',
    images: ['/images/shorts/arrival7/NEGRO/1.webp', '/images/shorts/arrival7/NEGRO/2.webp', '/images/shorts/arrival7/NEGRO/3.webp', '/images/shorts/arrival7/NEGRO/4.webp', '/images/shorts/arrival7/NEGRO/5.webp', '/images/shorts/arrival7/NEGRO/6.webp'],
    ogimage: '/images/shorts/arrival7/NEGRO/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-arrival-7-shorts-black-ss22',
    measurements: '',
    name: 'Arrival 7 Shorts',
    price: 30000,
    shortDescription: 'Shorts deportivos versátiles de 7 pulgadas',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 1 }
    ],
    stock: 6,
    type: ProductType.INFERIOR,
    slug: 'arrival-7-shorts-black'
  },


  // ==========================================
  //             ACCESORIOS
  // ==========================================

  // === Silicone Lifting Straps ===
  {
    color: 'negro',
    colorHex: '#000000',
    description: 'Straps de silicona para levantamiento de peso, máximo agarre y durabilidad.',
    discount: 0,
    gender: 'unisex',
    images: ['/images/straps/NEGRO/1.webp', '/images/straps/NEGRO/2.webp','/images/straps/NEGRO/3.webp'],
    ogimage: '/images/straps/NEGRO/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-silicone-lifting-straps-black-aw21',
    measurements: '',
    name: 'Silicone Lifting Straps',
    price: 20000,
    shortDescription: 'Straps de silicona para levantamiento de peso',
    sizes: [
      { size: 'UNICO', stock: 0 }
    ],
    stock: 1,
    type: ProductType.ACCESORIO,
    slug: 'silicone-lifting-straps-black'
  },

  // === Active Holdall Medium ===
  {
    color: 'rosa',
    colorHex: '#b98987',
    description: 'Bolso deportivo de tamaño mediano, perfecto para el gimnasio.',
    discount: 0,
    gender: 'mujer',
    images: ['/images/bags/active-medium/ROSA/1.webp', '/images/bags/active-medium/ROSA/2.webp', '/images/bags/active-medium/ROSA/3.webp', '/images/bags/active-medium/ROSA/4.webp', '/images/bags/active-medium/ROSA/5.webp', '/images/bags/active-medium/ROSA/6.webp',],
    ogimage: '/images/bags/active-medium/ROSA/jpg/1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-active-holdall-medium-brick-brown-aw24',
    measurements: '',
    name: 'Active Holdall Medium',
    price: 40000,
    shortDescription: 'Bolso deportivo de tamaño mediano',
    sizes: [
      { size: 'UNICO', stock: 1 }
    ],
    stock: 1,
    type: ProductType.ACCESORIO,
    slug: 'active-holdall-medium-brown'
  },

  {
    color: 'negro',
    colorHex: '#000000',
    description: 'Ropa interior suave, elástica y cómoda con cintura ajustable, disponible en pack de 5.',
    discount: 0,
    gender: 'unisex',
    images: ['/images/boxer/1.webp'],
    ogimage: '/images/boxer/jpg/1.webp',
    link: 'https://www.gymshark.com/products/gymshark-boxer-brief-5pk-black-ss24',
    measurements: '',
    name: 'Boxer Brief 5PK',
    price: 50000,
    shortDescription: 'Ropa interior suave, elástica y cómoda con cintura ajustable, disponible en pack de 5.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 0 },

    ],
    stock: 2,
    type: ProductType.ACCESORIO,
    slug: 'boxer-brief'
  },
  {
    color: 'negro',
    colorHex: '#000000',
    description: 'Ropa interior suave, elástica y cómoda con cintura ajustable, disponible en pack de 5.',
    discount: 0,
    gender: 'unisex',
    images: ['/images/boxer/1.webp'],
    ogimage: '/images/boxer/jpg/1.webp',
    link: 'https://www.gymshark.com/products/gymshark-boxer-brief-5pk-black-ss24',
    measurements: '',
    name: 'Boxer Brief (Par)',
    price: 50000,
    shortDescription: 'Ropa interior suave, elástica y cómoda con cintura ajustable, disponible en pack de 5.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 0 },

    ],
    stock: 2,
    type: ProductType.ACCESORIO,
    slug: 'boxer-brief-par'
  },

  // === Calcetas con Logo Gymshark ===
  {
    color: 'negro',
    colorHex: '#000000',
    description: 'Calcetas deportivas con logo Gymshark, comodidad y estilo.',
    discount: 0,
    gender: 'unisex',
    images: ['/images/socks/crew/NEGRO/1.webp', '/images/socks/crew/NEGRO/2.webp',],
    ogimage: '/images/socks/crew/NEGRO/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-crew-socks-3pk-socks-black-aw23',
    measurements: '',
    name: 'Calcetas con Logo Gymshark',
    price: 7000,
    shortDescription: 'Calcetas deportivas con logo Gymshark',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 0 },

    ],
    stock: 2,
    type: ProductType.ACCESORIO,
    slug: 'calcetas-gymshark-black'
  },
  {
    color: 'gris',
    colorHex: '#bfbdba',
    description: 'Calcetas deportivas con logo Gymshark, comodidad y estilo.',
    discount: 0,
    gender: 'unisex',
    images: ['/images/socks/crew/GRIS/1.webp', '/images/socks/crew/GRIS/2.webp',],
    ogimage: '/images/socks/crew/GRIS/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-crew-socks-5pk-light-grey-marl-ss23',
    measurements: '',
    name: 'Calcetas con Logo Gymshark',
    price: 7000,
    shortDescription: 'Calcetas deportivas con logo Gymshark',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 0 },

    ],
    stock: 1,
    type: ProductType.ACCESORIO,
    slug: 'calcetas-gymshark-grey'
  },
  {
    color: 'blanco',
    colorHex: '#FFFFFF',
    description: 'Calcetas deportivas con logo Gymshark, comodidad y estilo.',
    discount: 0,
    gender: 'unisex',
    images: ['/images/socks/crew/BLANCO/1.webp', '/images/socks/crew/BLANCO/2.webp',],
    ogimage: '/images/socks/crew/BLANCO/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-crew-socks-3pk-white-ss23',
    measurements: '',
    name: 'Calcetas con Logo Gymshark',
    price: 7000,
    shortDescription: 'Calcetas deportivas con logo Gymshark',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 0 },

    ],
    stock: 3,
    type: ProductType.ACCESORIO,
    slug: 'calcetas-gymshark-white'
  }
];