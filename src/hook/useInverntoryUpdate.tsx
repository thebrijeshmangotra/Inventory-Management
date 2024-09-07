import { inventoryState } from "@/store/atom";
import { UpdatedInventoryStateInterface } from "@/types";
import { useRecoilState } from "recoil";

const useInverntoryUpdate = () => {
  const [inventory, updatedInventoryState] = useRecoilState(inventoryState);

  const updateInventory = (
    data: UpdatedInventoryStateInterface,
    afterUpdate?: () => void
  ) => {
    const InventroyCopy = [...inventory];
    const productIndex = inventory.findIndex((index) => index.id === data.id);
    InventroyCopy.splice(productIndex, 1, data);
    updatedInventoryState(InventroyCopy);
    afterUpdate && afterUpdate();
  };
  return updateInventory;
};

export default useInverntoryUpdate;
