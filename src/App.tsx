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

function App() {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/persons" element={<Entries />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/test" element={<Test />} />
        <Route path="/entry" element={<Entry />} />
        <Route path="/entry_success" element={<EntrySuccess />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
