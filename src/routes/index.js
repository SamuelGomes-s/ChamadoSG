import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Private from "./Private";

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Private> <Dashboard /> </Private>} />
            <Route path="*" element={''} />
        </Routes>
    )
}