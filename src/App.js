import Header from "./components/partials/Header";
import "./App.scss";
import StartScreen from "./components/StartScreen";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quize from "./components/Quize";
import { setUserImage, setUserName } from "./reducers/userReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Results from "./components/Results";
import CategoryListScreen from "./components/CategoryListScreen";
import Categoryquizlist from "./components/Categoryquizlist";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/catagories" element={<CategoryListScreen />} />
            <Route path="/catagories/:category" element={<Categoryquizlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quize/:id" element={<Quize />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
