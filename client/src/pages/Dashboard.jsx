import React from "react";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import WorkOffOutlinedIcon from "@mui/icons-material/WorkOffOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import Onprogress from "../Componets/Onprogress";
import Onfinish from "../Componets/Onfinish";
import CountOrderRepair from "../Componets/CountOrderRepair";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard">
        <div className="bg-dt">
          <div className="head-dt">งานทั้งหมด</div>
          <div className="con-dt">
            <div className="work-icon">
              <WorkOutlineOutlinedIcon
                sx={{ fontSize: 50, color: "#2D4059" }}
              />
            </div>
            <div className="dt-db"></div>
            <h1 className="dt-num">
              <CountOrderRepair />
            </h1>
          </div>
        </div>

        <div className="bg-dt">
          <div className="head-dt">งานที่เสร็จแล้ว</div>
          <div className="con-dt">
            <div className="work-icon">
              <WorkOffOutlinedIcon color="success" sx={{ fontSize: 50 }} />
            </div>
            <div className="dt-db"></div>
            <h1 className="dt-num">
              <Onfinish />
            </h1>
          </div>
        </div>

        <div className="bg-dt">
          <div className="head-dt">งานรอดำเนินการ</div>
          <div className="con-dt">
            <div className="work-icon">
              <WorkHistoryOutlinedIcon color="warning" sx={{ fontSize: 50 }} />
            </div>
            <div className="dt-db"></div>
            <h1 className="dt-num">
              <Onprogress />
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-dt">
        <div className="head-dt">งานรอดำเนินการ</div>
        <div className="con-dt">
          <div className="work-icon">
            <WorkHistoryOutlinedIcon color="warning" sx={{ fontSize: 50 }} />
          </div>
          <div className="dt-db"></div>
          <h1 className="dt-num">
            <Onprogress />
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
