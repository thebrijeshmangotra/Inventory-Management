export interface InventoryStateInterface {
  name: string;
  category: string;
  price: string;
  quantity: number;
  value: string;
}

export interface UpdatedInventoryStateInterface {
  id: string;
  name: string;
  category: string;
  price: string;
  quantity: number;
  value: string;
  isDeleted: boolean;
  isActive: boolean;
}
