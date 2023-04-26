import {
  Avatar,
  Box,
  Card,
  Checkbox,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { API_BASE_URL } from "@/utils/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const MappingTable = (props) => {
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

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const handleDelete = (id, token) => {
    axios
      .delete(`${API_BASE_URL}/mappings/${id}?token=${token}`, {})
      .then((response) => {
        const updatedItems = items.filter((user) => user.id !== id);
        props.setItems(updatedItems); // update selected games
        toast.success(response.data.msg);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell sx={{ paddingLeft: "30px" }}>Actions</TableCell>
                <TableCell>Sub Domain</TableCell>
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
              {items.map((user) => {
                const isSelected = selected.includes(user.id);

                return (
                  <TableRow hover key={user.id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{user.id}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(user.id, token)}
                        >
                          <AiFillDelete />
                        </IconButton>
                        <IconButton aria-label="update">
                          <AiFillEdit />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.sub_domain}</TableCell>
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
