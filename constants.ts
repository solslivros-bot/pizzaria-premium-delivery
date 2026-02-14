
import { Pizza, Review } from './types';

export const PIZZAS: Pizza[] = [
  {
    id: 1,
    name: "Margherita di Bufala",
    description: "Molho de tomate San Marzano premium, muçarela de búfala fresca, manjericão e azeite extravirgem.",
    price: 68,
    category: 'Tradicional',
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    popular: true
  },
  {
    id: 2,
    name: "Tartufo e Funghi",
    description: "Mix de cogumelos frescos, creme de trufas brancas, muçarela e finalização com azeite trufado.",
    price: 92,
    category: 'Gourmet',
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800",
    popular: true
  },
  {
    id: 3,
    name: "Burrata & Prosciutto",
    description: "Presunto de Parma 12 meses, burrata cremosa, rúcula fresca e redução de balsâmico.",
    price: 98,
    category: 'Gourmet',
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Quattro Formaggi",
    description: "Muçarela, gorgonzola Dolce, provolone defumado e parmesão maturado 24 meses.",
    price: 74,
    category: 'Tradicional',
    image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Diavola Piccante",
    description: "Salame tipo pepperoni picante, pimenta calabresa em flocos, molho de tomate e muçarela.",
    price: 72,
    category: 'Tradicional',
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Figo e Mel",
    description: "Figos frescos grelhados, queijo de cabra, nozes caramelizadas e fio de mel silvestre.",
    price: 88,
    category: 'Gourmet',
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    name: "Pesto e Pinoli",
    description: "Molho pesto genovês artesanal, tomates cereja confitados, muçarela e pinoli tostados.",
    price: 84,
    category: 'Gourmet',
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    name: "Calabrese Speciale",
    description: "Linguiça calabresa artesanal, cebola roxa marinada, azeitonas azapa e muçarela.",
    price: 65,
    category: 'Tradicional',
    image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    name: "Zucchini e Boursin",
    description: "Abobrinha laminada, queijo boursin, raspas de limão siciliano e hortelã fresca.",
    price: 79,
    category: 'Gourmet',
    image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 10,
    name: "Mortadella e Pistachio",
    description: "Mortadela italiana, stracciatella, pesto de pistache e pistaches granulados.",
    price: 95,
    category: 'Gourmet',
    image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?auto=format&fit=crop&q=80&w=800",
    popular: true
  },
  {
    id: 11,
    name: "Portuguesa d'Oro",
    description: "Presunto cozido real, ovos caipira, cebola, ervilhas frescas e muçarela.",
    price: 69,
    category: 'Tradicional',
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 12,
    name: "Brie com Damasco",
    description: "Queijo brie derretido, geleia de damasco artesanal e amêndoas laminadas.",
    price: 86,
    category: 'Gourmet',
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 13,
    name: "Lombo e Catupiry",
    description: "Lombo canadense defumado, o verdadeiro Catupiry® e cebolinha verde.",
    price: 71,
    category: 'Tradicional',
    image: "https://images.unsplash.com/photo-1574129810554-72990f2d250b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 14,
    name: "Frango com Gorgonzola",
    description: "Frango desfiado premium, gorgonzola cremoso e mel suave.",
    price: 78,
    category: 'Tradicional',
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 15,
    name: "Vegetariana Lux",
    description: "Berinjela grelhada, pimentões coloridos, abobrinha, milho e azeitonas pretas.",
    price: 66,
    category: 'Tradicional',
    image: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 16,
    name: "Alho Negro & Brie",
    description: "Alho negro caramelizado, queijo brie e alecrim fresco sobre base branca.",
    price: 94,
    category: 'Gourmet',
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 17,
    name: "Cioccolato Belga",
    description: "Chocolate belga meio amargo, morangos frescos e raspas de chocolate branco.",
    price: 62,
    category: 'Doce',
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 18,
    name: "Banoffee Pizza",
    description: "Doce de leite argentino, rodelas de banana, canela e chantilly leve.",
    price: 58,
    category: 'Doce',
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 19,
    name: "Nutella & Avelã",
    description: "Muita Nutella, avelãs tostadas e pó de ouro comestível (opcional).",
    price: 65,
    category: 'Doce',
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 20,
    name: "Frutas Vermelhas",
    description: "Creme de queijo doce, mirtilos, framboesas e calda de groselha negra.",
    price: 68,
    category: 'Doce',
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800"
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Carolina',
    email: 'carol@exemplo.com',
    phone: '(11) 98888-7777',
    rating: 5,
    comment: 'A melhor pizza que já comi em São Paulo. O ambiente é indescritível e o atendimento é impecável.',
    date: '12/10/2023'
  },
  {
    id: '2',
    name: 'Ricardo',
    email: 'ricardo@exemplo.com',
    phone: '(11) 97777-6666',
    rating: 5,
    comment: 'Ingredientes de primeiríssima. A pizza de Tartufo é uma experiência sensorial única.',
    date: '05/11/2023'
  }
];
