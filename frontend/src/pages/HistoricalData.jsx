import React, { useEffect, useState } from 'react'
import axios from "axios";

import HistoricalDataTable from "../components/HistoricalDataTable";

const HistoricalData = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLast100 = async () => {
      try {
        const respond = await axios.get(
          "http://localhost:5003/api/v1/stocks/historical"
        );
        setHistoricalData(respond.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLast100();
  }, []);

  return (
    <>
      <h1 className="mt-6 ml-24 text-3xl font-bold text-blue-500">
        Historical Data:{" "}
      </h1>
      {loading ? (
        <div className="flex justify-center h-30 items-center">
          <h1 className="text-blue-500">Loading data...</h1>
        </div>
      ) : (
        <HistoricalDataTable historicalData={historicalData} />
      )}
    </>
  );
};

export default HistoricalData;
