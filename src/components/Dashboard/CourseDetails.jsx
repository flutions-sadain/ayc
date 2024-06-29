import React, { useState, useEffect, useRef } from 'react';
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { FaRegFileLines, FaRegEye } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { MdOutlineCalendarMonth } from "react-icons/md";
import thumbnail from '../../assets/images/thumbnail.png';
import courseList from '../../assets/images/course-list.png';
import demoVideo from '../../assets/video/demo.mp4';
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import axios from 'axios';

const CourseDetails = () => {
    const [courseDetails, setCourseDetails] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!isMounted.current) return;
        const fetchCourseDetails = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const courseName = params.get('courseName');
                const response = await axios.post('http://localhost:8000/getCourseDetails', { courseName }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setCourseDetails(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, []);

    const submit = () => {
        navigate("/newDashboard");
    };

    const handlePlayClick = () => {
        setIsPlaying(true);
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

    return (
        <div>
            <Header />
            <section className="max-sm:mx-4 lg:mx-10 xl:mx-28">
                <div className="py-4 sm:px-6 lg:px-0 lg:py-5">
                    <h1 className="text-2xl font-bold">Course Details</h1>
                    <div className="p-4 mt-2 grid lg:grid-cols-3 xl:grid-cols-5 gap-3 bg-[#dcfe011f] rounded-lg">
                        <div className="lg:py-8 xl:col-span-2 items-center xl:mr-10">
                        {/* <h5 className="text-xl font-bold">Data Science Essentials for Beginners</h5>
                            <p className="text-base font-normal text-gray-600">
                            Data science is a rapidly growing field with diverse applications across industries. This course is designed for beginners who want to learn the essential concepts and tools of data science. 
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
                            </div> */}
                                    <h5 className="text-xl font-bold">{courseDetails.name}</h5>
                                    <p className="text-base font-normal text-gray-600">
                                        {courseDetails.description}
                                    </p>
                                    <div className="flex justify-between pt-2">
                                        <div className="flex items-center">
                                            <h5 className="text-sm font-bold pr-1">{courseDetails.rating}</h5>
                                            <div className='flex'>{renderStars(courseDetails.rating)}</div>
                                            <p className="text-sm font-normal pr-1">({courseDetails.reviews} Reviews)</p>
                                        </div>
                                    </div>
                            <div className='flex flex-wrap max-sm:block items-center justify-start mt-2 gap-3'>
                                <div className="flex items-center text-lg text-[gt-light] text-gray-500 gap-1">
                                    <FaRegFileLines />
                                    <span>Quiz</span>
                                </div>
                                <div className="flex items-center text-lg text-[gt-light] text-gray-500 gap-1">
                                    <MdOutlineCalendarMonth />
                                    <span>Updated On 7 March</span>
                                </div>
                                <div className="flex items-center text-lg text-[gt-light] text-gray-500 gap-1">
                                    <FaRegEye />
                                    <span>Public</span>
                                </div>
                                <div className="flex items-center justify-between text-lg text-[gt-light] text-gray-500 gap-1">
                                    <span>Max Score : 100</span>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-2 max-sm:order-first md:order-first lg:order-none">
                            <ol className="flex items-center whitespace-nowrap p-0 mb-4" aria-label="Breadcrumb">
                                <li className="inline-flex items-center">
                                    <a className="flex items-center text-sm text-gray-500 hover:text-[#333334] focus:outline-none focus:text-[#333334]" href="#">
                                        Home
                                    </a>
                                    <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </li>
                                <li className="inline-flex items-center">
                                    <a className="flex items-center text-sm text-gray-500 hover:text-[#333334] focus:outline-none focus:text-[#333334]" href="#">
                                        Course
                                        <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                    </a>
                                </li>
                                <li className="inline-flex items-center text-sm font-medium text-[#333334] truncate" aria-current="page">
                                    Course Details
                                </li>
                            </ol>
                            <div className="relative mt-2 xl:mr-14">
                                <video className={`w-full h-full object-cover rounded-lg shadow isPlaying ? '' : 'opacity-0' `} src={demoVideo} controls={isPlaying} autoPlay={isPlaying} muted={!isPlaying} />
                                {!isPlaying && (
                                    <div className="absolute lg::mt-4 inset-0 flex items-center justify-center z-10">
                                        <button type="button" onClick={handlePlayClick} className="z-10 absolute inset-0 flex items-center justify-center focus:outline-none" >
                                            <span className="rounded-full w-auto h-auto p-3 bg-[#333334]">
                                                <FaPlay className="text-white text-2xl" />
                                            </span>
                                        </button>
                                        <img src={thumbnail} alt="Video thumbnail" className="object-cover rounded-lg" />
                                    </div>
                                )}
                            </div>
                            <h1 className="text-base mt-4 xl:mt-5 font-medium">Maths - for Standard 3 Students | Episode 2</h1>
                        </div>
                        <div className="w-full overflow-hidden">
                            <h1 className="text-xl font-medium">Course Playlists</h1>
                            <div className="overflow-auto max-h-72">
                                <div className="mt-2 w-full flex items-center bg-white rounded-lg shadow-md">
                                    <div className="relative flex items-center justify-center">

                                        <img src={courseList} alt="Course List" className="p-2 w-20 rounded-lg" />
                                    </div>
                                    <div>
                                        <p className="text-base font-normal">About The course</p>
                                        <p className="text-sm font-light text-[#333334]">1:57</p>
                                    </div>
                                </div>
                                <div className="mt-2 w-full flex items-center bg-white rounded-lg shadow-md">
                                    <div className="relative flex items-center justify-center">
                                        <img src={courseList} alt="Course List" className="p-2 w-20 rounded-lg" />
                                    </div>
                                    <div>
                                        <p className="text-base font-normal">About The course</p>
                                        <p className="text-sm font-light text-[#333334]">1:57</p>
                                    </div>
                                </div>
                                <div className="mt-2 w-full flex items-center bg-white rounded-lg shadow-md">
                                    <div className="relative flex items-center justify-center">
                                        <img src={courseList} alt="Course List" className="p-2 w-20 rounded-lg" />
                                    </div>
                                    <div>
                                        <p className="text-base font-normal">About The course</p>
                                        <p className="text-sm font-light text-[#333334]">1:57</p>
                                    </div>
                                </div>
                                <div className="mt-2 w-full flex items-center bg-white rounded-lg shadow-md">
                                    <div className="relative flex items-center justify-center">
                                        <img src={courseList} alt="Course List" className="p-2 w-20 rounded-lg" />
                                    </div>
                                    <div>
                                        <p className="text-base font-normal">About The course</p>
                                        <p className="text-sm font-light text-[#333334]">1:57</p>
                                    </div>
                                </div>
                                <div className="mt-2 w-full flex items-center bg-white rounded-lg shadow-md">
                                    <div className="relative flex items-center justify-center">
                                        <img src={courseList} alt="Course List" className="p-2 w-20 rounded-lg" />
                                    </div>
                                    <div>
                                        <p className="text-base font-normal">About The course</p>
                                        <p className="text-sm font-light text-[#333334]">1:57</p>
                                    </div>
                                </div>
                                <div className="mt-2 w-full flex items-center bg-white rounded-lg shadow-md opacity-60">
                                    <div className="relative flex items-center justify-center">
                                        <div className="z-10 absolute inset-0 flex items-center justify-center focus:outline-none" >
                                            <span className="rounded-full w-auto h-auto p-1 bg-white">
                                                <CiLock className="text-[#333334] text-xs font-bold" />
                                            </span>
                                        </div>
                                        <img src={courseList} alt="Course List" className="p-2 w-20 rounded-lg" />
                                    </div>
                                    <div>
                                        <p className="text-base font-normal">About The course</p>
                                        <p className="text-sm font-light text-[#333334]">1:57</p>
                                    </div>
                                </div>
                                <div className="mt-2 w-full flex items-center bg-white rounded-lg shadow-md opacity-60">
                                    <div className="relative flex items-center justify-center">
                                        <div className="z-10 absolute inset-0 flex items-center justify-center focus:outline-none" >
                                            <span className="rounded-full w-auto h-auto p-1 bg-white">
                                                <CiLock className="text-[#333334] text-xs font-bold" />
                                            </span>
                                        </div>
                                        <img src={courseList} alt="Course List" className="p-2 w-20 rounded-lg" />
                                    </div>
                                    <div>
                                        <p className="text-base font-normal">About The course</p>
                                        <p className="text-sm font-light text-[#333334]">1:57</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="max-sm:mx-4 lg:mx-10 xl:mx-28">
                <div className="py-4 sm:px-6 lg:px-0 lg:py-5 grid grid-cols-1 lg:grid-cols-3">
                    <div className="col-span-2 mr-3 max-sm:pt-4 md:pt-4">
                        <h1 className="text-2xl font-bold">Course Details</h1>
                        <p className="text-base font-light py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p>
                        <h1 className="text-2xl font-bold">Certification</h1>
                        <p className="text-base font-light py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis consectetur adipiscing elit.</p>
                    </div>
                    <div className="bg-white drop-shadow-lg rounded-lg -mt-10 h-fit max-sm:order-first md:order-first lg:order-none">
                        <div className="flex flex-wrap justify-between p-4 pb-0">
                            <h5 className="text-2xl font-bold">{courseDetails.price}</h5>
                            <div className="flex items-center">
                                <h5 className="text-sm font-bold pr-1">{courseDetails.rating}</h5>
                                <div className='flex'>{renderStars(courseDetails.rating)}
                                </div>
                                <p className="text-sm font-normal pr-1">{courseDetails.reviews}</p>
                            </div>
                        </div>
                        <div className="p-4 pt-2">
                            <h5 className="text-xl font-bold">{courseDetails.name}</h5>
                            <p className="text-base font-normal text-gray-600">
                            {courseDetails.description}
                            </p>
                            <p className="text-base font-normal text-gray-600 pt-2">
                                <span className="font-semibold ">Languages: </span>{courseDetails.languages?.join(', ')}
                            </p>
                            <p className="text-base font-normal text-gray-600">
                                82,652 students
                            </p>
                        </div>
                        <div className="flex justify-center items-end">
                            <button onClick={submit} className="continue w-full text-[333334] !bg-[#dbfe01]">
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CourseDetails;