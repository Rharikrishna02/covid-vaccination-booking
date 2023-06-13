import React,{Component} from "react";
import './Login.css';
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      pwd: "",
      vmail: false,vppwd:false
    };
  }

  componentDidMount() {
    window.addEventListener("popstate", (e) => {
      window.history.go(1);
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === "mail") {
      this.setState({ vmail: !isNaN(parseInt(value.charAt(0))) });
    }
    if(name==="pwd"){
      if(value.length<8){this.setState({ vppwd: true });}
      else{this.setState({ vppwd: false });}
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { mail, pwd } = this.state;
    axios
      .post("http://localhost:3001/login", {
        umail: mail,
        upwd: pwd,
      })
      .then((response) => {
        if (response.data === "no") {
          alert("Invalid Username/Password");
        } else {
          if (response.data[0].category === "user") {
            localStorage.setItem("username", mail);
            this.props.navigate("/user/home");
          } else if (response.data[0].category === "admin") {
            alert("You are logged in as Admin");
            localStorage.setItem("username", mail);
            this.props.navigate("/admin/home");
          } else if (response.data[0].category === "userv") {
            this.props.navigate("/register");
          } else {
            alert("Invalid Username/Password");
          }
        }
      });
  };

  render() {
    const { mail, pwd, vmail ,vppwd} = this.state;

    return (
      <div className="body1">
        <div className="box-form">
          <div className="left">
            <div className="overlay">
              <h1>Let's Login</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur et est sed felis aliquet sollicitudin
              </p>
              <span>
                <Link to="/register">
                  <div>Register</div>
                </Link>
              </span>
            </div>
          </div>
          <div className="right">
            <h4>Login</h4>
            <p>Let's Log you in..It takes less than a minute</p>
            <form onSubmit={this.handleSubmit}>
              <div className="inputs">
                <input
                  type="email"
                  name="mail"
                  placeholder="Enter Your mail"
                  value={mail}
                  onChange={this.handleChange}
                  style={vmail ? { borderBottomColor: "red" } : {}}
                  required
                />
                {vmail && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "10px",
                      width: "fit-content",
                      fontWeight: "bold",
                    }}
                  >
                    Invalid Email
                  </span>
                )}
                <input
                  style={{ marginBottom: "30px" }}
                  type="password"
                  name="pwd"
                  placeholder="Enter Password"
                  value={pwd}
                  onChange={this.handleChange}
                />
                {vppwd && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "10px",
                      width: "fit-content",
                      fontWeight: "bold",
                    }}>Password Length must be greater than 8</span>
                  )}
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

export function LoginRouter(props){
  const navigate=useNavigate();
  return(<Login navigate={navigate}></Login>)
}