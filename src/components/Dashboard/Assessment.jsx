import React, { useState } from "react";
import AssessmentCard from "../../utils/AssessmentCard";

import { useNavigate  } from 'react-router-dom';
import "./assessment.css";
import AssesmentQuestions from "./AssesmentQuestions";
import profileImg1 from '../../assets/images/profile-form-1.png';
import profileImg2 from '../../assets/images/profile-form-2.png';
import profileImg3 from '../../assets/images/profile-form-3.png';

const Assessmentdata = {
  behavioural_questions: [
    "Can you describe a situation where you had to work under pressure and how you handled it?",
    "How do you handle feedback and criticism from your superiors?",
    "Can you provide an example of a time when you had to make a difficult decision at work? What was the outcome?",
    "Describe a situation where you had to collaborate with a difficult team member.",
  ],
  technical_questions: [
    "As a Programmer Analyst, what programming languages are you most proficient in?",
    "Can you describe a complex project youve worked on and the steps you took to complete it?",
    "How do you approach problem-solving when you encounter a bug or issue in your code?",
    "Can you explain a time when you had to use your knowledge of databases in a project?",
  ],
  past_industry_questions: [
    "What was your role in your previous team at Cognizant Technology Solutions?",
    "Can you describe a project you completed at Cognizant that you are particularly proud of?",
    "How did you contribute to the success of your previous team at Cognizant?",
    "What were some challenges you faced in your previous role and how did you overcome them?",
  ],
  code_questions: [
    "Given an N x M matrix A of non-negative integers representing the height of each unit cell in a continent, the 'Blue lake' touches the left and top edges of the matrix and the 'Red lake' touches the right and bottom edges. Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower. Find the number of cells from where water can flow to both the Blue and Red lake.",
    "Write a function that adds two numbers.",
    "Write a function that multiplies two numbers.",
  ],
};
const data = [
  {
    img: "/Role model.png",
    desc: "Complete Profile",
  },
  {
    img: "/Coaching.png",
    desc: "MCQ Test",
  },
  {
    img: "/Learning.png",
    desc: "Course Enroll",
  },
];

function Assessment() {
  const navigate= useNavigate()
  const[showQuestions,setShowQuestions] = useState()
  const[category,setcategory] = useState('')

  const selectAssessment=(key)=>{
    // console.log(Assessmentdata[key])
    setShowQuestions(true)
    setcategory(key)
    //navigate('/assessmentQuestions',{ state: { questions: Assessmentdata[key],category:key} });
  }
  if(showQuestions){
    return(
      <AssesmentQuestions  questions={Assessmentdata[category]} category={category} hide={setShowQuestions}/>
    )
  }
  return (
    <div>
      <section class="overflow-hidden bg-[#dbfe01]">
          <div class="py-3 sm:px-6 lg:relative lg:px-0 lg:py-5">
              <div class="xl:mx-64 items-center px-4 xl:px-12">
                  <div class="relative z-10">
                      <div class="relative">
                          <p class="inline text-black font-light text-4xl tracking-tight">Hey! <span className="font-medium">Khizer</span></p>
                          <p class="mt-3 text-2xl font-light text-black">Welcome to AYC, your first step in creating impact</p>
                      </div>
                      <div className="lg:mx-32 mt-5">
                          <div className="mb-0" >
                              <ol className="relative z-10 pl-0 flex justify-between text-sm font-medium text-black">
                                  <li className="flex items-center gap-2 -ml-8 max-sm:-ml-3">
                                      <img className='w-full max-sm:w-14' src={profileImg1} alt="profileImg1" />
                                  </li>

                                  <li className="flex items-center gap-2 ">
                                      <img className='w-full max-sm:w-14' src={profileImg2} alt="profileImg2" />
                                  </li>

                                  <li className="flex items-center gap-2 -mr-8 max-sm:-mr-3">
                                      <img className='w-full max-sm:w-14' src={profileImg3} alt="profileImg3" />

                                  </li>
                              </ol>
                          </div>
                          <div className="mt-2 mb-0">
                              <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gradient-to-r from-[#333334] from-50% to-white to-50%" >
                                  <ol className="relative z-10 pl-0 flex justify-between text-sm font-medium text-white">
                                      <li className="flex items-center gap-2 ">
                                          <span className="size-6 rounded-full bg-[#333334] text-center text-[10px]/6 font-bold"> 1 </span>
                                      </li>

                                      <li className="flex items-center gap-2 ">
                                          <span className="size-6 rounded-full bg-[#333334] text-center text-[10px]/6 font-bold" > 2 </span>
                                      </li>

                                      <li className="flex items-center gap-2 ">
                                          <span className="size-6 rounded-full bg-white text-center text-[10px]/6 font-bold text-black"> 3 </span>
                                      </li>
                                  </ol>
                              </div>
                          </div>
                          <div className="mb-0" >
                              <ol className="relative z-10 pl-0 flex justify-between text-base font-medium text-black">
                                  <li className="flex items-center gap-2 -ml-8 max-sm:-ml-3">
                                      <span className="hidden sm:block"> Complete Profile </span>
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
      <section class="overflow-hidden">
        <div class="py-3 sm:px-4 lg:relative lg:px-0 lg:py-5">
            <div class="xl:mx-64 items-center px-4 xl:px-12">
                <div class="relative">
                  <div class="flex mt-3 flex-wrap items-center">
                      <div class="relative max-sm:text-center flex-grow">
                          <p class=" text-2xl font-light text-black">Test your Knowledge</p>
                      </div>
                      <div className="ml-auto max-sm:pt-4">
                        <button class="flex items-center text-[#333334] focus:outline-none ml-auto">
                          View All
                          <svg class="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="z-40">
                        {Object.keys(Assessmentdata).map((category,index)=>{
                          return(
                            <div key={index} >
                            <AssessmentCard index={index} category={category} icon={true} click={selectAssessment} />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

export default Assessment;
