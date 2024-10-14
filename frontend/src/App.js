import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <DashboardLayout>
                <Contact />
              </DashboardLayout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
