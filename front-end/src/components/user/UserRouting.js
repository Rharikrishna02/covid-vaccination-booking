import React from "react";
import { Route,Routes } from "react-router-dom";
import UHome from "./Home";
import UserNavbar from "./UserNavbar";
import UBookings from "./Bookings";

const UserRouting = () =>{
    return(
      <>
      <UserNavbar/>
            <Routes>
            <Route path="/home" element={<UHome />} />
            <Route path="/booking" element={<UBookings />} />
            </Routes>
    </>
    );
}
export default UserRouting;