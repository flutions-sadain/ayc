import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Checkbox, Chip, DatePicker, Input, Select, SelectItem, Spinner, Tab, Tabs, Textarea } from '@nextui-org/react';
import axios from 'axios';
import makeRequest from '../../api/useApi';

const ResumeUploadForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState(null);

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
        <div>
            <h1 className="text-lg font-semibold pt-2">your_resume.pdf</h1>
            <p className="flex items-center text-md font-medium pt-1 pb-2 space-x-1">
                <a href="#" className="text-blue-700 hover:underline">View your resume</a>
                <span> or upload a new one below</span>
            </p>
            <form>
                <div className="mx-auto max-w-full py-2">
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
                <div className="flex gap-2 sm:gap-4 mt-2 justify-end items-center">
                    <Button color="secondary" variant="light">
                        Cancel
                    </Button>
                    <Button color="primary" variant="solid" type="button">
                        {isLoading ? (
                            <>
                                <Spinner className="pr-2" color="current" size="sm" /> Submitting...
                            </>
                        ) : "Save"} </Button>
                </div>
            </form>
        </div>
    )
}

export default ResumeUploadForm