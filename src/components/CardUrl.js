import React from 'react'
import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { remove } from "../functions/shortUrl";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function CardUrl({item, codeToOriginalUrl, handleCopy, handleGotolink, setFetch}) {

  const token = useSelector((state) => state.token);

  const handleDelete = async (id) => {

    Swal.fire({
      title: "Are you sure delete item ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await remove(id, token)
          
        } catch (error) {
          console.error(error.message);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => setFetch(old => !old));
      }
    });
  }

  return (
    <>
        <Box boxShadow={1} sx={{p:1, m: 1, position:"relative"}}>
          <IconButton color='error' onClick={() => handleDelete(item.id)} sx={{position:"absolute", top: "0", right : "0", borderRadius:"50%", cursor:"pointer" }} >
            <CloseIcon  />
          </IconButton>
            <p>{item.original_url}</p>
            <p>
              {codeToOriginalUrl(item.code)} 
              <IconButton>
                <ContentCopyIcon sx={{cursor:"pointer", verticalAlign:"middle", color : "rgba(0, 0, 0, 0.87)"}} onClick={() => handleCopy(codeToOriginalUrl(item.code))} />
              </IconButton>
            </p>
        </Box>
    </>
  )
}
