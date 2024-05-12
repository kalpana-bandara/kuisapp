import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import background from "./images/bubble-bg.png";
import "./css/review.scss";
import { IoArrowBackOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { BsCheckCircle } from "react-icons/bs";
import clickSound from "./audio/submit.mp3";

export default function Review() {
  const reviews = useSelector((state) => state.reviews.reviews);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const questionSwiperRef = useRef(null);
  const answerSwiperRef = useRef(null);

  const questionID = reviews.id;

  useEffect(() => {
    fetch("https://red-vulture-tutu.cyclic.app/get-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: questionID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.data.length > 0) {
          setQuestions(data.data[0]);
        }
      });
  }, [questionID]);
  var sound = new Audio(clickSound);
  //handle next slide when click on submit
  const handleNextSlide = () => {
    sound.play();
    questionSwiperRef.current.swiper.slideNext();
    answerSwiperRef.current.swiper.slideNext();
  };
  const handlePrevSlide = () => {
    sound.play();
    questionSwiperRef.current.swiper.slidePrev();
    answerSwiperRef.current.swiper.slidePrev();
  };

  //store questions answer list as array of objects eg : [{answer : answerid},...]
  const data = questions.map((question) => {
    return JSON.parse(question.Answers);
  });

  return (
    <div className="quiz">
      <div style={{ backgroundImage: `url("${background}")`, backgroundSize: "cover" }} className="quiz-header"></div>
      <span
        className="backBtn"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoArrowBackOutline />
      </span>
      <div className="quiz_questions">
        <Swiper allowTouchMove={false} ref={questionSwiperRef} className="quiz_questions__header">
          {questions.map((question, key) => {
            key = key + 1;
            return (
              <SwiperSlide key={key}>
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
                  {Object.entries(answers).map(([answer, value]) => (
                    <div key={value} className="answer-field">
                      <label htmlFor={`answer${index + 1}`} className="answer">
                        {answer}
                      </label>
                      <div style={{ position: "relative" }}>
                        <input className="checkbox" type="radio" name={`answer${index + 1}`} id={`answer${index + 1}`} />
                        {reviews[index].qAnswer === value ? (
                          <span className="marker" style={{ position: "absolute", zIndex: "9999", display: "block", position: "absolute", top: "2px", left: "26%" }}>
                            <BsCheckCircle style={{ borderRadius: "50px", color: "white", fontSize: "20px", background: "#a42fc1" }} />
                          </span>
                        ) : reviews[index].userAnswer === value ? (
                          <span className="marker" style={{ position: "absolute", zIndex: "9999", display: "block", position: "absolute", top: "2px", left: "26%" }}>
                            <RxCrossCircled style={{ background: "chocolate", borderRadius: "50px", fontSize: "20px", color: "white" }} />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </form>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="submit review">
            <input className="text text--small" type="submit" value="Prev" onClick={handlePrevSlide} />
            <input className="text text--small" type="submit" value="Next" onClick={handleNextSlide} />
          </div>
        </div>
      </div>
    </div>
  );
}
