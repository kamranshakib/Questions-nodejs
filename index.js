const express = require('express');

const fs = require('fs')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// app.use(express.static("public"));
const ejs = require('ejs');
app.set('view engine', 'ejs');

// write variable of admin login 
const adminGmail = "kamranshakib371@gmail.com";
const adminPassword = "kamran";
// page one or main page
app.get('/', (req, res) => {
    res.render("login", { headerText: "Registration " })
})

// get to student page
app.get('/userStudent', (req, res) => {
    res.render("userStudent")
})

// page admimn login
app.get('/userAdmin', (req, res) => {
    res.render('userAdmin')

})


const dbf = fs.readFileSync('question.json');
const text = dbf.toString();
const jsFile = JSON.parse(text);

const QuestionArray = [];
// post for student


// post for admin
app.post('/getToAdminPanel', (req, res) => {
    const email_admin = req.body.EmailAdmin;
    const pas_admin = req.body.passwordAdmin;

    if (pas_admin == adminPassword) {
        res.render('AdminSide', { headerText: "Admin Panel",QuestionArray })
    }

    else (res.redirect('/userAdmin'))

})
app.post('/getToPublic', (req, res) => {
    const s_name = req.body.nameStudent;
    const l_s_name = req.body.LastNameStudent;
    const id_s_ = req.body.ID_Student;

    res.render('PublicSide', { headerText: "Questions", QuestionArray })
})

app.get('/getToAdminPanel', (req, res) => {
    res.render('AdminSide', { headerText: "Admin Panel",QuestionArray })
})

var idCounter = 0;
// add question
app.post('/addQuestion', (req, res) => {
    var Question = req.body.question;
    var Option1 = req.body.option1;
    var Option2 = req.body.option2;
    var Option3 = req.body.option3;
    var Option4 = req.body.option4;
    idCounter = idCounter+1;
    QuestionArray.push({idCounter, Question, Option1, Option2, Option3, Option4 });

    const dateQuestion = JSON.stringify(QuestionArray);
    fs.writeFileSync("question.json", dateQuestion);

    res.redirect('/getToAdminPanel')
})





app.listen(3000, () => {
    console.log('Server on port 3000')
})
