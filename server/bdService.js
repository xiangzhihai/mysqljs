const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: process.env.DB_PROT,
    database: process.env.DATABASE,
    insecureAuth: true
})

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log(`db ${connection.state}`);
})

class DBService {
    static getDBServiceInstance() {
        return instance ? instance : new DBService();
    }

    async getAllData() {
        try {
            const response = await new Promise(
                (resolve, reject) => {
                    const query = "SELECT * FROM names;";
                    connection.query(query, (err, results) => {
                        if (err) reject(new Error(err.message));
                        resolve(results);
                    })
            });
            // console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DBService;