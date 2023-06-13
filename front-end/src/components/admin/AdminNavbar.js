import React from "react";
import '../Navbar.css';
import { Link,useNavigate } from "react-router-dom";
import logo from '../logo.jpg';

function AdminNavbar(){
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
                        <li><i style={{marginRight:'5px'}} class="fa-sharp fa-solid fa-hospital"></i><Link style={{color:'#edf0f1'}} to="/admin/home">Center</Link></li>
                        <li><i style={{marginRight:'5px'}} class="fa-solid fa-syringe"></i><Link style={{color:'#edf0f1'}} to="/admin/dosage">Dosage</Link></li>
                    </ul>
                </nav>
                <a className="cta"><button onClick={logout}>Logout</button></a>
            </header>
        </div>
    )
};

export default AdminNavbar;