/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import AssessmentCard from "../../utils/AssessmentCard";
import "./assessment.css";
import AssesmentQuestions from "./AssesmentQuestions";
import profileImg1 from "../../assets/images/profile-form-1.png";
import profileImg2 from "../../assets/images/profile-form-2.png";
import profileImg3 from "../../assets/images/profile-form-3.png";
import behavioural_questions from "../../assets/images/behavioural_questions.svg";
import technical_questions from "../../assets/images/technical_questions.svg";
import past_industry_questions from "../../assets/images/past_industry_questions.svg";
import scenario_questions from "../../assets/images/scenario_questions.svg";
import project_questions from "../../assets/images/project_questions.svg";
import code_questions from "../../assets/images/code_questions.svg";
import Header from "./Header";
import axios from "axios";

const Assessment = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [assessmentData, setAssessmentData] = useState(null);
  const [category, setCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // useEffect(() => {
  //   console.log("qstn", questionAnswer);
  // }, [questionAnswer]);
  
  useEffect(() => {
    if (!isMounted.current) return;
    const formData = new FormData();
    formData.append("complexity", "phase1");

    if (assessmentData === null) {
      axios.post("http://localhost:8000/phaseQuestions", formData,{ 
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
          setAssessmentData(res.data);
          Object.keys(res.data).map((category, index) => {
            setCategoryIndex((prevData) => [
              ...prevData,
              res.data[category].length,
            ]);
            res.data[category].map((data) => {
              setQuestionAnswer((prevData) => [
                ...prevData,
                {
                  question: data,
                  answer: "",
                },
              ]);
            });
          });
      })
      .catch((error) => {
        console.error("Error fetching assessment data:", error);
      });
    }
  }, []);

  const selectAssessment = (key, i) => {
    setShowQuestions(true);
    setCategory(key);
    setCurrentIndex(i);
  };

  if (assessmentData === null) {
    return null;
  }

  const assessmentImage = {
    behavioural_questions: behavioural_questions,
    technical_questions: technical_questions,
    past_industry_questions: past_industry_questions,
    code_questions: code_questions,
    scenario_questions: scenario_questions,
    project_questions: project_questions,
  };

  if (showQuestions) {
    return (
      <>
        <AssesmentQuestions
          questions={assessmentData[category]}
          currentIndex={currentIndex}
          totalIndex={Object.keys(assessmentData).length - 1}
          setShowQuestions={setShowQuestions}
          categoryIndex={categoryIndex}
          questionAnswer={questionAnswer}
          setQuestionAnswer={setQuestionAnswer}
          category={category}
          img={assessmentImage[category]}
          hide={setShowQuestions}
        />
      </>
    );
  }
  return (
    <div>
      <Header />
      <section className="overflow-hidden bg-[#dbfe01]">
        <div className="py-3 sm:px-6 lg:relative lg:px-0 lg:py-5">
          <div className="xl:mx-64 items-center px-4 xl:px-12">
            <div className="relative z-10">
              <div className="relative">
                <p className="inline text-black font-light text-4xl tracking-tight">
                  Hey! <span className="font-medium">Khizer</span>
                </p>
                <p className="mt-3 text-2xl font-light text-black">
                  Welcome to AYC, your first step in creating impact
                </p>
              </div>
              <div className="lg:mx-32 mt-5">
                <div className="mb-0">
                  <ol className="relative z-10 pl-0 flex justify-between text-sm font-medium text-black">
                    <li
                      style={{ width: "65px" }}
                      className="flex items-center gap-2 -ml-8 max-sm:-ml-3"
                    >
                      <img
                        className="w-full max-sm:w-14 md:ml-6"
                        src={profileImg1}
                        alt="profileImg1"
                      />
                    </li>

                    <li
                      style={{ width: "65px" }}
                      className="flex items-center gap-2 "
                    >
                      <img
                        className="w-full max-sm:w-14"
                        src={profileImg2}
                        alt="profileImg2"
                      />
                    </li>

                    <li
                      style={{ width: "65px" }}
                      className="flex items-center gap-2 -mr-8 max-sm:-mr-3"
                    >
                      <img
                        className="w-full max-sm:w-14 md:-ml-3 max-sm:ml-3"
                        src={profileImg3}
                        alt="profileImg3"
                      />
                    </li>
                  </ol>
                </div>
                <div className="mt-2 mb-0">
                  <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gradient-to-r from-[#333334] from-50% to-white to-50%">
                    <ol className="relative z-10 pl-0 flex justify-between text-sm font-medium text-white">
                      <li className="flex items-center gap-2 ">
                        <span className="size-6 rounded-full bg-[#333334] text-center text-[10px]/6 font-bold">
                          {" "}
                          1{" "}
                        </span>
                      </li>

                      <li className="flex items-center gap-2 ">
                        <span className="size-6 rounded-full bg-[#333334] text-center text-[10px]/6 font-bold">
                          {" "}
                          2{" "}
                        </span>
                      </li>

                      <li className="flex items-center gap-2 ">
                        <span className="size-6 rounded-full bg-white text-center text-[10px]/6 font-bold text-black">
                          {" "}
                          3{" "}
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="mb-0">
                  <ol className="relative z-10 pl-0 flex justify-between text-base font-medium text-black">
                    <li className="flex items-center gap-2 -ml-8 max-sm:-ml-3">
                      <span className="hidden sm:block">
                        {" "}
                        Complete Profile{" "}
                      </span>
                    </li>

                    <li className="flex items-center gap-2 ">
                      <span className="hidden sm:block"> MCQ Test </span>
                    </li>

                    <li className="flex items-center gap-2 -mr-8 max-sm:-mr-3">
                      <span className="hidden sm:block"> Course Enroll </span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden">
        <div className="py-3 sm:px-4 lg:relative lg:px-0 lg:py-5">
          <div className="xl:mx-64 items-center px-4 xl:px-12">
            <div className="relative">
              <div className="flex mt-3 flex-wrap items-center">
                <div className="relative max-sm:text-center flex-grow">
                  <p className=" text-2xl font-medium text-black">
                    Test your Knowledge
                  </p>
                </div>
                <div className="ml-auto max-sm:pt-4">
                  <button className="flex items-center text-[#333334] focus:outline-none ml-auto">
                    View All
                    <svg
                      className="w-4 h-4 inline-block ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <div className="z-40">
                  {Object.keys(assessmentData).map((category, index) => {
                    return (
                      <div key={index}>
                        <AssessmentCard
                          index={index}
                          category={category}
                          icon={true}
                          img={assessmentImage[category]}
                          click={() => selectAssessment(category, index)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assessment;
