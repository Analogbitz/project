const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "adminsystem2",
});


app.get("/", (req, res) => {
  let sql =
    "SELECT order_repair.order_id,order_repair.create_order , customers.name , cars.plate_license,mechanic.mech_name,order_repair.description , status_order.status_name FROM order_repair INNER JOIN customers ON order_repair.customer_id=customers.cus_id INNER JOIN cars ON order_repair.car_id=cars.car_id INNER JOIN mechanic ON order_repair.mechanic_id=mechanic.mech_id INNER JOIN status_order ON order_repair.status_id=status_order.status_id;";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// //ลบข้อมูล order
// app.delete("/delete/:order_id", (req, res) => {
//   const order_id = req.params.order_id;
//   db.query(
//     "DELETE FROM order_repair WHERE order_id =?",
//     order_id,
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);ห
//       }
//     }
//   );
// });


//Add order
app.post("/form", (req, res) => {
  // รับข้อมูลจากแบบฟอร์ม
  const phone = req.body.customer_phone;
  const plate_id = req.body.plate_id;
  const mech_name = req.body.mech_name;
  const repair_status = req.body.repair_status;
  const order_description = req.body.order_description;
  const estimate_time = req.body.estimate_time;

  // สร้างคำสั่ง SQL สำหรับการค้นหา customer_id จากตาราง customers
  const customerSQL = "SELECT cus_id FROM customers WHERE phone = ?";

  // สร้างคำสั่ง SQL สำหรับการค้นหา car_id จากตาราง cars
  const carSQL = "SELECT car_id FROM cars WHERE plate_license = ?";

  // สร้างคำสั่ง SQL สำหรับการค้นหา mechanic_id จากตาราง mechanic
  const mechSQL = "SELECT mech_id FROM mechanic WHERE mech_name = ?";

  // สร้างคำสั่ง SQL สำหรับการค้นหา status_id จากตาราง status_order
  const statusSQL = "SELECT status_id FROM status_order WHERE status_name = ?";

  // ค้นหา customer_id จากตาราง customers
  db.query(customerSQL, [phone], (customerErr, customerResult) => {
    if (customerErr) {
      console.log(customerErr);
    } else {
      const customer_id = customerResult[0].cus_id;

      // ค้นหา car_id จากตาราง cars
      db.query(carSQL, [plate_id], (carErr, carResult) => {
        if (carErr) {
          console.log(carErr);
        } else {
          const car_id = carResult[0].car_id;

          // ค้นหา mechanic_id จากตาราง mechanic
          db.query(mechSQL, [mech_name], (mechErr, mechResult) => {
            if (mechErr) {
              console.log(mechErr);
            } else {
              const mechanic_id = mechResult[0].mech_id;

              // ค้นหา status_id จากตาราง status_order
              db.query(statusSQL, [repair_status], (statusErr, statusResult) => {
                if (statusErr) {
                  console.log(statusErr);
                } else {
                  const status_id = statusResult[0].status_id;

                  // เพิ่มข้อมูลลงในตาราง order_repair
                  db.query(
                    "INSERT INTO order_repair (customer_id, car_id, mechanic_id, status_id, description, estimate_time) VALUES (?, ?, ?, ?, ?, ?)",
                    [customer_id, car_id, mechanic_id, status_id, order_description, estimate_time],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        res.send("Values Inserted");
                      }
                    }
                  );
                }
              });
            }
          });
        }
      });
    }
  });
});







///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Users/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

app.get("/admin/manage/users", (req, res) => {
  db.query("SELECT * FROM `customers`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Add Users
app.post("/admin/manage/user/add", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const line_id = req.body.line_id;
  const address = req.body.address;

  db.query(
    "INSERT INTO customers (`name`, `phone`, `line_id`, `address`) VALUES(?,?,?,?)",
    [name, phone, line_id, address],
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
    "DELETE FROM customers WHERE cus_id =?",
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

////Get id to edit page
app.get("/admin/manage/users/update/:cus_id",(req,res)=>{
 const sql ="SELECT * FROM customers WHERE cus_id=?";
 const cus_id = req.params.cus_id;
  db.query(sql, [cus_id],(err,result)=>{
    if(err) return res.json({Error:err});
    return res.json(result);
  })
})

app.put("/admin/manage/users/edit/:cus_id", async (req, res) => {
  const { cus_id } = req.params;
  const { Name, phone,  line_id,address } = req.body;

  try {
    await db.query(
      `UPDATE customers SET name = ?, phone = ?,  line_id = ? ,address = ? WHERE cus_id = ?`,
      [Name, phone, line_id,address, cus_id]
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

// app.get("/admin/manage/cars", (req, res) => {
//   db.query("SELECT * FROM cars", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// //Add Car
// app.post("/admin/manage/cars/create", (req, res) => {
//   const plate = req.body.plate;
//   const brand = req.body.brand;
//   const model = req.body.model;
//   const c_vin = req.body.c_vin;
//   const num_serial = req.body.num_serial;

//   db.query(
//     "INSERT INTO car (plate,brand,model,vin,num_serial) VALUES(?,?,?,?,?)",
//     [plate, brand, model, c_vin, num_serial],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });
// ///Delete
// app.delete("/admin/manage/cars/delete/:car_id", (req, res) => {
//   const car_id = req.params.car_id;
//   db.query("DELETE FROM car WHERE car_id =?", car_id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// ///Get update list id
// app.get("/admin/manage/cars/update/:car_id", (req, res) => {
//   const sql = "SELECT * FROM car WHERE car_id=?";
//   const id = req.params.car_id;
//   db.query(sql, id, (err, result) => {
//     if (err) return res.json({ Error: err });
//     return res.json(result);
//   });
// });

// ////
// app.put("/admin/manage/cars/edit/:car_id", async (req, res) => {
//   const { car_id } = req.params;
//   const { plate, brand, model, vin, num_serial } = req.body;

//   try {
//     await db.query(
//       `UPDATE car SET plate = ?, brand = ?, model = ?, vin = ? ,num_serial = ? WHERE car_id = ?`,
//       [plate, brand, model, vin, num_serial, car_id]
//     );

//     res.json({
//       message: "User updated successfully!",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Something went wrong!",
//     });
//   }
// });

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Mechanics//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// app.get("/admin/manage/mechanics", (req, res) => {
//   db.query("SELECT * FROM mechanic", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// //Add Mech
// app.post("/admin/manage/mechanics/create", (req, res) => {
//   const name = req.body.name;
//   const phone = req.body.phone;

//   db.query(
//     "INSERT INTO mechanic (m_name,m_phone) VALUES(?,?)",
//     [name, phone],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });

// app.delete("/admin/manage/mechanics/delete/:m_id", (req, res) => {
//   const m_id = req.params.m_id;
//   db.query("DELETE FROM mechanic WHERE m_id =?", m_id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

/////////////////////////////////////////////////////////////////////////////////

app.listen(3001, () => {
  console.log("Hey , yoour server is running on port 3001!");
});
