const { printTable } = require('console-table-printer');
const express = require('express');
const mysql = require('mysql2');
const {inquireFunct} = require('./js/allEmployee');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(inquireFunct);

// connecting to db
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "password",
        database: 'employee_db',
    },
    console.log(`Connected successfully to your employees_db!`)
);

// TODO: Create a get route for departments
app.get('/api/departments', () => {
    const sql = `SELECT * from department`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        printTable(res);
        inquireFunct();
    })
});

// TODO: Create a get route for roles
app.get('/api/roles', () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        printTable(res);
    })
});

// TODO: Create a last get route for all employees
app.get('/api/employees', () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, res) => {
        if(err) throw err;
        printTable(res);
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on your port at ${PORT}!`);
});