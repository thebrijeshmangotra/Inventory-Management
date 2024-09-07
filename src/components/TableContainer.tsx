import {
  Button,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { customCss } from "@/constants";
import { useState } from "react";
import CustomModal from "./CustomModal";
import { useRecoilState } from "recoil";
import {
  inventoryState,
  modalState,
  modalStateDefaultValue,
  userRoleState
} from "@/store/atom";
import { UpdatedInventoryStateInterface } from "@/types";
import useInverntoryUpdate from "@/hook/useInverntoryUpdate";
const CustomTableContainer = () => {
  const [open, setOpen] = useState(false);
  const [inventory] = useRecoilState(inventoryState);
  const [_, updateModalState] = useRecoilState(modalState);

  const handleModalTrigger = (data: UpdatedInventoryStateInterface) => {
    updateModalState(data);
    setOpen((prev) => !prev);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button style={customCss.tableHeadingCells}>Name</Button>
              </TableCell>
              <TableCell align="center">
                <Button style={customCss.tableHeadingCells}>Category</Button>
              </TableCell>
              <TableCell align="center">
                <Button style={customCss.tableHeadingCells}>Price</Button>
              </TableCell>
              <TableCell align="center">
                <Button style={customCss.tableHeadingCells}>Quantity</Button>
              </TableCell>
              <TableCell align="center">
                <Button style={customCss.tableHeadingCells}>Value</Button>
              </TableCell>
              <TableCell align="center">
                <Button style={customCss.tableHeadingCells}>ACTION</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.length ? (
              <TableRowMap handleModalTrigger={handleModalTrigger} />
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex justify-center">
                    <CircularProgress />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomModal
        open={open}
        handleClose={() => handleModalTrigger(modalStateDefaultValue)}
      />
    </>
  );
};

export default CustomTableContainer;

const TableRowMap = ({
  handleModalTrigger
}: {
  handleModalTrigger: (e: UpdatedInventoryStateInterface) => void;
}) => {
  const [inventory] = useRecoilState(inventoryState);
  const [role] = useRecoilState(userRoleState);
  const updateInventory = useInverntoryUpdate();

  const handleDeleteRow = (data: UpdatedInventoryStateInterface) => {
    const updatedData = { ...data, isDeleted: true };
    updateInventory(updatedData);
  };

  const handleDisableRow = (data: UpdatedInventoryStateInterface) => {
    const updatedData = { ...data, isActive: !data.isActive };
    updateInventory(updatedData);
  };

  return (
    <>
      {inventory
        .filter((item) => !item.isDeleted)
        .map((item) => (
          <TableRow key={item.id} sx={!item.isActive ? disbaledRowCss : {}}>
            <TableCell component="th">{item.name}</TableCell>
            <TableCell component="th" align="center">
              {item.category}
            </TableCell>
            <TableCell component="th" align="center">
              $ {item.price}
            </TableCell>
            <TableCell component="th" align="center">
              {item.quantity}
            </TableCell>
            <TableCell component="th" align="center">
              $ {item.value}
            </TableCell>
            <TableCell component="th" align="center">
              <IconButton
                disabled={!item.isActive || role === "user"}
                color="primary"
                onClick={() => handleModalTrigger(item)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                disabled={role === "user"}
                color="secondary"
                onClick={() => handleDisableRow(item)}
              >
                {item.isActive ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </IconButton>
              <IconButton
                disabled={role === "user"}
                color="error"
                onClick={() => handleDeleteRow(item)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

const disbaledRowCss = {
  th: {
    color: "#aaaaaa"
  }
};
