import { Autocomplete, AutocompleteItem, Slider, Spinner } from '@nextui-org/react';
import { motion, useAnimation } from 'framer-motion'
import React, { useState } from 'react'
import { BackArrowIcon } from '../../components/icons/BackArrowIcon';
import { FrontArrowIcon } from '../../components/icons/FrontArrowIcon';
import { useNavigate } from "react-router-dom";
import makeRequest from '../../api/useApi';

const InterviewForm = ({ handlePrevious, interviewHistory }) => {
    const [isLoading, setIsLoading] = useState(false);
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const [interviewFormDetails, setInterviewFormDetails] = useState({
        current_company: "",
        current_tech_stack: "",
        // totalExperience: "",
        desired_domain: "",
        desired_tech_stack: "",
        email: email,
    })

    const techStack = [
        "Python", "Java", "React", "Angular", "Rust", "LLM", "Gen AI", "Django", "FastAPI",
        "MySQL", "Data analysis", "Pandas", "Numpy", "GCP", "GitHub", "JavaScript", "TypeScript",
        "Vue.js", "Node.js", "Flask", "Spring", "Ruby on Rails", "PostgreSQL", "MongoDB",
        "AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Git", "Jenkins", "Ansible",
        "C#", "C++", "Swift", "Kotlin", "Scala", "PHP", "HTML", "CSS", "Sass", "GraphQL",
        "Redis", "Elasticsearch", "Firebase", "Heroku", "Netlify", "Electron", "TensorFlow",
        "PyTorch", "Matplotlib", "Seaborn", "Hadoop", "Spark", "Kafka", "Tableau", "Power BI"
    ];

    const domains = [
        "Finance", "Healthcare", "Education", "E-commerce", "Entertainment", "Technology",
        "Manufacturing", "Retail", "Real Estate", "Logistics", "Transportation", "Telecommunications",
        "Energy", "Utilities", "Government", "Non-profit", "Agriculture", "Hospitality",
        "Travel", "Food and Beverage", "Automotive", "Insurance", "Media", "Sports",
        "Aerospace", "Defense", "Construction", "Legal", "Consulting", "Fashion",
        "Pharmaceuticals", "Biotechnology", "Public Safety"
    ];

    const handleChange = (name, value) => {
        setInterviewFormDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInterviewFormSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const formData = new URLSearchParams(interviewFormDetails);
            const response = await makeRequest('post', 'userInterviewInfo', formData);
            navigate("/interviewSimulator");
            // setPageNo((prevPageNo) => prevPageNo + 1)
            // console.log('Response:', response);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="section-hero home bg-fixed z-0">
            <div className="mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white my-10 rounded-3xl shadow-xl">
                <div className="relative min-w-full place-items-center py-24 sm:py-20 lg:py-10 px-5 md:px-10">
                    <motion.div className='visible' initial={{ x: '0' }} aria-label="Interview">
                        <div className="relative pb-4">
                            <div className="relative flex items-center md:items-start md:space-x-6">
                                <div className="relative -ml-2">
                                    <div className='flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white'>
                                        <img src='/images/skill.svg' alt="interview" className="h-10 w-10" />
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mx-auto max-w-full px-6 lg:px-2">
                                        <div className="mx-auto max-w-2xl lg:mx-0">
                                            <motion.h2 initial="initial" animate={{ fontSize: "3em", opacity: 1 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-lg:hidden lg:visible font-bold tracking-tight text-gray-900 sm:text-7xl">Interview Prep</motion.h2>
                                            <motion.h2 initial="initial" animate={{ fontSize: "2em", opacity: 1 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-md:visible lg:hidden font-bold tracking-tight text-gray-900 sm:text-7xl">Interview Prep</motion.h2>
                                            <p className="mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-600">
                                                Provide the following details to tailor your interview simulation experience.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-4 sm:pt-4"></div>
                    <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-2xl pb-5">Interview Simulation Details</h2>
                    <form onSubmit={handleInterviewFormSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Autocomplete
                                    allowsCustomValue
                                    label="Current company domain"
                                    aria-label="Current company domain"
                                    placeholder="Enter your current company domain"
                                    className="custom-autocomplete-field"
                                    onInputChange={(value) => handleChange('current_company', value)}
                                >
                                    {domains?.map((domain, index) => <AutocompleteItem key={index}>{domain}</AutocompleteItem>)}
                                </Autocomplete>
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Autocomplete
                                    allowsCustomValue
                                    label="Current company tech stack"
                                    aria-label="Current company tech stack"
                                    placeholder="Enter your current company tech stack"
                                    className="custom-autocomplete-field"
                                    onInputChange={(value) => handleChange('current_tech_stack', value)}
                                >
                                    {techStack?.map((techStack, index) => <AutocompleteItem key={index}>{techStack}</AutocompleteItem>)}
                                </Autocomplete>
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Slider
                                    label="Total Years of Experience"
                                    aria-label="Total Years of Experience"
                                    step={1}
                                    maxValue={25}
                                    minValue={0}
                                    defaultValue={0}
                                    showSteps={true}
                                    showTooltip={true}
                                    showOutline={true}
                                    disableThumbScale={true}
                                    onChange={(value) => handleChange('totalExperience', value)}
                                    classNames={{
                                        base: "max-w-full",
                                        filler: "bg-gradient-to-r from-primary to-slate-400",
                                        labelWrapper: "mb-2",
                                        label: "font-medium text-default-700 text-medium",
                                        value: "font-medium text-default-500 text-small",
                                        thumb: [
                                            "transition-size",
                                            "bg-gradient-to-r from-slate-900 to-primary",
                                            "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                                            "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
                                        ],
                                        step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50"
                                    }}
                                    tooltipProps={{
                                        offset: 10,
                                        placement: "bottom",
                                        classNames: {
                                            base: [
                                                // arrow color
                                                "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
                                            ],
                                            content: [
                                                "py-2 shadow-xl",
                                                "text-white bg-black",
                                            ],
                                        },
                                    }}
                                />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Autocomplete
                                    allowsCustomValue
                                    label="Desired interview domain"
                                    aria-label="Desired interview domain"
                                    placeholder="Enter your desired interview domain"
                                    className="custom-autocomplete-field"
                                    onInputChange={(value) => handleChange('desired_domain', value)}
                                >
                                    {domains?.map((domain, index) => <AutocompleteItem key={index}>{domain}</AutocompleteItem>)}
                                </Autocomplete>
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Autocomplete
                                    allowsCustomValue
                                    label="Desired interview tech stack"
                                    aria-label="Desired interview tech stack"
                                    placeholder="Enter your desired interview tech stack"
                                    className="custom-autocomplete-field"
                                    onInputChange={(value) => handleChange('desired_tech_stack', value)}
                                >
                                    {techStack?.map((techStack, index) => <AutocompleteItem key={index}>{techStack}</AutocompleteItem>)}
                                </Autocomplete>
                            </div>
                            <div className="flex gap-2 sm:gap-4 mt-10 items-center">
                                {interviewHistory.length > 0 &&
                                    <button type="button" onClick={handlePrevious} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                        <BackArrowIcon />
                                    </button>
                                }
                                <button type="submit" className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    {isLoading ? (
                                        <>
                                            <Spinner className="pr-2" color="current" size="sm" /> Submitting...
                                        </>
                                    ) : "Start Interview"} </button>
                                {/* <button type="button" onClick={() => setPageNo((prevPageNo) => prevPageNo + 1)} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" >
                            <FrontArrowIcon />
                        </button> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InterviewForm;