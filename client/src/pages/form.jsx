import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Box, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from 'axios';

function form() {

    const [name,setName]=useState("");
    const [plate,setPlate]=useState("");
    const [mechanic,setMech]=useState("");
    const [TStatus,setTstatus]=useState("");
    const [description,setDescription]=useState("");

    const addDatas =()=>{
      axios.post("http://localhost:3001/admin/form", {
      customer_name: name,
      plate_id: plate,
      mech_name: mechanic,
      repair_status: TStatus,
      order_description:description,
    })
    }

  

  return (
    <>
      <div>
        <Box component="form" onSubmit={addDatas}>
          <h2>ข้อมูลลูกค้า</h2>
          <div>
            <Box
              sx={{
                margin: "3%",
                flexDirection: "column",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                required
                style={{ width: "50%", margin: "10px" }}
                margin="dense"
                id="outlined-required"
                label="ชื่อลูกค้า"
                placeholder="ชื่อลูกค้า"
                onChange={(e)=>{setName(e.target.value)}}
              />
            </Box>
          </div>

          <div>
            <h2>ข้อมูลรถยนต์</h2>
            <div>
              <Box
                sx={{
                  margin: "3%",
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  required
                  style={{ width: "50%", margin: "10px" }}
                  margin="dense"
                  id="outlined-required"
                  label="ป้ายทะเบียน"
                  placeholder="ป้ายทะเบียน"
                  onChange={(e)=>{setPlate(e.target.value)}}
                />
              </Box>
            </div>

            <div>
              <h2>ข้อมูลช่าง</h2>
              <div>
                <Box
                  sx={{
                    margin: "3%",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="name-repairman">ช่างซ่อม</InputLabel>
                    <Select
                      labelId="name-repairman"
                      label="ช่างซ่อม"
                      placeholder="ช่างซ่อม"
                      style={{ width: "50%", margin: "10px" }}
                      onChange={(e)=>{setMech(e.target.value)}}
                      
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="ช่างบิ๊ก">
                        <em>ช่างบิ๊ก</em>
                      </MenuItem>
                      <MenuItem value="ช่างซี่">
                        <em>ช่างซี่</em>
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="status">สถานะ</InputLabel>
                    <Select
                      labelId="status"
                      label="สถานะ"
                      placeholder="สถานะ"
                      style={{ width: "50%", margin: "10px" }}
                      onChange={(e)=>{setTstatus(e.target.value)}}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="กำลังดำเนินการซ่อม">
                        <em>กำลังดำเนินการซ่อม</em>
                      </MenuItem>
                      <MenuItem value="ดำเนินการเสร็จสิ้น">
                        <em>ดำเนินการเสร็จสิ้น</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    style={{ width: "50%", margin: "10px" }}
                    id="outlined-multiline-static"
                    label="รายละเอียด"
                    multiline
                    rows={4}
                    onChange={(e)=>{setDescription(e.target.value)}}
                  />
                </Box>
              </div>
            </div>
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
              m: 1,
              borderRadius: 1,
            }}
          >
            <Button
              variant="contained"
              color="success"
              size="medium"
              style={{ width: "150px", height: "50px", margin: "30px" }}
              type="submit"
            >
              ยืนยัน
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default form;
