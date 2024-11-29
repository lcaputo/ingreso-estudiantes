import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Login from "./pages/login";
import { Entries } from "./pages/entries";
import Upload from "./pages/upload";
import { Test } from "./pages/test";
import { useAuthStore } from "./stores/authStore";
import { Entry } from "./pages/entry";
import { EntrySuccess } from "./pages/entry_success";
import { Success } from "./pages/success";
import { useEffect, useRef } from "react";
import { VITE_API_URL } from "./config";
import History from "./pages/history";
import Guest from "./pages/guest";
import { useSymbologyScanner } from "@use-symbology-scanner/react";
import { Scanner } from "./pages/scanner";
import Exit from "./pages/exit";
import useFetch from "./hooks/useFetch";
import Logout from "./pages/logout";

function App() {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated());
  const setToken = useAuthStore((state: any) => state.setToken);

  const {
    data: valid,
    loading: loadingRoles,
    error: errorRoles,
  } = useFetch('auth/validate');

  useEffect(() => {

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
  }, []);


  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/persons" element={<Entries />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/history" element={<History />} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/entry" element={<Entry />} />
          <Route path="/entry_success" element={<EntrySuccess />} />
          <Route path="/success" element={<Success />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/exit" element={<Exit />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
