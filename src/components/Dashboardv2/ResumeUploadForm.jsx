import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Spinner } from "@nextui-org/react";
import { setResumeData } from "../../store/slices/resumeSlice.js";
import { BackArrowIcon } from "../icons/BackArrowIcon.jsx";
import { FrontArrowIcon } from "../icons/FrontArrowIcon.jsx";
import makeRequest from '../../api/useApi.js';

const ResumeUploadForm = ({ setPageNo }) => {
  // const email = useSelector((state) => state.user.email);
  const email = localStorage.getItem('email');
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileUploadSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('files', file);
    formData.append('email', email);

    try {
      setIsLoading(true);
      const response = await makeRequest('post', 'uploadFile', formData);
      setPageNo((prevPageNo) => prevPageNo + 1)
      dispatch(setResumeData(response));
      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="mx-auto min-w-full lg:mr-0">
      <div className="mx-auto min-w-full lg:mr-0">
        <div className="relative min-w-full place-items-center p-5 md:p-20 lg:p-10 xl:py-10 xl:px-40">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Resume</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">Upload your Resume or a
            curriculum Vitae</p>
          <div className="flex gap-2 mt-4">
            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
          </div>
          <small>3 remaining to complete</small>
          <div
            className="mt-10 space-y-4 border-t border-gray-200 pt-5 max-sm:mt-16 max-sm:pt-16">
          </div>

          <div className="relative py-4 mb-6 mt-0">
            <figure className="w-full">
              <section
                className="text-md rounded-2xl bg-gray-100 p-10 border-l-0 leading-8 tracking-tight text-gray-800">
                <p>
                  You can upload your resume to our AYC portal to build your
                  Academic and Professional Profile with us for Tailored
                  Opportunities, Streamlined Process and professional visibility.
                </p>
              </section>
            </figure>
          </div>

          <form onSubmit={handleFileUploadSubmit}>

            <div className="mx-auto max-w-full">
              <label
                className={`flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-1.5 border-dashed ${dragging ? 'border-slate-800' : 'border-gray-400'} p-6 transition-all`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-1 text-center">
                  <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                  </div>
                  {file ? (
                    <>
                      <div className="text-gray-600 flex flex-wrap">
                        <h6 className="text-sm font-medium"><span className="text-primary-500 hover:text-primary-700">Click to upload </span> or drag and drop</h6>
                      </div>
                      <p className="text-md font-bold text-gray-500">{file?.name}</p>
                    </>
                  ) : (
                    <>
                      <div className="text-gray-600 flex flex-wrap">
                        <h6 className="text-sm font-medium"><span className="text-primary-500 hover:text-primary-700">Click to upload </span> or drag and drop</h6>
                      </div>
                      <p className="text-sm text-gray-500">Upload valid .pdf or .docx</p>
                    </>
                  )}
                </div>
                <input id="resume" type="file" className="sr-only" onChange={handleFileChange} />
              </label>
            </div>
            <div className="flex gap-2 sm:gap-4 mt-10 items-center">
              <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo - 1); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                <BackArrowIcon />
              </button>
              <button type="submit" className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                {isLoading ? (
                  <>
                    <Spinner className="pr-2" color="current" size="sm" /> Uploading...
                  </>
                ) : "Save and Continue"} </button>
              <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo + 1); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                <FrontArrowIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResumeUploadForm;