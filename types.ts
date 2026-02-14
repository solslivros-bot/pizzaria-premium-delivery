
export interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'Tradicional' | 'Gourmet' | 'Doce';
  image: string;
  popular?: boolean;
}

export interface CartItem extends Pizza {
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  comment: string;
  date: string;
}
