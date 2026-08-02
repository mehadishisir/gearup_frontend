export interface Gear {
  id: string;
  name: string;
  description: string;
  brand: string;

  price: string;
  stock: number;
  avgRating: number;

  available: boolean;

  images: string[];

  providerId: string;
  categoryId: string;

  createdAt: string;
  updatedAt: string;

  category: {
    name: string;
  };

  provider: {
    id: string;
    name: string;
  };
}

export interface GearResponse {
  success: boolean;
  message: string;

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };

  data: Gear[];
}