import { Link } from "react-router-dom";

export default function Button({ location, children }) {
  return (
    <Link to={location}>
      <button className="button button__boxed">{children ? children : ""}</button>
    </Link>
  );
}
