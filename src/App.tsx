import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import Login from './pages/login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
