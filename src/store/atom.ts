import { UpdatedInventoryStateInterface } from "@/types";
import { atom, RecoilState } from "recoil";

export const userRoleState = atom({
  key: "userRole",
  default: "admin"
});

export const inventoryState: RecoilState<UpdatedInventoryStateInterface[]> =
  atom<UpdatedInventoryStateInterface[]>({
    key: "inventoryState",
    default: []
  });

export const modalState: RecoilState<UpdatedInventoryStateInterface> =
  atom<UpdatedInventoryStateInterface>({
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
