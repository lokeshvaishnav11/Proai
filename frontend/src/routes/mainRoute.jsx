import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
// import Dashboard from "../pages/Dashboard";
// import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/game" element={<Home />} />

        <Route path="/register" element={<Register />} />

        {/* <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<NotFound />} /> */}

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;