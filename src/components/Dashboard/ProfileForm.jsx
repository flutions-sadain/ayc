import React, { useState } from 'react';
import profileImg1 from '../../assets/images/profile-form-1.png';
import profileImg2 from '../../assets/images/profile-form-2.png';
import profileImg3 from '../../assets/images/profile-form-3.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const ProfileForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const userQuestions = [
        'What is your full name?',
        'Can you provide details about your academic background, including your degree and specialization?',
        'Could you list some of the key skills you possess related to your field of study?',
        'Are there specific software tools, languages, or technologies you are proficient in?',
        'Can you share details about any research projects or significant coursework you\'ve undertaken?',
        'Have you completed any internships or gained practical experience in your field of study?',
        'Are there specific industries or roles you are targeting based on your skills and interests?',
    ];

    const placeholders = [
        "Your full name",
        "E.g., Bachelor's in Computer Science with a specialization in Artificial Intelligence",
        "E.g., Data analysis, Machine learning, Python",
        "E.g., Python, TensorFlow, SQL",
        "E.g., Developed a sentiment analysis model using Python and NLTK",
        "E.g., Internship at XYZ company as a data analyst",
        "E.g., Interested in roles related to data science and machine learning in the finance industry",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = Object.keys(formData).map((key, index) => ({
            Question: userQuestions[index],
            Answer: formData[key],
        }));
        try {
            const formData = new FormData();
            formData.append("questions", JSON.stringify(postData));
            await axios.post("http://localhost:8000/summaryGeneration", formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/newAssessment');
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    return (
        <div>
            {/* <Header /> */}
            <section className="overflow-hidden bg-[#dbfe01]">
                <div className="py-16 sm:px-6 lg:relative lg:px-0 lg:py-5">
                    <div className="xl:mx-64 items-center px-4 xl:px-12">
                        <div className="relative z-10">
                            <div className="relative">
                                <p className="inline text-black font-light text-4xl tracking-tight">Hey! <span className="font-medium">Khizer</span></p>
                                <p className="mt-3 text-2xl font-light text-black">Welcome to AYC, your first step in creating impact</p>
                            </div>
                            <div className="lg:mx-32 mt-5">
                                <div className="mb-0" >
                                    <ol className="relative z-10 pl-0 flex justify-between text-sm font-medium text-black">
                                        <li style={{ width: '65px' }} className="flex items-center gap-2 -ml-8 max-sm:-ml-3">
                                            <img className='w-full max-sm:w-14 md:ml-6' src={profileImg1} alt="profileImg1" />
                                        </li>
                                        <li style={{ width: '65px' }} className="flex items-center gap-2 ">
                                            <img className='w-full max-sm:w-14' src={profileImg2} alt="profileImg2" />
                                        </li>
                                        <li style={{ width: '65px' }} className="flex items-center gap-2 -mr-8 max-sm:-mr-3">
                                            <img className='w-full max-sm:w-14 md:-ml-3 max-sm:ml-3' src={profileImg3} alt="profileImg3" />
                                        </li>
                                    </ol>
                                </div>
                                <div className="mt-2 mb-0">
                                    <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-white" >
                                        <ol className="relative z-10 pl-0 flex justify-between text-sm font-medium text-white">
                                            <li className="flex items-center gap-2 ">
                                                <span className="size-6 rounded-full bg-[#333334] text-center text-[10px]/6 font-bold"> 1 </span>
                                            </li>
                                            <li className="flex items-center gap-2 ">
                                                <span className="size-6 rounded-full bg-white text-center text-[10px]/6 font-bold text-black" > 2 </span>
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
            <section className="overflow-hidden">
                <div className="py-16 sm:px-4 lg:relative lg:px-0 lg:py-5">
                    <div className="xl:mx-64 items-center px-4 xl:px-12">
                        <div className="relative z-10">
                            <div className="relative">
                                <p className="mt-3 text-2xl font-light text-black">Tell us more, so that we can find the <span className="font-medium">right curriculum & Mentor for you</span></p>
                            </div>
                            <div className="lg:mx-20 mt-5">
                                <form onSubmit={handleSubmit}>
                                    {userQuestions.map((question, index) => (
                                        <div key={index} className="p-2 w-full">
                                            <div className="relative">
                                                <label htmlFor={`question_${index}`} className="leading-7 text-lg text-black">{question}</label>
                                                <input
                                                    type="text"
                                                    id={`question_${index}`}
                                                    name={`question_${index}`}
                                                    placeholder={placeholders[index]}
                                                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-gray-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="p-2 w-full mt-2 mb-4">
                                        <button type="submit" className="bg-[#dbfe01] text-black border-none rounded px-4 py-2 gap-3">
                                            Continue
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProfileForm;