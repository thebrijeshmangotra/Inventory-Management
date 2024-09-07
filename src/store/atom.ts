import { Updated_Inventory_State } from "@/types";
import { atom, RecoilState } from "recoil";

export const userRoleState = atom({
  key: "userRole",
  default: "admin"
});

export const inventoryState: RecoilState<Updated_Inventory_State[]> = atom<
  Updated_Inventory_State[]
>({
  key: "inventoryState",
  default: []
});

export const modalState: RecoilState<Updated_Inventory_State> =
  atom<Updated_Inventory_State>({
    key: "modalState",
    default: {
      name: "",
      category: "",
      value: "",
      quantity: 0,
      price: "",
      id: "",
      isDeleted: false,
      isActive: true
    }
  });

export const modalStateDefaultValue = {
  name: "",
  category: "",
  value: "",
  quantity: 0,
  price: "",
  id: "",
  isDeleted: false,
  isActive: true
};
