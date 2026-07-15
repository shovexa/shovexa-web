interface ProductInterface {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: { _id: string,image:string, categoryName: string };
  image: string;
  rating?: number;
  discount:number;
  countInStock: number;
  brand: string;
  user: string;
  createdAt: Date;
updatedAt:Date
}
export type { ProductInterface }
