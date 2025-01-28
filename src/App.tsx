import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  // const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated());
  // const setToken = useAuthStore((state: any) => state.setToken);

  // const {
  //   data: valid,
  //   loading: loadingRoles,
  //   error: errorRoles,
  // } = useFetch('auth/validate');

  // useEffect(() => {

    // fetch(VITE_API_URL + "/auth/validate", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${localStorage.getItem("access_token")}` || "",
    //   },
    // })
    //   .then((res) => {
    //     if (res.status === 401) {
    //       console.log("Unauthorized");
    //       setToken("");
    //     }
    //     if (res.status === 200) {
    //       console.log("Authorized");
    //       return res.json();
    //     }
    //   })
    //   .then((data) => {
    //     console.log(data);

    //     if (data) {
    //       setToken(data.token);
    //     }
    //   });
  // }, []);

  return (
      <RouterProvider router={AppRoutes}/>
  );
}

export default App;
