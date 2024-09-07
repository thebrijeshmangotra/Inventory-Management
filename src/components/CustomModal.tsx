"use client";

import { ChangeEvent, useEffect, useState } from "react";
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
import { UpdatedInventoryStateInterface } from "@/types";

const CustomModal = ({
  open,
  handleClose
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [data, updateModalState] = useRecoilState(modalState);
  const [value, setValue] = useState<UpdatedInventoryStateInterface>(data);
  const updateInventory = useInverntoryUpdate();

  useEffect(() => {
    setValue(data);
  }, [data.id]);

  useEffect(() => {
    setValue((prev) => {
      return {
        ...prev,
        value: `${+prev.price * prev.quantity || 0}`
      };
    });
  }, [value.quantity, value.price]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "quantity" || e.target.name === "price"
          ? +e.target.value
          : e.target.value
    }));
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
          />
          <TextField
            onChange={handleOnChange}
            name="price"
            label="price"
            value={value.price}
          />
          <TextField
            onChange={handleOnChange}
            name="quantity"
            label="quantity"
            value={value.quantity}
          />
          <TextField
            disabled
            label="value"
            name="value"
            onChange={handleOnChange}
            value={value.value}
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
