import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillDingtalkSquare } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import QuizCategory from "./QuizCategory";
import Button from "./Button";

export default function Categoryquizlist() {
  const { category } = useParams();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/get-quizlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cat_name: category }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuestions(data.data[0]);
      });
  }, [category]);

  return (
    <div className="quiz_list">
      {questions.length > 0 ? (
        <>
          {questions.map((question, idx) => {
            return (
              <QuizCategory key={idx} image={<AiFillDingtalkSquare />} heading={question.quiz_name} description={question.quiz_description}>
                <Button location={`/quize/${question.quiz_id}`}>
                  <BsArrowRightShort />
                </Button>
              </QuizCategory>
            );
          })}
        </>
      ) : (
        `No quizes found for ${category}`
      )}
    </div>
  );
}
