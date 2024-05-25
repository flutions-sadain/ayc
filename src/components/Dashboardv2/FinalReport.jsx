import { useEffect, useState } from 'react';
import { CircularProgress } from "@nextui-org/react";
import { BackArrowIcon } from "../icons/BackArrowIcon.jsx";
import makeRequest from '../../api/useApi.js';
import { useSelector } from 'react-redux';
import { FaExclamation } from "react-icons/fa";
import { Link } from 'react-router-dom';

const FinalReport = ({ setPageNo, wizard }) => {
    const skillTestReportData = useSelector((state) => state.skillTest.skillTestData);

    return (
        <div className="mx-auto min-w-full lg:mr-0">
            <div className="relative min-w-full place-items-center p-5 md:p-20 lg:p-10 xl:py-10 xl:px-40">
                <div className="flex items-center">
                    <img src={wizard === 'finish' ? "/images/success.svg" : '/images/fin-white.svg'} alt="Handshake" className="h-12 w-12 mb-5" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Onboarding Complete</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">Tailored Roadmap for your Career with us</p>
                <div className="mt-5 space-y-8 border-t border-gray-200 pt-10 sm:mt-8 sm:pt-8"></div>
                <div className="flex flex-col gap-4">
                    <p className="text-sm max-w-full bg-gray-100 p-4 rounded-2xl">Your Score is better than {skillTestReportData?.scores}% of similar Profiles! Keep it going!</p>
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 place-items-center text-gray-900 my-auto">
                                    Overall Assessment Score
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <CircularProgress
                                        classNames={{
                                            svg: "w-20 h-20 drop-shadow-md",
                                            value: "text-md font-semibold",
                                        }}
                                        size="lg"
                                        value={skillTestReportData?.scores}
                                        color="secondary"
                                        showValueLabel={true}
                                    />
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Technical Skills
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    Python, Javascript, React, NodeJS, ExpressJS, MongoDB
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Skill Level
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    Beginner
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Technical Profile - Current
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    Full Stack Developer - Beginner
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Technical Profile - Target
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    Full Stack Developer - Intermediate
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Course Duration
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    60 Days
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div className="bg-white px-4 py-2 sm:gap-4 sm:px-3">
                        <div className="flex items-center">
                            <img src="/images/success.svg" alt="Handshake" className="h-10 w-10" />
                            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">Positive Feedback</h3>
                        </div>
                        <ul className="list-disc pl-5 space-y-1">
                            {skillTestReportData?.positive_feedback.map((feedback, index) => (
                                <li key={index}>{feedback}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white px-4 py-2 sm:gap-4 sm:px-3">
                        <div className="flex items-center">
                            <div className="flex justify-center items-center h-9 w-9 bg-primary rounded-lg">
                                <FaExclamation className="text-lg text-gray-900" />
                            </div>
                            {/* <img src={wizard === 'finish' ? "/images/success.svg" : '/images/fin-white.svg'} alt="Handshake" className="h-10 w-10" /> */}
                            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">Negative Feedback</h3>
                        </div>
                        <ul className="list-disc pl-5 space-y-1">
                            {skillTestReportData?.negative_feedback.map((feedback, index) => (
                                <li key={index}>{feedback}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-2 sm:gap-4 mt-2 items-center">
                        <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo - 1); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                            <BackArrowIcon />
                        </button>
                        <a href="/recommendedCourse">
                            <button type="button" className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                Get Recommended Course
                            </button>
                        </a>
                        {/* <Link href="/recommendedCourse">
                            <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo + 1); }} className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                Get Recommended Course
                            </button>
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinalReport;
