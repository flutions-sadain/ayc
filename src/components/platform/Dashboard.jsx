import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {Button, Chip} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";
import { ResponsivePie } from '@nivo/pie';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'




function Dashboard() {

    const data = [
        {
            "id": "POTD",
            "label": "POTD Streak",
            "value": 4,
            "color": "#b9d941"
        },
        {
            "id": "POTD",
            "label": "POTD Streak",
            "value": 4,
            "color": "#b9d941"
        },
        {
            "id": "POTD",
            "label": "POTD Streak",
            "value": 4,
            "color": "#b9d941"
        }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    function CenteredMetric() {
        const totalValue = total.toFixed(2);
        return (
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '16px',
                    fontWeight: '600',
                }}
            >
               18 Days
            </text>
        );
    }


    return (
        <>
            <div className="bg-white">
                <div className="max-w-7xl p-4 py-8 my-8 mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Dashboard
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row w-full">
                    <Card className="w-full m-2">
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="./images/assessment.svg"
                                width={40}
                            />
                            <div className="flex flex-col">
                                <h2 className="text-base font-semibold leading-6 text-gray-900">Career - Key
                                    Metrics</h2>
                                <p className="text-small text-default-500">POTD, Leaderboards and Career Stats</p>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <div className="bg-white py-2 sm:py-12">
                                <div className="max-w-7xl px-6 lg:px-8">
                                    <div className="max-w-2xl lg:max-w-none">
                                        <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                                            <div className="flex flex-col bg-gray-400/5 p-8">
                                                <dt className="text-md font-semibold leading-6 text-gray-600 mt-2">
                                                    POTD Streak
                                                </dt>
                                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900"
                                                    style={{height: '100px'}}>
                                                    <ResponsivePie
                                                        data={data}
                                                        innerRadius={0.8}
                                                        padAngle={5}
                                                        cornerRadius={50}
                                                        borderWidth={1}
                                                        colors={{
                                                            datum: 'data.color'
                                                        }}
                                                        radialLabelsSkipAngle={10}
                                                        radialLabelsTextColor="#333333"
                                                        radialLabelsLinkColor={{from: 'color'}}
                                                        sliceLabelsSkipAngle={10}
                                                        sliceLabelsTextColor="#333333"
                                                        animate={true}
                                                        motionStiffness={90}
                                                        motionDamping={15}
                                                        enableRadialLabels={false}
                                                        enableSliceLabels={false}
                                                        enableArcLabels={false}
                                                        enableArcLinkLabels={false}
                                                        layers={['arcs', 'arcLabels', 'arcLinkLabels', CenteredMetric]}
                                                        datum={d => d.data.color}
                                                        colorBy={d => d.data.color}
                                                    />
                                                </dd>

                                            </div>
                                            <div className="flex flex-col bg-gray-400/5 p-8">
                                                <dt className="text-sm font-semibold leading-6 text-gray-600">Gross POTD
                                                </dt>
                                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">891</dd>
                                            </div>
                                            <div className="flex flex-col bg-gray-400/5 p-8">
                                                <dt className="text-sm font-semibold leading-6 text-gray-600">Solved
                                                    POTD
                                                </dt>
                                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">91.9%</dd>
                                            </div>
                                            <div className="flex flex-col bg-gray-400/5 p-8">
                                                <dt className="text-sm font-semibold leading-6 text-gray-600">Leaderboard
                                                    Rank
                                                </dt>
                                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">#312</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </CardBody>


                    </Card>
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
                            <div
                                className="mx-auto h-full flex flex-col sm:flex-row justify-center items-center text-center w-full">
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

                <div className="flex flex-col md:flex-row w-full">
                    <Card className="w-full md:basis-3/10 m-2">
                        <CardBody>

                        </CardBody>

                    </Card>
                    <Card className="w-full max-width-small md:basis-7/10 m-2">
                        <CardBody className="flex justify-center items-center">
                            <div className="block rounded-lg bg-white text-center text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                                <div className="p-6">
                                    <div className="flex justify-center items-center mb-4">
                                        <Image
                                            alt="nextui logo"
                                            height={40}
                                            radius="sm"
                                            src="./images/linkedin.svg"
                                            width={40}
                                        />
                                    </div>
                                    <p className="mb-4 text-md">
                                        Profile not connected with LinkedIn. Please connect to get more customized recommendations.
                                    </p>
                                    <button
                                        type="button"
                                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light"
                                        style={{ background: '#2D64BC' }}
                                    >
                                        Connect with LinkedIn
                                    </button>
                                </div>
                            </div>
                        </CardBody>
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
