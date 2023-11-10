import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createUser, checkUser } from './database.js';
import session from 'express-session';
import cookieParser from "cookie-parser";

const app = express();

// for getting directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Creating pool of connection to mysql

app.use(express.static('public'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "authentication_codes",
    saveUninitialized: true,
    resave: true
}));

// view engine
app.set('view engine', 'ejs');
app.listen(3000, () => console.log('Listening...'));

// app.use((err, req, res) => {
//     console.log(err.stack)
//     res.status(500).send('Something Broken wait ...')
// })
app.get('/', (req, res) => {
    res.render('index', { page_title: 'StudyHelper' })
});

app.get('/login', (req, res) => {
    res.render('login', { page_title: "Login | Signup" })
});
app.post('/signup', async (req, res) => {
    const { name, email, age, roll_no } = req.body;
    const id = await createUser(name, age, email, roll_no)
    // console.log(id)
    if (id.failed) {
        console.log('failed');
    } else {
        console.log('User created...')
        console.log(id)
        // res.render('course', { courses: id })
    }
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await checkUser(email, password)
    // console.log(id)
    if (result.failed) {
        console.log('failed');
    } else {
        console.log('User Authenticated...')
        console.log(result.id)

        // res.render('course', { page_title: 'course Page', id: id })
        res.json(result) //as of now sending the id of the user to store them in the cookies or session to authenticate
    }
})
app.get('/course', (req, res) => {
    console.log(req.session.id)
    res.render('course', { page_title: "hello", courses: "courses are not meant to be difficult" })
})
