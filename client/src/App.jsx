import SideBar from "./Layout/SideBar";
import HeaderBar from "./Layout/Headerbar";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import MainPage from "./pages/main";
import ManagePage from "./pages/manage";
import MechanicPage from "./pages/Mechanic";
import CarPage from "./pages/Cars";
import UserPage from "./pages/Users";
import FormPage from "./pages/form";

import EditUser from "./pages/EditUser";

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
                <Route path="/admin" key="/admin" element={<MainPage />} />
                <Route
                  path="/admin/form"
                  key="/admin/form"
                  element={<FormPage />}
                />
                <Route
                  path="/admin/manage"
                  key="/admin/manage"
                  element={<ManagePage />}
                />
                <Route
                  path="/admin/manage/users"
                  key="/admin/manage/users"
                  element={<UserPage />}
                />
                <Route
                  path="/admin/manage/cars"
                  key="/admin/manage/cars"
                  element={<CarPage />}
                />
                <Route
                  path="/admin/manage/mechanics"
                  key="/admin/manage/mechanics"
                  element={<MechanicPage />}
                />
                <Route
                  path="/admin/manage/users/edit/:cus_id"
                  key={`/admin/manage/users/edit/:cus_id`}
                  element={<EditUser />}
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
