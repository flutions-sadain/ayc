import { useState, useEffect, useRef } from 'react'
import Header from '../Header'
import { Accordion, AccordionItem, Spinner } from '@nextui-org/react'
import demoVideo from '../../assets/video/demo.mp4';
import thumbnail from '../../assets/images/thumbnail.png';
import { FaPlay } from "react-icons/fa";
import { IoLanguage } from 'react-icons/io5';
import makeRequest from '../../api/useApi';
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io';



const CourseDetails = () => {
    const [courseDetails, setCourseDetails] = useState([]);

    const [isPlaying, setIsPlaying] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

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
                const formData = new FormData();
                formData.append('courseName', courseName);

                const response = await makeRequest('post', 'getCourseDetails', formData);
                setIsLoading(false);
                setCourseDetails(response);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, []);

    // useEffect(() => {
    //     console.log("details", courseDetails);
    // }, [courseDetails])


    // useEffect(() => {
    //     if (!isMounted.current) return;
    //     const fetchCourseDetails = async () => {
    //         try {
    //             const params = new URLSearchParams(window.location.search);
    //             const courseName = params.get('courseName');
    //             const response = await axios.post('http://localhost:8000/getCourseDetails', { courseName }, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             });
    //             setCourseDetails(response.data);
    //         } catch (error) {
    //             console.error('Error fetching course details:', error);
    //         }
    //     };

    //     fetchCourseDetails();
    // }, []);

    // if (!courseDetails) {
    //     return <div>Loading...</div>;
    // }

    // const aiCourseData = {
    //     "name": "Introduction to Artificial Intelligence Fundamentals",
    //     "description": "This course provides a comprehensive introduction to the fundamentals of artificial intelligence (AI). Students will learn about key concepts such as machine learning, neural networks, natural language processing, and computer vision. Through hands-on projects and real-world examples, participants will gain a deep understanding of AI techniques and their applications in various industries.",
    //     "price": "$99",
    //     "duration": "6 weeks",
    //     "rating": "4.5",
    //     "languages": [
    //         "English"
    //     ],
    //     "reviews": "500",
    //     "phases": [
    //         {
    //             "phase": "Phase 1",
    //             "modules": {
    //                 "Module 1": "Welcome to AI - General Information",
    //                 "topics": [
    //                     "AYC Welcome Notes",
    //                     "Connect with Industry giants.",
    //                     "How AI rules the world"
    //                 ]
    //             }
    //         },
    //         {
    //             "phase": "Phase 2",
    //             "modules": {
    //                 "Module 2": "Evolution of AI",
    //                 "topics": [
    //                     "Current industry Challenges",
    //                     "How different industry operate today",
    //                     "How technology solved the different industry fallback"
    //                 ]
    //             }
    //         },
    //         {
    //             "phase": "Phase 3",
    //             "modules": {
    //                 "Module 3": "AI building blocks",
    //                 "topics": [
    //                     "Introduction to Artificial Intelligence",
    //                     "Programming for AI",
    //                     "Data Science and Analytics",
    //                     "Machine Learning"
    //                 ]
    //             }
    //         },
    //         {
    //             "phase": "Phase 4",
    //             "modules": {
    //                 "Module 4": "AI deep dive",
    //                 "topics": [
    //                     "Natural Language Processing (NLP)",
    //                     "Computer Vision",
    //                     "Reinforcement Learning",
    //                     "Generative AI"
    //                 ]
    //             }
    //         },
    //         {
    //             "phase": "Phase 5",
    //             "modules": {
    //                 "Module 5": "How to operationalize in Cloud",
    //                 "topics": [
    //                     "Basics of cloud computing",
    //                     "Pricing models in cloud services",
    //                     "Different AI services and infrastructure offerings",
    //                     "Comparative analysis of major cloud service providers (AWS, Azure, Google Cloud, IBM Cloud)",
    //                     "Containerization with Docker and orchestration with Kubernetes"
    //                 ]
    //             }
    //         },
    //         {
    //             "phase": "Phase 6",
    //             "modules": {
    //                 "Module 6": "Scaling and monitoring of hosted AI for business value",
    //                 "topics": [
    //                     "Efficient AI model development",
    //                     "Advanced data pipelines for large-scale AI systems",
    //                     "Infrastructure scalability (cloud, on-premises, hybrid)",
    //                     "Real-time monitoring and altering",
    //                     "Measuring ROI from AI-driven customer initiatives"
    //                 ]
    //             }
    //         }
    //     ]
    // };


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

    const generateAccordionItems = (data) => {
        const phases = Object.keys(data).filter(key => key.startsWith('Phase'));
        return phases.map((phaseKey, index) => {
            const modules = data[phaseKey];
            return Object.keys(modules).map((moduleKey, moduleIndex) => {
                const moduleItems = modules[moduleKey].map((item, i) => (
                    <li style={{ marginBottom: "5px" }} key={i}>{item}</li>
                ));

                return (
                    <AccordionItem
                        key={`${index + 1}-${moduleIndex + 1}`}
                        aria-label={moduleKey}
                        subtitle={phaseKey} // Pass moduleKey as subtitle
                        title={moduleKey}
                    >
                        <div key={moduleKey}>
                            <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                                {moduleItems}
                            </ul>
                        </div>
                    </AccordionItem>
                );
            });
        }).flat(); // Flatten the array of arrays
    };


    return (
        <div className="">
            <Header />
            {!isLoading ? <>
                <div className="w-full py-2 px-10 border bg-white">
                    <ol className="flex items-center whitespace-nowrap">
                        <li className="inline-flex items-center">
                            <a className="flex items-center text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900" href="/">
                                Home
                            </a>
                            <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </li>
                        <li className="inline-flex items-center">
                            <a className="flex items-center text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900" href="/recommendedCourse">
                                Courses
                                <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </a>
                        </li>
                        <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate" aria-current="page">
                            {courseDetails.name}
                        </li>
                    </ol>
                </div>
                <div className="w-full bg-gray-200 h-auto">
                    <div className="py-20 px-10 sm:px-6 lg:px-20 grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
                        <div>
                            <h1 className="block text-3xl font-medium text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight">{courseDetails.name}</h1>
                            <p className="mt-3 text-lg text-gray-800">{courseDetails.description}</p>

                            <div className="grid lg:grid-cols-2">
                                <div className="mt-3 lg:mt-5 grid grid-cols-2 gap-x-5">
                                    <div className="">
                                        <div className="flex space-x-1">
                                            {renderStars(courseDetails.rating)}
                                            {/* <svg className="size-4 text-gray-800" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z" fill="currentColor" />
                                        </svg>
                                        <svg className="size-4 text-gray-800" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z" fill="currentColor" />
                                        </svg>
                                        <svg className="size-4 text-gray-800" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z" fill="currentColor" />
                                        </svg>
                                        <svg className="size-4 text-gray-800" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z" fill="currentColor" />
                                        </svg>
                                        <svg className="size-4 text-gray-800" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z" fill="currentColor" />
                                        </svg> */}
                                        </div>

                                        <p className="mt-3 text-sm text-gray-800">
                                            <span className="font-bold">{courseDetails.rating}</span> /5 - from {courseDetails.reviews} reviews
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-3 flex items-center gap-2">
                                        <IoLanguage className="text-lg text-gray-800" />
                                        <p className="text-lg text-gray-800">{courseDetails.languages?.join(', ')}</p>
                                    </div>
                                    <p className="flex items-center gap-2"><span className="font-semibold">Duration:</span>{courseDetails.duration}</p>
                                </div>
                            </div>


                            <div className="mt-5 grid gap-3 w-full sm:inline-flex">
                                <a className="py-4 px-6 inline-flex w-full justify-center items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent bg-gray-900 text-white disabled:opacity-50 disabled:pointer-events-none" href="#">
                                    Enroll Now
                                </a>
                            </div>

                        </div>

                        <div className="relative">
                            <div className="relative xl:mr-14">
                                <video className={`w-full h-full rounded-lg shadow isPlaying ? '' : 'opacity-0' `} src={demoVideo} controls={isPlaying} autoPlay={isPlaying} muted={!isPlaying} />
                                {!isPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <button type="button" onClick={handlePlayClick} className="z-10 absolute inset-0 flex items-center justify-center focus:outline-none" >
                                            <span className="rounded-full w-auto h-auto p-3 bg-[#333334]">
                                                <FaPlay className="text-white text-2xl" />
                                            </span>
                                        </button>
                                        <img src={thumbnail} alt="Video thumbnail" className="w-full h-full rounded-lg" />
                                    </div>
                                )}
                            </div>
                            {/* <img className="w-full rounded-md" src="https://images.unsplash.com/photo-1665686377065-08ba896d16fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&h=800&q=80" alt="Image Description" /> */}
                        </div>
                    </div>
                </div>
                <div className=" my-10 mx-20" >
                    <div className="py-4 sm:px-6 lg:px-0 lg:py-5 grid grid-cols-1 lg:grid-cols-3">
                        <div className="col-span-2  max-sm:pt-4 md:pt-4">
                            <div className="">
                                <h1 className="text-3xl font-semibold pb-4">Course Modules</h1>
                                <p className="text-md">Drill down into the course structure of {courseDetails.name} </p>
                            </div>
                            <div className="border my-10 rounded-lg p-5">
                                {/* <Accordion style={{ fontWeight: 'bold' }}>
                                    {generateAccordionItems(courseDetails)}
                                </Accordion> */}
                                <Accordion>
                                    {courseDetails?.phases?.map((phase, phaseIndex) => (
                                        <AccordionItem
                                            key={phaseIndex}
                                            aria-label={`Module ${phaseIndex + 1} - ${phase.modules[`Module ${phaseIndex + 1}`]}`}
                                            subtitle={phase.phase}
                                            title={`Module ${phaseIndex + 1} - ${phase.modules[`Module ${phaseIndex + 1}`]}`}
                                            className="font-bold"
                                        >
                                            <div key={`module-${phaseIndex + 1}`}>
                                                <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                                                    {phase.modules.topics.map((topic, topicIndex) => (
                                                        <li className="font-normal" key={topicIndex}>{topic}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                        <div className="bg-white drop-shadow-lg rounded-lg max-sm:order-first md:order-first lg:order-none">
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
                                <button className="continue w-full !text-white !bg-gray-900">
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <div className='flex justify-center items-center w-full h-screen'><Spinner color="secondary" size="lg" /></div>}
        </div>
    )
}

export default CourseDetails