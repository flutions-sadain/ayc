/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import AssessmentCard from "../../utils/AssessmentCard";
import { useNavigate } from "react-router-dom";
import AssessmentScore from "./AssessmentScore";

// eslint-disable-next-line react/prop-types
function AssesmentQuestions({
  questions,
  category,
  currentIndex,
  totalIndex,
  setShowQuestions,
  questionAnswer,
  setQuestionAnswer,
  categoryIndex,
  hide,
  img,
}) {
  const [index, setIndex] = useState(0);
  // eslint-disable-next-line react/prop-types
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [showBackButton, setShowBackButton] = useState("true");
  const [data,setData]=useState("")
  const navigate = useNavigate();

  const prevIndex = () => {
    // eslint-disable-next-line react/prop-types
    return categoryIndex
      .slice(0, currentIndex)
      .reduce((acc, curr) => acc + curr, 0);
  };

  const submit = async () => {
    const formData = new FormData();
    formData.append("examine_str", JSON.stringify(questionAnswer));

    try {
      const response = await axios.post(
        "http://localhost:8000/assesProfile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // console.log("Response:", response.data);
      setData(response.data)

      navigate('/assessmentScore', { state: response.data });
    } catch (error) {
      console.error("Error posting answers:", error);
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setQuestionAnswer((prevData) => {
      const newData = [...prevData];
      newData[index + prevIndex()].answer = value;
      return newData;
    });
  };

  const handleContinue = () => {
    if (index !== questions.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      if (currentIndex === totalIndex) {
        submit();
      } else {
        setShowQuestions(false);
      }
    }
  };

  const handlePrevious = () => {
    if (index !== 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const extensions = [loadLanguage(selectedLanguage)];

  return (
    <div>
      <section>
        <div className="py-5 sm:px-6 lg:px-0 lg:py-5">
          <div className="relative mx-5 my-10 sm:mx-10 lg:mx-40 z-10">
            <h1 className="text-black text-center text-4xl mb-10">
              Test your Knowledge
            </h1>
            <AssessmentCard
              category={category}
              img={img}
              hide={hide}
              showBackButton={showBackButton}
            />
          </div>
        </div>
        <span className="w-full h-60 bg-[#dbfe01] absolute inset-0"></span>
      </section>
      <div className="xl:mx-40 sm:mx-10 mb-10">
        <div className="lg:flex">
          <div className="lg:w-[60%] lg:border-r-2 flex max-sm:block">
            <div className="">
              <p className="text-center">Questions</p>
              <div className="flex flex-col max-sm:flex-row md:flex-col lg:flex-col justify-center gap-3">
                {questions.map((ques, qindex) => {
                  return (
                    <div
                      key={qindex}
                      className={`${qindex === index ? "bg-[#dbfe01]" : "bg-[#dcfe0143]"
                        } rounded-lg w-10 h-10 max-sm:mt-2 flex justify-center items-center cursor-pointer`}
                      onClick={() => setIndex(qindex)}
                    >
                      <p className="text-black">{qindex + 1}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="lg:border-l-2 md:border-l-2 lg:p-3 md:p-3 m-3">
              <p className="font-bold">Question {index + 1}</p>
              <p className="m-3">{questions[index]}</p>
            </div>
          </div>
          <div className="m-3 lg:w-[40%]">
            <div className="p-2 w-full">
              <div className="">
                <p className="leading-7 text-lg text-black">
                  Please Provide your answer
                </p>
                {category === "code_questions" ? (
                  <>
                    <div className="w-full relative bg-black z-20">
                      <select
                        className="text-white bg-gray-900 border-none z-50 p-2"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                      >
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="javascript">JavaScript</option>
                      </select>
                    </div>
                    <CodeMirror
                      key={prevIndex() + index}
                      value={questionAnswer[prevIndex() + index].answer}
                      onChange={(value) => {
                        handleAnswerChange(value)
                        // console.log("value", value);
                      }
                      }
                      theme={dracula}
                      extensions={extensions}
                      height="300px"
                      className="overflow-auto z-10"
                    />
                  </>
                ) : (
                  <textarea
                    id="answer"
                    name="answer"
                    rows={6}
                    className="border-black bg-white w-full mt-3 rounded-lg border focus:border-black text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    value={questionAnswer[prevIndex() + index].answer}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                  ></textarea>
                )}
              </div>
            </div>
            <div className="flex gap-2 items-center justify-end max-sm:justify-start mt-3">
              {index !== 0 && (
                <button className="cancel text-black" onClick={handlePrevious}>
                  Previous
                </button>
              )}
              <button className="continue" onClick={handleContinue}>
                {index === questions.length - 1
                  ? currentIndex === totalIndex
                    ? "Submit"
                    : "Save & back to Assessment screen"
                  : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssesmentQuestions;
