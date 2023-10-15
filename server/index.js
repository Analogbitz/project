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

app.get("/admin", (req, res) => {
  let sql =
    "SELECT task.task_id, customerinfo.name, car.plate,mechanic.m_name, description,status_task.s_name ,task.Date FROM ((((task INNER JOIN customerinfo ON task.customer_id = customerinfo.cus_id) INNER JOIN car ON task.car_id = car.car_id)INNER JOIN mechanic ON task.mech_id = mechanic.m_id)INNER JOIN status_task ON task.status_id = status_task.s_id);";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
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
    [name, phone, lineid, address],
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
  db.query(
    "DELETE FROM customerinfo WHERE cus_id =?",
    cus_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/admin/manage/users/update/:cus_id", (req, res) => {
  const sql ="SELECT * FROM customerinfo WHERE cus_id=?"
  const id = req.params.cus_id
  db.query(sql,id,(err, result) => {
    if (err) return res.json({Error:err});
    return res.json(result);
  });
});


// app.put("/admin/manage/users/edit/:cus_id",(req,res)=>{
//   const sql = "UPDATE customerinfo SET name =?, phone=? ,address =? ,lineid=? WHERE cus_id=?";
//   const cus_id = req.params.cus_id;
//   const name = req.body.name;
//   const phone = req.body.phone;
//   const address = req.body.address;
//   const lineid = req.body.lineid;

//   db.query(sql,[cus_id,name,phone,address,lineid],
//     (err,result)=>{
//     if(err) return res.json({Message:"Error inside server"});
//     return res.json({updated:true});
//   })
// })

app.put("/admin/manage/users/edit/:cus_id", async (req, res) => {
  const { cus_id } = req.params;
  const { Name, Phone, Address, Lineid } = req.body;

  try {
    await db.query(
      `UPDATE customerinfo SET name = ?, phone = ?, address = ?, lineid = ? WHERE cus_id = ?`,
      [Name, Phone, Address, Lineid, cus_id]
    );

    res.json({
      message: "User updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
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

//Add Car
app.post("/admin/manage/cars/create", (req, res) => {
  const plate = req.body.plate;
  const brand = req.body.brand;
  const model = req.body.model;
  const c_vin = req.body.c_vin;
  const num_serial = req.body.num_serial;

  db.query(
    "INSERT INTO car (plate,brand,model,vin,num_serial) VALUES(?,?,?,?,?)",
    [plate, brand, model, c_vin, num_serial],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/admin/manage/cars/delete/:car_id", (req, res) => {
  const car_id = req.params.car_id;
  db.query("DELETE FROM car WHERE car_id =?", car_id, (err, result) => {
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

//Add Mech
app.post("/admin/manage/mechanics/create", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;

  db.query(
    "INSERT INTO mechanic (m_name,m_phone) VALUES(?,?)",
    [name, phone],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/admin/manage/mechanics/delete/:m_id", (req, res) => {
  const m_id = req.params.m_id;
  db.query("DELETE FROM mechanic WHERE m_id =?", m_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////

app.listen(3001, () => {
  console.log("Hey , yoour server is running on port 3001!");
});
