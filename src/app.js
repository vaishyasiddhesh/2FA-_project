
const express=require('express');
const path=require('path');
const nodemailer = require('nodemailer');
const speakeasy=require('speakeasy')
const qrcode=require('qrcode')

const app=express();
require("./db/conn");
const Registration=require("./models/registrations");
const { write } = require('fs');



    
  
const port=process.env.PORT || 3000;
const static_path=path.join(__dirname,'../public')
const views_path=path.join(__dirname,"../views");


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
             user: 'forwork170610@gmail.com',
             pass: 'znwf obiw wjla feyg'
         }
 });


app.use(express.static(static_path));
app.set('view engine','ejs');
app.set("views",views_path);
app.use(express.json());
app.use(express.urlencoded({extended:false}));



const secret = speakeasy.generateSecret({ length: 10 }).base32;
const totpSecert=speakeasy.generateSecret();













    









app.get("/",(req,resp)=>{
  resp.render('index')
});
app.get("/registration",(req,resp)=>{
    resp.render('registration')
});
app.post("/registration",async (req,resp)=>{
    try {
        const password=req.body.password;
        const cpassword=req.body.confirm_password;
        if(password === cpassword){
            const registrationEmp=new Registration({
                full_name:req.body.full_name,
                email: req.body.email,
                phone_no:req.body.phone_no,
                age: req.body.age,
                gender:req.body.gender,
                password: req.body.password,
                confirm_password:req.body.confirm_password,
                country:req.body.country,
                city:req.body.city,
                region:req.body.region,
                postal_code:req.body.postal_code 

                

            })
                const registered =await registrationEmp.save();
                
                resp.render('otp_verficiation',{message:"Your registration has been successfully.PLease verify your email "});
            }else{
            resp.send("password not matching");
          
        }
    } catch (error) {
        resp.status(400).send(error)
    }
});



app.get('/otp-verficiation', (req, resp) => {
    resp.render('otp_verficiation');
});
app.get('/login',(req,resp)=>{
    resp.render('login');
})
app.post('/generate-otp', (req, res) => {
    
    const otp = speakeasy.totp({
        secret: secret,
        encoding: 'base32',
    });
    
    const email='siddhesh170610vaishya@gmail.com,3059921@rdnational.ac.in';
   
        const mailOptions = {
            from: 'forwork170610@gmail.com',
            to: email,
            subject: 'OTP Verification',
           
            text: 'Your OTP is:'+otp
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ' + error);
                res.status(500).json({ email, otp });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ email, otp });
            }
        });
 });

 // Endpoint for verifying OTP
app.post('/verify-otp', (req, res) => {
   
    const userOTP = req.body.otp;
    const otpValidates = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: userOTP,
        window: 1, // Allow for a 1-time step either way
    });
    res.json({ valid: otpValidates });
    
}); 

    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
app.post('/login',async(req,resp)=>{
   try {
        const email=req.body.email;
        const password=req.body.password;
        

         const userEmail= await Registration.findOne({email:email});
         console.log(userEmail.email);
         console.log(userEmail.password);
         console.log(password)
         const name=userEmail.full_name;
        console.log(name);
         if(userEmail.password===password){

            resp.status(201).render('Qr');
         }else{
            resp.send("INVALID LOGIN ")
         }

    
   } catch (error) {
    resp.status(400).send("INVALID LOGIN DETAIL")
   }
})


app.listen(port,()=>{
    console.log('server is runing at '+port);
});``

app.post("/scan",(req,resp)=>{
     
    
    
   
    
   
    
    qrcode.toDataURL(totpSecert.otpauth_url,function(err,data_url)
    {
        if(err) return console.log("error");
        
    
        resp.render("scan",{data_url});
    
        
        
    });
});
app.post('/verify', (req, res) => {
        const usertotp=req.body.totp;
        const verified = speakeasy.totp.verify({
          secret: totpSecert.base64,
          encoding: 'base64',
          usertotp,
        });
      
        if (verified) {
          res.json({ verified: true });
          
        } else {
           
            res.render('loginafter');
        }
});
        

