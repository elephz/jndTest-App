import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AddIcon from '@mui/icons-material/Add';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
import InventoryIcon from '@mui/icons-material/Inventory';
const SideBar = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const user = useSelector(state => state.user)

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
        breakPoint="md"
        backgroundColor="rgb(247 255 247)"
        style={{ height: "100%" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                icon={isCollapsed ? <MenuOutlinedIcon  onClick={() => setisCollapsed(!isCollapsed)} /> : undefined}
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
                    <Typography>ShortenUrl APP</Typography>
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
                      width="120px"
                      height="120px"
                      src={`/assets/avatar.jpeg`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center" sx={{  mt:1,  overflow:"hidden", textOverflow:"ellipsis"}}>
                    <Typography>{user}</Typography>
                  </Box>
                </Box>
              )}

              <SubMenu label="Manage" icon={<PeopleOutlinedIcon />}>
                <MenuItem> Admin</MenuItem>
              </SubMenu>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: isCollapsed ? 0 : 0.5,
                  letterSpacing: "0.5px",
                }}
              >
                Extra
              </Typography>
            </div>

            <Menu>
              <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
              <MenuItem icon={<ReceiptOutlinedIcon />}>Documentation</MenuItem>
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