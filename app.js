import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createUser, checkUser, getCoursesOfStudent, createCourse, getChapters, createChapter, getNotes, createNotes } from './database.js';
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
    saveUninitialized: false,
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

app.get('/login', async (req, res) => {
    if (req.session.authenticated) {
        const courses = await getCoursesOfStudent(req.session.userId)
        console.log(courses)
        res.render('course', { page_title: "Course Page", userName: req.session.userName, courses: courses })
        // TODO send course page with revelant links I mean handle here
    } else {
        res.render('login', { page_title: "Login | Signup" })
    }
});
app.get('/signup', (req, res) => {
    res.render('signup', { page_title: 'Sign Up' })
})
// TODO sign up later
app.post('/signup', async (req, res) => {
    const { username, roll_no, age, email, password } = req.body;
    const isAccountCreated = await createUser(username, age, email, roll_no, password);
    if (isAccountCreated.failed) {
        res.json({ 'emailExsisting': 'true' })
    } else {
        req.session.authenticated = true;
        req.session.userId = isAccountCreated.id
        req.session.userName = isAccountCreated.username
        res.json({ 'success': 'true' })
    }
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await checkUser(email, password)
    if (result.failed) {
        console.log('failed');
    } else {
        console.log(result)
        console.log('User Authenticated...')
        req.session.authenticated = true;
        req.session.userId = result.id
        req.session.userName = result.username
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
    res.render('course', { page_title: "Course Page", userName: req.session.userName, courses: courses })
})
app.post('/getcourse', (req, res) => {
    const { course_id } = req.body;
    req.session.courseId = course_id;
    res.send({ yes: 'Yes' })
})
app.post('/createCourse', async (req, res) => {
    const { newCourseName } = req.body;
    const result = await createCourse(req.session.userId, newCourseName)
    if (result.insertId) {
        res.json({ id: result.insertId, success: true });
    } else {
        res.json({ failed: true });
    }
})
app.get('/chapter', isAuthenticated, async (req, res) => {
    const chapters = await getChapters(req.session.courseId);
    console.log(req.session.courseId)
    res.render('chapter', { page_title: 'Chapter Page', userName: req.session.userName, chapters: chapters });
})
app.post('/createChapter', async (req, res) => {
    const { newChapterName } = req.body;
    const result = await createChapter(req.session.courseId, newChapterName)
    if (result.insertId) {
        res.json({ id: result.insertId, success: true });
    } else {
        res.json({ failed: true });
    }
})
app.post('/loadchapter', (req, res) => {
    const { chapter_id } = req.body;
    req.session.chapter_id = chapter_id;
    res.send({ yes: 'yes' })
})

app.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await getNotes(req.session.chapter_id);
    res.render('notes', { page_title: 'Notes Page', userName: req.session.userName, notes: notes });
})
app.post('/createNotes', async (req, res) => {
    const { newNotesTitle, notes } = req.body;
    const result = await createNotes(req.session.chapter_id, newNotesTitle, notes);
    if (result.insertId) {
        res.json({ id: result.insertId, success: true });
    } else {
        res.json({ failed: true });
    }
})

