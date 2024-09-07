export interface Inventory_State {
  name: string;
  category: string;
  price: string;
  quantity: number;
  value: string;
}

export interface Updated_Inventory_State {
  id: string;
  name: string;
  category: string;
  price: string;
  quantity: number;
  value: string;
  isDeleted: boolean;
  isActive: boolean;
}
