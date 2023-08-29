import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "./App.css";
import SalesTableComponent from "./components/sales-table/SalesTableComponent";
import { IData, ITableApiResponse } from "./interfaces/salesTableInterface";
import BarChart from "./components/bar-chart/BarChart";

function App() {
  const API_KEY = "nIa7SZTCOf4VWCgh5fQUqXKNVdTZWzmzDDBVukfI";
  const [tableData, setTableData] = useState<IData[]>([]);
  useEffect(() => {
    axios
      .get<ITableApiResponse>(
        `https://api.eia.gov/v2/seriesid/ELEC.SALES.CO-RES.A?api_key=${API_KEY}`
      )
      .then((res) => setTableData(res.data.response.data));
  }, []);
  return (
    <div className="container">
      <SalesTableComponent data={tableData} />
      <BarChart data={tableData} minYear={2014} maxYear={2023} />
    </div>
  );
}

export default App;
