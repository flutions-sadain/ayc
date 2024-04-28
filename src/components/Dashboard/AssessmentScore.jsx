import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io';
import Header from '../Header';
import { Link } from 'react-router-dom';
import DataScience from "../../assets/images/DataScience.png";
import FullStackDevelopment from "../../assets/images/FullStackDevelopment.png";
import FrontendDevelopment from "../../assets/images/FrontendDevelopment.png";
import MachineLearning from "../../assets/images/MachineLearning.png";

const AssessmentScore = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/courseRecommended')
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
            <section>
                <Header />
                <div className="py-5 sm:px-6 lg:px-0 lg:py-5">
                    <div className="relative mx-5 mt-10 mb-5 sm:mx-10 lg:mx-40 z-10">
                        <h1 className="text-black text-center text-4xl mb-10">Assessment Score</h1>
                        <div className="lg:flex bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 p-2 z-10">
                            <div class="p-2 text-center md:mx-auto md:w-[50%] lg:w-[30%]">
                                <p className="text-2xl max-sm:text-xl">Element of Evaluation</p>
                                <div className='relative'>
                                    <svg class="size-full mx-auto mt-3 w-3/4 h-3/4" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-[#333334]" stroke-width="3"></circle>
                                        <g class="origin-center -rotate-90 transform">
                                            <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 rounded-md" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="75"></circle>
                                        </g>
                                    </svg>
                                    <div class="absolute inset-0 flex justify-center items-center">
                                        <span class="text-center text-2xl font-bold text-gray-800">72%</span>
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-2 items-end my-auto p-2 justify-between'>
                                <div className="mr-1 mt-3 w-full p-2 bg-white items-center shadow-md rounded-lg border border-gray-300 z-10">
                                    <div class="mb-2 flex justify-between items-center">
                                        <p class="text-base font-semibold text-black">Programming Languages</p>
                                    </div>
                                    <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        <div class="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-[#333334] text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                    </div>
                                    <div className='flex pt-2 justify-between items-center'>
                                        <span class="text-base text-gray-800">25%</span>
                                        <p class="text-sm font-semibold  text-gray-800">Good</p>
                                    </div>
                                </div>
                                <div className="mr-1 mt-3 w-full p-2 bg-white items-center shadow-md rounded-lg border border-gray-300 z-10">
                                    <div class="mb-2 flex justify-between items-center">
                                        <p class="text-base font-semibold text-black">Database Management</p>
                                    </div>
                                    <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        <div class="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-[#333334] text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                    </div>
                                    <div className='flex pt-2 justify-between items-center'>
                                        <span class="text-base text-gray-800">25%</span>
                                        <p class="text-sm font-semibold  text-gray-800">Good</p>
                                    </div>
                                </div>
                                <div className="mr-1 mt-3 w-full p-2 bg-white items-center shadow-md rounded-lg border border-gray-300 z-10">
                                    <div class="mb-2 flex justify-between items-center">
                                        <p class="text-base font-semibold text-black">Problem-Solving Skills</p>
                                    </div>
                                    <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        <div class="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-[#333334] text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                    </div>
                                    <div className='flex pt-2 justify-between items-center'>
                                        <span class="text-base text-gray-800">25%</span>
                                        <p class="text-sm font-semibold  text-gray-800">Good</p>
                                    </div>
                                </div>
                                <div className="mr-1 mt-3 w-full p-2 bg-white items-center shadow-md rounded-lg border border-gray-300 z-10">
                                    <div class="mb-2 flex justify-between items-center">
                                        <p class="text-base font-semibold text-black">Soft Skills</p>
                                    </div>
                                    <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        <div class="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-[#333334] text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                    </div>
                                    <div className='flex pt-2 justify-between items-center'>
                                        <span class="text-base text-gray-800">25%</span>
                                        <p class="text-sm font-semibold  text-gray-800">Good</p>
                                    </div>
                                </div>
                                <div className="mr-1 mt-3 w-full p-2 bg-white items-center shadow-md rounded-lg border border-gray-300 z-10">
                                    <div class="mb-2 flex justify-between items-center">
                                        <p class="text-base font-semibold text-black">Debugging</p>
                                    </div>
                                    <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        <div class="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-[#333334] text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                    </div>
                                    <div className='flex pt-2 justify-between items-center'>
                                        <span class="text-base text-gray-800">25%</span>
                                        <p class="text-sm font-semibold  text-gray-800">Good</p>
                                    </div>
                                </div>
                                <div className="mr-1 mt-3 w-full p-2 bg-white items-center shadow-md rounded-lg border border-gray-300 z-10">
                                    <div class="mb-2 flex justify-between items-center">
                                        <p class="text-base font-semibold text-black">Progress title</p>
                                    </div>
                                    <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        <div class="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-[#333334] text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                    </div>
                                    <div className='flex pt-2 justify-between items-center'>
                                        <span class="text-base text-gray-800">25%</span>
                                        <p class="text-sm font-semibold  text-gray-800">Good</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="w-full h-80 bg-[#dbfe01] absolute top-[132px] md:top-[110px] lg:top-[94px]"></span>
            </section >
            <div className="xl:mx-40 sm:mx-10 mb-10">
                <div className="flex mt-3 flex-wrap items-center">
                    <div className="max-sm:text-center flex-grow">
                        <p className="text-2xl font-medium text-black">Recommended Course</p>
                    </div>
                    <div className="ml-auto max-sm:pt-4 max-sm:pr-5">
                        <button className="flex items-center text-[#333334] focus:outline-none ml-auto">
                            View All
                            <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mt-3 max-sm:mx-2 my-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
                    {courses.map((course, index) => (
                        <div key={index} className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                            <img src={images[index % images.length]} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                            <div className="md:py-0 max-sm:py-3 top-0 items-center">
                            {/* <a className="text-lg font-bold text-black" href="/courseDetailsContent">{course.name}</a> */}

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

        </div >
    )
}

export default AssessmentScore;