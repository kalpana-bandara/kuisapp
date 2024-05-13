import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/quiz.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import background from "./images/bubble-bg.png";
import { useDispatch } from "react-redux";
import { setCorrectCount, setIncorrectCount, setQuestionsCount } from "../reducers/resultsReducer";
import { setReviews } from "../reducers/reviewsReducer";
import clickSound from "./audio/submit.mp3";

export default function Quize() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var sound = new Audio(clickSound);

  const [questions, setQuestions] = useState([]);
  const questionSwiperRef = useRef(null);
  const answerSwiperRef = useRef(null);

  const [answer, setAnswer] = useState("");

  const [wrongCount, setWrongCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);

  const [isQuizEnd, setIsQuizEnd] = useState(false);

  const [forReview, setForReview] = useState([]);

  //get the questions and answers to render
  useEffect(() => {
    fetch("https://nice-gray-rooster-hose.cyclic.app/get-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.data.length > 0) {
          setQuestions(data.data[0]);
        }
      });
  }, [id]);

  //End Quize
  useEffect(() => {
    if (isQuizEnd == true) {
      dispatch(setCorrectCount(rightCount));
      dispatch(setIncorrectCount(wrongCount));
      dispatch(setQuestionsCount(questions.length));
      dispatch(setReviews({ ...forReview, id }));
      navigate("/results");
    }
  }, [isQuizEnd]);

  //handle next slide when click on submit
  const handleNextSlide = () => {
    sound.play();
    const swiperCurrentIndex = questionSwiperRef.current.swiper.activeIndex;
    const questionID = questionSwiperRef.current.swiper.slides[swiperCurrentIndex]?.getAttribute("id");
    const qAnswer = questionSwiperRef.current.swiper.slides[swiperCurrentIndex]?.getAttribute("data-correct");

    if (swiperCurrentIndex + 1 != questions.length) {
      if (qAnswer == answer) {
        setForReview([...forReview, { questionID: questionID, qAnswer: qAnswer, userAnswer: answer }]);
        setRightCount(rightCount + 1);
        questionSwiperRef.current.swiper.slideNext();
        answerSwiperRef.current.swiper.slideNext();
      } else {
        console.log("not correct");
        setForReview([...forReview, { questionID: questionID, qAnswer: qAnswer, userAnswer: answer }]);
        setWrongCount(wrongCount + 1);
        questionSwiperRef.current.swiper.slideNext();
        answerSwiperRef.current.swiper.slideNext();
      }
    } else {
      if (qAnswer == answer) {
        setForReview([...forReview, { questionID: questionID, qAnswer: qAnswer, userAnswer: answer }]);
        setRightCount(rightCount + 1);
      } else {
        setForReview([...forReview, { questionID: questionID, qAnswer: qAnswer, userAnswer: answer }]);
        setWrongCount(wrongCount + 1);
      }
      setIsQuizEnd(true);
    }
  };

  //store questions answer list as array of objects eg : [{answer : answerid},...]
  const data = questions.map((question) => {
    return JSON.parse(question.Answers);
  });

  return (
    <div className="quiz">
      <div style={{ backgroundImage: `url("${background}")`, backgroundSize: "cover" }} className="quiz-header"></div>
      <div className="quiz_questions">
        <Swiper allowTouchMove={false} ref={questionSwiperRef} className="quiz_questions__header">
          <div className="hands">
            <div className="🤚">
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="🌴"></div>
              <div className="👍"></div>
            </div>
          </div>
          <div id="wrong" className="quiz_questions__utility wrong">
            <span className="text text--small wrongCount">{wrongCount < 10 && wrongCount != 0 ? `0${wrongCount}` : wrongCount}</span>
            <span className="wrong-color"></span>
          </div>
          <div class="timer">
            <div class="circle-timer">
              <div class="timer-slot">
                <div class="timer-lt"> </div>
              </div>
              <div class="timer-slot">
                <div class="timer-rt"></div>
              </div>
              <div class="count">0</div>
            </div>
          </div>
          <div id="right" className="quiz_questions__utility right">
            <span className="right-color"></span>
            <span className="text text--small rightCount">{rightCount < 10 && rightCount != 0 ? `0${rightCount}` : rightCount}</span>
          </div>
          {questions.map((question, key) => {
            key = key + 1;
            return (
              <SwiperSlide data-correct={question.AnswerId} id={question.QuestionID} key={key}>
                <p className="question-text text text--small center">
                  Question {key}/{questions.length}
                </p>
                <p className="text text--medium center px-20">{question.QuestionText}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="quiz_questions__answers">
          <Swiper allowTouchMove={false} ref={answerSwiperRef}>
            {data.map((answers, index) => (
              <SwiperSlide key={index}>
                <form action="">
                  {Object.entries(answers).map(([key, value]) => (
                    <div key={value} className="answer-field">
                      <label htmlFor={`answer${index + 1}`} className="answer">
                        {key}
                      </label>
                      <input
                        onClick={() => {
                          setAnswer(value.toString());
                        }}
                        className="checkbox"
                        type="radio"
                        name={`answer${index + 1}`}
                        id={`answer${index + 1}`}
                      />
                    </div>
                  ))}
                </form>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="submit">
            <input className="text text--small" type="submit" value="Submit" onClick={handleNextSlide} />
          </div>
        </div>
      </div>
    </div>
  );
}
