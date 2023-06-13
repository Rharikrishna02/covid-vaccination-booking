import React, { Component } from "react";
import "./AHome.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

class AHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cdata: [],
      vchecker: false,
      vchecker1: false,
      center_name: "",
      center_name1: "",
      center_location: "",
      center_mobile: "",
      center_dosage: 0,
      center_dosage1: 0,
      vcmob:false
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/acentersee").then((response) => {
      if (response.data === "no") {
        this.setState({ vchecker1: true });
      } else {
        this.setState({ cdata: response.data, vchecker: true });
      }
    });
  }

  handleInsert = () => {
    const {
      center_name,
      center_location,
      center_mobile,
      center_dosage,
      center_dosage1,
    } = this.state;
    axios
      .post("http://localhost:3001/acenterins", {
        cname: center_name,
        location: center_location,
        mobile: center_mobile,
        dosage: center_dosage,
        dosage1: center_dosage1,
      })
      .then((response) => {
        if (response.data === "no") {
          alert("Vaccination Center already exists");
        } else {
          alert("Vaccination Center created/updated successfully");
          window.location.reload();
          this.props.navigate("/admin/home");
        }
      });
  };
  

  handleDelete = () => {
    const { center_name1 } = this.state;
    axios
      .post("http://localhost:3001/acenterdel", {
        cname: center_name1,
      })
      .then((response) => {
        if (response.data === "no") {
          alert("Error Occurred");
        } else {
          alert("Vaccination Center deleted successfully");
          window.location.reload();
          this.props.navigate("/admin/home");
        }
      });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === "center_mobile") {
      if(value.length<10||value.length>10){
        this.setState({ vcmob: true });
      }
      if(value.length===10){this.setState({ vcmob: false });}
    }
  };

  render() {
    const {
      cdata,
      vchecker,
      vchecker1,
      center_name,
      center_name1,
      center_location,
      center_mobile,
      center_dosage,
      center_dosage1,vcmob
    } = this.state;

    return (
      <div className="ahome">
        <h1>Vaccination Centers Chart</h1>

        <div className="admin-buttons">
          <button>
            <i style={{ marginRight: "3px" }} class="fa-solid fa-plus"></i>
            <a href="#popup">Add</a>
          </button>
        </div>

        <div id="popup" class="overlay">
          <div class="popup">
            <h2>CREATE VACCINATION CENTER</h2>
            <a class="close" href="#">&times;</a>

            <form onSubmit={this.handleInsert}>
              <div className="mydivs">
                <label>Center Name</label>
                <input
                  type="text"
                  placeholder="Enter center name"
                  value={center_name}
                  onChange={(e) =>
                    this.setState({ center_name: e.target.value })
                  }
                />

                <label>Center Location</label>
                <input
                  type="text"
                  placeholder="Enter center location"
                  value={center_location}
                  onChange={(e) =>
                    this.setState({ center_location: e.target.value })
                  }
                />

                <label>Mobile Number</label>
                <input
                  type="text"
                  pattern="[0-9]+"
                  minLength={10}
                  maxLength={10}
                  name="center_mobile"
                  placeholder="Enter Contact Number"
                  value={center_mobile}
                  style={vcmob ? { borderColor: "red" } : {}}
                  onChange={this.handleChange}
                />
                {vcmob && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "10px",
                      width: "fit-content",
                      fontWeight: "bold",
                      float:'right'
                    }}>Character must not be present / Mobile Number should have length 10</span>
                  )}

                <label>Covishield Availability</label>
                <input
                  type="number"
                  placeholder="Enter dosage count"
                  value={center_dosage}
                  onChange={(e) =>
                    this.setState({ center_dosage: e.target.value })
                  }
                />

                <label>Covaxin Availability</label>
                <input
                  type="number"
                  placeholder="Enter dosage count"
                  value={center_dosage1}
                  onChange={(e) =>
                    this.setState({ center_dosage1: e.target.value })
                  }
                />
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>

        <div id="popup1" class="overlay">
          <div class="popup">
            <h2>DELETE VACCINATION CENTER</h2>
            <a class="close" href="#">&times;</a>
            <h5>
              Note: Confirm the Center name to be deleted from the text box
              given below
            </h5>
            <form onSubmit={this.handleDelete}>
              <div className="mydivs">
                <label>Select Center Name</label>
                <input
                  type="text"
                  placeholder="Select Center Name"
                  value={center_name1}
                  readOnly
                />
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>

        <div className="list-table">
          <table
            class="table table-striped table-bordered table-sm"
            cellspacing="0"
            width="100%"
          >
            <thead>
              <tr>
                <th class="th-sm">Centre Name</th>
                <th class="th-sm">Centre Location</th>
                <th class="th-sm">Date added</th>
                <th class="th-sm">Mobile Number</th>
                <th class="th-sm">Covishield Availability</th>
                <th class="th-sm">Covaxin Availability</th>
                <th class="th-sm">Edit/Remove</th>
              </tr>
            </thead>
            <tbody>
              {vchecker &&
                cdata.map((data) => {
                  return (
                    <tr>
                      <td>{data.center_name}</td>
                      <td>{data.location}</td>
                      <td>{data.date_added}</td>
                      <td>{data.mobile}</td>
                      <td>{data.dosage}</td>
                      <td>{data.covaxine}</td>
                      <td>
                        <button
                          className="edit-now"
                          onClick={() => {
                            this.setState({ center_name: data.center_name });
                            this.setState({ center_location: data.location });
                            this.setState({ center_mobile: data.mobile });
                            this.setState({ center_dosage: data.dosage });
                            this.setState({ center_dosage1: data.covaxine });
                          }}
                        >
                          <a
                            style={{
                              textDecoration: "none",
                              fontSize: "16px",
                              color: "white",
                            }}
                            href="#popup"
                          >
                            <i
                              style={{ marginRight: "3px" }}
                              class="fa-solid fa-pen"
                            ></i>
                          </a>
                        </button>
                        <button
                          className="remove-now"
                          onClick={() => {
                            this.setState({ center_name1: data.center_name });
                          }}
                        >
                          <a
                            style={{
                              textDecoration: "none",
                              fontSize: "16px",
                              color: "white",
                            }}
                            href="#popup1"
                          >
                            <i
                              style={{ marginRight: "3px" }}
                              class="fa-solid fa-trash"
                            ></i>
                          </a>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              {vchecker1 && (
                <tr>
                  <td colSpan={7}>No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AHome;

export function AHomeRouter(props){
  const navigate=useNavigate()
  return (<AHome navigate={navigate}></AHome>)
}