"use client";

import { ChangeEvent } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Card, IconButton, Modal, Typography, TextField } from "@mui/material";
import { closeButtonStyle, modalCardStyle } from "@/constants";
import { modalState } from "@/store/atom";
import { useRecoilState } from "recoil";
import useInverntoryUpdate from "@/hook/useInverntoryUpdate";

const CustomModal = ({
  open,
  handleClose
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [data, updateModalState] = useRecoilState(modalState);
  const updateInventory = useInverntoryUpdate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = { ...data, [e.target.name]: e.target.value };
    updateModalState(value);
  };

  const handleOnSubmit = () => updateInventory(data, handleClose);

  return (
    <Modal open={open} onClose={handleOnSubmit}>
      <Card sx={modalCardStyle}>
        <div className="flex ">
          <div className="w-full">
            <Typography variant="h4">Edit product</Typography>
            <Typography>{data.name}</Typography>
          </div>
          <IconButton onClick={handleOnSubmit} style={closeButtonStyle}>
            <CloseIcon color="primary" />
          </IconButton>
        </div>
        <div className="grid grid-cols-2 gap-6 pt-8">
          <TextField
            onChange={handleOnChange}
            label="Category"
            name="category"
            defaultValue={data.category}
          />
          <TextField
            onChange={handleOnChange}
            name="price"
            label="price"
            defaultValue={data.price}
          />
          <TextField
            onChange={handleOnChange}
            name="quantity"
            label="quantity"
            defaultValue={data.quantity}
          />
          <TextField
            onChange={handleOnChange}
            name="value"
            label="value"
            defaultValue={data.value}
          />
        </div>
      </Card>
    </Modal>
  );
};
export default CustomModal;
