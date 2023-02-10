const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// connecting to db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        passowrd: 'password',
        database: 'employees_db'
    },
    console.log(`Connected successfully to your employees_db!`)
);

// TODO: Create a post route

// TODO: Create a delete route

// TODO: Create a get route

// TODO: Create a put

app.listen(PORT, () => {
    console.log(`Server listening on your port at ${PORT}!`);
});