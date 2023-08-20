
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";

const HPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default HPage;
