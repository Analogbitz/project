import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCars() {
  const { car_id } = useParams();
  const [plate_license, setPlate] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [vin_number, setVin] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/manage/cars/update/" + car_id)
      .then((res) => {
        console.log(res);
        setPlate(res.data[0].plate_license);
        setMake(res.data[0].make);
        setModel(res.data[0].model);
        setVin(res.data[0].vin_number);
        
      })
      .catch((err) => console.log(err));
  }, []);


  const UpdateData = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/admin/manage/cars/edit/" + car_id, {
        plate_license,
        make,
        model,
        vin_number,
      })
      .then((response) => {
        nav("/admin/manage/cars");
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div>
      <h2>แก้ไขข้อมูลรถยนต์</h2>
      <div className="bg-con">
        <Box component="form" 
        sx={{
          margin: "3%",
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={UpdateData}>
          <TextField
            style={{ width: "400px", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            placeholder="เลขทะเบียน"
            value={plate_license}
            label="เลขทะเบียน"
            onChange={(e) => setPlate(e.target.value)}
          />

          <TextField
            style={{ width: "400px", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            placeholder="ยี่ห้อ"
            value={make}
            label="ยี่ห้อ"
            onChange={(e) => setMake(e.target.value)}
          />

          <TextField
            style={{ width: "400px", margin: "10px" }}
            id="outlined-required"
            label="รุ่น"
            placeholder="รุ่น"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <TextField
            style={{ width: "400px", margin: "10px" }}
            id="outlined-required"
            label="หมายเลขตัวถัง"
            placeholder="หมายเลขตัวถัง"
            value={vin_number}
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

export default EditCars;