"use client";

import { useEffect } from "react";
import { Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CardsGrid from "@/components/CardsGrid";
import Topbar from "@/components/Topbar";
import CustomTableContainer from "@/components/TableContainer";
import { useRecoilState } from "recoil";
import { inventoryState } from "@/store/atom";
import { InventoryStateInterface } from "@/types";

export default function Home() {
  const [_, updateInventory] = useRecoilState(inventoryState);

  useEffect(() => {
    const httpCall = async () => {
      try {
        const response = await fetch(
          "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
        );
        const data = await response.json();
        const updatedList = data.map(
          (item: InventoryStateInterface, index: number) => {
            return {
              ...item,
              quantity: +item.quantity,
              price: item.value.replace("$", ""),
              value: item.value.replace("$", ""),
              id: `${item.name}-${item.category}-${index}`,
              isDeleted: false,
              isActive: true
            };
          }
        );
        updateInventory(updatedList);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error);
        } else {
          console.log("Unknown error:", error);
        }
      }
    };
    httpCall();
  }, []);

  return (
    <>
      <CssBaseline />
      <Topbar />
      <div className="mt-12 w-full h-full p-4 space-y-4">
        <Typography variant="h3">Inventory stats</Typography>
        <CardsGrid />
        <CustomTableContainer />
      </div>
    </>
  );
}
