require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongo = require("mongoose");

const donationrouter = require("./Models/donationrouter");
const Donation = require("./Models/donation");



const User = require('./Models/user');




const app = express();
const PORT = process.env.PORT || 5000;


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/" , donationrouter);
console.log("MONGO_URI =", process.env.MONGO_URI);
//! MongoDb connection
mongo.connect(process.env.MONGO_URI)
   .then(() => console.log("MONGO DB Successfully Connected ✅"))
   .catch((error) => console.log(error));
   console.log("ReadyState:", mongo.connection.readyState);

   //!Server start
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}...`);
});



//^Home
app.get('/' , (req,res) => {
    res.render('Home/home');
});

//^ Register
app.get('/register' , (req,res)=>{
    res.render('Registerpage/register',{ error: null });
});

app.post('/register', async(req, res) => {
    const {fullname,number,email,password,confirmpassword,location} = req.body;
    const [role, subrole] = req.body.user_role.split(':');
    
        //^ Check Mail
         const checkmail = await User.findOne({email});
         if(checkmail){
            return res.render('Registerpage/register',{ error: 'Email has been already taken !!' });
         }
         //^confirmpassword
         if(password !== confirmpassword){
            return res.render('Registerpage/register',{ error: 'Password Mismatched !!' });
         }
         const newuser = new User({
            fullname,
            number,
            role,
            subrole,
            email,
            password,
            location
         });
         await newuser.save();
         res.render('Registerpage/register',{ error: 'Successfully Registered ✅!!' });
});


//^Sign-In
app.get('/signin', (req,res) => {
    res.render("Loginpage/login" , {error:null});
})

app.post('/login' , async(req,res) => {
    const email  = req.body["email"];
    const password = req.body['password'];
    console.log(email);
    const auth = await User.findOne({ email : email , password : password });
    if(!auth){
        return res.render("Loginpage/login" , {error:'Invalid Credentials !!'})
    }
    console.log(auth);
    if(auth.role == 'donor'){
       return  res.render("Donor/donorhome");
    }
    if(auth.role == 'receiver'){
        return res.redirect('/receiver'); 
    }

})

//!Donor

app.get('/donatefood' , async(req,res) => {
    res.render("Donor/donatefood" , {message : null});
})

app.get('/donor' , (req,res) => {
    res.render("Donor/donorhome");
})
app.get('/donorhistory' , (req,res) => {
    res.render("Donor/donorhistory")
})

//! Receiver
app.get('/receiver', async (req, res) => {
    try {
      const foodDocs = await Donation.find({});
  
      const foodList = foodDocs.map((item) => {
        const hoursOld = (new Date() - new Date(item.createdAt)) / (1000 * 60 * 60);
        let freshness = 'fresh';
        if (hoursOld > 8) freshness = 'expired';
        else if (hoursOld > 4) freshness = 'near-expiry';
  
        return {
          id: item._id,
          name: item.name,
          type: item.perishability || 'other',
          freshness,
          quantity: item.quantity,
          location: {
            lat: item.latitude,
            lng: item.longitude
          },
          distance: Math.random() * 5 + 1 // You can replace this with actual distance if needed
        };
      });
  
      res.render('Receiver/receiverhome', { foodList });
  
    } catch (err) {
      console.error('Error fetching food data:', err);
      res.status(500).send('Server error');
    }
  });
  

