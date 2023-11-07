import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function AddCustomer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [line_id, setLineid] = useState("");
  const [address, setAddress] = useState("");

  const nav = useNavigate();
  

  const addData = () => {
    axios
      .post("http://localhost:3001/admin/manage/user/add", {
        name: name,
        phone: phone,
        line_id: line_id,
        address: address,
      })
      .then(alert("เพิ่มข้อมูลสำเร็จ"));
  };

  return (
    <div>
      <h2>เพิ่มข้อมูลลูกค้า</h2>
      <Box component="form" onSubmit={addData}>
        <div>
          <TextField
            required
            style={{ width: "50%", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            label="ชื่อลูกค้า"
            placeholder="ชื่อลูกค้า"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            required
            style={{ width: "50%", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            label="เบอร์โทร"
            placeholder="เบอร์โทร"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <TextField
            required
            style={{ width: "50%", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            label="line_id"
            placeholder="Line_id"
            onChange={(e) => {
              setLineid(e.target.value);
            }}
          />
          <TextField
            required
            style={{ width: "50%", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            label="ที่อยู่"
            placeholder="ที่อยู่"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <div>
            <Button
              variant="contained"
              color="success"
              size="medium"
              style={{ width: "150px", height: "50px", margin: "30px" }}
              type="submit"
            >
              ยืนยัน
            </Button>

            <Button
              variant="contained"
              color="error"
              size="medium"
              style={{ width: "150px", height: "50px", margin: "30px" }}
              onClick={() => {
                Swal.fire({
                  title: "คำเตือน",
                  text: "ต้องการยกเลิกการเพิ่มข้อมูลนี้หรือไม่",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "ใช่ ต้องการ!",
                  cancelButtonText: "ยกเลิก",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire("ยกเลิกสำเร็จ");
                    nav(-1);
                  }
                });
              }}
            >
              ยกเลิก
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default AddCustomer;
