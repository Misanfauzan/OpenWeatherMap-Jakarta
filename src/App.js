import { useQuery } from "react-query";
import { API } from "./api";

import "bootstrap/dist/css/bootstrap.min.css";
import dateFormat, { masks } from "dateformat";

export default function App() {
  let api = API();

  let { data } = useQuery("dataCache", async () => {
    const config = {
      method: "GET",
    };
    const response = await api.get(
      "/forecast?lat=-6.2146&lon=106.8451&mode=json&units=metric&appid=bd0e37d64039c44c444f806860caa4d8",
      config
    );
    return response.list;
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">
        5 Days Weather Forecast in Jakarta with React
      </h1>
      <table className="table table-striped table-hover text-center">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Day</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Temperature (Celcius)</th>
            <th scope="col">Weather</th>
          </tr>
        </thead>
        {data?.map((item, index) => (
          <tbody>
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{dateFormat(item.dt_txt, "dddd")}</td>
              <td>{dateFormat(item.dt_txt, "d mmmm yyyy")}</td>
              <td>{dateFormat(item.dt_txt, "HH:MM")}</td>
              <td>{parseInt(item.main.temp)}°</td>
              <td>{item.weather[0].main}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
