import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserId, setUserImage, setUserName } from "../reducers/userReducer";
import "./css/login.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";

export default function Login({ close }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  function handleSignUp(e) {
    e.preventDefault();
    fetch("https://blushing-drawers-fly.cyclic.app/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password, email: email }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == true) {
          setShowSignup(!showSignup);
        }
      });
  }

  if (showSignup) {
    return (
      <div className="login-form">
        <h2 className="text text--large center"> Sign Up </h2>
        <p className="text text--small center pt-10">Use gravator email for personalized account</p>
        <form action="">
          <div className="login-form">
            <div className="form-field">
              <div className="field">
                <div className="field__icon">
                  <FaRegUserCircle />
                </div>
                <input onKeyUp={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Username" />
              </div>
            </div>
            <div className="form-field">
              <div className="field">
                <div className="field__icon">
                  <MdOutlineEmail />
                </div>
                <input onKeyUp={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email" />
              </div>
            </div>
            <div className="form-field">
              <div className="field">
                <div className="field__icon">
                  <TbPasswordUser />
                </div>
                <input onKeyUp={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" autoComplete="true" />
              </div>
            </div>

            <p className="text text--small">{message}</p>

            <div className="submit">
              <input className="text text--small" onClick={handleSignUp} id="signup" type="submit" value="Sign Up" />
            </div>
          </div>
        </form>

        <div className="signup">
          <p
            onClick={() => {
              setShowSignup(!showSignup);
            }}
            className="text text--small center"
          >
            {" "}
            Or, Login
          </p>
        </div>
      </div>
    );
  }
  // Decode JWT token to extract user information (optional)
  function decodeToken(token) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  function handleLogin(e) {
    e.preventDefault();
    fetch("https://blushing-drawers-fly.cyclic.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          const token = data.token;
          localStorage.setItem("token", token);
          const decodedToken = decodeToken(token);
          const loggedInUserId = decodedToken.userId;

          const username = data.username;
          const profileImageHashGrav = data.image;

          dispatch(setUserId(loggedInUserId));
          dispatch(setUserName(username));
          if (profileImageHashGrav != "") {
            dispatch(setUserImage(profileImageHashGrav));
          }
          close();
        } else {
          setMessage("Please enter correct credentials");
        }
      });
  }

  return (
    <div className="login-form">
      <h2 className="text text--large center"> Login </h2>
      <p className="error text text--small">{message}</p>
      <form action="">
        <div className="login-form">
          <div className="form-field">
            <div className="field">
              <div className="field__icon">
                <FaRegUserCircle />
              </div>
              <input onKeyUp={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Username" />
            </div>
          </div>
          <div className="form-field">
            <div className="field">
              <div className="field__icon">
                <TbPasswordUser />
              </div>
              <input onKeyUp={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" autoComplete="true" />
            </div>
          </div>
          <div className="flex space-between">
            <div className="remember">
              <input type="checkbox" name="remember" id="remember" />
              <p className="text text--small">Remember</p>
            </div>

            <p className="text text--small">Forget Password ?</p>
          </div>

          <div className="submit">
            <input className="text text--small" onClick={handleLogin} id="login" type="submit" value="Login" />
          </div>
        </div>
      </form>

      <div className="signup">
        <p
          onClick={() => {
            setShowSignup(true);
          }}
          className="text text--small center"
        >
          {" "}
          Or, Signup
        </p>
      </div>
    </div>
  );
}
