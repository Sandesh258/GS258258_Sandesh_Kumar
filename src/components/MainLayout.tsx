import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px", overflowX: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
