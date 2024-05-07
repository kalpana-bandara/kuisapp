import { useSelector } from "react-redux";
import background from "./images/bubble-bg.png";
import { useNavigate } from "react-router-dom";
import "./css/results.scss";
import { useEffect } from "react";
import { RiRestartFill } from "react-icons/ri";
import { FaBullseye } from "react-icons/fa6";

export default function Results() {
  const rightAnswers = useSelector((state) => state.results.rightCount);
  const wrongAnswers = useSelector((state) => state.results.wrongCount);
  const questionsCount = useSelector((state) => state.results.questionsCount);
  const navigate = useNavigate();

  const score = Math.round((parseFloat(rightAnswers) / parseFloat(questionsCount)) * 100);

  useEffect(() => {
    if (questionsCount == 0) {
      navigate("/");
    }
  }, [questionsCount]);

  function showAnswers() {
    navigate("/review");
  }
  return (
    <>
      <div className="results">
        <div style={{ backgroundImage: `url("${background}")`, backgroundSize: "cover" }} className="quiz-results-header">
          <div className="loader">
            <div className="circle circle-1"></div>
            <div className="circle circle-2">
              <p className="text text--small">Your Score</p>
              <p className="text text--medium w-600">{score}pt</p>
            </div>
            <div className="circle circle-3"></div>
            <div className="circle circle-4"></div>
          </div>
        </div>
        <div className="quiz_questions results">
          <div className="quiz_results__header">
            <div className="item">
              <div className="item-icon">
                <span className="ball"></span>
              </div>
              <div className="item-set">
                <p className="text text--small">100%</p>
                <p className="text text--small">Completion</p>
              </div>
            </div>
            <div className="item">
              <div className="item-icon">
                <span className="ball"></span>
              </div>
              <div className="item-set">
                <p className="text text--small">{questionsCount < 10 ? `0${questionsCount}` : questionsCount}</p>
                <p className="text text--small">Total Questions</p>
              </div>
            </div>
            <div className="item">
              <div className="item-icon">
                <span className="ball green"></span>
              </div>
              <div className="item-set">
                <p className="text text--small">{rightAnswers < 10 ? `0${rightAnswers}` : rightAnswers} </p>
                <p className="text text--small">Correct</p>
              </div>
            </div>
            <div className="item">
              <div className="item-icon">
                <span className="ball red"></span>
              </div>
              <div className="item-set">
                <p className="text text--small">{wrongAnswers < 10 ? `0${wrongAnswers}` : wrongAnswers} </p>
                <p className="text text--small">Wrong</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="after-quiz">
        <div
          className="utility"
          onClick={() => {
            navigate(-1);
          }}
        >
          <div className="icon purple">
            <RiRestartFill />
          </div>
          <p className="text text--small">Play Again</p>
        </div>
        <div
          className="utility"
          onClick={() => {
            navigate("/review");
          }}
        >
          <div className="icon small red">
            <FaBullseye />
          </div>
          <p className="text text--small">Review Answers</p>
        </div>
      </div>
    </>
  );
}
