type Roles = "user" | "custom" | "moderator" | "admin";

interface KeyValuePair {
  [key: string]: any;
}

interface Common {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface UserT extends Common {
  name: string;
  email: string;
  phone: string;
  password: string;
  picture: string;
  role: Roles;
  permissions?: any;
  address?: string;
}

interface CategoryT extends Common {
  name: string;
  slug: string;
  icon?: string;
  parentId?: number;
  children?: CategoryT[];
}

interface ProductT extends Common {
  name: string;
  slug: string;
  sale_price: number;
  purchase_price: number;
  total_sale: number;
  in_stock: number;
  thumbnail: string;

  custom?: KeyValuePair;
  barcode?: string;
  brand?: string;
  model?: string;
  images?: string[];

  category?: Category;
  categoryId?: number;
}
