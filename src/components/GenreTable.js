import { API_BASE_URL } from "@/utils/Api";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Fade,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Scrollbar } from "src/components/scrollbar";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const GenreTable = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const handleDelete = (id, token) => {
    axios
      .delete(`${API_BASE_URL}/categories/${id}?token=${token}`, {})
      .then((response) => {
        console.log(items);
        const updatedItems = items.filter((user) => user.id !== id);
       
        props.setItems(updatedItems);
        console.log(response.data);
        toast.success(response.data.msg);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleUpdateClick = (genreName) => {
    handleOpen();
  };
  return (
    <Card sx={{borderRadius:"10px"}}>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>Genre Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.isLoading && (
                <TableRow>
                  <TableCell align="center" colSpan={9}>
                    <CircularProgress color="inherit" />
                  </TableCell>
                </TableRow>
              )}
              {items.map((user, index) => {
                const isSelected = selected.includes(user.id);
                const currentIndex = page * rowsPerPage + index + 1;

                return (
                  <TableRow hover key={user.id} selected={isSelected}>
                    <TableCell>
                      <Typography variant="subtitle2">{currentIndex}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(user.id, token)}
                      >
                        <AiFillDelete />
                      </IconButton>
                      <IconButton
                        aria-label="update"
                        onClick={() => handleUpdateClick(user.name)}
                      >
                        <AiFillEdit />
                      </IconButton>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={open}>
                          <Box sx={style}>
                            <Typography
                              id="transition-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Update
                            </Typography>
                            <TextField
                              fullWidth
                              label="Sub Domain"
                              name="GameName"
                              onChange={(e) => {}}
                              required
                              type="text"
                              value={""}
                            />
                            <Button fill>Update</Button>
                          </Box>
                        </Fade>
                      </Modal>
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <ToastContainer />
    </Card>
  );
};
