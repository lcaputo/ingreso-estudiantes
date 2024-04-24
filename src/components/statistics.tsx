import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IData, IFetchData } from "../interfaces/fetchData.interface";
import { VITE_API_URL } from "../config";
import Chart from 'react-google-charts'
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
        } else (
          toast("An error occurred while loading the data")
        )
      } catch (error) {
        toast.error(JSON.stringify({ error }))
      }
    }
    getData()
  }, []);
  return (
    <>
      <div>
        <label htmlFor="">Conteo de entradas en las ultimas 24h: </label>
        {dataStatitisc?.people_last_24h}
      </div>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
          <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold text-secondary">73M+</dt>
              <dd className="text-secondary dark:text-gray-400">Developers</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold text-secondary">100M+</dt>
              <dd className="text-secondary dark:text-gray-400">repositories</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold text-secondary">1000s</dt>
              <dd className="text-secondary dark:text-gray-400">projects</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold text-secondary">1B+</dt>
              <dd className="text-secondary dark:text-gray-400">Contributors</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold text-secondary">90+</dt>
              <dd className="text-secondary dark:text-gray-400">companies</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold text-secondary">4M+</dt>
              <dd className="text-secondary dark:text-gray-400">Organizations</dd>
            </div>
          </dl>
        </div>
      </div>
      <div>
        <label className="text-secondary dark:text-gray-400">
          Personas dentro: {dataStatitisc?.peopleInside}
        </label>
        
      </div>
      <div>
        <label className="text-secondary dark:text-gray-400">Conteo de entradas en las ultimas 24h: {dataStatitisc?.people_last_24h}</label>
        
      </div>
      <div>
        <label htmlFor="">
          Personas dentro:
        </label>
        {dataStatitisc?.peopleInside}
      </div>
      

      <div className="w-1/2 text-sm ">

        {
          dataStatitisc?.linear_graph_per_hour ? (
            <Chart
              chartType="Line"
              data={dataStatitisc.linear_graph_per_hour}
              options={options}
              graphID="ScatterChart"
              width="100%"
              style={{
                fontSize: "0.5rem"
              }}
              height="500px"
            />
          ) :
            (
              <h1>Loading...</h1>
            )
        }
      </div>
    </>
  );
}