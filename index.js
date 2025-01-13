const express = require('express')


const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
// app.use(express.static("public"));
const ejs = require('ejs');
app.set('view engine','ejs');


// write variable of admin login 
const adminGmail = "kamranshakib371@gmail.com";
const adminPassword = "kamranshakib";

// write variable of student login




// page one or main page
app.get('/',(req,res)=>{
    res.render("login",{headerText : "Registration "})
})

// get to user page
app.get('/userStudent',(req,res)=>{
    res.render("userStudent")
})
// page admimn login
app.get('/userAdmin',(req,res)=>{
    res.render('userAdmin')
})

// post for student
app.post('/getToPublic',(req,res)=>{
    const s_name = req.body.nameStudent;
    const l_s_name = req.body.LastNameStudent;
    const id_s_ = req.body.ID_Student;
    console.log("welcome to my site Mr "+s_name +" "+ l_s_name) 
    res.render('PublicSide',{headerText : "Questions"})
})

// post for admin
app.post('/getToAdminPanel',(req,res)=>{
    const email_admin = req.body.EmailAdmin;
    const pas_admin = req.body.PasswordAdmin;
    console.log('okey welcom Mr'+"  "+ email_admin +" "+'\n'+'with password'+ pas_admin)

    res.render('AdminSide',{headerText : "Admin Panel"})
})





app.listen(3000,()=>{
    console.log('Server on port 3000')
})