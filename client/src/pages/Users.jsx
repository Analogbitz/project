import React ,{ useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { yellow } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";



function Users() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lineid, setLineid] = useState("");
  const [address, setAddress] = useState("");

  const [userList, setUserlist] = useState([]);

  useEffect(() => {
    getEmployees();
  });

  

  const addUsers = () => {
    Axios.post("http://localhost:3001/admin/manage/users/create", {
      name: name,
      phone: phone,
      lineid: lineid,
      address: address,
    }).then(() => {
      setUserlist([
        ...userList,
        {
          name: name,
          phone: phone,
          lineid: lineid,
          address: address,
        },
      ]);
    });
  };

  const deleteUserslist = (cus_id) => {
    Axios.delete(
      `http://localhost:3001/admin/manage/users/delete/${cus_id}`
    ).then((response) => {
      setUserlist(
        userList.filter((val) => {
          return val.cus_id != cus_id;
        })
      );
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/admin/manage/users").then((response) => {
      setUserlist(response.data);
    });
  };

 
  return (
    <div>
      <h1>ข้อมูลลูกค้า</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="ชื่อลูกค้า"
            placeholder="ชื่อลูกค้า"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <TextField
            required
            id="outlined-required"
            label="เบอร์โทร"
            placeholder="เบอร์โทร"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />

          <TextField
            required
            id="outlined-required"
            label="Line-Id"
            placeholder="Line-Id"
            onChange={(event) => {
              setLineid(event.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="ที่อยู่"
            placeholder="ที่อยู่"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
        </div>
        <div>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={addUsers}
          >
            เพิ่มข้อมูล
          </Button>
          
        </div>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ชื่อลูกค้า:</TableCell>
                <TableCell align="center">เบอร์โทร:</TableCell>
                <TableCell align="center">LINE ID:</TableCell>
                <TableCell align="center">ที่อยู่:</TableCell>
                <TableCell align="center">ลบรายการ</TableCell>
                <TableCell align="center">แก้ไขรายการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList &&
                userList.map((val) => (
                  <TableRow
                    key={val.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {val.name}
                    </TableCell>
                    <TableCell align="center">{val.phone}</TableCell>
                    <TableCell align="center">{val.lineid}</TableCell>
                    <TableCell align="center">{val.address}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          deleteUserslist(val.cus_id);
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <EditIcon sx={{ color: yellow[900] }} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default Users;
