import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
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
import buddhistEra from "dayjs/plugin/buddhistEra";
import Swal from "sweetalert2";


dayjs.extend(buddhistEra);

const DateLongTH = (date) => {
  dayjs.locale('th'); // ตั้งค่าภาษาเป็นภาษาไทย

  return dayjs(date).format('DD/MM/BBBB HH:mm');
};

function main() {
  const [taskList, setTasklist] = useState([]);

  useEffect(() => {
    getDatas();
  });

  const getDatas = () => {
    Axios.get("http://localhost:3001/").then((response) => {
      setTasklist(response.data);
    });
  };

  const deleteOrderlist = (order_id) => {
    Axios.delete(`http://localhost:3001/delete/${order_id}`).then(
      (response) => {
        setTasklist(
          taskList.filter((val) => {
            return val.order_id != order_id;
          })
        );
      }
    );
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
      ></Box>
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
                    key={val.order_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {DateLongTH(val.create_order)}
                    </TableCell>
                    <TableCell align="center">{val.name}</TableCell>
                    <TableCell align="center">{val.plate_license}</TableCell>
                    <TableCell align="center">{val.name}</TableCell>
                    <TableCell align="center">{val.description}</TableCell>
                    <TableCell align="center">{val.status_name}</TableCell>

                    <TableCell align="center">
                      <EditIcon sx={{ color: yellow[900] }} />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                              );
                              deleteOrderlist(val.order_id);
                            }
                          });
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
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
