import Welcome from "./Welcome";
import Start from "./Start";

import { AiFillDingtalkSquare } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { FaBrain } from "react-icons/fa6";
import Quiztypes from "./Quiztypes";
import QuizCategory from "./QuizCategory";
import Button from "./Button";

export default function StartScreen() {
  return (
    <>
      <Welcome />
      <Start />
      <Quiztypes heading="Select quiz type">
        <QuizCategory image={<AiFillDingtalkSquare />} heading="Applitude Test" description="Measure your abilities">
          <Button location="quize/1">
            <BsArrowRightShort />
          </Button>
        </QuizCategory>
        <QuizCategory image={<FaBrain />} heading="Logical Reasoning" description="Sharpen your mind">
          <Button location="quize/2">
            <BsArrowRightShort />
          </Button>
        </QuizCategory>
      </Quiztypes>
    </>
  );
}
