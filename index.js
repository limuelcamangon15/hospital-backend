const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { readFileSync } = require("fs");

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// init express
const app = express();
app.use(cors());
app.use(express.json());

//test endpoint
app.get("/hi", (req, res) => {
    res.status(200).json({
        message: "hi from backend"
    });
});

app.get("/hello", (req, res) => {
    res.status(200).json({
        message: "hello from backend"
    });
});

app.get("/patients", (req, res) => {
    res.status(200).json({
        message: "patients 9999999"
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("running...");
})