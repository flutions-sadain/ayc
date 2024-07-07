import React, { useState, useEffect, useRef } from 'react';
import { TbSettings } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import DataScience from "../../assets/images/DataScience.png";
import FullStackDevelopment from "../../assets/images/FullStackDevelopment.png";
import FrontendDevelopment from "../../assets/images/FrontendDevelopment.png";
import MachineLearning from "../../assets/images/MachineLearning.png";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { LuCircleEqual } from "react-icons/lu";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { PiClockCountdown, PiCertificate } from "react-icons/pi";
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from "./Header";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [courses, setCourses] = useState([]);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!isMounted.current) return;
        axios.post('http://localhost:8000/courseRecommended')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching course details:', error);
            });
    }, []);

    const limitWords = (str, count) => {
        const words = str.split(' ');
        if (words.length > count) {
            return words.slice(0, count).join(' ') + '...';
        }
        return str;
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<IoIosStar key={i} className="text-yellow-400 text-lg" />);
        }

        if (hasHalfStar) {
            stars.push(<IoIosStarHalf key={stars.length} className="text-yellow-400 text-lg" />);
        }

        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<IoIosStarOutline key={stars.length} className="text-yellow-400 text-lg" />);
        }

        return stars;
    };

    const images = [DataScience, FullStackDevelopment, FrontendDevelopment, MachineLearning];


    return (
        <div>
            <Header />
            <section className="max-sm:mx-4 lg:mx-10 xl:mx-32">
                <div className="py-4 sm:px-6 lg:px-0 lg:py-5">
                    <h1 className="text-2xl font-bold">Course Overview</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-2 ">
                        <div className="w-full px-3 mt-3 bg-[#fcffeb] rounded-lg shadow-lg">
                            <div className="flex justify-start py-4 items-center">
                                <div className="text-3xl text-[#333334] p-2 mr-5 rounded-lg border border-[#333334]">
                                    <LuCircleEqual />
                                </div>
                                <div className="justify-start">
                                    <h1 className="text-2xl font-bold">4</h1>
                                    <p className="text-base font-light">Total Course</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 font-medium text-[#333334] border-t-[1px] border-[#333334]">
                                <p className="text-xl">See Details</p>
                                <FaArrowRightLong className="text-xl w-6 cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full px-3 mt-3 bg-[#fcffeb] rounded-lg shadow-lg">
                            <div className="flex justify-start py-4 items-center">
                                <div className="text-3xl text-[#333334] p-2 mr-5 rounded-lg border border-[#333334]">
                                    <AiOutlineSafetyCertificate />
                                </div>
                                <div className="justify-start">
                                    <h1 className="text-2xl font-bold">1</h1>
                                    <p className="text-base font-light">Completed</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 font-medium text-[#333334] border-t-[1px] border-[#333334]">
                                <p className="text-xl">See Details</p>
                                <FaArrowRightLong className="text-xl w-6 cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full px-3 mt-3 bg-[#fcffeb] rounded-lg shadow-lg">
                            <div className="flex justify-start py-4 items-center">
                                <div className="text-3xl text-[#333334] p-2 mr-5 rounded-lg border border-[#333334]">
                                    <PiClockCountdown />
                                </div>
                                <div className="justify-start">
                                    <h1 className="text-2xl font-bold">2</h1>
                                    <p className="text-base font-light">Pending</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 font-medium text-[#333334] border-t-[1px] border-[#333334]">
                                <p className="text-xl">See Details</p>
                                <FaArrowRightLong className="text-xl w-6 cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full px-3 mt-3 bg-[#fcffeb] rounded-lg shadow-lg">
                            <div className="flex justify-start py-4 items-center">
                                <div className="text-3xl text-[#333334] p-2 mr-5 rounded-lg border border-[#333334]">
                                    <PiCertificate />
                                </div>
                                <div className="justify-start">
                                    <h1 className="text-2xl font-bold">1</h1>
                                    <p className="text-base font-light">Total Certification</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 font-medium text-[#333334] border-t-[1px] border-[#333334]">
                                <p className="text-xl">See Details</p>
                                <FaArrowRightLong className="text-xl w-6 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-2 sm:px-6 lg:px-0 lg:py-3">
                    <h1 className="text-2xl font-bold">Courses</h1>
                    <div>
                        <div className="border-b border-gray-200">
                            <div className="flex space-x-2" aria-label="Tabs" role="tablist">
                                <button type="button" className={`pb-2 pt-4 px-1 inline-flex items-center gap-x-2 text-sm whitespace-nowrap focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${activeTab === 1 ? 'font-semibold border-b-2 border-[#33334] text-[#33334]' : 'text-gray-500 hover:text-[#33334]'}`} onClick={() => setActiveTab(1)} role="tab" aria-selected={activeTab === 1} aria-controls="tabs-with-underline-1">
                                    Pending
                                </button>
                                <button type="button" className={`pb-2 pt-4 px-1 inline-flex items-center gap-x-2 text-sm whitespace-nowrap focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${activeTab === 2 ? 'font-semibold border-b-2 border-[#33334] text-[#33334]' : 'text-gray-500 hover:text-[#33334]'}`} onClick={() => setActiveTab(2)} role="tab" aria-selected={activeTab === 2} aria-controls="tabs-with-underline-2">
                                    Completed
                                </button>
                                <button type="button" className={`pb-2 pt-4 px-1 inline-flex items-center gap-x-2 text-sm whitespace-nowrap focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${activeTab === 3 ? 'font-semibold border-b-2 border-[#33334] text-[#33334]' : 'text-gray-500 hover:text-[#33334]'}`} onClick={() => setActiveTab(3)} role="tab" aria-selected={activeTab === 3} aria-controls="tabs-with-underline-3">
                                    Recently Viewed
                                </button>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div id="tabs-with-underline-1" className={` ${activeTab === 1 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-underline-item-1">
                                <div className="mt-3 max-sm:mx-2 my-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
                                    <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                                        <img src={FrontendDevelopment} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                                        <div className="md:py-0 max-sm:py-3 pb-4 top-0 items-center">
                                            <a className="text-xl font-bold text-black" href="/courseDetailsContent?courseName=Data Science Essentials for Beginners">Mastering Front-End Technologies</a>
                                            <div className='flex pt-2 justify-between items-center'>
                                                <span className="text-base text-gray-800">25%</span>
                                                <p className="text-sm font-light text-gray-800"><span className="font-bold">2</span>/20 Lesson</p>
                                            </div>
                                            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <div className="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-[#333334] text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                                        <img src={DataScience} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                                        <div className="md:py-0 max-sm:py-3 pb-4 top-0 items-center">
                                            <a className="text-xl font-bold text-black" href="/courseDetailsContent?courseName=Data Science Essentials for Beginners">Data Science Essentials for Beginners</a>
                                            <div className='flex pt-2 justify-between items-center'>
                                                <span className="text-base text-gray-800">25%</span>
                                                <p className="text-sm font-light text-gray-800"><span className="font-bold">2</span>/20 Lesson</p>
                                            </div>
                                            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <div className="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-[#333334] text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                                        <img src={MachineLearning} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                                        <div className="md:py-0 max-sm:py-3 pb-4 top-0 items-center">
                                            <a className="text-xl font-bold text-black" href="/courseDetailsContent?courseName=Data Science Essentials for Beginners">Machine Learning for Beginners</a>
                                            <div className='flex pt-2 justify-between items-center'>
                                                <span className="text-base text-gray-800">25%</span>
                                                <p className="text-sm font-light text-gray-800"><span className="font-bold">2</span>/20 Lesson</p>
                                            </div>
                                            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <div className="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-[#333334] text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tabs-with-underline-2" className={` ${activeTab === 2 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-underline-item-2">
                                <div className="mt-3 max-sm:mx-2 my-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
                                    <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                                        <img src={FullStackDevelopment} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                                        <div className="md:py-0 max-sm:py-3 pb-4 top-0 items-center">
                                            <a className="text-xl font-bold text-black" href="/courseDetailsContent?courseName=Data Science Essentials for Beginners">Full-Stack Web Development Bootcamp</a>
                                            <div className='flex pt-2 justify-between items-center'>
                                                <span className="text-base text-gray-800">100%</span>
                                                <p className="text-sm font-light text-gray-800"><span className="font-bold">20</span>/20 Lesson</p>
                                            </div>
                                            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                                <div className="flex flex-col w-[100%] justify-center rounded-full overflow-hidden bg-[#333334] text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tabs-with-underline-3" className={` ${activeTab === 3 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-underline-item-3">
                                <div className="mt-3 max-sm:mx-2 my-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
                                    <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                                        <img src={DataScience} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                                        <div className="md:py-0 max-sm:py-3 top-0 items-center">
                                            <a className="text-lg font-bold text-black" href="/courseDetailsContent?courseName=Data Science Essentials for Beginners">Data Science Essentials for Beginners</a>
                                            <p className="text-base text-gray-600">
                                                Behavioral questions are a common part of job interviews...
                                            </p>
                                            <div className="flex justify-between pt-2">
                                                <div className="flex items-center">
                                                    <h5 className="text-sm font-bold pr-1">3.5</h5>
                                                    <div className='flex'>
                                                        <IoIosStar className="text-yellow-400 text-lg " />
                                                        <IoIosStar className="text-yellow-400 text-lg " />
                                                        <IoIosStar className="text-yellow-400 text-lg " />
                                                        <IoIosStarHalf className="text-yellow-400 text-lg " />
                                                        <IoIosStarOutline className="text-yellow-400 text-lg " />
                                                    </div>
                                                    <p className="text-sm font-normal pr-1">(22 Reviews)</p>
                                                </div>
                                                <h5 className="text-lg font-bold">₹449</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6 p-2 w-full bg-white items-center shadow-md rounded-lg border border-gray-300 z-10">
                                        <img src={FullStackDevelopment} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                                        <div className="md:py-0 max-sm:py-3 top-0 items-center">
                                            <a className="text-lg font-bold text-black" href="/courseDetailsContent?courseName=Data Science Essentials for Beginners">Full-Stack Web Development Bootcamp</a>
                                            <p className="text-base text-gray-600">
                                                Behavioral questions are a common part of job interviews...
                                            </p>
                                            <div className="flex justify-between pt-2">
                                                <div className="flex items-center">
                                                    <h5 className="text-sm font-bold pr-1">3.5</h5>
                                                    <div className='flex'>
                                                        <IoIosStar className="text-yellow-400 text-lg " />
                                                        <IoIosStar className="text-yellow-400 text-lg " />
                                                        <IoIosStar className="text-yellow-400 text-lg " />
                                                        <IoIosStarHalf className="text-yellow-400 text-lg " />
                                                        <IoIosStarOutline className="text-yellow-400 text-lg " />
                                                    </div>
                                                    <p className="text-sm font-normal pr-1">(22 Reviews)</p>
                                                </div>
                                                <h5 className="text-lg font-bold">₹449</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Recommended Course */}
                <div className="py-2 sm:px-6 lg:px-0 lg:py-3">
                    <div className="flex flex-wrap items-center">
                        <div className="max-sm:text-center flex-grow">
                            <p className=" text-2xl font-medium text-black">Recommended Course</p>
                        </div>
                        <div className="ml-auto max-sm:pt-4 max-sm:pr-5">
                            <button className="flex items-center text-[#33334] focus:outline-none ml-auto">
                                View All
                                <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 max-sm:mx-2 my-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
                        {courses.map((course, index) => (
                            <div key={index} className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                                <img src={images[index % images.length]} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                                <div className="md:py-0 max-sm:py-3 top-0 items-center">
                                    {/* <a className="text-lg font-bold text-black" href="/courseDetailsContent?courseName=Data Science Essentials for Beginners">{course.name}</a> */}
                                    <Link to={`/courseDetailsContent?courseName=${course.name}`} className="cursor-pointer">
                                        <p className="text-lg font-bold text-black">{course.name}</p>
                                    </Link>
                                    <p className="text-base text-gray-600">
                                        {limitWords(course.description, 10)}
                                    </p>
                                    <div className="flex justify-between pt-2">
                                        <div className="flex items-center">
                                            <h5 className="text-sm font-bold pr-1">{course.rating}</h5>
                                            <div className='flex'>{renderStars(course.rating)}</div>
                                            <p className="text-sm font-normal pr-1">({course.reviews} Reviews)</p>
                                        </div>
                                        <h5 className="text-lg font-bold">{course.price}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard;