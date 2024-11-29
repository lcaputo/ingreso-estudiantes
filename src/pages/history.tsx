import { useEffect, useState } from "react";
import AdminLayout from "../layout/admin";
import { VITE_API_URL } from "../config";
import toast from "react-hot-toast";
import { IFetchData } from "../interfaces/fetchData.interface";
import useFetch from "../hooks/useFetch";

export default function History() {
  const [dataStatitisc, setDataStatitisc] = useState<any[]>([]);
  const {
    data: uploads,
    loading: loadingUploads,
    error: errorUploads,
  } = useFetch("user/uploads/history");

  async function getUploadsLogs() {
    //     const response = await fetch(`${VITE_API_URL}/user/uploads/history`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "include": "credentials"
    //         },
    //     });
    //     console.log(response);
    //     if (response.status === 200) {
    //         const res: any = await response.json();
    //         setDataStatitisc(res.data.data);
    //     } else toast("An error occurred while loading the data");
    // } catch (error) {
    //     toast.error(JSON.stringify({ error }));
    // }
  }
  useEffect(() => {
    getUploadsLogs();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1>History</h1>

        {/* ul li cards */}
        <ul className="flex flex-col gap-5">
          {dataStatitisc &&
            dataStatitisc.map((item: any) => (
              <li
                key={item.id}
                className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">
                        {item.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {item.date}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
