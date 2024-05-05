import "./css/welcome.scss";
import { useSelector } from "react-redux";

export default function Welcome() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="welcome">
      <p className="text text--small">Welcome</p>
      <h2 className="text text--large">{userName ? userName : "Guest"}</h2>
    </div>
  );
}
