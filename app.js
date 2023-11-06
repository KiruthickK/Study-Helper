import mysql from 'mysql2'
import express from 'express'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
// For mysql database connection
const server = process.env.MYSQL_HOST;
const user_name = process.env.USER;
const user_pass = process.env.PASS;
const database = process.env.DBNAME;
// for getting directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config()
// Creating pool of connection to mysql
const pool = mysql.createPool({
    host: server,
    user: user_name,
    password: user_pass,
    database: database
}).promise()

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
})