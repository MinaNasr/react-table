import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SalesTableComponent from "./components/sales-table/SalesTableComponent";
import { IData, ITableApiResponse } from "./interfaces/salesTableInterface";
import BarChart from "./components/bar-chart/BarChart";
import FilterInputs from "./components/filter-inputs/FilterInputs";

function App() {
  const API_KEY = "nIa7SZTCOf4VWCgh5fQUqXKNVdTZWzmzDDBVukfI";
  const [tableData, setTableData] = useState<IData[]>([]);
  const [minYear, setMinYear] = useState("2014");
  const [maxYear, setMaxYear] = useState("2022");

  useEffect(() => {
    axios
      .get<ITableApiResponse>(
        `https://api.eia.gov/v2/seriesid/ELEC.SALES.CO-RES.A?api_key=${API_KEY}`
      )
      .then((res) => setTableData(res.data.response.data));
  }, []);

  const submitMinAndMaxYears = (
    minYearRefValue: string,
    maxYearRefValue: string
  ): void => {
    setMinYear(minYearRefValue);
    setMaxYear(maxYearRefValue);
  };

  return (
    <div className="container">
      <SalesTableComponent data={tableData} />
      <FilterInputs
        tableData={tableData}
        minYear={Number(minYear)}
        maxYear={Number(maxYear)}
        submitMinAndMaxYears={submitMinAndMaxYears}
      />
      <BarChart
        data={tableData}
        minYear={Number(minYear)}
        maxYear={Number(maxYear)}
        barColor="#247eba"
      />
    </div>
  );
}

export default App;
