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



function main() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lineid, setLineid] = useState("");
  const [address, setAddress] = useState("");

  const [taskList, setTasklist] = useState([]);

  useEffect(() => {
    getDatas();
  });

  
 

  const getDatas = () => {
    Axios.get("http://localhost:3001/admin").then((response) => {
      setTasklist(response.data);
    });
  };

 
  return (
    <div>
      <h1>รายการซ่อม</h1>
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
            
          />

          <TextField
            required
            id="outlined-required"
            label="เบอร์โทร"
            placeholder="เบอร์โทร"
            
          />

          <TextField
            required
            id="outlined-required"
            label="Line-Id"
            placeholder="Line-Id"
            
          />
          <TextField
            required
            id="outlined-required"
            label="ที่อยู่"
            placeholder="ที่อยู่"
            
          />
        </div>
        <div>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            
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
                <TableCell>วันที่:</TableCell>
                <TableCell align="center">ชื่อลูกค้า:</TableCell>
                <TableCell align="center">เลขทะเบียนรถ:</TableCell>
                <TableCell align="center">ช่างซ่อม:</TableCell>
                <TableCell align="center">รายละเอียด:</TableCell>
                <TableCell align="center">สถานะ:</TableCell>
                <TableCell align="center">ลบรายการ</TableCell>
                <TableCell align="center">แก้ไขรายการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList &&
                taskList.map((val) => (
                  <TableRow
                    key={val.task_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                    {val.Date}
                    </TableCell>
                    <TableCell align="center">{val.name}</TableCell>
                    <TableCell align="center">{val.plate}</TableCell>
                    <TableCell align="center">{val.m_name}</TableCell>
                    <TableCell align="center">{val.description}</TableCell>
                    <TableCell align="center">{val.s_name}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        
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

export default main;
