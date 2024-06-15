import React from 'react';
import { FaPlus, FaRegFileLines, FaRegEye, FaArrowLeft } from "react-icons/fa6";
import { MdOutlineCalendarMonth } from "react-icons/md";
// import Behavioural_Questions from "../assets/images/Behavioural_Questions.svg";
function AssessmentCard({ category, index, icon, click, hide, img, showBackButton }) {
  const selectAssessment = (key) => {
    //console.log(Assessmentdata[key])
  }
  const handleBackClick = () => {
    hide(false);
  };

  return (
    <div className="lg:flex mb-6  bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 p-2 z-10">
      {showBackButton && (
        <button
          className="top-3 left-3 bg-gray-100 hover:bg-gray-300 p-2 cursor-pointer focus:outline-none"
          onClick={handleBackClick}
        >
          <FaArrowLeft />
        </button>
      )}
      <img src={img} alt="img" style={{objectFit: 'contain'}} className="w-[200px] h-[150px]" />
      <div className="md:flex items-center">
        <div className=":md:py-0 px-3 max-sm:py-3 top-0">
          {/* <h5 className="text-2xl max-sm:text-xl">{category.replace('_', ' ')}</h5> */}
          <h5 className="text-2xl max-sm:text-xl pb-2">{category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h5>
          <p className="text-base text-gray-600">
            Behavioral questions are a common part of job interviews and are designed to assess how a candidate has behaved in specific situations in the past
          </p>
          <div className='flex flex-wrap max-sm:block items-center justify-start mt-2 gap-3'>
            <div className="flex items-center text-lg text-gray-500 gap-1">
              <FaRegFileLines />
              <span>Quiz</span>
            </div>
            <div className="flex items-center text-lg text-gray-500 gap-1">
              <MdOutlineCalendarMonth />
              <span>Updated On 7 March</span>
            </div>
            <div className="flex items-center text-lg text-gray-500 gap-1">
              <FaRegEye />
              <span>Public</span>
            </div>
            <div className="flex items-center justify-between text-lg text-gray-500 gap-1">
              <span>Max Score : 100</span>
            </div>
          </div>
        </div>
        {icon && (
          <div className="bg-[#dbfe01] p-1 h-9 items-center rounded-md cursor-pointer flex justify-center">
            <div className="text-[#333334] p-1" onClick={() => click(category)}>
              <FaPlus />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssessmentCard;