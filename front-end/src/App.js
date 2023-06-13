import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Login,{LoginRouter} from "./components/Login";
import Register,{RegisterRouter} from "./components/Register";
import Otp from "./components/Otp";
import UserRouting from "./components/user/UserRouting";
import AdminRouting from "./components/admin/AdminRouting";
import './App.css';

function App() {
  return (
    <>
        {
        <Router>
          <Routes>
          <Route path="/" exact element={<LoginRouter />} />
          <Route path="/register" element={<RegisterRouter />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/user/*" element={<UserRouting />} />
          <Route path="/admin/*" element={<AdminRouting />} />
          </Routes>
        </Router>
        }
      </>
  );
}

export default App;
