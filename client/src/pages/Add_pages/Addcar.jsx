import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Addcar() {
  const [plate_license, setPlate] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [vin_number, setVin] = useState("");

  const nav = useNavigate();

  const addData = () => {
    axios
      .post("http://localhost:3001/admin/manage/car/add", {
        plate_license: plate_license,
        make: make,
        model: model,
        vin_number: vin_number,
      })
      .then();
  };

  return (
    <div>
      <h2>เพิ่มข้อมูลรถยนต์</h2>
      <div className="bg-con">
        <Box component="form"
          sx={{
            margin: "3%",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
          }}
          onSubmit={addData}>
          <TextField required
            style={{ width: "400px", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            placeholder="เลขทะเบียน"

            label="เลขทะเบียน"
            onChange={(e) => setPlate(e.target.value)}
          />

          
          <FormControl fullWidth 
          style={{ width: "400px", margin: "10px" }}>
            <InputLabel id="demo-simple-select-label">ยี่ห้อ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="ยี่ห้อ"
              onChange={(e) => setMake(e.target.value)}
            >
              <MenuItem value="TOYOTA">TOYOTA</MenuItem>
              <MenuItem value="HONDA">HONDA</MenuItem>
              <MenuItem value="MITSUBISHI">MITSUBISHI</MenuItem>
              <MenuItem value="ISUZU">ISUZU</MenuItem>
              <MenuItem value="MG">MG</MenuItem>
              <MenuItem value="FORD">FORD</MenuItem>
              <MenuItem value="MAZDA">MAZDA</MenuItem>
              <MenuItem value="NISSAN">NISSAN</MenuItem>
              <MenuItem value="SUZUKI">SUZUKI</MenuItem>
              <MenuItem value="BENZ">BENZ</MenuItem>
              <MenuItem value="BMW">BMW</MenuItem>
            </Select>
          </FormControl>
          
          <TextField required
            style={{ width: "400px", margin: "10px" }}
            id="outlined-required"
            label="รุ่น"
            placeholder="รุ่น"

            onChange={(e) => setModel(e.target.value)}
          />
          <TextField 
            style={{ width: "400px", margin: "10px" }}
            id="outlined-required"
            label="หมายเลขตัวถัง"
            placeholder="หมายเลขตัวถัง"

            onChange={(e) => setVin(e.target.value)}
          />

          <Button
            variant="contained"
            color="success"
            size="medium"
            type="submit"
            style={{ width: "150px", height: "50px", margin: "30px" }}
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
                text: "ต้องการยกเลิกหรือไม่",
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
        </Box>
      </div>
    </div>
  );
}

export default Addcar;
