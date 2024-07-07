import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Input, Spinner } from "@nextui-org/react";
import { setResumeData } from "../../store/slices/resumeSlice.js";
import { BackArrowIcon } from "../../components/icons/BackArrowIcon.jsx";
import { FrontArrowIcon } from "../../components/icons/FrontArrowIcon.jsx";
import makeRequest from '../../api/useApi.js';

const ResumeUploadForm = ({ setPageNo }) => {
  // const email = useSelector((state) => state.user.email);
  const email = localStorage.getItem('email');
  const [file, setFile] = useState(null);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [dragging, setDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // const handleFileUploadSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append('files', file);
  //       formData.append('email', email);
  //       const response = await makeRequest('post', 'uploadFile', formData);
  //       dispatch(setResumeData(response));
  //     } else if (linkedInUrl) {
  //       const formData = new FormData();
  //       formData.append('key', linkedInUrl);
  //       formData.append('email', email);
  //       const response = await makeRequest('post', 'linkedIn', formData);
  //       dispatch(setResumeData(response));
  //     }
  //     setPageNo((prevPageNo) => prevPageNo + 5);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleFileUploadSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('email', email);

      try {
        setIsLoading(true);
        const response = await makeRequest('post', 'uploadFile', formData);
        setPageNo((prevPageNo) => prevPageNo + 5);
        dispatch(setResumeData(response));
        // console.log('Response:', response);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (linkedInUrl) {
      const formData = new FormData();
      formData.append('link', linkedInUrl);
      formData.append('email', email);

      try {
        setIsLoading(true);
        const response = await makeRequest('post', 'linkedin', formData);
        setPageNo((prevPageNo) => prevPageNo + 5);
        dispatch(setResumeData(response));
        // console.log('Response:', response);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
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

  const handleLinkedInChange = (event) => {
    setLinkedInUrl(event.target.value);
  };

  return (
    <div>
      <div className="mt-10 space-y-4 border-t border-gray-200 pt-5 max-sm:mt-8 max-sm:pt-8"></div>
      <div className="relative py-4 mb-6 mt-0">
        <figure className="w-full">
          <section
            className="text-md rounded-2xl bg-gray-100 p-8 border-l-0 leading-8 tracking-tight text-gray-800">
            <p>
              You can upload your resume or LinkedIn URL to our AYC portal to build your Academic and Professional Profile with us for Tailored Opportunities, Streamlined Process and professional visibility.
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
        <h2 className="text-md py-5 text-center font-semibold">OR</h2>
        <Input
          type="text"
          label="LinkedIn URL"
          labelPlacement="outside"
          aria-label="LinkedIn URL"
          placeholder="https://www.linkedin.com/in/your-profile"
          onChange={handleLinkedInChange}
        />
        <div className="flex gap-2 sm:gap-4 mt-10 items-center">
          <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo - 1); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            <BackArrowIcon />
          </button>
          {file || linkedInUrl ?
            (<button type="submit" className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              {isLoading ? (
                <>
                  <Spinner className="pr-2" color="current" size="sm" /> Uploading...
                </>
              ) : `${file ? "Upload" : "Fetch"} and Continue`}
            </button>
            ) : (
              <button type="button" disabled={!file || !linkedInUrl} className={`flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${!file || !linkedInUrl ? "opacity-100 bg-gray-400 text-gray-600" : ""}`} style={{cursor: "not-allowed"}} >
                Continue
              </button>
            )}
          {/* <button type="submit" className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          </button> */}
          {/* <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo + 1); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            <FrontArrowIcon />
          </button> */}
        </div>
      </form>
      {/* </div>
      </div> */}
    </div>
  )
}

export default ResumeUploadForm;