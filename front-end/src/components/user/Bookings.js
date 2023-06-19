import React, { useRef, useEffect, useState } from "react";
import "./Booking.css";
import $ from 'jquery';
import axios from "axios";
import { DataTable } from 'datatables.net';
import 'datatables.net-bs4/js/dataTables.bootstrap4';

function UBookings() {
  const dataTableRef = useRef(null);
  const [bdata,setbdata]=useState([]);
  const [vchecker,setchecker]=useState(false);
  const [vchecker1,setchecker1]=useState(false);
  
  
    useEffect(()=>{
      axios.post('http://localhost:3001/ubooking',{
         uname:localStorage.getItem('username').toString()
      }).then((response)=>{
        if(response.data==="no"){
          setchecker1(true);
        }
        else{
        setbdata(response.data);
        setchecker(true);
        }
      });
      
      })
      
        useEffect(() => {
          if(vchecker){
          $(dataTableRef.current).DataTable();
          $('.dataTables_length').addClass('bs-select');
          }
        }, [vchecker]);
        useEffect(() => {
          if(vchecker1){
          $(dataTableRef.current).DataTable();
          $('.dataTables_length').addClass('bs-select');
          }
        }, [vchecker1]);
      
    return(
        <div className="uu">
        <div className="ubooking">
            <table ref={dataTableRef} id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
  <thead>
    <tr>
      <th class="th-sm">Centre Name
      </th>
      <th class="th-sm">Time of Vaccination
      </th>
      <th class="th-sm">Booking Date
      </th>
      <th class="th-sm">Aadhar Number
      </th>
      <th class="th-sm">Benificiary Name
      </th>
      <th class="th-sm">Benificiary Age
      </th>
      <th class="th-sm">Vaccine Name
      </th>
      <th class="th-sm">Status
      </th>
    </tr>
  </thead>
  <tbody>
    {
      vchecker&&bdata.map((data)=>{
        if(data.status===1){
        return(
          <tr>   
            <td>{data.centre}</td>
            <td>{data.slot}</td>
            <td>{data.booking_date}</td>
            <td>{data.aadhar}</td>
            <td>{data.bname}</td>
            <td>{data.bage}</td>
            <td>{data.vaccine}</td>
            <td style={{color:'green'}}>Booked</td>
          </tr>
        );}
        else{
          return(
            <tr>   
              <td>{data.centre}</td>
              <td>{data.slot}</td>
              <td>{data.booking_date}</td>
              <td>{data.aadhar}</td>
              <td>{data.bname}</td>
              <td>{data.bage}</td>
              <td>{data.vaccine}</td>
              <td style={{color:'red'}}>Cancelled</td>
            </tr>
          );

        }
      })
    }
      
  </tbody>
  <tfoot>
    <tr>
      <th>Centre Name
      </th>
      <th>Time of Vaccination
      </th>
      <th>Booking Date
      </th>
      <th>Aadhar Number
      </th>
      <th>Benificiary Name
      </th>
      <th>Benificiary Age
      </th>
      <th>Vaccine Name
      </th>
      <th>Status
      </th>
    </tr>
  </tfoot>
</table>
        </div>
        </div>
    )
};
export default UBookings;