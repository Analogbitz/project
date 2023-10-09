const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "adminSystem",
});



///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Users/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



app.get("/admin/manage/users", (req, res) => {
  db.query("SELECT * FROM customerinfo", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Add Users
app.post("/admin/manage/users/create", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const lineid = req.body.lineid;
  const address = req.body.address;
  

  db.query(
    "INSERT INTO customerinfo (name,phone,lineid,address) VALUES(?,?,?,?)",
    [name,  phone,lineid, address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


app.delete("/admin/manage/users/delete/:cus_id", (req, res) => {
  const cus_id = req.params.cus_id;
  db.query("DELETE FROM customerinfo WHERE cus_id =?", cus_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Cars///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



app.get("/admin/manage/cars", (req, res) => {
  db.query("SELECT * FROM car", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Mechanics//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

app.get("/admin/manage/mechanics", (req, res) => {
  db.query("SELECT * FROM mechanic", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});





app.listen(3001, () => {
  console.log("Hey , yoour server is running on port 3001!");
});