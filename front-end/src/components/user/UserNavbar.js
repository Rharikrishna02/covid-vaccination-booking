import React from "react";
import '../Navbar.css';
import { Link,useNavigate } from "react-router-dom";
import logo from '../logo.jpg';

function UserNavbar(){
    const navigate=useNavigate();

    const logout=()=>{
        alert('Logout successfull');
        localStorage.setItem('username','');
        navigate('/');
    }
    return(
        <div className="navbody">
            <header>
                <img className="logo" src={logo} alt="logo"></img>
                <nav>
                    <ul className="nav_links">
                        <li><i style={{marginRight:'5px'}} class="fa-solid fa-home"></i><Link style={{color:'#edf0f1'}} to="/user/home">Home</Link></li>
                        <li><i style={{marginRight:'5px'}} class="fa-sharp fa-solid fa-book"></i><Link style={{color:'#edf0f1'}} to="/user/booking">Bookings</Link></li>
                    </ul>
                </nav>
                <a className="cta"><button onClick={logout}>Logout</button></a>
            </header>
        </div>
    )
};

export default UserNavbar;