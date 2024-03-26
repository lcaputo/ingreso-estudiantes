import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IData, IFetchData } from "../interfaces/fetchData.interface";
import { VITE_API_URL } from "../config";
import Chart from "react-google-charts";
import { options } from "../const/dashboarOptions";

export default function Statistics() {
  const [dataStatitisc, setDataStatitisc] = useState<IData>();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/dashboard/statitics`);
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
    <>
      <div className="flex">
        <div className="w-1/2 text-sm ">
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
            <h1>Loading...</h1>
          )}
        </div>
        <div className="w-1/2 text-lg flex flex-col my-auto gap-10">
          <div
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Personas dentro:
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-2xl">
              {dataStatitisc?.peopleInside}
            </p>
          </div>

          <div
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Conteo de entradas en las ultimas 24h:
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-2xl">
              {dataStatitisc?.people_last_24h}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
