import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/index.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";
import RegisterPage from "./pages/RegisterPage/index.jsx";
import Navbar from "./layout/Navbar/index.jsx";
import Footer from "./layout/Footer/index.jsx";
function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <main className="mb-auto w-10/12 max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
