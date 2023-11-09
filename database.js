import mysql from 'mysql2'
import dotenv from 'dotenv'

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
export async function checkUniqueEmail(email) {
    const [result] = await pool.query(`SELECT name FROM student WHERE email = ?`, [email]);
    return result.length == 0;
}
export async function createUser(name, age, email, roll_no) {
    const isEmailAlreadyUsed = await checkUniqueEmail(email);
    if (isEmailAlreadyUsed) {
        const [result] = await pool.query(`INSERT INTO student (name, age, email, roll_no) values (?, ?, ?, ?)`, [name, age, email, roll_no]);
        console.log(result);
    } else {
        return { 'failed': 'true' };
    }

}
// const flag = await checkUniqueEmail('kiruthicdfgk101@gmail.com');