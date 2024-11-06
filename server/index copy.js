require("dotenv").config();
const mysql = require("mysql2");
const cors = require("cors");
const express = require("express");
const app = express();

var DB_state = '';

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
});

function logState() {
    console.log(DB_state);
}

function addAdmins() {
    const query = `INSERT INTO ${process.env.ADMINTABLE} (admin_name,admin_password) VALUES (?,?)`;

    connection.query(query, [process.env.ADMINNAME, process.env.ADMINPASS], (err, result) => {
        if (err) console.log(err);
        else {
            DB_state = `Admin "${process.env.ADMINNAME}" was created.`;
            logState();
        }
    })
}

function createClientsTable() {
    connection.query(`CREATE TABLE ${process.env.CLIENTSTABLE} (
                id BIGINT NOT NULL AUTO_INCREMENT,
                client_email VARCHAR(2048) NULL,
                client_message VARCHAR(2048) NULL,
                created_date DATETIME NULL,
                PRIMARY KEY (`+ 'id' + `)
                )ENGINE = InnoDB`,

        (err, result) => {
            if (err) console.log(err);
            else {
                DB_state = `TABLE for ${process.env.CLIENTSTABLE} was created.`;
                logState();
            }
        });
}

function createAdminTable() {
    connection.query(`CREATE TABLE ${process.env.ADMINTABLE} (
                id BIGINT NOT NULL AUTO_INCREMENT,
                admin_name VARCHAR(2048) NOT NULL,
                admin_password VARCHAR(2048) NOT NULL,
                PRIMARY KEY (`+ 'id' + `)
                )ENGINE = InnoDB`,

        (err, result) => {
            if (err) console.log(err);
            else {
                DB_state = `TABLE for ${process.env.ADMINTABLE} was created.`;
                logState();
                addAdmins();
            }
        });
}

function createPostsTable() {
    connection.query(`CREATE TABLE ${process.env.POSTSTABLE} (
                id BIGINT NOT NULL AUTO_INCREMENT,
                post_title VARCHAR(2048) NULL,
                post_img_url VARCHAR(2048) NULL,
                post_description VARCHAR(4096) NULL,
                created_date DATETIME NULL,
                post_likes INT(250) NULL,
                post_tweets INT(250) NULL,
                post_shares INT(250) NULL,
                post_views INT(250) NULL,
                reading_time VARCHAR(100) NULL,
                PRIMARY KEY (`+ 'id' + `)
                )ENGINE = InnoDB`,

        (err, result) => {
            if (err) console.log(err);
            else {
                DB_state = `TABLE for ${process.env.POSTSTABLE} was created.`;
                logState();
            }
        });
}

function createPosteLTable() {
    connection.query(`CREATE TABLE ${process.env.POSTELTABLE} (
                post_id BIGINT NOT NULL,
                el_plaicement BIGINT NOT NULL,
                el_type VARCHAR(2048) NOT NULL,
                el_value VARCHAR(4096) NOT NULL
                )ENGINE = InnoDB`,

        (err, result) => {
            if (err) console.log(err);
            else {
                DB_state = `TABLE for ${process.env.POSTELTABLE} was created.`;
                logState();
            }
        });
}

function ifTablesEXIST() {
    DB_state = "Database " + process.env.DATABASE + ' connected.';
    logState();

    connection.query(`SHOW TABLES LIKE '${process.env.CLIENTSTABLE}'`, (err, res) => {
        if (err) throw err;
        else if (!res[0]) createClientsTable();
        else { DB_state = `TABLE for ${process.env.CLIENTSTABLE} exist.`; logState(); }
    });

    connection.query(`SHOW TABLES LIKE '${process.env.ADMINTABLE}'`, (err, res) => {
        if (err) throw err;
        else if (!res[0]) createAdminTable();
        else { DB_state = `TABLE for ${process.env.ADMINTABLE} exist.`; logState(); }
    });

    connection.query(`SHOW TABLES LIKE '${process.env.POSTSTABLE}'`, (err, res) => {
        if (err) throw err;
        else if (!res[0]) createPostsTable();
        else { DB_state = `TABLE for ${process.env.POSTSTABLE} exist.`; logState(); }
    });

    connection.query(`SHOW TABLES LIKE '${process.env.POSTELTABLE}'`, (err, res) => {
        if (err) throw err;
        else if (!res[0]) createPosteLTable();
        else { DB_state = `TABLE for ${process.env.POSTELTABLE} exist.`; logState(); }
    });
}

function createDatabase() {
    connection.query(`CREATE DATABASE ${process.env.DATABASE}`, (err, res) => {
        if (err) throw err;
        else {
            DB_state = `Database ${process.env.DATABASE} was created.`;
            ifDatabaseEXIST();
            createClientsTable();
            createAdminTable();
        }
    });
}

function ifDatabaseEXIST() {
    connection.query(`USE ${process.env.DATABASE}`, (err, res) => err ? createDatabase() : ifTablesEXIST());
}

connection.connect((err) => err ? console.log(err.message) : ifDatabaseEXIST());


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/blog'));
app.use(require('./routes/message'));

app.listen(process.env.PORT, (err) => {
  err ? console.log(err) : console.log("Port: ", process.env.PORT);
});