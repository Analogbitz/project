import React, { useEffect ,useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { yellow } from '@mui/material/colors';

function Cars() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lineid, setLineid] = useState("");
  const [address, setAddress] = useState("");

  const [userList, setUserlist] = useState([]);

  useEffect(() => {
    getEmployees();
  })

  const getEmployees = () => {
    Axios.get("http://localhost:3001/admin/manage/cars").then((response) => {
      setUserlist(response.data);
    });
  };
  return (
    <div>
      <h1>ข้อมูลรถยนต์</h1>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="เลขทะเบียน"
            placeholder='เลขทะเบียน'
          />


          <TextField
            required
            id="outlined-required"
            label="ยี่ห้อ"
            placeholder='ยี่ห้อ'
          />

          <TextField
            required
            id="outlined-required"
            label="รุ่น"
            placeholder='รุ่น'
          />
          <TextField
            required
            id="outlined-required"
            label="หมายเลขตัวถัง"
            placeholder='หมายเลขตัวถัง'

          />
          <TextField
            required
            id="outlined-required"
            label="หมายเลขเครื่อง"
            placeholder='หมายเลขเครื่อง'
          />


        </div>
        <div>
          <Button variant="contained" startIcon={<AddRoundedIcon />}>เพิ่มข้อมูล</Button>
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={getEmployees}>แสดงข้อมูล</Button>
        </div>
      </Box>


      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>เลขทะเบียน:</TableCell>
                <TableCell align="right">ยี่ห้อ:</TableCell>
                <TableCell align="right">รุ่น:</TableCell>
                <TableCell align="right">หมายเลขตัวถัง:</TableCell>
                <TableCell align='right'>หมายเลขเครื่อง</TableCell>
                <TableCell align='center'>ลบรายการ</TableCell>
                <TableCell align='center'>แก้ไขรายการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {

                userList && userList.map((val, key) => (
                  <TableRow
                    key={val.plate}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {val.plate}
                    </TableCell>
                    <TableCell align="right">{val.brand}</TableCell>
                    <TableCell align="right">{val.model}</TableCell>
                    <TableCell align="right">{val.vin}</TableCell>
                    <TableCell align="right">{val.num_serial}</TableCell>
                    <TableCell align='center'>
                      <DeleteIcon color='error' />
                    </TableCell>
                    <TableCell align='center'>
                      <EditIcon sx={{ color: yellow[900] }} />
                    </TableCell>

                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </div>
  )
}

export default Cars