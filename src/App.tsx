import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import SalesTableComponent from "./components/sales-table/SalesTableComponent";
import { IData, ITableApiResponse } from "./interfaces/salesTableInterface";
import BarChart from "./components/bar-chart/BarChart";

function App() {
  const API_KEY = "nIa7SZTCOf4VWCgh5fQUqXKNVdTZWzmzDDBVukfI";
  const [tableData, setTableData] = useState<IData[]>([]);
  const [minYear, setMinYear] = useState("2014");
  const [maxYear, setMaxYear] = useState("2022");
  const minYearRef = useRef<HTMLSelectElement>(null);
  const maxYearRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    axios
      .get<ITableApiResponse>(
        `https://api.eia.gov/v2/seriesid/ELEC.SALES.CO-RES.A?api_key=${API_KEY}`
      )
      .then((res) => setTableData(res.data.response.data));
  }, []);

  const submitMinAndMaxYears = () => {
    setMinYear(minYearRef.current?.value!);
    setMaxYear(maxYearRef.current?.value!);
  };

  return (
    <div className="container">
      <SalesTableComponent data={tableData} />
      <div className="filter-container">
        <label className="filter-input">
          Min Year
          <select ref={minYearRef} defaultValue={minYear}>
            {tableData.map((record) => (
              <option key={record.period} value={record.period} selected={minYear === record.period.toString()}>
                {record.period}
              </option>
            ))}
          </select>
        </label>
        <label className="filter-input">
          Max Year
          <select ref={maxYearRef} defaultValue={maxYear}>
            {tableData.map((record) => (
              <option key={record.period} value={record.period} selected={maxYear === record.period.toString()}>
                {record.period}
              </option>
            ))}
          </select>
        </label>
        <button className="filter-action" onClick={submitMinAndMaxYears}>
          submit
        </button>
      </div>

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
