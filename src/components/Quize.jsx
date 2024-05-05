import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/quiz.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import background from "./images/bubble-bg.png";
import { useDispatch } from "react-redux";
import { setCorrectCount, setIncorrectCount, setQuestionsCount } from "../reducers/resultsReducer";

export default function Quize() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const questionSwiperRef = useRef(null);
  const answerSwiperRef = useRef(null);

  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [wrongCount, setWrongCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);

  const [isQuizEnd, setIsQuizEnd] = useState(false);

  //get the questions and answers to render
  useEffect(() => {
    fetch("https://quiza-app.onrender.com/get-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.data.length > 0) {
          setQuestions(data.data[0]);
          const firstQuestion = data.data[0][0];
          setCorrectAnswer(firstQuestion.AnswerId);
          setCurrentQuestionId(1);
        }
      });
  }, [id]);

  //End Quize
  useEffect(() => {
    if (isQuizEnd == true) {
      dispatch(setCorrectCount(rightCount));
      dispatch(setIncorrectCount(wrongCount));
      dispatch(setQuestionsCount(questions.length));
      navigate("/results");
    }
  }, [isQuizEnd]);

  //handle next slide when click on submit
  const handleNextSlide = () => {
    const swiperIndex = questionSwiperRef.current.swiper.activeIndex + 1;
    if (questions.length != currentQuestionId) {
      setCurrentQuestionId(questionSwiperRef.current.swiper.slides[swiperIndex]?.getAttribute("id"));
      setCorrectAnswer(questionSwiperRef.current.swiper.slides[swiperIndex]?.getAttribute("data-correct"));
      if (correctAnswer == answer) {
        if (swiperIndex) {
          setCurrentQuestionId(questionSwiperRef.current.swiper.slides[swiperIndex]?.getAttribute("id"));
          setCorrectAnswer(questionSwiperRef.current.swiper.slides[swiperIndex]?.getAttribute("data-correct"));
        }
        setRightCount(rightCount + 1);

        questionSwiperRef.current.swiper.slideNext();
        answerSwiperRef.current.swiper.slideNext();
      } else {
        setWrongCount(wrongCount + 1);
        questionSwiperRef.current.swiper.slideNext();
        answerSwiperRef.current.swiper.slideNext();
      }
    } else {
      if (correctAnswer == answer) {
        setRightCount(rightCount + 1);
        setIsQuizEnd(true);
      } else {
        setWrongCount(wrongCount + 1);
        setIsQuizEnd(true);
      }
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
          <div className="timer">
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
          <div id="right" className="quiz_questions__utility right">
            <span className="right-color"></span>
            <span className="text text--small rightCount">{rightCount < 10 && rightCount != 0 ? `0${rightCount}` : rightCount}</span>
          </div>
          {questions.map((question, key) => {
            key = key + 1;
            return (
              <SwiperSlide data-correct={question.AnswerId} id={key} key={key}>
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
