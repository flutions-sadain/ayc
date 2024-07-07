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
                // console.log('LinkedIn API Response:', response.data);
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
                // console.log('Upload File API Response:', response.data);
                navigate("/newAssessment");
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.error('Neither LinkedIn URL nor file is provided.');
        }
    };

    return (
        <>
            <div className="flex h-screen mt-10 mb-10">
                <div className="w-2/5 bg-white flex flex-col justify-center items-center">
                    <h1 className="text-6xl font-bold">Jumbo Title</h1>
                </div>
                <div className="w-3/5 bg-gray-200 flex flex-col justify-center items-center">
                    <form className="w-3/4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username" type="text" placeholder="Username"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="password" placeholder="******************"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Resumes;
