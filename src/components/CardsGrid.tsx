import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import { useRecoilState } from "recoil";
import { inventoryState } from "@/store/atom";

const CardsGrid = () => {
  const [inventory] = useRecoilState(inventoryState);

  const totalProducts = inventory.filter((item) => !item.isDeleted);
  const outofStock = totalProducts.filter((item) => !item.quantity);

  const totalValue = totalProducts
    .map((item) => +item.value.replace("$", ""))
    .reduce((acc, curr) => acc + curr, 0);

  const filteredCategory = totalProducts.map((item) => item.category);
  const totalCategory = filteredCategory.filter(
    (item, index) => filteredCategory.indexOf(item) === index
  ).length;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent>
          <div className="flex gap-4 p-3">
            <ShoppingCartIcon />
            <div className="flex flex-col gap-2">
              <Typography>Total Products</Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalProducts.length}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex gap-4 p-3">
            <CurrencyExchangeIcon />
            <div className="flex flex-col gap-2">
              <Typography>Total store value</Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalValue}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex gap-4 p-3">
            <RemoveShoppingCartIcon />
            <div className="flex flex-col gap-2">
              <Typography>Out of stocks</Typography>
              <Typography variant="h4" fontWeight="bold">
                {outofStock.length}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex gap-4 p-3">
            <CategoryIcon />
            <div className="flex flex-col gap-2">
              <Typography>No of Category</Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalCategory}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default CardsGrid;
