import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { Input, AutocompleteItem, Autocomplete, DatePicker, Textarea, Select, SelectItem, Slider, Chip, Spinner } from "@nextui-org/react";
import { BackArrowIcon } from "../../components/icons/BackArrowIcon.jsx";
import { FrontArrowIcon } from "../../components/icons/FrontArrowIcon.jsx";
import autoCompleteData from "../../data/autocompleteData.js"
import makeRequest from '../../api/useApi.js';
import { useSelector } from 'react-redux';
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

const ExperienceForm = ({ wizard, pageNo, setPageNo }) => {
    // const email = useSelector((state) => state.user.email);
    const email = localStorage.getItem('email');
    const [isLoading, setIsLoading] = useState(false);
    // const resumeData = useSelector((state) => state.resume.resumeData);
    // const { skills: skillsString = "", previous_company_details } = resumeData?.summary || {};

    // console.log("resume data", resumeData);
    let formatter = useDateFormatter();

    const [experienceDetails, setExperienceDetails] = useState({
        college: "",
        university: "",
        degree: "",
        degreeStDate: "",
        degreeEdDate: "",
        degreeGrade: "",
        activities: "",
        designation: "",
        empType: "",
        companyName: "",
        posStDate: "",
        posEdDate: "",
        location: "",
        locationType: "",
        totalExperience: "",
        skills: "",
        email: email
    })

    const handleChange = (name, value) => {
        setExperienceDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleExperienceSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            var combinedSkills = [...skillValues, ...techSkillValues].join(', ');
            // setExperienceDetails((prevData) => ({
            //     ...prevData,
            //     skills: combinedSkills,
            //     totalExperience: String(experienceDetails.totalExperience),
            // }));
            // console.log("experienceDetailse", { ...experienceDetails, skills: combinedSkills, totalExperience: String(experienceDetails.totalExperience), });
            const response = await makeRequest('post', 'saveDeatils/3', { ...experienceDetails, skills: combinedSkills, totalExperience: String(experienceDetails.totalExperience) });
            setPageNo((prevPageNo) => prevPageNo + 1)
            console.log('Response:', response);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // const parseSkills = (skillsString) => {
    //     if (!skillsString) return [];
    //     const skillCategories = skillsString?.split('**');
    //     const skills = [];

    //     skillCategories?.forEach((category) => {
    //         const lines = category?.split('\n');
    //         lines?.forEach((line) => {
    //             if (line?.startsWith('- ')) {
    //                 let skill = line?.slice(2)?.split(':')[0]?.trim(); // Extract skill name before the colon
    //                 if (skill?.includes('(')) {
    //                     skill = skill.split('(')[0]?.trim(); // Remove proficiency level if present
    //                 }
    //                 skills?.push(skill);
    //             }
    //         });
    //     });

    //     return skills;
    // };


    // const skills = parseSkills(skillsString);

    const allSkills = ["Python", "Java", "React", "Angular", "Rust", "LLM", "Gen AI", "Django", "Fast API", "MySQL", "Data analysis", "Pandas", "Numpy", "GCP", "Github"];
    const allTechSkills = ["Mobile App", "Data science", "Deep Learning", "Machine Learning", "Data analysis", "Github"];


    const [skillValues, setSkillValues] = useState(new Set([]));
    const [techSkillValues, setTechSkillValues] = useState(new Set([]));

    // const unmatchedSkills = skills?.filter(skill => !allSkills?.includes(skill));

    // useEffect(() => {
    //     setSkillValues(new Set(skills));
    // }, [skillsString]);

    const handleChipRemove = (valueToRemove) => {
        const updatedSkillValues = new Set(skillValues);
        updatedSkillValues?.delete(valueToRemove);
        setSkillValues(updatedSkillValues);
    };

    const degree = [
        { label: "Bachelors Degree", value: "Bachelors Degree" },
        { label: "Associate Degree", value: "Associate Degree" },
        { label: "Doctoral (PhD)", value: "Doctoral (PhD)" },
        { label: "Professional Degree", value: "Professional Degree" },
        { label: "Diploma", value: "Diploma" },
    ]

    return (
        <>
            <form onSubmit={handleExperienceSubmit}>
                <motion.div className={(wizard === 'professionalProfile' && pageNo === 3) ? "visible" : "hidden"} aria-label="Professional Profile Educational component">
                    <div>
                        <div className="flex gap-2 mt-2">
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                        </div>
                        <small>2 remaining to complete</small>
                        <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-4 sm:pt-4"></div>
                        <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-2xl pb-5">Educational Experience</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input type="text" label="School/College" aria-label="School/College" placeholder="Please Enter Name of School or College" onChange={(e) => handleChange('college', e.target.value)} />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input type="text" label="University" aria-label="University" placeholder="Please Enter Name of University" onChange={(e) => handleChange('university', e.target.value)} />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Select
                                    label="Degree"
                                    aria-label="Degree"
                                    placeholder="Select Your Degree"
                                    onSelectionChange={(value) => handleChange('degree', value.currentKey)}
                                >
                                    {degree?.map((degree) => (
                                        <SelectItem key={degree.value} value={degree.value}>
                                            {degree.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <DatePicker label="Degree Start date" aria-label="Degree Start date" onChange={(value) => handleChange('degreeStDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--")} />
                                <DatePicker label="Degree End date" aria-label="Degree End date" onChange={(value) => handleChange('degreeEdDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--")} />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input type="text" label="Grade" aria-label="Grade" placeholder="Enter your Grade or Score" onChange={(e) => handleChange('degreeGrade', e.target.value)} />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input type="text" label="Activities and Societies" aria-label="Activities and Societies" placeholder="Ex. Sports Team, Groups, Accolades etc." onChange={(e) => handleChange('activities', e.target.value)} />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Textarea label="Description" aria-label="Description" placeholder="Tell More about your Educational Experience" onChange={(e) => handleChange('description', e.target.value)} />
                            </div>
                            <div className="flex gap-2 sm:gap-4 mt-10 items-center">
                                {/* <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo - 1); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <BackArrowIcon />
                                </button> */}
                                <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo + 1); }} className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    Save and Continue
                                </button>
                                <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo + 1); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <FrontArrowIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div className={(wizard === 'professionalProfile' && pageNo === 4) ? "visible" : "hidden"} aria-label="Professional Profile Experience component">
                    <div>
                        <div className="flex gap-2 mt-2">
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                        </div>
                        <small>1 remaining to complete</small>
                        <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-4 sm:pt-4"></div>
                        <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-2xl pb-5">Professional Experience</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input type="text" label="Title" aria-label="Title" placeholder="Enter your Designation/Role" onChange={(e) => handleChange('designation', e.target.value)} />
                                {/* <Autocomplete
                                    allowsCustomValue
                                    label="Title"
                                    aria-label="Title"
                                    defaultItems={previous_company_details?.map(role => role['Role'])}
                                    placeholder="Enter your Designation/Role"
                                    className="custom-autocomplete-field"
                                    onInputChange={(value) => handleChange('designation', value)}
                                >
                                    {previous_company_details && previous_company_details?.map((role, index) => <AutocompleteItem key={index}>{role['Role']}</AutocompleteItem>)}
                                </Autocomplete> */}
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input type="text" label="Employment Type" aria-label="Employment Type" placeholder="Please Enter Employment Type" onChange={(e) => handleChange('empType', e.target.value)} />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input type="text" label="Previous Company" aria-label="Previous Company" placeholder="Enter your Previous Company" onChange={(e) => handleChange('companyName', e.target.value)} />
                                {/* <Autocomplete
                                    allowsCustomValue
                                    label="Previous Company"
                                    aria-label="Previous Company"
                                    defaultItems={previous_company_details?.map(company => company['Company Name'])}
                                    placeholder="Enter your Previous Company"
                                    className="custom-autocomplete-field"
                                    onInputChange={(value) => handleChange('companyName', value)}
                                >
                                    {previous_company_details && previous_company_details?.map((company, index) => <AutocompleteItem key={index}>{company['Company Name']}</AutocompleteItem>)}
                                </Autocomplete> */}
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <DatePicker label="Position Start date" aria-label="Position Start date" onChange={(value) => handleChange('posStDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--")} />
                                <DatePicker label="Position End date" aria-label="Position End date" onChange={(value) => handleChange('posEdDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--")} />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input type="text" label="Location" aria-label="Location" placeholder="Enter work Location" onChange={(e) => handleChange('location', e.target.value)} />
                                {/* <Autocomplete
                                    allowsCustomValue
                                    label="Location"
                                    aria-label="Location"
                                    defaultItems={previous_company_details?.map(location => location['Location'])}
                                    placeholder="Enter work Location"
                                    className="custom-autocomplete-field"
                                    onInputChange={(value) => handleChange('location', value)}
                                >
                                    {previous_company_details && previous_company_details?.map((location, index) => <AutocompleteItem key={index}>{location['Location']}</AutocompleteItem>)}
                                </Autocomplete> */}
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input type="text" label="Location Type" aria-label="Location Type" placeholder="Enter your current Location Type" onChange={(e) => handleChange('locationType', e.target.value)} />
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
                            <div className="flex gap-2 sm:gap-4 mt-10 items-center">
                                <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo - 1); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <BackArrowIcon />
                                </button>
                                <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo + 1); }} className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    Save and Continue
                                </button>
                                <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo + 1); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <FrontArrowIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div className={(wizard === 'professionalProfile' && pageNo === 5) ? "visible" : "hidden"} aria-label="Professional Profile skillset component">
                    <div>
                        <div className="flex gap-2 mt-2">
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                        </div>
                        <small>Completed</small>
                        <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-4 sm:pt-4"></div>
                        <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-2xl pb-5">Skillset</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Select
                                    label="Technology Profile"
                                    aria-label="Technology Profile"
                                    selectionMode="multiple"
                                    placeholder="Enter all Applicable Technology"
                                    selectedKeys={techSkillValues}
                                    onSelectionChange={setTechSkillValues}
                                >
                                    {allTechSkills?.map((skill) => (
                                        <SelectItem key={skill} value={skill}>
                                            {skill}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Select
                                    label="Skills"
                                    aria-label="Skills"
                                    selectionMode="multiple"
                                    placeholder="Enter all Applicable Skills"
                                    selectedKeys={skillValues}
                                    onSelectionChange={setSkillValues}
                                >
                                    {allSkills?.map((skill) => (
                                        <SelectItem key={skill} value={skill}>
                                            {skill}
                                        </SelectItem>
                                    ))}
                                    {/* {unmatchedSkills?.map((skill) => (
                                        <SelectItem key={skill} value={skill}>
                                            {skill}
                                        </SelectItem>
                                    ))} */}
                                </Select>
                            </div>
                            <div className="relative mb-6 mt-0">
                                <figure className="w-full">
                                    <section className="text-md rounded-xl bg-gray-100 p-4 border-l-0 leading-8 tracking-tight text-gray-800">
                                        <div className="flex flex-wrap gap-2">
                                            {skillValues?.size === 0 ? (
                                                <p className="text-md text-gray-600">No Skills Selected</p>
                                            ) : (
                                                <>
                                                    {[...skillValues]?.map((value) => (
                                                        <Chip key={value} variant="flat" onClose={() => handleChipRemove(value)}>
                                                            {value}
                                                        </Chip>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    </section>
                                </figure>
                            </div>

                            <div className="flex gap-2 sm:gap-4 mt-10 items-center">
                                <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo - 1); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <BackArrowIcon />
                                </button>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    {isLoading ? (
                                        <>
                                            <Spinner className="pr-2" color="current" size="sm" /> Submitting...
                                        </>
                                    ) : "Save and Continue"} </button>
                                {/* <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo + 1); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <FrontArrowIcon />
                                </button> */}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </form>
        </>
    )
}

export default ExperienceForm