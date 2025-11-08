import mysql from "mysql2/promise";
import path from "path";
import fs from "fs";
import csv from "csv-parser";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "spycakes",
  database: "dse_db",
  password: "spycakesword",
});

const sql = "INSERT INTO historical_data (trade_date, symbol, open, high, low, close, volume) VALUES ?";

async function insertValues() {
  await connection.query(sql);
  console.log("Success");
}



const results = [];

fs.createReadStream("../services/historical_data.csv")
  .pipe(csv({ bom: true }))
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    const transformedData = results.map((result) => {
      return [
        result.date,
        result.symbol,
        result.open,
        result.high,
        result.low,
        result.close,
        result.volume,
      ];
    });


    console.log(`Attempting to insert ${transformedData.length} rows...`);
   
    try{
        const [result] = await connection.query(sql, [transformedData])
        console.log("✅ Success! All rows inserted.", result);
    } catch(error){
        console.error("❌ ERROR inserting data:", error);
    } finally{
        await connection.end();
  console.log("Connection closed.");
    }
    
  });
