const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.json());

// 🔹 الاتصال بقاعدة البيانات
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456', // غيرها بكلمة السر عندك
    database: 'Fazza_system'
});
// 🔹 إضافة طالب واحد
app.post('/addStudent', (req, res) => {
    const { name, student_id, email, password, college, phone } = req.body;

    const sql = `INSERT INTO students (name, student_id, email, password, college, phone) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, student_id, email, password, college, phone], (err, result) => {
        if(err) return res.status(500).send(err);
        res.send("Student added successfully!");
    });
});
// 🔹 إضافة فرصة واحدة
app.post('/addOpportunity', (req, res) => {
    const { title, date, description, volunteers_needed, hours, status } = req.body;

    const sql = `INSERT INTO opportunities (title, date, description, volunteers_needed, hours, status) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [title, date, description, volunteers_needed, hours, status || 'active'], (err, result) => {
        if(err) return res.status(500).send(err);
        res.send("Opportunity added successfully!");
    });
});


db.connect((err) => {
    if(err) {
        console.log("Connection error:", err);
    } else {
        console.log("Connected to MySQL database!");
    }
});

// 🔹 اختبار السيرفر
app.get('/', (req, res) => {
    res.send("Server is running!");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
