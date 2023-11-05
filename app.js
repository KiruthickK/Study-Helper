import mysql from 'mysql2'
import express from 'express'

const app = express();
const server = 'localhost';
const user_name = 'root';
const user_pass = 'root';
const database = 'studyhelper';

const pool = mysql.createPool({
    host: server,
    user: user_name,
    password: user_pass,
    database: database
});

app.use(express.static('public'));
// app.use("/scripts", express.static(__dirname + '/scripts'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');
app.listen(3000, () => console.log('Listening...'));

app.get('/', (req, res) => {
    res.render('index', { page_title: 'StudyHelper' })
})