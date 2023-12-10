import { BrowserRouter, Route, Routes } from "react-router-dom";
import Meeting from "./pages/Meeting";
import { Landing } from "./pages/Landing";
import "./global.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/meeting" element={<Meeting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
