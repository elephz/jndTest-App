import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Register from "./components/Register";
import Layout from "./layout/index";

import ProtectedLayout from "./layout/ProtectedLayout";
import Login from "./components/Login";
import ShortUrl from "./components/ShortUrl";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <Layout />
            </ProtectedLayout>
          }
          errorElement={<Navigate to="/" />}
        >
          <Route
            index={true}
            element={
              <ProtectedLayout>
                <ShortUrl />
              </ProtectedLayout>
            }
          />
        </Route>
        <Route
          path="/register"
          element={
            <ProtectedLayout login>
              <Register />
            </ProtectedLayout>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedLayout login>
              <Login />
            </ProtectedLayout>
          }
        />
      </>
    )
  );

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
