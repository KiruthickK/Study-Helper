import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createUser } from 'database';
const app = express();

// for getting directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Creating pool of connection to mysql

app.use(express.static('public'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');
app.listen(3000, () => console.log('Listening...'));

app.get('/', (req, res) => {
    res.render('index', { page_title: 'StudyHelper' })
});

app.get('/login', (req, res) => {
    res.render('login', { page_title: "Login | Signup" })
});
app.post('/login', async (req, res) => {
    const { name, email, age, roll_no } = req.body;
    const id = await createUser(name, age, email, roll_no)
    if (id.failed) {
        console.log('failed');
    } else {
        console.log('User created...')
        console.log(id)
    }
})
