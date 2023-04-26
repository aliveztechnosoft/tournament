import {
  Avatar,
  Box,
  Card,
  Checkbox,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import { Scrollbar } from "./scrollbar";
import { API_BASE_URL } from "@/utils/Api";

export const LogsTable = (props) => {
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

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Game Name</TableCell>
                <TableCell>Android</TableCell>
                <TableCell>IOS</TableCell>
                <TableCell>Website</TableCell>
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

                return (
                  <TableRow hover key={user.id} selected={isSelected}>
                    <TableCell>
                      <Typography variant="subtitle2">{index + 1}</Typography>
                    </TableCell>
                    <TableCell>{user.game_name}</TableCell>
                    <TableCell>{user.android}</TableCell>
                    <TableCell>{user.ios}</TableCell>
                    <TableCell>{user.website}</TableCell>
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
    </Card>
  );
};
