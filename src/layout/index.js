import React from "react";

import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
      <ToastContainer />
      <SideBar isSidebar={isSidebar} />
      <main className="content">
        <HeaderBar setIsSidebar={setIsSidebar} />
        <div className="content_body">
          <Box m="20px" mb="5rem">
            <Outlet />
          </Box>
        </div>
      </main>
    </div>
  );
}
