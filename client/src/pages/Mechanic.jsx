import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useState ,useEffect } from "react";
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

function Mechanic() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lineid, setLineid] = useState("");
  const [address, setAddress] = useState("");

  const [userList, setUserlist] = useState([]);

  useEffect(() => {
    getEmployees();
  });

  const getEmployees = () => {
    Axios.get("http://localhost:3001/admin/manage/mechanics").then(
      (response) => {
        setUserlist(response.data);
      }
    );
  };
  return (
    <div>
      <h1>ข้อมูลช่าง</h1>
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
            label="ชื่อ"
            placeholder="ชื่อ"
          />

          <TextField
            required
            id="outlined-required"
            label="เบอร์โทร"
            placeholder="เบอร์โทร"
          />
        </div>
        <div>
          <Button variant="contained" startIcon={<AddRoundedIcon />}>
            เพิ่มข้อมูล
          </Button>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={getEmployees}
          >
            แสดงข้อมูล
          </Button>
        </div>
      </Box>

      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id:</TableCell>
                <TableCell align="center">ชื่อ:</TableCell>
                <TableCell align="center">เบอร์โทร:</TableCell>
                <TableCell align="center">ลบรายการ</TableCell>
                <TableCell align="center">แก้ไขรายการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList &&
                userList.map((val) => (
                  <TableRow
                    key={val.m_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {val.m_id}
                    </TableCell>
                    <TableCell align="center">{val.m_name}</TableCell>
                    <TableCell align="center">{val.m_phone}</TableCell>

                    <TableCell align="center">
                      <DeleteIcon color="error" />
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

export default Mechanic;
