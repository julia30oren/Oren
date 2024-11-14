require("dotenv").config();
const { DB_NAME, CLIENTSTABLE, MAIL, MAILAPPPASSWORD, COMPANY_DOMAIN, COMPANY_NAME } = process.env;
const express = require("express");
const router = express.Router();
const pool = require("../pool");

let emails = [MAIL];
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: MAIL,
        pass: MAILAPPPASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// send mail with defined transport object
async function sendEmailToClient(email) {
    try {
        const info = await transporter.sendMail({
            from: MAIL, // sender address
            to: email, // list of receivers
            subject: "New contact request", // Subject line
            text: "New contact request", // plain text body
            // html body
            html: `<div style="color: black; font-size: 16px;">
                        <p>Hi,
                            <br>Thank you for reaching out to <b>${COMPANY_NAME}</b>. 
                            We appreciate the interest you have in our company. 
                            We will get back to you as soon as possible.
                            More information on what we do and our business offer can be found at 
                            <a href="${COMPANY_DOMAIN}" target="_blank">${COMPANY_DOMAIN}</a>.
                        </p>
                        <p>If you have any questions, do not hesitate to contact us at ${MAIL}.</p>
                        <br>
                        <p>All the best,</p>
                        <p>${COMPANY_NAME} staff.</p>
                        <a href="${COMPANY_DOMAIN}" target="_blank">
                            <img src="https://i.pinimg.com/1200x/fa/de/bb/fadebbc0bbf69e70b1c61c0791084006.jpg" alt="${COMPANY_NAME}" style=" width: 50%;">
                        </a>
                    </div>`,
        });
        return info;
    } catch (err) {
        console.log(err);
    }
}

async function sendEmailToAdmin(email, message) {
    try {
        const info = await transporter.sendMail({
            from: MAIL, // sender address
            to: emails, // list of receivers
            subject: "🔔 New contact request from website", // Subject line
            text: "🔔 New contact request from website", // plain text body
            html:  // html body
                `<div style="color: black; font-size: 16px;">
                        <p>You have a new contact request from website 
                            <a href="${COMPANY_DOMAIN}" target="_blank">${COMPANY_DOMAIN}</a>.
                        </p>
                        <br>
                        <p>${email}</p>
                        <p>${message}</p>
                    </div>`,
        });
        return info;
    } catch (err) {
        console.log(err);
    }
}

// Queryes
function connectionRequestQuery(params) {
    const { email, message } = params;
    return [
        `INSERT INTO ${DB_NAME}.${CLIENTSTABLE} (client_email, client_message) VALUES ('${email}', '${message}')`,
        [...Object.values(params)],
    ];
}

// Routes
router.get("/connect/:email/:message", async (req, res, next) => {
    const { email, message } = req.params;

    let res1 = sendEmailToClient(email);
    let res2 = sendEmailToAdmin(email, message);

    const [query, params] = connectionRequestQuery(req.params);
    const result = await pool.execute(query, params);
    if (result && res1 && res2) {
        res.json({ result: 'email has been sent successfully' });
    }

});

module.exports = router;