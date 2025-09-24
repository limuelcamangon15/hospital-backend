const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { readFileSync } = require("fs");

//load firebase account key
const serviceAccount = JSON.parse(
    readFileSync("./serviceAccountKey.json", "utf8")
);

//init firebase admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// init express
const app = express();
app.use(cors());
app.use(express.json());

//test endpoint
app.get("/hi", (req, res) => {
    res.status(200).json({
        message: "hello from backend"
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("running...");
})