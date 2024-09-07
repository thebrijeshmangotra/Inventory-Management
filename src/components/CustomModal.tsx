"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Card,
  IconButton,
  Modal,
  Typography,
  TextField,
  Button
} from "@mui/material";
import { closeButtonStyle, modalCardStyle } from "@/constants";
import { modalState, modalStateDefaultValue } from "@/store/atom";
import { useRecoilState } from "recoil";
import useInverntoryUpdate from "@/hook/useInverntoryUpdate";
import { Updated_Inventory_State } from "@/types";

const CustomModal = ({
  open,
  handleClose
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [data, updateModalState] = useRecoilState(modalState);
  const [value, setValue] = useState<Updated_Inventory_State>(data);
  const updateInventory = useInverntoryUpdate();

  useEffect(() => {
    setValue(data);
  }, [data.id]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleOnSubmit = () =>
    updateInventory(value, () => {
      updateModalState(value);
      setValue(modalStateDefaultValue);
      handleClose();
    });

  const changesMade = JSON.stringify(value) === JSON.stringify(data);
  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={modalCardStyle} className="space-y-6">
        <div className="flex">
          <div className="w-full">
            <Typography variant="h4">Edit product</Typography>
            <Typography>{data.name}</Typography>
          </div>
          <IconButton onClick={handleClose} style={closeButtonStyle}>
            <CloseIcon color="primary" />
          </IconButton>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            onChange={handleOnChange}
            label="Category"
            name="category"
            value={value.category}
            defaultValue={data.category}
          />
          <TextField
            onChange={handleOnChange}
            name="price"
            value={value.price}
            label="price"
            defaultValue={data.price}
          />
          <TextField
            onChange={handleOnChange}
            name="quantity"
            value={value.quantity}
            label="quantity"
            defaultValue={data.quantity}
          />
          <TextField
            onChange={handleOnChange}
            name="value"
            value={value.value}
            label="value"
            defaultValue={data.value}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnSubmit}
            disabled={changesMade}
          >
            Save
          </Button>
        </div>
      </Card>
    </Modal>
  );
};
export default CustomModal;
