import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Pagination, Spinner } from '@nextui-org/react';
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { HiFilter } from "react-icons/hi";
import Header from '../Header';
import { Link, useLocation } from 'react-router-dom';
import DataScience from "../../assets/images/DataScience.png";
import FullStackDevelopment from "../../assets/images/FullStackDevelopment.png";
import FrontendDevelopment from "../../assets/images/FrontendDevelopment.png";
import MachineLearning from "../../assets/images/MachineLearning.png";
import axios from 'axios';
import makeRequest from '../../api/useApi';

const FilterSidebar = () => (
    <div className="p-4">
        <h3 className="text-xl font-bold mb-4">Filters</h3>
        <div className="mb-4">
            <h4 className="font-semibold mb-2">Category</h4>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>All Categories</option>
                <option>Category 1</option>
                <option>Category 2</option>
                <option>Category 3</option>
            </select>
        </div>
        <div className="mb-4">
            <h4 className="font-semibold mb-2">Rating</h4>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>All Ratings</option>
                <option>4 Stars & Up</option>
                <option>3 Stars & Up</option>
                <option>2 Stars & Up</option>
                <option>1 Star & Up</option>
            </select>
        </div>
        <div className="mb-4">
            <h4 className="font-semibold mb-2">Price</h4>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>All Prices</option>
                <option>$0 - $50</option>
                <option>$50 - $100</option>
                <option>$100 - $200</option>
                <option>$200 & Up</option>
            </select>
        </div>
    </div>
);

const RecommendedCourse = () => {
    const location = useLocation();
    // console.log(location)
    const data = location.state;
    const email = localStorage.getItem('email');
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const itemsPerPage = 6;
    const isMounted = useRef(true);
    const fullName = localStorage.getItem('fullName');

        useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const fetchRecommendedCourse = async () => {
        if (!isMounted.current) return;
        const formData = new FormData();
        formData.append('email', email);
    
        try {
          const response = await makeRequest('post', 'courseRecommend', formData);
            setCourses(response.courses);
            setIsLoading(false);
            // console.log('Response:', response);
        } catch (error) {
            console.error('Error:', error);
        }
      };

      useEffect(() => {
        fetchRecommendedCourse();
      }, [email]);

    // useEffect(async() => {
    //     if (!isMounted.current) return;

    //     const formData = new FormData();
    //     formData.append('email', email);

    //     try {
    //         const response = await makeRequest('post', 'courseRecommend', formData);
    //         setCourses(response.data.courses);
    //         console.log('Response:', response);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }

    // }, []);
    // axios.post('http://localhost:8000/courseRecommend', formData)
    //     .then(response => {
    //         setCourses(response.data.courses);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching course details:', error);
    //     });

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);

    const limitWords = (str, count) => {
        const words = str.split(' ');
        if (words.length > count) {
            return words.slice(0, count).join(' ') + '...';
        }
        return str;
    };

    const images = [DataScience, FullStackDevelopment, FrontendDevelopment, MachineLearning];

    return (
        <div className="">
            <Header />
            <div className="sm:mx-10 mx-2 my-10 flex flex-col lg:flex-row">
                <div className="lg:w-1/5 w-full h-auto mx-5 lg:bg-gray-100 rounded-lg lg:pr-4 mb-4 lg:mb-0">
                    <div className="lg:block hidden">
                        <FilterSidebar />
                    </div>
                    <div className="lg:hidden flex justify-start mb-4">
                        <Button auto flat onClick={() => setIsFilterOpen(true)}>
                            <HiFilter className="mr-2" /> Filter
                        </Button>
                    </div>
                </div>
                <div className="lg:w-4/5 w-full">
                    <div className=" relative flex flex-col break-words min-w-0 bg-clip-border rounded-xl bg-black mb-5">
                        <div className="flex-auto block py-8 px-9">
                            <div className="m-0 z-20 relative">
                                <div className="relative z-20 text-3xl font-semibold text-white sm:w-3/4">
                                    Hello {fullName}
                                </div>
                                <p className="mb-7 text-white">We are recommended to enroll this courses.</p>
                                <div className="flex flex-col gap-2 xl:gap-4 sm:flex-row">
                                    <a href="#" className="shrink-0 inline-block text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-white border-white shadow-none [border:_0]  px-5 py-3.5 hover:bg-white/90 active:bg-white focus:bg-white">My Courses</a>
                                    <a href="#" className="inline-block shrink-0 text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-white bg-white/[.15] shadow-none [border:_0]  px-5 py-3.5 hover:bg-white/25 active:bg-white/25 focus:bg-white/25">What's new</a>
                                </div>
                            </div>
                            <img src="images/bg-abs-1.png" className="bottom-0 top-0 absolute mr-3 end-0 w-1/2 h-full z-10" alt="" />
                        </div>
                    </div>
                    <div className="sm:px-6">
                        <h2 className="text-2xl font-semibold py-5 text-gray-900">Recommended Courses</h2>
                        {!isLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {courses.map((course, index) => (
                                <Link to={`/courseDetails?courseName=${course.name}`} className="cursor-pointer">
                                    <div className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 rounded-xl">
                                        <div className="aspect-w-16 aspect-h-11">
                                            <img className="w-full object-cover rounded-xl" src={images[index % images.length]} alt="Image Description" />
                                        </div>
                                        <div className="mx-5 my-6">
                                            <h2 className="text-lg font-bold text-black">{course.name}</h2>
                                            <p className="text-base text-gray-600">
                                                {limitWords(course.description, 10)}
                                            </p>
                                            <div className="flex justify-between pt-5">
                                                <div className="flex items-center">
                                                    <IoIosStar className="text-yellow-400 text-lg " />
                                                    <h5 className="text-sm font-bold pr-1">{course.rating}</h5>
                                                    <p className="text-sm font-normal pr-1">({course.reviews} Reviews)</p>
                                                </div>
                                                <h5 className="text-lg font-bold">{course.price}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))} 
                        </div> : <div className='flex justify-center items-center w-full h-48'><Spinner color="secondary" size="lg" /></div>}
                    </div>
                    {/* <div className="mt-6 flex justify-center">
                        <Pagination
                            total={Math.ceil(courses.length / itemsPerPage)}
                            initialPage={1}
                            page={currentPage}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    </div> */}
                </div>
            </div>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
            >
                <Modal.Header>
                    <h3 id="modal-title" className="text-xl font-bold">
                        Filters
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <FilterSidebar />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default RecommendedCourse;