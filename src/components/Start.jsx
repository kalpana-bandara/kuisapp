import Button from "./Button";
import "./css/button.scss";
import women from "./images/women-sitting.png";
import "./css/start.scss";
import { BsArrowRightShort } from "react-icons/bs";

export default function Start() {
  return (
    <div className="screen-box">
      <h3 className="text text--medium pb-20">Let's start now!</h3>
      <p className="text text--small pb-10">Play, Learn and Explore with</p>
      <p className="text text--small pb-20">Exciting quizes</p>
      <Button>
        <BsArrowRightShort />
      </Button>
      <img className="hero-img" src={women} alt="women-sitting" />
    </div>
  );
}
