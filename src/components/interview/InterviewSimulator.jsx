import React from 'react'
import { Canvas } from "@react-three/fiber";
import Experience from './Experience';
import { motion, useAnimation } from 'framer-motion'

const InterviewSimulator = () => {
    return (
        <div className="items-center grid grid-cols-2 gap-0 h-screen">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }} className='' >
                <color attach="background" args={["#ffffff"]} />
                <Experience />
            </Canvas>
            <div className="relative h-screen overflow-auto">
                <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
                            Hello, Sadain
                        </h1>
                        <p className="mt-3 text-gray-600">
                            We are delighted to have you join this AI-powered interview.
                        </p>
                    </div>

                    <ul className="mt-16 space-y-5">
                        <li className="flex gap-x-2 sm:gap-x-4">
                            <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-primary">
                                <span className="text-sm font-medium text-gray-900 leading-none">AI</span>
                                {/* <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg> */}
                            </span>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="space-y-1.5">
                                    <p className="mb-1.5 text-sm text-gray-800">
                                        Welcome! Thank you for joining this AI-powered interview. Can you start by telling me a little about yourself and your background?
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                            <div className="grow space-y-3">
                                <div className="inline-block bg-white border-1 border-gray-200 rounded-lg p-4 shadow-sm">
                                    <p className="text-sm text-gray-900">
                                        Sure! My name is Alex, and I have a background in software engineering. I graduated from XYZ University with a degree in Computer Science, and I've been working in the tech industry for the past five years. My most recent role was as a Senior Developer at ABC Company, where I focused on developing scalable web applications.
                                    </p>
                                </div>
                            </div>

                            <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-900">
                                <span className="text-sm font-medium text-white leading-none">SA</span>
                            </span>
                        </li>

                        <li className="flex gap-x-2 sm:gap-x-4">
                            <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-primary">
                                <span className="text-sm font-medium text-gray-900 leading-none">AI</span>
                                {/* <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg> */}
                            </span>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="space-y-1.5">
                                    <p className="mb-1.5 text-sm text-gray-800">
                                        That sounds impressive, Alex. Can you describe a challenging project you worked on and how you handled it?
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                            <div className="grow space-y-3">
                                <div className="inline-block bg-white border-1 border-gray-200 rounded-lg p-4 shadow-sm">
                                    <p className="text-sm text-gray-900">
                                        One of the most challenging projects I worked on was developing a real-time data processing system for a financial services company. The system needed to handle high volumes of transactions with minimal latency. To address this, I implemented a distributed architecture using Apache Kafka and Spark, which allowed us to process data in parallel and achieve the necessary performance. It was a complex project, but the end result was a significant improvement in the client's data processing capabilities.
                                    </p>
                                </div>
                            </div>

                            <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-900">
                                <span className="text-sm font-medium text-white leading-none">SA</span>
                            </span>
                        </li>

                        <li className="flex gap-x-2 sm:gap-x-4">
                            <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-primary">
                                <span className="text-sm font-medium text-gray-900 leading-none">AI</span>
                                {/* <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg> */}
                            </span>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="space-y-1.5">
                                    <p className="mb-1.5 text-sm text-gray-800">
                                        Great to hear how you tackled that challenge. How do you stay current with new technologies and industry trends?
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                            <div className="grow space-y-3">
                                <div className="inline-block bg-white border-1 border-gray-200 rounded-lg p-4 shadow-sm">
                                    <p className="text-sm text-gray-900">
                                        I stay current by regularly reading industry blogs, attending webinars, and participating in online courses. I'm also an active member of several tech communities, where I exchange ideas and learn from other professionals. Recently, I completed a course on machine learning, which has given me new insights into AI technologies and their applications.
                                    </p>
                                </div>
                            </div>

                            <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-900">
                                <span className="text-sm font-medium text-white leading-none">SA</span>
                            </span>
                        </li>

                        <li className="flex gap-x-2 sm:gap-x-4">
                            <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-primary">
                                <span className="text-sm font-medium text-gray-900 leading-none">AI</span>
                                {/* <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg> */}
                            </span>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="space-y-1.5">
                                    <p className="mb-1.5 text-sm text-gray-800">
                                        ...
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <footer className="max-w-4xl mx-auto sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-4 sm:mt-20 sm:pt-8 sm:pb-6 px-4 sm:px-6 lg:px-0">
                    <div className="flex justify-center items-center mb-3">
                        {/* <button type="button" className="inline-flex justify-center items-center gap-x-2 rounded-lg font-medium text-gray-800 hover:text-blue-600 text-xs sm:text-sm">
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            New chat
                        </button> */}


                        <button type="button" className="p-4 inline-flex justify-center items-center gap-x-1 rounded-lg bg-primary border border-transparent font-medium text-gray-900 focus:outline-none focus:ring-2 ring-offset-secondary focus:ring-white focus:ring-offset-2 text-xs">
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                            {/* <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg> */}
                            Start Answering
                        </button>

                        {/* <button type="button" className="py-4 px-4 bg-primary inline-flex justify-center items-center gap-2 rounded-full border font-medium text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 text-xs">
                            <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
                            </svg>

                        </button> */}
                    </div>

                    {/* <div className="relative">
                        <textarea className="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Ask me anything..."></textarea>

                        <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><line x1="9" x2="15" y1="15" y2="9" /></svg>
                                    </button>

                                    <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                    </button>
                                </div>

                                <div className="flex items-center gap-x-1">
                                    <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                                    </button>

                                    <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </footer>
            </div>
            {/* <div className="section-hero home bg-fixed z-0">
                <div className="relative isolate h-auto">
                    <div className="mx-auto w-full lg:w-4/5 bg-white my-10 rounded-3xl shadow-xl">
                        <div className="relative min-w-full place-items-center py-24 sm:py-20 lg:py-10 px-5 md:px-10">
                        <motion.div className='visible' initial={{ x: '0' }} aria-label="User Onboarding">
                                <div className="relative pb-4">
                                    <div className="relative flex items-center md:items-start md:space-x-6">
                                        <div className="relative -ml-2">
                                            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white'>
                                                <img src='/images/skill.svg' alt="Handshake" className="h-10 w-10" />
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mx-auto max-w-full px-6 lg:px-2">
                                                <div className="mx-auto max-w-2xl lg:mx-0">
                                                    <motion.h2 initial="initial" animate={{ fontSize: "3em", opacity: 1 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-lg:hidden lg:visible font-bold tracking-tight text-gray-900 sm:text-7xl">User Onboarding</motion.h2>
                                                    <motion.h2 initial="initial" animate={{ fontSize: "2em", opacity: 1 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-md:visible lg:hidden font-bold tracking-tight text-gray-900 sm:text-7xl">User Onboarding</motion.h2>
                                                    <p className="mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-600">
                                                        Upload your resume or LinkedIn URL to create your professional profile with AYC. We'll help you get your dream job.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default InterviewSimulator