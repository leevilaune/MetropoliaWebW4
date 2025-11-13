import "./App.css";

import { Route, BrowserRouter, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Single from "./views/Single";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/single" element={<Single />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
