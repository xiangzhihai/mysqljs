const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const dbService = require("./bdService");
const { response } = require("express");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create
app.post("/insert", (req, res) => {
    const { name } = req.body;
    const db = dbService.getDBServiceInstance();
    const result = db.insertNewName(name);
    result.then(data => res.json({ data: data }))
        .catch(err => console.log(err));
})

app.get("/getAll", (req, res) => {
    const db = dbService.getDBServiceInstance();
    const result = db.getAllData();
    result
        .then(data => res.json({
            data: data
        }))
        .catch(err => console.log(err));
})


app.listen(process.env.PORT, () => console.log("app server started"));