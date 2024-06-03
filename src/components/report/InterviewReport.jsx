import React from 'react'
import Header from '../Dashboardv2/Header'
import { Button, CircularProgress, Progress } from '@nextui-org/react'
import { FiDownload } from "react-icons/fi";
import { IoShareSocial } from "react-icons/io5";

const InterviewReport = () => {

    const getColor = (value) => {
        if (value < 33) {
          return 'danger';
        } else if (value >= 33 && value <= 66) {
          return 'warning';
        } else {
          return 'success';
        }
      }

    return (
        <div>
            <Header />
            <div className="section-hero home bg-fixed z-0">
                <div className="relative isolate h-auto">
                    <div className="mx-auto w-full md:w-3/4 lg:w-2/3 bg-black mt-5 mb-2 rounded-3xl shadow-xl">
                        <div className="relative min-w-full place-items-center py-5 sm:py-5 lg:py-5 px-5 md:px-10">
                            {/* <h2 className="text-center text-xl font-bold">Interview Summary</h2> */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-5">
                                    <img src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="Profile Photo" className="w-32 h-32 rounded-lg" />
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">Sadain Abdullah</h2>
                                        <h2 className="text-lg font-semibold text-white">nsasadain@gmail.com</h2>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button color="primary" variant="flat" startContent={<IoShareSocial />} />
                                    <Button color="primary" variant="flat" startContent={<FiDownload />}>
                                        Download
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto w-full md:w-3/4 lg:w-2/3 flex gap-5">
                        <div className="bg-white w-auto rounded-xl shadow-lg">
                            <div className="relative min-w-full place-items-center py-5 sm:py-5 lg:py-5 px-5 md:px-10">
                                <h2 className="text-center text-xl font-bold">Overall score</h2>
                                <div className="mx-auto">
                                    <CircularProgress
                                        classNames={{
                                            svg: "w-40 h-40 drop-shadow-md",
                                            indicator: "stroke-primary",
                                            track: "stroke-black/10",
                                            value: "text-xl font-semibold text-gray-900",
                                        }}
                                        value={70}
                                        strokeWidth={3}
                                        showValueLabel={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white w-full rounded-xl shadow-lg">
                            <div className="relative min-w-full place-items-center py-5 sm:py-5 lg:py-5 px-5 md:px-10">
                                <h2 className="text-center text-xl font-bold pb-5">Interview Summary</h2>
                                <div className="grid items-center grid-cols-2 gap-10">
                                    <Progress
                                        label="Overall Technical Skills"
                                        size="md"
                                        value={40}
                                        maxValue={100}
                                        color={getColor(40)}
                                        showValueLabel={true}
                                        classNames={{
                                            base: "max-w-md py-1",
                                            track: "drop-shadow-md border border-default",
                                            label: "tracking-wider font-bold text-gray-900",
                                            value: "text-gray-900 font-bold",
                                        }}
                                    />
                                    <Progress
                                        label="Overall Soft Skills"
                                        size="md"
                                        value={80}
                                        maxValue={100}
                                        color={getColor(80)}
                                        showValueLabel={true}
                                        classNames={{
                                            base: "max-w-md py-1",
                                            track: "drop-shadow-md border border-default",
                                            label: "tracking-wider font-bold text-gray-900",
                                            value: "text-gray-900 font-bold",
                                        }}
                                    />
                                    <Progress
                                        label="Overall Interview Performance"
                                        size="md"
                                        value={20}
                                        maxValue={100}
                                        color={getColor(20)}
                                        showValueLabel={true}
                                        classNames={{
                                            base: "max-w-md py-1",
                                            track: "drop-shadow-md border border-default",
                                            label: "tracking-wider font-bold text-gray-900",
                                            value: "text-gray-900 font-bold",
                                        }}
                                    />
                                    <Progress
                                        label="Overall Analytical Skills"
                                        size="md"
                                        value={50}
                                        maxValue={100}
                                        color={getColor(50)}
                                        showValueLabel={true}
                                        classNames={{
                                            base: "max-w-md py-1",
                                            track: "drop-shadow-md border border-default",
                                            label: "tracking-wider font-bold text-gray-900",
                                            value: "text-gray-900 font-bold",
                                        }}
                                    />
                                </div>
                                {/* <p className="flex items-center text-sm"><span className="font-medium">Comment: </span>  Hello</p> */}
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto w-full md:w-3/4 lg:w-2/3 bg-white mt-5 mb-2 py-4 rounded-3xl shadow-2xl">
                        <div className="relative min-w-full place-items-center py-2 sm:py-3 lg:py-3 px-5 md:px-10">
                            <h2 className="text-xl font-bold pb-2">Technical Skill : 40%</h2>
                            <div className="py-2">
                                <Progress
                                    label="Programming:"
                                    size="sm"
                                    value={55}
                                    maxValue={100}
                                    color={getColor(50)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>Proficient in Python and JavaScript, with a solid understanding of algorithms and data structures.</p></div>
                            </div>
                            <div className="py-2">
                                <Progress
                                    label="Problem-Solving:"
                                    size="sm"
                                    value={30}
                                    maxValue={100}
                                    color={getColor(30)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>Effectively solved complex coding challenges within the allocated time.</p></div>
                            </div>
                            <div className="py-2">
                                <Progress
                                    label="Domain Knowledge:"
                                    size="sm"
                                    value={75}
                                    maxValue={100}
                                    color={getColor(75)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>Good understanding of web development frameworks and database management.</p></div>
                            </div>
                            <div className="mt-5 min-w-full space-y-4 border-t border-gray-300"></div>
                        </div>
                        <div className="relative min-w-full place-items-center py-2 sm:py-3 lg:py-3 px-5 md:px-10">
                            <h2 className="text-xl font-bold pb-2">Soft Skills : 80%</h2>
                            <div className="py-2">
                                <Progress
                                    label="Communication:"
                                    size="sm"
                                    value={90}
                                    maxValue={100}
                                    color={getColor(90)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>Articulate and clear in explaining technical concepts and solutions</p></div>
                            </div>
                            <div className="py-2">
                                <Progress
                                    label="Teamwork:"
                                    size="sm"
                                    value={60}
                                    maxValue={100}
                                    color={getColor(60)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>Demonstrated strong collaborative skills and the ability to work effectively in a team setting.</p></div>
                            </div>
                            <div className="py-2">
                                <Progress
                                    label="Adaptability:"
                                    size="sm"
                                    value={75}
                                    maxValue={100}
                                    color={getColor(75)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>Quickly adapted to new questions and scenarios presented during the interview.</p></div>
                            </div>
                            <div className="mt-5 min-w-full space-y-4 border-t border-gray-300"></div>
                        </div>
                        <div className="relative min-w-full place-items-center py-2 sm:py-3 lg:py-3 px-5 md:px-10">
                            <h2 className="text-xl font-bold pb-2">Interview Performance : 30%</h2>
                            <div className="py-2">
                                <Progress
                                    label="Preparation:"
                                    size="sm"
                                    value={30}
                                    maxValue={100}
                                    color={getColor(30)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>The candidate was well-prepared, showing familiarity with common interview questions and scenarios.</p></div>
                            </div>
                            <div className="py-2">
                                <Progress
                                    label="Professionalism:"
                                    size="sm"
                                    value={40}
                                    maxValue={100}
                                    color={getColor(40)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>Maintained a professional demeanor throughout the interview process</p></div>
                            </div>
                            <div className="py-2">
                                <Progress
                                    label="Time Management:"
                                    size="sm"
                                    value={20}
                                    maxValue={100}
                                    color={getColor(20)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>Managed the interview time efficiently, providing concise and relevant answers.</p></div>
                            </div>
                            <div className="mt-5 min-w-full space-y-4 border-t border-gray-300"></div>
                        </div>
                        <div className="relative min-w-full place-items-center py-2 sm:py-3 lg:py-3 px-5 md:px-10">
                            <h2 className="text-xl font-bold pb-2">Analytical Skills : 50%</h2>
                            <div className="py-2">
                                <Progress
                                    label="Critical Thinking:"
                                    size="sm"
                                    value={70}
                                    maxValue={100}
                                    color={getColor(70)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>Demonstrated strong critical thinking skills, analyzing problems effectively.</p></div>
                            </div>
                            <div className="py-2">
                                <Progress
                                    label="Data Analysis:"
                                    size="sm"
                                    value={50}
                                    maxValue={100}
                                    color={getColor(50)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>Showed good ability to analyze and interpret data.</p></div>
                            </div>
                            <div className="py-2">
                                <Progress
                                    label="Logical Reasoning:"
                                    size="sm"
                                    value={30}
                                    maxValue={100}
                                    color={getColor(30)}
                                    showValueLabel={true}
                                    classNames={{
                                        base: "max-w-md py-1",
                                        track: "drop-shadow-md border border-default",
                                        label: "tracking-wider text-md font-bold text-gray-900",
                                        value: "text-gray-900 text-md font-bold",
                                    }}
                                />
                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>Applied logical reasoning effectively to solve problems.</p></div>
                            </div>
                            <div className="mt-5 min-w-full space-y-4 border-t border-gray-300"></div>
                        </div>
                        <div className="relative min-w-full place-items-center py-2 sm:py-3 lg:py-3 px-5 md:px-10">
                            <h2 className="text-xl font-bold pb-2">Recommendations:</h2>
                            <div className="py-2">
                                <div className="flex text-md pt-1 gap-2"><b>Hiring Recommendation (Yes/No/Maybe):</b><p>Maybe</p></div>
                            </div>
                            <div className="py-2">
                                <div className="flex text-md pt-1 gap-2"><b>Suggested Role/Position Fit:</b><p>Software Engineer</p></div>
                            </div>
                            <div className="py-2">
                                <div className="flex text-md pt-1 gap-2"><b>Potential for Growth:</b><p>High potential for growth, especially with additional training and development.</p></div>
                            </div>
                            <div className="py-2">
                                <div className="flex text-md pt-1 gap-2"><b>Training/Development:</b><p>Advanced problem-solving techniques and project management skills could be further developed.</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterviewReport