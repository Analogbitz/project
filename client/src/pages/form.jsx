import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function form() {
  return (
    <div>
      <h2>ข้อมูลลูกค้า</h2>
      <div className="bgform">
        <Box
          sx={{
            margin: "3%",
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            required
            style={{ width: "400px", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            label="ชื่อลูกค้า"
            placeholder="ชื่อลูกค้า"
          />

          <TextField
            required
            style={{ width: "400px", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            label="เบอร์โทร"
            placeholder="เบอร์โทร"
          />
        </Box>

        <Box
          sx={{
            margin: "3%",
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            style={{ width: "400px", margin: "10px" }}
            id="outlined-multiline-static"
            label="ที่อยู่"
            multiline
            rows={4}
          />

          <TextField
            required
            style={{ width: "400px", margin: "10px" }}
            id="outlined-required"
            label="Line ID"
            placeholder="Line ID"
          />
        </Box>
      </div>

      <div>
        <h2>ข้อมูลรถยนต์</h2>
        <div className="bgform">
          <Box
            sx={{
              margin: "3%",
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              required
              style={{ width: "400px", margin: "10px" }}
              margin="dense"
              id="outlined-required"
              label="ป้ายทะเบียน"
              placeholder="ป้ายทะเบียน"
            />

            <TextField
              required
              style={{ width: "400px", margin: "10px" }}
              margin="dense"
              id="outlined-required"
              label="ยี่ห้อ"
              placeholder="ยี่ห้อ"
            />

            <TextField
              required
              style={{ width: "400px", margin: "10px" }}
              margin="dense"
              id="outlined-required"
              label="รุ่น"
              placeholder="รุ่น"
            />
          </Box>

          <Box
            sx={{
              margin: "3%",
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              required
              style={{ width: "400px", margin: "10px" }}
              id="outlined-required"
              label="หมายเลขเครื่อง"
              placeholder="หมายเลขตัวเครื่อง"
            />

            <TextField
              required
              style={{ width: "400px", margin: "10px" }}
              id="outlined-required"
              label="หมายเลยตัวถัง"
              placeholder="หมายเลยตัวถัง"
              หมายเลยตัวถัง
            />
          </Box>
        </div>

        <div>
          <h2>ข้อมูลช่าง</h2>
          <div className="bgform">
            <Box
              sx={{
                margin: "3%",
                flexDirection: "row",
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
                  style={{ width: "90%", margin: "10px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="ช่างแป๋ง">
                    <em>ช่างแป๋ง</em>
                  </MenuItem>
                  <MenuItem value="ช่างแม่ง">
                    <em>ช่างแม่ง</em>
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="status">สถานะ</InputLabel>
                <Select
                  labelId="status"
                  label="สถานะ"
                  placeholder="สถานะ"
                  style={{ width: "90%", margin: "10px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="กำลังดำเนินการ">
                    <em>กำลังดำเนินการ</em>
                  </MenuItem>
                  <MenuItem value="ดำเนินการเสร็จสิ้น">
                    <em>ดำเนินการเสร็จสิ้น</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                margin: "3%",
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                style={{ width: "400px", margin: "10px" }}
                id="outlined-multiline-static"
                label="รายละเอียด"
                multiline
                rows={4}
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
        >
          ยืนยัน
        </Button>
      </Box>
    </div>
  );
}

export default form;
