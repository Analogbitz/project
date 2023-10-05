import React, { useState } from "react";
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,

} from "react-pro-sidebar";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonIcon from '@mui/icons-material/Person';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BuildIcon from '@mui/icons-material/Build';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
const SideBar = () => {
    const [isCollapsed, setisCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(false);

    return (
        <div
            style={{
                display: "flex",
                height: "100%",
            }}
        >
            <Sidebar
                collapsed={isCollapsed}
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                onBreakPoint={setBroken}
                image=""
                breakPoint="md"
                style={{ height: "100%" }}
                backgroundColor="#2D4059"
            >
                <div
                    style={{ display: "flex", flexDirection: "column", height: "100%" }}
                >
                    <div style={{ flex: 1, marginBottom: "32px" }}>
                        <Menu iconShape="square">
                            {/* LOGO */}
                            <MenuItem
                                onClick={() => setisCollapsed(!isCollapsed)}
                                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                                style={{
                                    margin: "10px 0 20px 0",
                                }}
                            >
                                {!isCollapsed && (
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        ml="15px"
                                    >
                                        
                                        <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                                            <MenuOutlinedIcon />
                                        </IconButton>
                                    </Box>
                                )}
                            </MenuItem>
                            {!isCollapsed && (
                                <Box mb="25px">
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <img
                                            alt="profile-user"
                                            width="100px"
                                             height="100px"
                                            src={`/assets/logo.jpg`}
                                            style={{ cursor: "pointer", borderRadius: "50%" }}
                                        />
                                    </Box>
                                    
                                </Box>
                            )}

                            <Link to="/admin" className="menu-bars">
                                <MenuItem icon={<HomeOutlinedIcon />}>Dashboard</MenuItem>
                            </Link>

                            <SubMenu icon={<MapOutlinedIcon />} label="Data" className="menu-bars">
                                <Link to={"/admin/viewtable"} className="sub-menu-bars">
                                    <MenuItem icon={<TableViewIcon />}>
                                        {" "}
                                        Table
                                    </MenuItem>
                                </Link>
                                <MenuItem icon={<BarChartOutlinedIcon />} className="sub-menu-bars">
                                    {" "}
                                    รายการสินค้า
                                </MenuItem>
                            </SubMenu>

                            <SubMenu  icon={<PeopleOutlinedIcon />}label="Manage" className="menu-bars">
                                <Link to={"/admin/manage/users"} className="sub-menu-bars">
                                    <MenuItem icon={<PersonIcon/>}>ข้อมูลลูกค้า</MenuItem>
                                </Link>
                                <Link to={"/admin/manage/cars"} className="sub-menu-bars">
                                    <MenuItem icon={<DirectionsCarIcon/>}>ข้อมูลรถยนต์</MenuItem>
                                </Link>
                                <Link to={"/admin/manage/mechanics"} className="sub-menu-bars">
                                    <MenuItem icon={<BuildIcon/>}>ข้อมูลช่าง</MenuItem>
                                </Link>
                            </SubMenu>
                        </Menu>



                    </div>
                </div>
            </Sidebar>
            <main>
                <div style={{ padding: "16px 2px ", color: "#44596e" }}>
                    <div style={{ marginBottom: "16px" }}>
                        {broken && (
                            <IconButton onClick={() => setToggled(!toggled)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
export default SideBar;