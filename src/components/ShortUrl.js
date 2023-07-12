import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { shortUrl, getUrl } from "../functions/shortUrl";
import { useSelector } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import CardUrl from "./CardUrl";



export default function ShortUrl() {
  const [url, setUrl] = useState("");

  const [result, setResult] = useState("");

  const [data, setData] = useState({});

  const [currentPage, setCurrentPage] = useState(1);

  const [fetch, setFetch] = useState(false)

  const defaultTheme = createTheme();

  const urlPattern = /^(?:https?:\/\/)?(?:www\.)?[^\s.]+\.[^\s]{2,}$/i;

  const token = useSelector((state) => state.token);

  useEffect(() => {
    fetchData()
  }, [currentPage, fetch])

  const fetchData = async () => {
    const param = `?page=${currentPage}`
    const request = await getUrl(param, token)
 
    setData(request.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = await shortUrl({ url }, token);

      const { data } = request.data;

      setUrl(``)
      setResult(codeToOriginalUrl(data.code));
      setFetch(old => !old)
    } catch (error) {
      console.log({ error });
    }
  };

  const codeToOriginalUrl = (code) => `${process.env.REACT_APP_API}/${code}`

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value)

    toast('Copied', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }

  const handleGotolink = (value) => {
    window.open(value, '_blank');
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          component="main"
          sx={{ height: "100vh", justifyContent: "center", mb:"5rem" }}
        >
          <CssBaseline />
          <Grid item md={5} component={Paper} elevation={6} sx={{mb:"5rem"}} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Shorten Url
              </Typography>
              <Box
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: "100%" }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="url"
                  label="Input Url"
                  value={url}
                  name="url"
                  placeholder="https://www.example.com"
                  onChange={(e) => setUrl(e.target.value)}
                  autoFocus
                  autoComplete="off"
                />
                {result && (
                  <Box sx={{ display: "flex" }}>
                    <TextField sx={{ m: 1, width:"50%" }} disabled size="small"  value={result} />
                    <Button
                      sx={{ m: 1 }}
                      endIcon={<ContentCopyIcon />}
                      variant="outlined"
                      onClick={() => handleCopy(result)}
                    >
                      Copy
                    </Button>
                    <Button
                      sx={{ m: 1 }}
                      endIcon={<OpenInNewIcon />}
                      variant="outlined"
                      onClick={() => handleGotolink(result)}
                    >
                      Go to url
                    </Button>
                  </Box>
                )}

                <Button
                  type="submit"
                  fullWidth
                  disabled={!urlPattern.test(url)}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>

                <Box sx={{ display: "flex", flexDirection:"column", justifyContent:"space-between", height:"675px" }}>
                  <div>
                    {"data" in data && data.data.length && data.data.map(item => (
                      <CardUrl 
                        item={item} 
                        key={item.id}
                        codeToOriginalUrl={codeToOriginalUrl}  
                        handleCopy={handleCopy}
                        handleGotolink={handleGotolink}
                        setFetch={setFetch}
                      />
                    ))}
                  </div>
                  <Box sx={{ml:"auto"}} >
                    {"data" in data && data.total > 5 && <Pagination count={data.last_page} sx={{mt:3}} onChange={(event, value) => setCurrentPage(value)} />}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

         
        </Grid>
      </ThemeProvider>
    </>
  );
}
