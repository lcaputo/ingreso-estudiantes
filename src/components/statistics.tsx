import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IData, IFetchData } from "../interfaces/fetchData.interface";
import { VITE_API_URL } from "../config";
import Chart from "react-google-charts";
import { options } from "../const/dashboarOptions";
import { Loader } from "./loader";

export default function Statistics() {
  const [dataStatitisc, setDataStatitisc] = useState<IData>();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${VITE_API_URL}/dashboard/statitics`
        );
        console.log(response);
        if (response.status === 200) {
          const res: IFetchData<IData> = await response.json();
          setDataStatitisc(res.data);
        } else toast("An error occurred while loading the data");
      } catch (error) {
        toast.error(JSON.stringify({ error }));
      }
    };
    getData();
  }, []);
  return (
    <div>
      <div className="flex flex-col">
        <p>Personas dentro: {dataStatitisc?.peopleInside}</p>
        <p>
          Conteo de entradas en las ultimas 24h:{" "}
          {dataStatitisc?.people_last_24h}
        </p>
      </div>

      {dataStatitisc?.linear_graph_per_hour ? (
        <Chart
          chartType="Line"
          data={dataStatitisc.linear_graph_per_hour}
          options={options}
          graphID="ScatterChart"
          width="100%"
          style={{
            fontSize: "0.5rem",
          }}
          height="500px"
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}
