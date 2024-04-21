import React, { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula"; // Dracula Theme
// import { vscodeDark } from "@uiw/codemirror-theme-vscode"; // VSCode Dark Theme
// import { monokai } from "@uiw/codemirror-theme-monokai"; // Monokai Theme
// import { materialDark } from "@uiw/codemirror-theme-material"; // Material Dark Theme
// import { javascript, javascriptLanguage } from "@codemirror/lang-javascript"; // JavaScript Language
// import { python, pythonLanguage } from "@codemirror/lang-python"; // Python Language
// import { cpp, cppLanguage } from "@codemirror/lang-cpp"; // C++ Language
// import { java, javaLanguage } from "@codemirror/lang-java"; // Java Language
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

import AssessmentCard from "../../utils/AssessmentCard";
import { useNavigate } from "react-router-dom";

function AssesmentQuestions({ questions, category, hide }) {
  const [index, setIndex] = useState(0);
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("python"); // Default language

  const navigate = useNavigate();

  const submit = () => {
    if (index !== questions.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      navigate("/assessmentScore");
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setCode("");
  };

  const extensions = [loadLanguage(selectedLanguage)];

  return (
    <div>
      <section className="h-[200px]  bg-blue-600">
        <div className="py-5 sm:px-6 lg:px-0 lg:py-5 ">
          <h1 className="text-white text-center text-4xl mb-2 text-[gt-bold]">
            Test your Knowledge
          </h1>
          <div className="absolute mx-10 sm:mx-20 lg:mx-52 inset-0 flex justify-center items-center transform translate-y-[5rem] sm:translate-y-[3rem] md:translate-y-[2rem] lg:-translate-y-20">
            <AssessmentCard category={category} index={0} />
          </div>
        </div>
      </section>

      <div className="xl:mx-40 sm:mx-10 mt-[30rem] sm:mt-[26rem] md:mt-[22rem] lg:mt-24 xl:mt-40 mb-10">
        <div className="lg:flex">
          <div className="lg:w-[60%] lg:border-r-2 flex max-sm:block">
            <div className="">
              <p className="text-center">Qtns</p>
              <div className="flex flex-col max-sm:flex-row md:flex-col lg:flex-col justify-center gap-3">
                {questions.map((ques, qindex) => {
                  return (
                    <div
                      key={qindex}
                      className={`${
                        qindex === index ? "bg-[#EC7A48]" : "bg-[#ec79484d]"
                      } rounded-lg w-10 h-10 max-sm:mt-2 flex justify-center items-center cursor-pointer`}
                      onClick={() => setIndex(qindex)}
                    >
                      <p
                        className={`${
                          qindex === index ? "text-white" : "text-[#f9a14f]"
                        }`}
                      >
                        {qindex + 1}
                      </p>
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
                <p className="leading-7 text-lg font-[gt-regular] text-black">
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
                      value={code}
                      onBeforeChange={(editor, data, value) => setCode(value)}
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
                    className="border-black w-full mt-3 rounded-lg border focus:border-black text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    value={code}
                    onChange={(e) => setCode(e.target.value)} // Update code state with entered code
                  ></textarea>
                )}
              </div>
            </div>
            <div className="flex gap-2 items-center justify-end max-sm:justify-start mt-3">
              {index !== 0 && (
                <button
                  className="cancel text-black"
                  onClick={() => setIndex((prev) => prev - 1)}
                >
                  Previous
                </button>
              )}
              <button className="continue" onClick={submit} >
                {index === questions.length - 1 ? "Submit" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssesmentQuestions;
