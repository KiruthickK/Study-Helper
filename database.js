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
// for checking whether the creating account's email already registered or not
async function checkUniqueEmail(email) {
    const [result] = await pool.query(`SELECT name FROM student WHERE email = ?`, [email]);
    return result.length == 0;
}
// for signup
export async function createUser(name, age, email, roll_no, password) {
    const isEmailNotUsed = await checkUniqueEmail(email);
    if (isEmailNotUsed) {
        const [result] = await pool.query(`INSERT INTO student (name, age, email, roll_no, password) values (?, ?, ?, ?, ?)`, [name, age, email, roll_no, password]);
        console.log(result);
        return checkUser(email, password);
    } else {
        return { 'failed': 'true' };
    }
}
// for login
export async function checkUser(email, password) {
    const [result] = await pool.query(`SELECT S_Id, name FROM student WHERE email = ? and password = ?`, [email, password]);
    if (result.length == 0) {
        return { 'failed': 'true' };
    } else {
        return { id: result[0].S_Id, username: result[0].name };
    }
}

export async function createCourse(sid, course) {
    const [result] = await pool.query(`INSERT INTO courses (S_Id, Course_name) values (?, ?)`, [sid, course])
    return result;
}
export async function deleteCourse(cid, course) {
    // TODO
    /**
     * we need to perform delete operations from notes, then chapters then only we can perform delete the course
     */
}
export async function updateCourse(cid, course) {
    const [result] = await pool.query('UPDATE courses SET Course_name = ? WHERE C_Id = ?', [course, cid]);
    return result; //changedRows
}

export async function getCoursesOfStudent(id) {
    const [courses] = await pool.query(`SELECT * FROM courses WHERE S_Id = ?`, [id]);
    return courses;
}
export async function getChapters(id) {
    const [chapters] = await pool.query(`SELECT * FROM chapters WHERE course_id = ?`, [id]);
    return chapters;
}
export async function createChapter(cid, chapter) {
    const [result] = await pool.query(`INSERT INTO chapters(course_id, chapter_name) VALUES (?, ?)`, [cid, chapter])
    return result;
}
export async function updateChapter(cid, chapter) {
    const [result] = await pool.query(`UPDATE chapters SET chapter_name = ? WHERE chapter_id = ?`, [chapter, cid]);
    return result;
}
export async function deleteChapter() {

}
export async function getNotes(id) {
    const [notes] = await pool.query(`SELECT * FROM notes WHERE chapter_id = ?`, [id]);
    return notes;
}
export async function createNotes(cid, notes_title, notes) {
    const [result] = await pool.query(`INSERT INTO notes (chapter_id , topic , notes) VALUES (?, ?, ?)`, [cid, notes_title, notes])
    return result;
}
export async function editNotes(id, topic, notes) {
    console.log(id);
    console.log('--Gap--')
    console.log(topic)
    const [result] = await pool.query(`UPDATE notes SET topic = ?, notes = ? WHERE Notes_id  = ?`, [topic, notes, id]);
    return result;
}