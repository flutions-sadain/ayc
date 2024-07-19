import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Input, Spinner } from "@nextui-org/react";
import { setResumeData } from "../../store/slices/resumeSlice.js";
import makeRequest from '../../api/useApi.js';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';

const AddingCandidates = () => {
    const email = localStorage.getItem('email');
    const [files, setFiles] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFileUploadSubmit = async (event) => {
        event.preventDefault();

        if (files.length > 0) {
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            });
            formData.append('email', email);

            try {
                setIsLoading(true);
                const response = await makeRequest('post', 'uploadFile', formData);
                navigate("/enterprise/resumeFiltering")
                dispatch(setResumeData(response));
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
        const droppedFiles = Array.from(e.dataTransfer.files).slice(0, 20);
        setFiles(prevFiles => [...prevFiles, ...droppedFiles].slice(0, 20));
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files).slice(0, 20);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles].slice(0, 20));
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, fileIndex) => fileIndex !== index));
    };

    return (
        <div>
            <Header />
            <div className="section-hero home bg-fixed -mt-16 pt-16 z-0">
                <div className="relative isolate h-auto">
                    <div className="mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white my-10 rounded-3xl shadow-medium">
                        <div className="relative min-w-full place-items-center py-24 sm:py-20 lg:py-10 px-5 md:px-10">
                            <div className="relative">
                                <div className="relative flex items-center md:items-start md:space-x-6">
                                    <div className="min-w-0 flex-1">
                                        <div className="mx-auto max-w-full px-6 lg:px-2">
                                            <div className="mx-auto max-w-2xl lg:mx-0">
                                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">Upload Resume</h2>
                                                <p className="mt-2 text-md leading-8 text-gray-600">
                                                    Easily upload multiple resumes to streamline your candidate review process. Our system allows you to upload up to 20 resumes at a time, making it efficient and hassle-free.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 space-y-4 border-t border-gray-200 pt-5 max-sm:mt-8 max-sm:pt-8"></div>
                            <div className="relative py-4 mb-6 mt-0">
                                <figure className="w-full">
                                    <section
                                        className="text-md rounded-2xl bg-gray-100 p-8 border-l-0 leading-8 tracking-tight text-gray-800">
                                        <p>
                                            Ensure all resumes are in PDF format, with each file not exceeding 5MB. You can upload up to 20 resumes at a time. Drag and drop your files or click to select them from your device.
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
                                            {files.length > 0 ? (
                                                <>
                                                    <div className="text-gray-600 flex flex-wrap">
                                                        <h6 className="text-sm font-medium"><span className="text-primary-500 hover:text-primary-700">Click to upload </span> or drag and drop</h6>
                                                    </div>
                                                    <p className="text-md font-bold text-gray-500">{files.length} file(s) selected</p>

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
                                        <input id="resume" type="file" className="sr-only" onChange={handleFileChange} multiple />
                                    </label>
                                    <ul className="text-sm text-gray-500">
                                        {files.map((file, index) => (
                                            <li key={index} className="flex items-center justify-between px-5 py-1 rounded-full hover:bg-gray-200 cursor-pointer" onClick={() => removeFile(index)}>
                                                {file.name}
                                                <button type="button" className="text-red-500">
                                                    &times;
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex gap-2 sm:gap-4 mt-10 items-center">
                                    {files.length > 0 ? (
                                        <button type="submit" className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                            {isLoading ? (
                                                <>
                                                    <Spinner className="pr-2" color="current" size="sm" /> Uploading...
                                                </>
                                            ) : "Upload"}
                                        </button>
                                    ) : (
                                        <button type="button" disabled={!files.length} className={`flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${!files.length ? "opacity-100 bg-gray-400 text-gray-600" : ""}`} style={{ cursor: "not-allowed" }} >
                                            Continue
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddingCandidates;
