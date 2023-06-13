import React from "react";
import { Route,Routes } from "react-router-dom";
import AHome from "./Home";
import AdminNavbar from "./AdminNavbar";
import ADosage from "./ADosage";

const AdminRouting = () =>{
    return(
      <>
      <AdminNavbar/>
            <Routes>
            <Route path="/home" element={<AHome />} />
            <Route path="/dosage" element={<ADosage />} />
            </Routes>
    </>
    );
}
export default AdminRouting;