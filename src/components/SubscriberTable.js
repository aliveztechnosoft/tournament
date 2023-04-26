import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  IconButton,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Switch from "@mui/material/Switch";

import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";
import { AiFillNotification } from "react-icons/ai";
import { Scrollbar } from "src/components/scrollbar";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/utils/Api";
import axios from "axios";

export const SubscriberTable = (props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/SendNotification");
  };
  const [blockStatus, setBlockStatus] = useState({});
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

  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(items);
  }, [items]);
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const handleBlock = async (event, user, id, token) => {
    event.preventDefault();
    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return { ...u, blocked: event.target.checked ? 0 : 1 };
      } else {
        return u;
      }
    });
    setUsers((prevUsers) => [...prevUsers]); // force update
    setUsers(updatedUsers);
    const f = new FormData();
    f.append("action", "change_block_status");

    axios({
      method: "post",
      url: `${API_BASE_URL}/users/${id}?token=${token}`,
      data: f,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
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
                <TableCell>Block/UnBlock</TableCell>
                <TableCell>
                  <Stack
                    display="flex"
                    justifyContent="center"
                    direction="row"
                    spacing={2}
                  >
                    Send Notification
                  </Stack>
                </TableCell>
                <TableCell>Platform</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Profile Pic</TableCell>
                <TableCell>Register Date & Time</TableCell>
                <TableCell>Last Login Date & Time</TableCell>
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
              {users.map((user, index) => {
                const isSelected = selected.includes(user.id);

                return (
                  <TableRow hover key={user.id} selected={isSelected}>
                    <TableCell>
                      <Typography variant="subtitle2">{index + 1}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <FormControlLabel
                          value="start"
                          control={
                            <Switch
                              checked={user.blocked === 0}
                              onChange={(event) =>
                                handleBlock(event, user, user.id, token)
                              }
                              color="primary"
                              name={`blocked-${user.id}`}
                            />
                          }
                        />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={3}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleClick}
                        >
                          <SvgIcon fontSize="small">
                            <AiFillNotification />
                          </SvgIcon>
                        </Button>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.platforms.map((platform, indexp) => {
                      <p key={indexp}>{platform}</p>
                    })}</TableCell>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        display="flex"
                        justifyContent="center"
                      >
                        <Avatar src={user.profile_pic}></Avatar>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.register_date}</TableCell>
                    <TableCell>{user.login_date}</TableCell>
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
