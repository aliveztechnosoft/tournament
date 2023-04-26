"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
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
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const GameTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,

    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const [selectedGame, setSelectedGame] = useState(null); // add state for selected game

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleCloseDialog = () => {
    setSelectedGame(null);
  };
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const handleDelete = (id, token) => {
    axios
      .delete(`${API_BASE_URL}/games/${id}?token=${token}`, {})
      .then((response) => {
        const updatedItems = items.filter((game) => game.id !== id);
        props.setItems(updatedItems); // update selected games
        toast.success(response.data.msg);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const [editRow, setEditRow] = useState(null);
  const handleEdit = (id) => {
    const gameToEdit = items.find((game) => game.id === id);
    setEditRow(gameToEdit);
  };
  return (
    <Card sx={{borderRadius:"10px"}}> 
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.no</TableCell>
                <TableCell sx={{ paddingLeft: "30px" }}>Actions</TableCell>
                <TableCell>Game Name</TableCell>

                <TableCell>Genre</TableCell>
                <TableCell>Game Thumbnail</TableCell>
                <TableCell>Short Description</TableCell>
                <TableCell>Long Description</TableCell>
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
              {items &&
                items.map((game, index) => {
                  const isSelected = selected.includes(game.id);
                  const currentIndex = page * rowsPerPage + index + 1;

                  return (
                    <TableRow hover key={game.id} selected={isSelected}>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Typography variant="subtitle2">
                            {currentIndex}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Stack alignItems="center" direction="row">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(game.id, token)}
                          >
                            <AiFillDelete />
                          </IconButton>
                          <IconButton
                            aria-label="update"
                            onClick={() => handleEdit(game.id, token)}
                          >
                            <AiFillEdit />
                          </IconButton>
                        </Stack>
                      </TableCell>
                      {editRow && editRow.id === game.id ? (
                        <>
                          <TableCell>
                            <input type="text" value={editRow.name} />
                          </TableCell>
                          <TableCell>
                            <input type="text" value={editRow.category_name} />
                          </TableCell>
                          <TableCell>
                            <input type="text" value={editRow.image} />
                          </TableCell>
                          <TableCell>
                            <input
                              type="text"
                              value={editRow.short_description}
                            />
                          </TableCell>
                          <TableCell>
                            <input
                              type="text"
                              value={editRow.long_description}
                            />
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{game.name}</TableCell>
                          <TableCell>{game.category_name}</TableCell>
                          <TableCell>
                            <Stack
                              alignItems="center"
                              justifyContent="center"
                              direction="row"
                              spacing={2}
                            >
                              <Avatar src={game.image}></Avatar>
                            </Stack>
                          </TableCell>
                          <TableCell>{game.short_description}</TableCell>
                          <TableCell>
                            <Button onClick={() => handleGameClick(game)}>
                              View
                            </Button>
                          </TableCell>
                        </>
                      )}
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
      {selectedGame && (
        <Dialog open={selectedGame !== null} onClose={handleCloseDialog}>
          {/* <DialogTitle>{selectedGame.gamename} Description</DialogTitle> */}
          <DialogContent>{selectedGame.long_description}</DialogContent>
        </Dialog>
      )}
      <ToastContainer />
    </Card>
  );
};
