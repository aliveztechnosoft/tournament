import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const Top10Table = ({ orders, sx }) => {
  return (
    <Card sx={sx}>
      <CardHeader title="Top 10 Played Games" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Game Name</TableCell>
                <TableCell>Players</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                return (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.played}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
    </Card>
  );
};
