import "./header.scss";
import { FaUser } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Login from "../Login";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const userImage = useSelector((state) => state.user.userImage);
  return (
    <header className="nav_menu">
      <Link to="/">
        <h2 className="text text--large nav_menu__logo">Quizzer</h2>
      </Link>

      <Popup trigger={<div className="nav_menu__profile">{userImage ? <img className="userImage" src={`https://gravatar.com/avatar/${userImage}`} /> : <FaUser />}</div>} modal nested>
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <Login close={close} />
          </div>
        )}
      </Popup>
    </header>
  );
}
