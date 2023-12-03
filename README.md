# Study Helper
<p>
This is a platform where students can save and use their class notes.
<br>
</p>
<h2>Tech Stacks used:</h2>
<ol>
    <li>Node Js</li>
    <li>HTML</li>
    <li>Vannila JavaScript</li>
    <li>CSS</li>
    <li>BootStrap 5</li>
    <li>MySQL</li>
</ol>
<h2>For Running the project, </h2>
<ol>
    <li>Clone this repository</li>
    <li>Run 'npm install' command to install the required packages</li>
    <li>Run 'node app' to start the server</li>
</ol>
<h2> Database Details</h2>
<b>Note: Change your database connection details in the .env file</b>
<ul>
    <li>Table details
        <br>
        <pre>
+-----------------------+
| Tables_in_studyhelper |
+-----------------------+
| chapters              |
| courses               |
| notes                 |
| student               |
+-----------------------+
</pre>
    </li>
    <li>
    student table description
<br>
<pre>
+------------+-------------+------+-----+-------------------+-------------------+
| Field      | Type        | Null | Key | Default           | Extra             |
+------------+-------------+------+-----+-------------------+-------------------+
| S_Id       | int         | NO   | PRI | NULL              | auto_increment    |
| name       | varchar(32) | NO   |     | NULL              |                   |
| age        | int         | NO   |     | NULL              |                   |
| email      | varchar(64) | NO   | UNI | NULL              |                   |
| roll_no    | varchar(30) | YES  |     | NULL              |                   |
| time_stamp | datetime    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| password   | varchar(30) | NO   |     | NULL              |                   |
+------------+-------------+------+-----+-------------------+-------------------+
</pre>
    </li>
    <li>
    Course table description
    <br>
    <pre>
+-------------+-------------+------+-----+---------+----------------+
| Field       | Type        | Null | Key | Default | Extra          |
+-------------+-------------+------+-----+---------+----------------+
| S_Id        | int         | YES  | MUL | NULL    |                |
| C_Id        | int         | NO   | PRI | NULL    | auto_increment |
| Course_name | varchar(32) | NO   |     | NULL    |                |
+-------------+-------------+------+-----+---------+----------------+
    </pre>
    </li>
    <li>
        <pre>
Chapters tables description
        <br>
+--------------+-------------+------+-----+---------+----------------+
| Field        | Type        | Null | Key | Default | Extra          |
+--------------+-------------+------+-----+---------+----------------+
| chapter_id   | int         | NO   | PRI | NULL    | auto_increment |
| course_id    | int         | YES  | MUL | NULL    |                |
| chapter_name | varchar(32) | NO   |     | NULL    |                |
+--------------+-------------+------+-----+---------+----------------+
        </pre>
    </li>
    <li>
Notes table description
    <br>
    <pre>
+------------+---------------+------+-----+---------+----------------+
| Field      | Type          | Null | Key | Default | Extra          |
+------------+---------------+------+-----+---------+----------------+
| Notes_id   | int           | NO   | PRI | NULL    | auto_increment |
| chapter_id | int           | YES  | MUL | NULL    |                |
| topic      | varchar(32)   | NO   |     | NULL    |                |
| notes      | varchar(2048) | NO   |     | NULL    |                |
+------------+---------------+------+-----+---------+----------------+
    </pre>
    </li>
</ul>
Thanks for visiting!
