import React, { useState } from 'react';
import { TbSettings } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import course1 from "../../assets/images/Course - 1.png";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

const Dashboard = () => {

    const [activeTab, setActiveTab] = useState(1);

    return (
        <div>
            <section className="max-sm:mx-4 lg:mx-10 xl:mx-32">
                <div className="py-4 sm:px-6 lg:px-0 lg:py-5">
                    <h1 className="text-2xl font-bold">Course Overview</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-2 ">
                        <div className="w-full px-3 mt-3 bg-[#D8F2EE] rounded-lg border-1 border-[#43B3A0]">
                            <div className="flex justify-start py-4 items-center">
                                <div className="text-3xl text-[#43B3A0] p-2 mr-5 rounded-lg border">
                                    <TbSettings />
                                </div>
                                <div className="justify-start">
                                    <h1 className="text-2xl font-bold">10</h1>
                                    <p className="text-base font-light">Total Course</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 font-medium text-[#43B3A0] border-t-[1px] border-[#43B3A0]">
                                <p className="text-xl">See Details</p>
                                <FaArrowRightLong className="text-xl w-6 cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full px-3 mt-3 bg-[#F6EEFF] rounded-lg border-1 border-[#9C4DF4]">
                            <div className="flex justify-start py-4 items-center">
                                <div className="text-3xl text-[#9C4DF4] p-2 mr-5 rounded-lg border">
                                    <TbSettings />
                                </div>
                                <div className="justify-start">
                                    <h1 className="text-2xl font-bold">3</h1>
                                    <p className="text-base font-light">Completed</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 font-medium text-[#9C4DF4] border-t-[1px] border-[#9C4DF4]">
                                <p className="text-xl">See Details</p>
                                <FaArrowRightLong className="text-xl w-6 cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full px-3 mt-3 bg-[#FFF2ED] rounded-lg border-1 border-[#EC652B]">
                            <div className="flex justify-start py-4 items-center">
                                <div className="text-3xl text-[#EC652B] p-2 mr-5 rounded-lg border">
                                    <TbSettings />
                                </div>
                                <div className="justify-start">
                                    <h1 className="text-2xl font-bold">5</h1>
                                    <p className="text-base font-light">Pending</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 font-medium text-[#EC652B] border-t-[1px] border-[#EC652B]">
                                <p className="text-xl">See Details</p>
                                <FaArrowRightLong className="text-xl w-6 cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full px-3 mt-3 bg-[#E8E9FF] rounded-lg border-1 border-[#4E6DDA]">
                            <div className="flex justify-start py-4 items-center">
                                <div className="text-3xl text-[#4E6DDA] p-2 mr-5 rounded-lg border">
                                    <TbSettings />
                                </div>
                                <div className="justify-start">
                                    <h1 className="text-2xl font-bold">6</h1>
                                    <p className="text-base font-light">Total Certification</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 font-medium text-[#4E6DDA] border-t-[1px] border-[#4E6DDA]">
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
                                        <img src={course1} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                                        <div className="md:py-0 max-sm:py-3 pb-4 top-0 items-center">
                                            <a className="text-xl font-bold text-black" href="/courseDetailsContent">Beginning C++ Programming - From Beginner to Beyond</a>
                                            <div className='flex pt-2 justify-between items-center'>
                                                <span class="text-base text-gray-800">25%</span>
                                                <p class="text-sm font-light text-gray-800"><span className="font-bold">2</span>/20 Lesson</p>
                                            </div>
                                            <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <div class="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                                        <img src={course1} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                                        <div className="md:py-0 max-sm:py-3 pb-4 top-0 items-center">
                                            <a className="text-xl font-bold text-black" href="/courseDetailsContent">Beginning C++ Programming - From Beginner to Beyond</a>
                                            <div className='flex pt-2 justify-between items-center'>
                                                <span class="text-base text-gray-800">25%</span>
                                                <p class="text-sm font-light text-gray-800"><span className="font-bold">2</span>/20 Lesson</p>
                                            </div>
                                            <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <div class="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                                        <img src={course1} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                                        <div className="md:py-0 max-sm:py-3 pb-4 top-0 items-center">
                                            <a className="text-xl font-bold text-black" href="/courseDetailsContent">Beginning C++ Programming - From Beginner to Beyond</a>
                                            <div className='flex pt-2 justify-between items-center'>
                                                <span class="text-base text-gray-800">25%</span>
                                                <p class="text-sm font-light text-gray-800"><span className="font-bold">2</span>/20 Lesson</p>
                                            </div>
                                            <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <div class="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                                        <img src={course1} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                                        <div className="md:py-0 max-sm:py-3 pb-4 top-0 items-center">
                                            <a className="text-xl font-bold text-black" href="/courseDetailsContent">Beginning C++ Programming - From Beginner to Beyond</a>
                                            <div className='flex pt-2 justify-between items-center'>
                                                <span class="text-base text-gray-800">25%</span>
                                                <p class="text-sm font-light text-gray-800"><span className="font-bold">2</span>/20 Lesson</p>
                                            </div>
                                            <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <div class="flex flex-col w-[25%] justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tabs-with-underline-2" className={` ${activeTab === 2 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-underline-item-2">
                                <p className="text-gray-500 dark:text-gray-400">
                                    This is the <em className="font-semibold text-gray-800 dark:text-gray-200">second</em> item's tab body.
                                </p>
                            </div>
                            <div id="tabs-with-underline-3" className={` ${activeTab === 3 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-underline-item-3">
                                <p className="text-gray-500 dark:text-gray-400">
                                    This is the <em className="font-semibold text-gray-800 dark:text-gray-200">third</em> item's tab body.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-2 sm:px-6 lg:px-0 lg:py-3">
                    <div class="flex flex-wrap items-center">
                        <div class="max-sm:text-center flex-grow">
                            <p class=" text-2xl font-light text-black">Recommended Course</p>
                        </div>
                        <div className="ml-auto max-sm:pt-4 max-sm:pr-5">
                            <button class="flex items-center text-[#33334] focus:outline-none ml-auto">
                                View All
                                <svg class="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 max-sm:mx-2 my-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
                        <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                            <img src={course1} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                            <div className="md:py-0 max-sm:py-3 top-0 items-center">
                                <a className="text-xl font-bold text-black" href="/courseDetailsContent">Beginning C++ Programming - From Beginner to Beyond</a>
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
                        <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                            <img src={course1} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                            <div className="md:py-0 max-sm:py-3 top-0 items-center">
                                <a className="text-xl font-bold text-black" href="/courseDetailsContent">Beginning C++ Programming - From Beginner to Beyond</a>
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
                        <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                            <img src={course1} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                            <div className="md:py-0 max-sm:py-3 top-0 items-center">
                                <a className="text-xl font-bold text-black" href="/courseDetailsContent">Beginning C++ Programming - From Beginner to Beyond</a>
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
                        <div className="mb-6 p-2 w-full items-center shadow-md rounded-lg border border-gray-300 z-10">
                            <img src={course1} alt="img" className="w-2/5 md:w-full max-sm:w-full" />
                            <div className="md:py-0 max-sm:py-3 top-0 items-center">
                                <a className="text-xl font-bold text-black" href="/courseDetailsContent">Beginning C++ Programming - From Beginner to Beyond</a>
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
            </section>
        </div>
    )
}

export default Dashboard;