import { useEffect, useState } from 'react';
import { CircularProgress, Progress } from "@nextui-org/react";
import { BackArrowIcon } from "../../components/icons/BackArrowIcon.jsx";
import makeRequest from '../../api/useApi.js';
import { useSelector } from 'react-redux';
import { FaExclamation } from "react-icons/fa";
import { Link } from 'react-router-dom';

const FinalReport = ({ setPageNo, wizard }) => {
    const skillTestReportData = useSelector((state) => state.skillTest.skillTestData);
    // const skillTestReportData = {
    //     "overallScore": 50,
    //     "technicalSkills": ["Python", "Javascript", "React", "NodeJS", "ExpressJS", "MongoDB"],
    //     "skillLevel": "Beginner",
    //     "currentProfile": "Full Stack Developer - Beginner",
    //     "targetProfile": "Full Stack Developer - Intermediate",
    //     "scores": [
    //         {
    //             "label": "Coding Score",
    //             "value": 50,
    //             "comment": "dummy content"
    //         },
    //         {
    //             "label": "Behavioral Score",
    //             "value": 90,
    //             "comment": "dummy content"
    //         },
    //         {
    //             "label": "Technical Score",
    //             "value": 20,
    //             "comment": "dummy content"
    //         },
    //         {
    //             "label": "Scenario Score",
    //             "value": 50,
    //             "comment": "dummy content"
    //         }
    //     ],
    //     "feedback": {
    //         "positive": ["Your are good in coding", "Your are good in Behavioral"],
    //         "negative": ["You are not good in scenario questions", "Need to focus on technical questions"]
    //     },
    //     "summary": "You are not good in scenario questions, Need to focus on technical questions, Need to focus on technical questions, Need to focus on technical questions"
    // }


    const getColor = (value) => {
        if (value < 33) {
            return 'danger';
        } else if (value >= 33 && value <= 66) {
            return 'warning';
        } else {
            return 'success';
        }
    };

    return (
        <div className="relative bg-white lg:my-10 rounded-3xl shadow-2xl my-10 lg:py-10 px-5 lg:mx-5 py-10 md:px-10">
            <div className="flex items-center">
                <img src={wizard === 'finish' ? "/images/success.svg" : '/images/fin-white.svg'} alt="Handshake" className="h-12 w-12 mb-5" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Onboarding Complete</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Tailored Roadmap for your Career with us</p>
            <div className="mt-5 space-y-8 border-t border-gray-200 pt-10 sm:mt-8 sm:pt-8"></div>
            <div className="flex flex-col gap-4">
                {/* <p className="text-sm max-w-full bg-gray-100 p-4 rounded-2xl">Your Score is better than 50% of similar Profiles! Keep it going!</p> */}
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
                                    value={skillTestReportData?.overallScore}
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
                                {skillTestReportData?.technicalSkills?.join(', ')}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Skill Level
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {skillTestReportData?.skillLevel}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Technical Profile - Current
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {skillTestReportData?.currentProfile}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Technical Profile - Target
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {skillTestReportData?.targetProfile}
                            </dd>
                        </div>
                        {skillTestReportData?.scores.map((score, index) => (
                            <div key={index} className={`bg-${index % 2 === 0 ? 'white' : 'gray-50'} px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3`}>
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    {score.label}
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <Progress
                                        size="sm"
                                        value={score.value}
                                        maxValue={100}
                                        color={getColor(score.value)}
                                        showValueLabel={true}
                                        classNames={{
                                            base: "max-w-md py-1",
                                            track: "drop-shadow-md border border-default",
                                            label: "tracking-wider text-md font-bold text-gray-900",
                                            value: "text-gray-900 text-md font-bold",
                                        }}
                                    />
                                    <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>{score.comment}</p></div>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="bg-white px-4 py-2 sm:gap-4 sm:px-3">
                    <div className="flex items-center">
                        <img src="/images/success.svg" alt="Handshake" className="h-10 w-10" />
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">Positive Feedback</h3>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                        {skillTestReportData?.feedback.positive.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white px-4 py-2 sm:gap-4 sm:px-3">
                    <div className="flex items-center">
                        <div className="flex justify-center items-center h-9 w-9 bg-primary rounded-lg">
                            <FaExclamation className="text-lg text-gray-900" />
                        </div>
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">Negative Feedback</h3>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                        {skillTestReportData?.feedback.negative.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white px-4 py-2 sm:gap-4 sm:px-3">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">Summary:</h3>
                    <p className="px-4 text-base text-wrap pb-2">{skillTestReportData?.summary}</p>
                </div>
                <div className="flex gap-2 sm:gap-4 mt-2 items-center">
                    <a href="/recommendedCourse" className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                        <button type="button">
                            Get Recommended Course
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default FinalReport;
