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
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != "") {
      fetch("http://localhost:5000/protected", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const username = data.username;

          const profileImageHashGrav = data.image;
          dispatch(setUserName(username));
          if (profileImageHashGrav != "") {
            dispatch(setUserImage(profileImageHashGrav));
          }
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }
  }, []);
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
