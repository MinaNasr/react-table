import { useEffect } from "react";
import "./App.css";
import SalesTableComponent from "./components/sales-table/SalesTableComponent";

function App() {
  const fetchData = () => {
    fetch('https://api.eia.gov/v2/seriesid/ELEC.SALES.CO-RES.A?api_key=nIa7SZTCOf4VWCgh5fQUqXKNVdTZWzmzDDBVukfI').then(
      response => response.json()
    ).then(res=> console.log(res))
  }

  useEffect(()=>{
    fetchData();
  },[])

  const data = [
    {
      name: "James",
      email: "james@hotmail.com",
      age: "32",
      food: "pizza",
    },
    {
      name: "Jennifer",
      email: "jennifer@hotmail.com",
      age: "23",
      food: "sushi",
    },
    {
      name: "Markus",
      email: "markus@hotmail.com",
      age: "21",
      food: "chicken parm",
    },
    {
      name: "Sarah",
      email: "sarah@hotmail.com",
      age: "30",
      food: "burritos",
    },
    {
      name: "Stella",
      email: "stella@hotmail.com",
      age: "27",
      food: "samosa",
    },
  ];
  return <SalesTableComponent data={data}/>;
}

export default App;
