import "./App.css";

import { Route, BrowserRouter, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Single from "./views/Single";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Profile from "./views/Profile";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/single" element={<Single />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />{" "}
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};
export default App;
