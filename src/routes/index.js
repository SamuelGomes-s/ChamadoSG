import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Private from "./Private";
import Profile from "../pages/profile";
import Customers from "../pages/customers";

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Private> <Dashboard /> </Private>} />
            <Route path="/customers" element={<Private> <Customers /> </Private>} />
            <Route path="/profile" element={<Private> <Profile /> </Private>} />
            <Route path="*" element={''} />
        </Routes>
    )
}