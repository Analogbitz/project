import SideBar from "./Layout/SideBar";
import HeaderBar from "./Layout/Headerbar";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import MainPage from "./pages/main";
import ManagePage from "./pages/Notiline";
import MechanicPage from "./pages/Mechanic";
import CarPage from "./pages/Cars";
import UserPage from "./pages/Users";
import FormPage from "./pages/form";
import EditCar from "./pages/Edit_pages/EditCars";
import Addcustomer from "./pages/Add_pages/AddCustomer";
import EditUser from "./pages/Edit_pages/EditUser";
import AddMech from "./pages/Add_pages/AddMech";
import AddCar from "./pages/Add_pages/Addcar";
import Dashboard from "./pages/Dashboard";
import Notiline from "./pages/Notiline";


function App() {
  return (
    <>
      <CssBaseline />
      <div className="app">
        <SideBar />
        <main className="content">
          <HeaderBar />
          <div className="content-body">
            <Box m="20px">
              <Routes>
                <Route path="/" key="/" element={<MainPage />} />
                <Route path="/form" element={<FormPage />} />
                <Route path="/admin/manage" element={<ManagePage />} />
                <Route path="/admin/manage/users" element={<UserPage />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/nontiline" element={<Notiline />} />
                <Route
                  path="/admin/manage/user/add"
                  element={<Addcustomer />}
                />
                <Route
                  path="/admin/manage/car/add"
                  element={<AddCar />}
                />
                <Route
                  path="/admin/manage/mechanics/add"
                  element={<AddMech />}
                />
                <Route path="/admin/manage/cars" element={<CarPage />} />
                <Route
                  path="/admin/manage/mechanics"
                  element={<MechanicPage />}
                />
                <Route
                  path="/admin/manage/users/edit/:cus_id"
                  element={<EditUser />}
                />
                <Route
                  path="/admin/manage/cars/edit/:car_id"
                  element={<EditCar />}
                />
              </Routes>
            </Box>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
