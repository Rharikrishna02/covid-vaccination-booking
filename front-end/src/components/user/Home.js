import React, { Component } from "react";
import "./Booking.css";
import $ from 'jquery';
import axios from "axios";
import { DataTable } from 'datatables.net';
import 'datatables.net-bs4/js/dataTables.bootstrap4';
import moment from "moment";

class UHome extends Component {
  constructor(props) {
    super(props);
    this.dataTableRef = React.createRef();
    this.state = {
      bdata: [],
      vchecker: false,
      vchecker1: false,
      inschecker1: false,
      bookcheck: '',
      bname: '',
      bage: 0,
      slot: 0,
      aadhar: '',
      vaccine: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/ucentersee').then((response) => {
      if (response.data === "no") {
        this.setState({ vchecker1: true });
      } else {
        this.setState({ bdata: response.data, vchecker: true });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.vchecker !== this.state.vchecker && this.state.vchecker) {
      $(this.dataTableRef.current).DataTable();
      $('.dataTables_length').addClass('bs-select');
    }
    if (prevState.vchecker1 !== this.state.vchecker1 && this.state.vchecker1) {
      $(this.dataTableRef.current).DataTable();
      $('.dataTables_length').addClass('bs-select');
    }
    if (this.state.bookcheck.length > 0 && !this.state.inschecker1) {
      this.setState({ inschecker1: true });
    }
  }

  bookinsert = () => {
    axios.post('http://localhost:3001/ubookingins', {
      uname: localStorage.getItem('username').toString(),
      cname: this.state.bookcheck,
      slot: this.state.slot,
      vaccine: this.state.vaccine,
      bname: this.state.bname,
      aadhar: this.state.aadhar,
      bage: this.state.bage,
    }).then((response) => {
      if (response.data === "no") {
        alert('Booking Unsuccessful.. Please Try Again');
      } else {
        alert('Booking Successful');
      }
    });
  }
  handleColumnFilterChange = (e) => {
    const columnName = e.target.value;
    const table = $(this.dataTableRef.current).DataTable();
    table.columns().every(function () {
      const column = this;
      if (column.header().textContent === columnName) {
        const input = $('<input type="text" placeholder="Search" />')
          .on("keyup change", function () {
            column.search(this.value).draw();
          });
        $(column.footer()).html(input);
      } else {
        $(column.footer()).empty();
      }
    });
  };
  render() {
    const columnNames = [
      "Centre Name",
      "Location",
      "Contact number",
      "Slot Availability",
      "Covaxin/Covishield Availability",
      "Date/Working Hours"
    ];
    return (
      <div className="uu">
        <div className="ubooking">
        <div className="column-filter" style={{float:'right'}}>
            <label>Filter:</label>
            <select onChange={this.handleColumnFilterChange}>
              <option value="">All</option>
              {columnNames.map((columnName) => (
                <option value={columnName} key={columnName}>{columnName}</option>
              ))}
            </select>
          </div>
          <table ref={this.dataTableRef} id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
            <thead>
              <tr>
                <th className="th-sm">Centre Name</th>
                <th className="th-sm">Location</th>
                <th className="th-sm">Contact number</th>
                <th className="th-sm">Slot Availability</th>
                <th className="th-sm">Covaxin/Covishield Availability</th>
                <th className="th-sm">Date/Working Hours</th>
                <th className="th-sm">Book Now</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.vchecker && this.state.bdata.map((data) => {
                  const date=new Date();
                  const hour = date.getHours();
                  console.log(hour)
                  if (data.slot_available > 0 && hour<11 && hour>7) {
                    return (
                      <tr key={data.center_name}>
                        <td>{data.center_name}</td>
                        <td>{data.location}</td>
                        <td>{data.mobile}</td>
                        <td>{data.slot_available}</td>
                        <td>{data.covaxine}/{data.dosage}</td>
                        <td>{moment().format("DD-MM-YYYY")} / 10.00AM - 7.30PM</td>
                        <td>
                          <button className="book-now" onClick={() => {
                            this.setState({
                              bookcheck: data.center_name,
                              slot: data.slot_available
                            });
                          }}>
                            <a href="#popup">Book Now</a>
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={data.center_name}>
                        <td>{data.center_name}</td>
                        <td>{data.location}</td>
                        <td>{data.mobile}</td>
                        <td>{data.slot_available}</td>
                        <td>{data.covaxine}/{data.dosage}</td>
                        <td>{moment().format("DD-MM-YYYY")} / 10.00AM - 7.30PM</td>
                        <td>
                          <><button className="book-now1">Book Now</button></>
                        </td>
                      </tr>
                    );
                  }
                })
              }
              {this.state.vchecker1 && <tr><td colSpan={7}>No data found</td></tr>}
            </tbody>
            <tfoot>
              <tr>
                <th>Centre Name</th>
                <th>Location</th>
                <th>Contact number</th>
                <th>Slot Availability</th>
                <th>Covaxin/Covishield Availability</th>
                <th>Date/ Working hours</th>
                <th>Book Now</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div id="popup" className="overlay">
          <div className="popup">
            <h2>BOOK VACCINE</h2>
            <a className="close" href="#">&times;</a>
            <form onSubmit={this.bookinsert}>
              <div className="mydivs">
                <label>Center Name</label>
                <input type="text" value={this.state.bookcheck} readOnly />

                <label>Vaccination Date</label>
                <input type="text" value={moment().format("DD-MM-YYYY")} readOnly />

                <label>Beneficiary Name</label>
                <input type="text" placeholder="Enter Beneficiary name" onChange={(e) => { this.setState({ bname: e.target.value }); }} required />

                <label>Beneficiary Age</label>
                <input type="number" placeholder="Enter Beneficiary Age" onChange={(e) => { this.setState({ bage: e.target.value }); }} required />

                <label>Aadhar Number</label>
                <input type="text" placeholder="Enter Aadhar Number" minLength={12} maxLength={12} pattern="[0-9]+" onChange={(e) => { this.setState({ aadhar: e.target.value }); }} required />

                <label>Select Vaccine</label>
                <select onChange={(e) => { this.setState({ vaccine: e.target.value }); }}>
                  <option value={0} selected disabled>Select Vaccine</option>
                  {
                    this.state.inschecker1 && this.state.bdata.map((data) => {
                      if (data.center_name === this.state.bookcheck) {
                        if (data.dosage > 0 && data.covaxine > 0) {
                          return (
                            <>
                              <option value={"covishield." + data.dosage.toString()}>Covishield</option>
                              <option value={"covaxin." + data.covaxine.toString()}>Covaxin</option>
                            </>
                          );
                        } else if (data.covaxine > 0 && data.dosage <= 0) {
                          return (
                            <>
                              <option value={"covaxin." + data.covaxine.toString()}>Covaxin</option>
                            </>
                          );
                        } else if (data.dosage > 0 && data.covaxine <= 0) {
                          return (
                            <>
                              <option value={"covishield." + data.dosage.toString()}>Covishield</option>
                            </>
                          );
                        }
                      }
                    })
                  }
                </select>

                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UHome;
