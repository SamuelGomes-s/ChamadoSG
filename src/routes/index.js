import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Private from "./Private";
import Costumers from "../pages/costumers";
import Profile from "../pages/profile";

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Private> <Dashboard /> </Private>} />
            <Route path="/costumers" element={<Private> <Costumers /> </Private>} />
            <Route path="/profile" element={<Private> <Profile /> </Private>} />
            <Route path="*" element={''} />
        </Routes>
    )
}