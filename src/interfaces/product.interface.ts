export interface ProductRequest {
  name: string;
  amount: string;
}

export interface Product extends ProductRequest{
  id: number;
}
