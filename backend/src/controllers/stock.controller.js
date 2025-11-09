import pool from '../db/index.js'

export default async function getHistoricalData(req, res) {
    try{
        const sql = "SELECT * FROM historical_data LIMIT 100"

        const [rows] = await pool.query(sql)
        res.json(rows)
    

    } catch(error){
        console.log("Database error: ", error)
        res.status(500).json({ message: "Error fetching data" })
    }
}