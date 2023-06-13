import React,{useState,useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Dosage.css'
import axios from 'axios';
function ADosage () {
    const [data1,setdata1]=useState([])
    const [check,setcheck]=useState(false)
    useEffect(()=>{
        axios.get('http://localhost:3001/adosagesee').then((response)=>{
          if(response.data==="no"){ setcheck(false); }
          else{ setdata1(response.data); setcheck(true);}
        });
    })
    const handlePrint = () => {
        window.print();
    };
    const data = data1.map((d) => ({
        name: d.center_name,
        Covishield: d.dosage,
        Covaxin: d.covaxine,
      }));
  return (
    <div className='dosage'>
      <h2>Vaccination Dosage detail</h2>
      <div id="content"><div className='center'>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Covishield" fill="#8884d8" />
        <Bar dataKey="Covaxin" fill="#82ca9d" />
      </BarChart>
      </div>
      <table className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Center Name</th>
                <th>Covishield Availability</th>
                <th>Covaxine Availability</th>
            </tr>
        </thead>
        <tbody>
            {
                check&&data1.map((d)=>{
                    return(
                        <>
                            <tr>
                                <td>{d.center_name}</td>
                                <td>{d.dosage}</td>
                                <td>{d.covaxine}</td>
                            </tr>
                        </>
                    )
                })
            }
        </tbody>
      </table>
      </div>
      <button type="button" onClick={handlePrint}><i style={{marginRight:"4px"}} class="fa-solid fa-print"></i>Download PDF</button>
    </div>
  );
};

export default ADosage;
