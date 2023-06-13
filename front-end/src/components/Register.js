import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      pwd: "",
      cpwd: "",
      checker:false,
      vmail:false,
      vpwd:false,
      vppwd:false
    };
    
  }
  
  register = () => {
    const { cpwd, pwd, mail,checker } = this.state;
    if (cpwd !== pwd) {
      alert("Password and Confirm Password does not matches");
    } else {
        axios
          .post("http://localhost:3001/uregister", {
            umail:mail,
            upwd:pwd,
          })
          .then((response) => {
            console.log(response.data)
            if(response.data==="no"){
              alert("Username already exists");
                this.setState({checker:true});
            }
            if(response.data==="Email sent"){
            this.setState({checker:false});
            
            }
          });
          console.log(checker);
           if(this.state.checker) { alert("Username already exists"); this.props.navigate("/"); }
          else { alert("Verification email sent"); this.props.navigate("/otp");}
    }
  };
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
    if(name==="cpwd"){
      if(value!==this.state.pwd){this.setState({ vpwd: true });}
      if(value===this.state.pwd){this.setState({ vpwd: false });}
    }
  };

  render() {
    const { mail, pwd, cpwd,vmail,vpwd,vppwd } = this.state;

    return (
      <div>
        <div className="body1">
          <div class="box-form">
            <div class="left">
              <div class="overlay">
                <h1>Let's Register</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur et est sed felis aliquet sollicitudin
                </p>
                <span>
                  <Link to="/">
                    <div>Login</div>
                  </Link>
                </span>
              </div>
            </div>

            <div class="right">
              <h4>Register</h4>
              <p>Let's Register you in..It takes less than a minute</p>

              <form onSubmit={this.register}>
                <div class="inputs">
                  <input
                    type="email"
                    placeholder="Enter Your mail"
                    name="mail"
                    onChange={this.handleChange}
                    value={mail}
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
                    type="password"
                    placeholder="Enter Password"
                    name="pwd"
                    onChange={this.handleChange}
                    value={pwd}
                    style={vppwd ? { borderBottomColor: "red" } : {}}
                    required
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
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="cpwd"
                    onChange={this.handleChange}
                    value={cpwd}
                    style={vpwd ? { borderBottomColor: "red" } : {}}
                    required
                  />
                  {vpwd && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "10px",
                      width: "fit-content",
                      fontWeight: "bold",
                    }}
                  >
                    Password Not matching
                  </span>
                )}
                </div>
                <button style={{ marginTop: "30px" }} type="submit">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;

export function RegisterRouter(props){
  const navigate=useNavigate()
  return (<Register navigate={navigate}></Register>)
}