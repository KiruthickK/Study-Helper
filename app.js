import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createUser, checkUser, getCoursesOfStudent } from './database.js';
import session from 'express-session';
const app = express();

// for getting directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Creating pool of connection to mysql

app.use(express.static('public'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use(express.json());
app.use(session({
    secret: "authentication_codes",
    cookie: { maxAge: 1000 * 60 * 15 },
    saveUninitialized: false
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

app.get('/login', async (req, res) => {
    if (req.session.authenticated) {
        const courses = await getCoursesOfStudent(req.session.userId)
        console.log(courses)
        res.render('course', { page_title: "hello", courses: courses })
        // TODO send course page with revelant links I mean handle here
    } else {
        res.render('login', { page_title: "Login | Signup" })
    }
});
// TODO sign up later
app.post('/signup', async (req, res) => {

})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await checkUser(email, password)
    if (result.failed) {
        console.log('failed');
    } else {
        console.log('User Authenticated...')
        req.session.authenticated = true;
        req.session.userId = result.id
        res.json(result)
    }
})
function isAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        return next();
    } else {
        res.redirect('/login')
    }
}
app.get('/course', isAuthenticated, async (req, res) => {
    const courses = await getCoursesOfStudent(req.session.userId);
    console.log(courses)
    res.render('course', { page_title: "hello", courses: courses })
})

