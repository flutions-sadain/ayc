import React from 'react'
import Header from './Header'
import { IoCloudUploadOutline } from 'react-icons/io5';
import { MdOutlineAssessment } from 'react-icons/md';
import { PiProjectorScreenChartLight } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header>
        <div className="relative mx-40 my-10 py-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 text-start sm:text-5xl mb-2">Welcome to Your AYC Dashboard</h1>
            <p className="text-lg font-base text-gray-500 text-start mb-10">Optimize Your Hiring Process with Our Advanced Tools</p>
          </div>
          <div className="flex flex-wrap justify-start items-start gap-8 m-2">
            <a href="/enterprise/resumeFiltering"  className="max-w-md px-4 py-5 text-center bg-white rounded-2xl shadow-small transition-all duration-300 hover:bg-primary hover:shadow-medium cursor-pointer">
              <div className="flex h-14 w-14 mb-6 items-center text-black mx-auto justify-center rounded-full bg-primary ring-8 ring-white">
                <IoCloudUploadOutline className="text-3xl text-black" />
              </div>
              <h5 className="mb-2 text-2xl font-semibold text-gray-900">Resume Filtering</h5>
              <p className="mb-3 font-normal text-gray-500">Streamline your candidate selection with our advanced resume filtering technology, designed to identify top talent efficiently.</p>
            </a>
            <div className="max-w-md px-4 py-5 text-center bg-white rounded-2xl shadow-small transition-all duration-300 hover:bg-primary hover:shadow-medium cursor-pointer">
              <div className="flex h-14 w-14 mb-6 items-center text-black mx-auto justify-center rounded-full bg-primary ring-8 ring-white">
                <MdOutlineAssessment className="text-3xl text-black" />
              </div>
              <h5 className="mb-2 text-2xl font-semibold text-gray-900">Resume Filtering and Assessment</h5>
              <p className="mb-3 font-normal text-gray-500">Enhance your recruitment process with our integrated resume filtering and candidate assessment tools, ensuring you select the best fit for your team.</p>
            </div>
            <div className="max-w-md px-4 py-5 text-center bg-white rounded-2xl shadow-small transition-all duration-300 hover:bg-primary hover:shadow-medium cursor-pointer">
              <div className="flex h-14 w-14 mb-6 items-center text-black mx-auto justify-center rounded-full bg-primary ring-8 ring-white">
                <PiProjectorScreenChartLight className="text-3xl tf text-black" />
              </div>
              <h5 className="mb-2 text-2xl font-semibold text-gray-900">Resume Filtering, Assessment and Interview Simulator</h5>
              <p className="mb-3 font-normal text-gray-500">Experience the complete hiring solution with our resume filtering, detailed assessments, and realistic interview simulations to make confident hiring decisions.</p>
            </div>
          </div>
        </div>
      </Header>
    </div>
  )
}

export default index