import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Login from "./pages/login";
import { Persons } from "./pages/persons";
import Upload from "./pages/upload";
import { Test } from "./pages/test";
import { useAuthStore } from "./stores/authStore";
import { Entry } from "./pages/entry";

function App() {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/persons" element={<Persons />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/test" element={<Test />} />
        <Route path="/entry" element={<Entry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
