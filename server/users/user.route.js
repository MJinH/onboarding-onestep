import express, { request } from "express";
const router = express.Router();
import { authorize } from "../auth/auth.middleware.js";
import { Employee, PendingEmployee } from "../employee/employee.model.js";
import { User } from "./user.model.js";
import { registerValidation, loginValidation } from "../helpers/schemas.js";
import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import sgMail from '@sendgrid/mail'
config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const passwordHtml = (emp, password) => {
    return `
        <p>Dear ${emp.name},</p>
        <br/>
        <p>
        We are excited to have you onboard. We have created an account for you on our onboarding portal. 
        <br/> The credentials for the same are as follows:
        <br/> <br/>
        Website: http://localhost:3000/signin
        <br/>
        Username: ${emp.email}
        <br/>
        Password: ${password}
        <br/><br/>
        If you have any questions, please contact me directly via phone or email.  
        <br/><br/>
        Sincerely,<br/>
        Hiring Manager,
        </p>
    `;
};


router.post('/register', async (req, res) => {
    //res.send('Register')

    // Validate data from req.body
    const {error} = registerValidation(req.body)
    if(error){
        let d = {
            message: error.details[0].message
        }
        return res.status(400).send(d)
    }
    //check if user with email exist
    const emailExist = await User.findOne({email: req.body.email})
    let d1 = {
        message: "email already exist"
    }
    if(emailExist) return res.status(400).send(d1)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })

    try{
        const savedUser = await user.save()
        return res.send({user: user._id})
    } catch(err){
        let d = {
            message: err
        }
        return res.status(400).send(d)
    }

 })

 router.post('/login',async (req, res) => {
    //res.send('Login')
     // Validate data from req.body
     const {error} = loginValidation(req.body)
     if(error){
         let d = {
             message: error.details[0].message
         }
        return res.status(400).send(d)
     }
 
     
    //check if user with email does not exist
    const user = await User.findOne({email: req.body.email})
    let d = {
        message: "email or password is wrong"
    }
    if(!user) return res.status(400).send(d)

    // check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
   
    let d2 = {
        message: 'invalid password'
    }
    if(!validPass) return res.status(400).send(d2)

    
    //create and assign access token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    let user_d = {
        _id: user._id,
        role: user.role,
        token: token   
    }
  //  res.setHeader('AUTH_TOKEN', token)
    return res.status(200).send(user_d)

})

router.post("/google-login", async (req, res) => {
  const { googleToken, role } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email } = ticket.getPayload();

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user if not existing
      user = new User({ name, email, role, password: "" });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).send({ userId: user._id, role: user.role, token });
  } catch (err) {
    res.status(400).send({ message: "Google token validation failed", error: err.message });
  }
});


 router.get('/verify_token', authorize, async(req,res)=>{
    console.log(req.user)
    try{
        const is_user = await User.findById(req.user._id)
        console.log(is_user)
        if(!is_user){
            throw "User Not Exist";
        }
        res.send("verified")
    }catch(e){
        res.status(400).send({message: "Token not verified"})
    }
 })

// POST: Send Verification Code
router.post('/send-verification-code', async (req, res) => {
    try {
        console.log("Request received for sending verification code:", req.body);
        const { email } = req.body;

        if (!email) {
            console.log("No email provided");
            return res.status(400).send({ message: "Email is required" });
        }

        // Check if the user with the email exists
        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user) {
            console.log("User not found with the provided email:", email);
            return res.status(404).send({ message: "User not found" });
        }

        // Generate verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        console.log("Generated verification code:", verificationCode);

        // Send email
        const msg = {
            to: email,
            from: 'mthanuja1120@gmail.com',
            subject: 'Verification Code',
            text: `Your verification code is: ${verificationCode}`,
            html: `<strong>Your verification code is: ${verificationCode}</strong>`,
        };

        console.log("Sending email with SendGrid...");
        await sgMail.send(msg);
        console.log("Email sent successfully");

        // Save the verification code (if needed)
        user.verificationCode = verificationCode;
        await user.save();

        return res.status(200).send({ message: "Verification code sent successfully" });
    } catch (error) {
        console.error("Error occurred while sending verification code:", error);
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});


