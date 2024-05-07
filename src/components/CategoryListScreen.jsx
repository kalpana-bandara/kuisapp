import "./css/quizcategories.scss";
import { Link } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";
import { IoGameController } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";
import { GiLifeSupport } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";
import { GiGiftOfKnowledge } from "react-icons/gi";

export default function CategoryListScreen() {
  return (
    <div className="quiz_categories">
      <Link to={"acedemic"}>
        <div className="category">
          <div className="icon">
            <HiAcademicCap />
          </div>
          <p>Academic</p>
        </div>
      </Link>
      <Link to={"entertaintment"}>
        <div className="category">
          <div className="icon">
            <IoGameController />
          </div>
          <p>Entertaintment</p>
        </div>
      </Link>
      <Link to={"skill-development"}>
        <div className="category">
          <div className="icon">
            <GiSkills />
          </div>
          <p>Skill Development</p>
        </div>
      </Link>
      <Link to={"lifestyle"}>
        <div className="category">
          <div className="icon">
            <GiLifeSupport />
          </div>
          <p>Lifestyle</p>
        </div>
      </Link>
      <Link to={"hobbies"}>
        <div className="category">
          <div className="icon">
            <FaBookReader />
          </div>
          <p>Hobbies</p>
        </div>
      </Link>
      <Link to={"general-knowledge"}>
        <div className="category">
          <div className="icon">
            <GiGiftOfKnowledge />
          </div>
          <p>General Knowledge</p>
        </div>
      </Link>
    </div>
  );
}
