import { motion } from 'framer-motion';
import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {Button, Chip} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";



function Dashboard() {

    return (
        <>
            <div className="bg-white h-screen">
                <div className="max-w-7xl p-4 py-8 my-8 mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Dashboard
                    </h2>
                </div>
                <div className="flex flex-col md:flex-row w-full">
                    <Card className="w-full max-width-small md:basis-3/10 m-2">
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="./images/assessment.svg"
                                width={40}
                            />
                            <div className="flex flex-col">
                                <h2 className="text-base font-semibold leading-6 text-gray-900">Assessment</h2>
                                <p className="text-small text-default-500">Check your Skill Profile</p>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <div className="flex items-center space-x-4 mb-2">
                                <div className="bg-slate-600 rounded-full w-10 h-10 flex items-center justify-center">
                                    <span className="text-white text-md font-semibold">A+</span>
                                </div>
                                <div className="text-md font-medium">
                                    Technical Skills
                                </div>
                            </div>
                            <Divider/>
                            <div className="flex items-center space-x-4 mb-2 mt-2">
                                <div className="bg-slate-600 rounded-full w-10 h-10 flex items-center justify-center">
                                    <span className="text-white text-md font-semibold">A+</span>
                                </div>
                                <div className="text-md font-medium">
                                    Professional Skills
                                </div>
                            </div>
                            <Divider/>
                            <div className="flex items-center space-x-4 mb-2 mt-2">
                                <div className="bg-slate-600 rounded-full w-10 h-10 flex items-center justify-center">
                                    <span className="text-white text-md font-semibold">A+</span>
                                </div>
                                <div className="text-md font-medium">
                                    Soft Skills
                                </div>
                            </div>
                            <Divider/>
                        </CardBody>

                        <CardFooter>
                            <Button color="primary" variant="solid">Take Assessment</Button>
                        </CardFooter>
                    </Card>
                    <Card className="w-full md:basis-7/10 m-2">
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="./images/courses.svg"
                                width={40}
                            />
                            <div className="flex flex-col">
                                <h2 className="text-base font-semibold leading-6 text-gray-900">Courses</h2>
                                <p className="text-small text-default-500">Enroll to Next-Gen Skills</p>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <div className="mx-auto h-full flex flex-col sm:flex-row justify-center items-center text-center w-full">
                                <div className="flex-1 mx-4">
                                    <div className="text-8xl font-bold text-black">6</div>
                                    <div className="text-lg font-medium text-gray-600">Enrolled</div>
                                </div>
                                <div className="flex-1 mx-4 sm:mt-4">
                                    <div className="text-8xl font-bold text-green-600">2</div>
                                    <div className="text-lg font-medium text-gray-600">Completed</div>
                                </div>
                            </div>


                        </CardBody>

                        <CardFooter>
                            <Button color="primary" variant="solid">Goto Courses</Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="flex flex-col md:flex-row w-full m-4">
                    <div className="text-center w-full">
                        <button type="button"
                                className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <div className="flex justify-center items-center">
                                <Image
                                    alt="nextui logo"
                                    height={40}
                                    radius="sm"
                                    src="./images/resume.svg"
                                    width={40}
                                />
                            </div>
                            <span
                                className="mt-4 block text-sm font-semibold text-gray-900 ">Upload Your Resume</span>
                            <Chip color="default mt-4">Use Our Smart Resume Builder to create competitive industry
                                resumes</Chip>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