// POST: Verify Code
router.post('/verify-code', async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email });

        // Debugging Information
        console.log(`Email from request: ${email}`);
        console.log(`Code from request: ${code}`);
        if (user) {
            console.log(`User found: ${user.email}`);
            console.log(`Stored verification code: ${user.verificationCode}`);
        } else {
            console.log('No user found with the given email');
        }

        if (!user || user.verificationCode !== code) {
            return res.status(400).send({ message: "Invalid verification code" });
        }

        res.status(200).send({ message: "Code verified" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error verifying code" });
    }
});



// POST: Reset Password
router.post('/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.verificationCode = null; // Clear the verification code after successful reset
        await user.save();

        res.status(200).send({ message: "Password reset successful" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error resetting password" });
    }
});

const randomPass = ()=>{
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 5;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    }
    return password
}

router.post('/register_user/:id', async(req,res)=>{

    //  employee information
    // check if account for employee is already created
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send({
        message: "Offer letter signed and Account already created"
    })

    let password = randomPass()
    let role = "employee"
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
        role: role
    })
    try{
        const savedUser = await user.save()

    let password_mail = {
        to: user.email, // Change to your recipient
        from: 'shwetakale144@gmail.com', // Change to your verified sender
        subject: 'Password for website',
        html: passwordHtml(user,password),          
    }
    sgMail.send(password_mail)


    // update acceptance status in employee database
    let emppp = await Employee.findByIdAndUpdate(req.params.id, {accepted: true, status: "Offer Accepted"})
    //console.log(emppp)
    res.send({user: user._id})
    } catch(err){
        let d = {
            message: err
        }
        res.status(400).send(d)
    }

})

router.get('/employee/:id', authorize, async(req,res)=> {
    try{
        const user = await User.findOne({_id: req.params.id})
        if(!user){
            throw "User not found"
        }else{
        const emp =  await Employee.findOne({email: user.email})
        if(!emp){
            throw "Employee not found"
        }
        res.send(emp)
        }
    }catch(err){
        console.log(err);
        res.status(400).send({message:err})
    }
})

const verifyPan = async (panNo) =>{
    try{
        return await axios.get(`https://verifyonboarding.herokuapp.com/pan/${panNo}`)
    }catch(e){
        console.log("error")  
    }
}

const verifyAdhar = async (adharNo)=> {
    try{
        return await axios.get(`https://verifyonboarding.herokuapp.com/uid/${adharNo}`)
    }catch(e){
        console.log("error")
    }
}

router.put('/update',authorize, async (req, res)=>{
    try{
        console.log(req.body.id)
        const user = await User.findOne({_id: req.body.id})
       
        if(!user){
            throw "User not found"
        }else{
            /*
        const emp =  await Employee.findOneAndUpdate({email: user.email}, {panURL: req.body.panURL, adharURL: req.body.adharURL, panNo:req.body.panNo, adharNo: req.body.adharNo})
         if(!emp){
            throw "Employee not found"
        }
        res.send(emp)
        */
            (async function(){
                    let adharV, panV,adharVerified=false, panVerified=false;
                    if(req.body.panNo != undefined && req.body.panNo!='')
                    {
                        panV = await verifyPan(req.body.panNo);
                        console.log(panV.data)
                   }
                   if(req.body.adharNo != undefined && req.body.adharNo!='')
                   {
                       adharV = await verifyAdhar(req.body.adharNo);
                       console.log(adharV.data)
                  }
                  if(adharV!=undefined && adharV.data!=undefined && adharV.data=="documents found!"){
                    adharVerified=true
                    console.log("adhat v")
                  }

                  if(panV!=undefined && panV.data!=undefined && panV.data==="documents found!"){
                    panVerified = true
                    console.log("pan v")
                  }
                  let status = "Offer Accepted"
                  if(panVerified && adharVerified){
                      status = "Documents Verified"
                  }
                  const emp = await Employee.findOneAndUpdate({email: user.email}, {panURL: req.body.panURL, adharURL: req.body.adharURL, panNo:req.body.panNo, adharNo: req.body.adharNo, adharVerified: adharVerified, panVerified: panVerified, status: status})

                if(!emp){
                    throw "Employee not found"
                }
                res.send(emp)
            }());

        }
    }catch(err){
        res.status(400).send({message:err})
    }
})

router.get('/all_users', authorize, async(req,res)=>{
    try{
        const users = await User.find();
        console.log(users);
        res.send(users)
    }catch(e){
        res.status(400).send({message: "Failed to get all users"})
    }
 })

export default router

