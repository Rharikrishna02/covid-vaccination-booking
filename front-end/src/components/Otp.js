import React,{useState,useEffect} from "react";
import './Login.css';
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom';

function Otp(){
    const [otp, setOtp] = useState("");
    const [gotp, setgOtp] = useState("");
    const navigate=useNavigate()
    useEffect(()=>{
		axios.get('http://localhost:3001/otp').then((response)=>{
		  console.log(response.data);
		  const temp=JSON.stringify(response.data);
      setgOtp(temp);
		})
	  })

    const handleOtpChange = (e, index) => {
        let value = e.target.value;
        let newOtp = otp.split('');
        newOtp[index] = value;
        setOtp(newOtp.join(''));
        if(index===5){ console.log(otp);}
        else{
        if (value !== '' && e.target.nextSibling) {
            e.target.nextSibling.focus();
            
        }
    }
    }

    const check = (e) =>{
        setOtp(otp[0]+""+otp[1]+""+otp[2]+""+otp[3]+""+otp[4]+""+otp[5])
        console.log("Submit button clicked");
        console.log(otp);
        const otp1=otp.trimEnd().replace(/\s\s$/, '')
        console.log(gotp);
        if(otp1===gotp){
          alert('Account Created Successfully')  
          navigate('/')
        }
        else{
          alert('Invalid OTP')
        }

    }
  return(
    <div className="body1">
      <div className="box-form">
        <div className="left">

          <div className="overlay">
            <h1>Let's Verify</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Curabitur et est sed felis aliquet sollicitudin</p>
            
          </div>
        </div>


        <div className="right">

          <h4>Verify</h4>
          <p>Let's Log you in..It takes less than a minute</p>
          <form onSubmit={check}>
              <div className="input-field">
              <input type="number" min="0" max="9" maxLength="1" onChange={(e) => handleOtpChange(e, 0)} value={otp[0] || ''} required/>
                <input type="number" min="0" max="9" maxLength="1" onChange={(e) => handleOtpChange(e, 1)} value={otp[1] || ''} required/>
                <input type="number" min="0" max="9" maxLength="1" onChange={(e) => handleOtpChange(e, 2)} value={otp[2] || ''} required/>
                <input type="number" min="0" max="9" maxLength="1" onChange={(e) => handleOtpChange(e, 3)} value={otp[3] || ''} required/>
                <input type="number" min="0" max="9" maxLength="1" onChange={(e) => handleOtpChange(e, 4)} value={otp[4] || ''} required/>
                <input type="number" min="0" max="9" maxLength="1" onChange={(e) => handleOtpChange(e, 5)} value={otp[5] || ''} required/>

              </div>
              <div><button style={{marginTop:'30px',marginBottom:'80px'}} type="submit" >Verify</button></div>
            </form>

        </div>

      </div>
    </div>
  )

}

export default Otp;