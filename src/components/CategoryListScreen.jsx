import "./css/quizcategories.scss";
import { Link } from "react-router-dom";

export default function CategoryListScreen() {
  return (
    <div className="quiz_categories">
      <Link to={"acedemic"}>
        <div className="category">Academic</div>
      </Link>
      <Link to={"entertaintment"}>
        <div className="category">Entertaintment</div>
      </Link>
      <Link to={"skill-development"}>
        <div className="category">Skill Development</div>
      </Link>
      <Link to={"lifestyle"}>
        <div className="category">Lifestyle</div>
      </Link>
      <Link to={"hobbies"}>
        <div className="category">Hobbies</div>
      </Link>
      <Link to={"general-knowledge"}>
        <div className="category">General Knowledge</div>
      </Link>
    </div>
  );
}
