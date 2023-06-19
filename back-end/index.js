const express=require('express')
const bodyParser=require('body-parser');
const mysql = require('mysql');
const app=express();
const cors=require('cors');
const nodemailer=require('nodemailer');
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({
extended:true
}))
const fs = require('fs');
const db= mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'devrev' 
});
var transporter = nodemailer.createTransport({
    service: 'Outlook365',auth: {
    user: 'harikrishna.20it@sonatech.ac.in',
    pass: 'Rhk$14082002'
    },tls : { rejectUnauthorized: false }
});
const now = new Date();
const targetTime = new Date();
targetTime.setHours(20, 13, 0);

const timeRemaining = targetTime - now;

if (timeRemaining > 0) {
  setTimeout(() => {
    console.log('Updated!');
    db.query("UPDATE center_list SET slot_available=10",(err,result)=>{
      if(err){ console.log('Database error'); }
      console.log('Database updated');
    });
  }, timeRemaining);
} else {  console.log('It is already past 8:00 PM');}

app.post('/login', (req, res) => {
    const username=req.body.umail;
    const password=req.body.upwd;
    db.query("SELECT category FROM users WHERE username=? AND password=?",[username, password],
        (err, result)=> {
            console.log(result);
            if(result.length>0){
              res.send(result);
            }
            else{
              res.send("no");
            }
            
        });
});
let otp1="";
app.post('/uregister', (req, res) => {
    const username=req.body.umail;
    const password=req.body.upwd;
    const category="user";
    const filePath = './email.html';
    
    db.query("INSERT INTO users VALUES (?,?,?)",[username, password,category],
        (err, result)=> {
            if(err){
              
                res.send("no");
                
            }
            else if(result!==""){
              function generateOTP() {
                const otp = Math.floor(100000 + Math.random() * 999999);
                otp1=otp.toString();
                return otp.toString();
              }
              const otp = generateOTP();
              fs.readFile(filePath, 'utf8', (err, data) => {
                  if (err) {
                    console.error('Error reading the file:', err);
                    return;
                  }
                  if(data!==""){
                    const replacedData = data.replace('123456', otp);
                    var mailOptions = { from: 'harikrishna.20it@sonatech.ac.in',to: username,subject: 'Registration Verification',html: replacedData }
                    transporter.sendMail(mailOptions, function(error, info){

                      if (error) {console.log(error);} 
                      else {
                        console.log("Sent");
                        res.send('Email sent');
                      }
                    });
                  }
                });
            }
    });
    
});
app.get("/otp",(req,res)=>{
      res.send(otp1);
})
app.get("/ucentersee",(req,res)=>{
  db.query("SELECT center_name,location,mobile,slot_available,dosage,covaxine FROM center_list",
  (err, result)=> {
    
      if(err){
          res.send("no");
          console.log(err)
      }
      else{if(result.length>0){
        res.send(result);
      }
      else{
        res.send("no");
      }
    }
    });
});
app.post("/ubooking",(req,res)=>{
  const username=req.body.uname;
  console.log(username)
  db.query("SELECT centre,slot,vaccine,booking_date,aadhar,bname,bage,status FROM ubookings WHERE username=?",[username],
  (err, result)=> {
    console.log(result);
      if(err){
          res.send("no");        
          console.log(err)
      }
      else{if(result.length>0){
        res.send(result);
      }
      else{
        res.send("no");
      }
    }
    });
})
app.post("/ubookingins",(req,res)=>{
  const username=req.body.uname;
  const cname=req.body.cname;
  const slot=req.body.slot;
  const vaccine=req.body.vaccine;
  const booking_date=new Date();
  const bname=req.body.bname;
  const aadhar=req.body.aadhar;
  const bage=req.body.bage;
  const vacc1=vaccine.split('.');
  var vcscnt=0,vcvcnt=0;
  if(vacc1[0]==="covishield"){ 
    vcscnt=parseInt(vacc1[1])-1; 
    db.query("UPDATE center_list SET dosage=? WHERE center_name=?",[vcscnt,cname],
    (err,result)=>{
      if(err){ res.send(err); }
    });
  }
  if(vacc1[0]==="covaxin"){ 
    vcvcnt=parseInt(vacc1[1])-1;
    db.query("UPDATE center_list SET covaxine=? WHERE center_name=?",[vcvcnt,cname],
    (err,result)=>{
      if(err){ res.send(err); }
    });
    
  }
  var slot1=0,vtime='';
  if(slot===10) { slot1=1; vtime="10.00 AM to 10.30 AM"}
  if(slot===9) { slot1=2; vtime="11.00 AM to 11.30 AM"}
  if(slot===8) { slot1=3; vtime="12.00 AM to 12.30 AM"}
  if(slot===7) { slot1=4; vtime="1.00 PM to 1.30 PM"}
  if(slot===6) { slot1=5; vtime="2.00 PM to 2.30 PM"}
  if(slot===5) { slot1=6; vtime="3.00 PM to 3.30 PM"}
  if(slot===4) { slot1=7; vtime="4.00 PM to 4.30 PM"}
  if(slot===3) { slot1=8; vtime="5.00 PM to 5.30 PM"}
  if(slot===2) { slot1=9; vtime="6.00 PM to 6.30 PM"}
  if(slot===1) { slot1=10; vtime="7.00 PM to 7.30 PM"}
  db.query("INSERT INTO ubookings VALUES(?,?,?,?,?,?,?,?,1)",[username,cname,slot1,vacc1[0],booking_date,aadhar,bname,bage],
  (err, result)=> {
      if(err){
          res.send("no");        
          console.log(err)
      }
      else{
        db.query("UPDATE center_list SET slot_available=? WHERE center_name=?",[slot-1,cname],
        (err1, result1)=> {
          if(err1){
            res.send("no");        
            console.log(err1)
          }
          else{
            fs.readFile('./email1.html', 'utf8', (err, data) => {
                if (err) {
                  console.error('Error reading the file:', err);
                  return;
                }
                if(data!==""){
                  const replacedData = data.replace('bname',bname);
                  const replacedData1=replacedData.replace('bage',bage);
                  const replacedData2=replacedData1.replace('cname',cname);
                  const replacedData3=replacedData2.replace('vname',vacc1[0])
                  const replacedData4=replacedData3.replace('vtime', vtime);
                  var mailOptions = { from: 'harikrishna.20it@sonatech.ac.in',to: username,subject: 'Vaccination Booking Confirmation',html: replacedData4 }
                  transporter.sendMail(mailOptions, function(error, info){

                    if (error) {console.log(error);} 
                    else {
                      
                      res.send('Yes');
                    }
                  });
                }
              });
            
          }
        });
      }
    });
})
app.get("/acentersee",(req,res)=>{
  
  db.query("SELECT center_name,location,date_added,mobile,dosage,covaxine FROM center_list",
  (err, result)=> {
    
      if(err){
          res.send("no");        
          console.log(err)
      }
      else{if(result.length>0){
        res.send(result);
      }
      else{
        res.send("no");
      }
    }
    });
})
app.post("/acenterins",(req,res)=>{
  const cname=req.body.cname;
  const location=req.body.location;
  const currentDate = new Date().toLocaleDateString().toString();
  const mobile=req.body.mobile;
  const dosage=req.body.dosage;
  const dosage1=req.body.dosage1;
  db.query("INSERT INTO center_list VALUES(?,?,?,?,?,?,10,1,1,1,1,1,1,1,1,1,1)",[cname,location,currentDate,mobile,dosage,dosage1],
  (err, result)=> {
    console.log(result);
      if(err){
          db.query("UPDATE center_list SET dosage=?,covaxine=? WHERE center_name=?",[dosage,dosage1,cname],
          (err1, result1)=> {
            if(err1){ res.send("no"); }
            if(result1){ res.send('Yes'); }
          })
      }
      if(result){
        res.send('Yes');
      }
    });
})
app.get("/adosagesee",(req,res)=>{
  db.query("SELECT center_name,dosage,covaxine FROM center_list",
  (err, result)=> {
      if(err){
          res.send("no");        
          console.log(err)
      }
      else{if(result.length>0){
        res.send(result);
      }
      else{
        res.send("no");
      }
    }
    });
})
app.post("/acenterdel",(req,res)=>{
  const cname=req.body.cname;
  db.query("SELECT username FROM ubookings WHERE centre=?",[cname],
  (err1, result1)=> {
    if(err1){
      res.send("no");
      console.log(err1);
    }
    if(result1){
      db.query("UPDATE ubookings SET status=0 WHERE centre=?",[cname],
      (err2, result2)=> {
        if(err2){
          res.send("no");
          console.log(err2);
        }
        if(result2){
          for(var i=0;i<result1.length;i++){
            const username=result1[i].username;
          fs.readFile('./email1 (cancel).html', 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading the file:', err);
              return;
            }
            if(data!==""){
              var mailOptions = { from: 'harikrishna.20it@sonatech.ac.in',to: username,subject: 'Vaccination Booking Cancellation',html: data }
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {console.log(error);} 
                else { 
                  db.query("DELETE FROM center_list WHERE center_name=?",[cname],
                  (err3, result3)=> {
                    
                      if(err3){
                          res.send("no");
                          console.log(err3)
                      }
                      if(result3){
                        res.send('Yes');
                      }
                    });
                 }
              });
            }
          });}
        }
      })
    }
  })
})
app.listen(3001,function(){
console.log("Server is running on port number 3001")
})