import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SalesTableComponent, {
  IData,
} from "./components/sales-table/SalesTableComponent";
import { ITableApiResponse } from "./interfaces/salesTableInterface";


function App() {
  const API_KEY = "nIa7SZTCOf4VWCgh5fQUqXKNVdTZWzmzDDBVukfI";
  const [tableData, setTableData] = useState<IData[]>([]);
  useEffect(() => {
    axios
      .get<ITableApiResponse>(
        `https://api.eia.gov/v2/seriesid/ELEC.SALES.CO-RES.A?api_key=${API_KEY}`
      )
      .then((res) => setTableData(res.data.response.data))
  }, []);
  return <SalesTableComponent data={tableData} />;
}

export default App;
