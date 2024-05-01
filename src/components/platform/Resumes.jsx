import React, { useRef, useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import "./resumeupload.css";
import { useNavigate } from "react-router-dom";
import fileImg from "../../assets/images/file.png";
import axios from 'axios';


const Resumes = ({ onSkip, onSubmit }) => {
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState(window.localStorage.getItem('email'));
    const linkedin = useRef();
    const fileRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (linkedin.current.value.trim() !== "") {
            const linkedinURL = linkedin.current.value.trim();
            try {
                const formData = new FormData();
                formData.append("key",linkedinURL);
                const response = await axios.post('http://localhost:8000/linkedin', formData,{ 
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('LinkedIn API Response:', response.data);
                navigate("/newAssessment");
            } catch (error) {
                console.error('Error calling LinkedIn API:', error);
            }
        } else if (file !== null) {
            const formData = new FormData();
            formData.append("files", file);
            formData.append("email", email);

            try {
                const response = await axios.post('http://localhost:8000/uploadFile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Upload File API Response:', response.data);
                navigate("/newAssessment");
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.error('Neither LinkedIn URL nor file is provided.');
        }
    };

    // const navigate = useNavigate();

    // const handleSubmit = () => {
    //     navigate("/newAssessment");
    // }

    const handleFileChange = (e) => {
        // Set the file state to the selected file
        const selectedFile = e.target.files[0];
        console.log("Selected file:", selectedFile);
        setFile(selectedFile);
    };

    return (
        <div className="resume_box">
            <div className="resume_box_content">
                <div class="flex flex-wrap-reverse items-center pb-4">
                    <div className="text-center flex-grow lg:pl-10 md:pl-8">
                        <h1 class="text-xl font-bold">Upload Your Resume</h1>
                    </div>
                    <div className="ml-auto">
                        <button class="flex items-center text-secondary focus:outline-none ml-auto" onClick={onSkip}>
                            Skip
                            <svg class="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>
                <div className="fileupload">
                    <form>
                        <input
                            type="file"
                            hidden
                            ref={fileRef}
                            onChange={handleFileChange}
                        />
                        <div
                            className="fileupload_content border-dashed border-2"
                            onClick={() => fileRef.current.click()}
                        >
                            <div className="flex justify-center items-center">
                                <img alt="file_Img" src={fileImg} width={50} height={50} />
                            </div>
                            <div className="fileupload_text">
                            {file ? ( // Display file name if file is selected
                                    <h3 className="text-wrap max-sm:text-base">{file.name}</h3>
                                ) : (
                                    <>
                                        <h3>Drag and drop files here</h3>
                                        <div>Or</div>
                                        <p className="browse">Browse Files</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
                <Divider className="divider">Or</Divider>
                <div className="linkedin">
                    <form>
                        <label className="label">Import your Linkedin URL</label>
                        <br />
                        <div className="relative">

                            <input
                                ref={linkedin}
                                className="linkedin_input"
                                placeholder="LinkedIn Link"
                            />
                            <button class="absolute right-0 top-0 mt-[13px] mr-2 px-3 py-2 rounded-md text-secondary focus:outline-none">
                                Paste
                            </button>
                        </div>
                    </form>
                </div>
                <div className="buttons-container mt-5 mb-4">
                    <button class="flex items-center text-gray-600 focus:outline-none">
                        <span className="flex items-center border-2 border-gray-600 rounded-full px-2 mr-2">
                            ?
                        </span>
                        Help Center
                    </button>
                    <div className="buttons sm:justify-center">
                        <button className="cancel text-secondary">Cancel</button>
                        <button onClick={handleSubmit} className="continue" >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resumes;
