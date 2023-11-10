import mysql from 'mysql2'
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

// For mysql database connection
const server = process.env.MYSQL_HOST;
const user_name = process.env.USER;
const user_pass = process.env.PASS;
const database = process.env.DBNAME;

const pool = mysql.createPool({
    host: server,
    user: user_name,
    password: user_pass,
    database: database
}).promise()


export async function getCoursesOfStudent(id) {
    const [courses] = await pool.query(`SELECT * FROM courses WHERE S_Id = ?`, [id]);
    return courses;
}
export async function checkUser(email, password) {
    const [result] = await pool.query(`SELECT S_Id FROM student WHERE email = ? and password = ?`, [email, password]);
    if (result.length == 0) {
        return { 'failed': 'true' };
    } else {
        return { id: result[0].S_Id };
    }
}
export async function checkUniqueEmail(email) {
    const [result] = await pool.query(`SELECT name FROM student WHERE email = ?`, [email]);
    return result.length == 0;
}
export async function createUser(name, age, email, roll_no) {
    const isEmailAlreadyUsed = await checkUniqueEmail(email);
    if (isEmailAlreadyUsed) {
        const [result] = await pool.query(`INSERT INTO student (name, age, email, roll_no) values (?, ?, ?, ?)`, [name, age, email, roll_no]);
        console.log(result);
        return result;
    } else {
        return { 'failed': 'true' };
    }

}