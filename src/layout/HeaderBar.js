import React from 'react'
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import { setLogout } from "../store";


const HeaderBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleLogout = () => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Are you sure you want to sign out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return new Promise((resolve) => {
          setTimeout(resolve, 500);
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
          dispatch(setLogout());
          navigate("/")
      }
    });
  };


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      
      <Box display="flex" borderRadius="3px" backgroundColor="#F5EFE7">
       
      </Box>

      {/* icons */}
      <Box display="flex">
        <IconButton>
          <LogoutIcon onClick={handleLogout} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeaderBar;