const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { readFileSync } = require("fs");

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//database
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

//adding a patient
app.post("/add/patient", async (req, res) => {
    try {
        console.log("bodyyyyy: " + req.body);

        const { firstName, lastName, sex, age, contactNumber, address, bloodType } = req.body;

        //validation
        if (!firstName || !lastName || !sex || !age || !contactNumber) {
            return res.status(400).json({
                error: "Patient's first name, last name, sex, age, and contact number are required"
            });
        }

        //the reference of new patient
        const docRef = await db.collection("patients").add({
            firstName: firstName,
            lastName: lastName,
            sex: sex,
            age: age,
            contactNumber: contactNumber,
            address: address,
            bloodType: bloodType,
            createdAt: new Date()
        });

        res.status(201).json({
            message: "Patient added successfully",
            id: docRef.id
        });

    }
    catch (error) {

        console.error("Error adding patient: ", error.message, error.stack);

        res.status(500).json({
            error: "Failed to add patient"
        });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("running...");
})