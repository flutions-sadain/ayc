import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { Input, AutocompleteItem, Autocomplete, DatePicker, Textarea, Select, SelectItem, Slider, Chip, Spinner, Checkbox } from "@nextui-org/react";
import { BackArrowIcon } from "../../components/icons/BackArrowIcon.jsx";
import { FrontArrowIcon } from "../../components/icons/FrontArrowIcon.jsx";
import autoCompleteData from "../../data/autocompleteData.js"
import makeRequest from '../../api/useApi.js';
import { useSelector } from 'react-redux';
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import countryStateData from '../../data/countryStateData.js';

const UserProfile = ({ wizard, pageNo, setPageNo }) => {
    const email = localStorage.getItem('email');
    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(true);
    const [workIsCurrent, setWorkIsCurrent] = useState(false);
    const [educationIsCurrent, setEducationIsCurrent] = useState(false);
    const allSkills = [
        "Python", "Java", "React", "Angular", "Rust", "LLM", "Gen AI", "Django",
        "Fast API", "MySQL", "Data analysis", "Pandas", "Numpy", "GCP", "Github"
    ];

    const [skillValues, setSkillValues] = useState(new Set([]));

    let formatter = useDateFormatter();

    const [resumeData, setResumeData] = useState({
        about: {
            fullName: "",
            gender: "",
            country: "",
            state: "",
            phone: "",
            address: "",
        },
        work_experience: [
            {
                company: "",
                location: "",
                title: "",
                startDate: "",
                endDate: "",
                description: ""
            },
        ],
        education: [
            {
                institution: "",
                location: "",
                degree: "",
                major: "",
                startDate: "",
                endDate: "",
                grade: ""
            }
        ],
        skills: [],
    });

    useEffect(() => {
        fetchCountries();
        console.log("Fetching", resumeData);
    }, [resumeData]);

    const fetchCountries = async () => {
        try {
            const data = countryStateData?.data;
            setCountries(data);
            const selectedCountry = data.find(country => country.name === resumeData.about.country);
            if (selectedCountry) {
                setStates(selectedCountry.states);
            }
        } catch (error) {
            console.error('Error fetching country data:', error);
        } finally {
            setLoadingCountries(false);
        }
    };

    const handleChange = (name, value, section) => {
        setResumeData(prevState => {
            if (section === "about") {
                return {
                    ...prevState,
                    about: {
                        ...prevState.about,
                        [name]: value
                    }
                };
            } else if (section === "work") {
                // Assuming you have logic to handle multiple work experiences
                // Update this logic based on your actual requirements
                let updatedWorkExperience = [...prevState.work_experience];
                updatedWorkExperience[0] = {
                    ...updatedWorkExperience[0],
                    [name]: value
                };
                return {
                    ...prevState,
                    work_experience: updatedWorkExperience
                };
            } else if (section === "education") {
                // Assuming you have logic to handle multiple education entries
                // Update this logic based on your actual requirements
                let updatedEducation = [...prevState.education];
                updatedEducation[0] = {
                    ...updatedEducation[0],
                    [name]: value
                };
                return {
                    ...prevState,
                    education: updatedEducation
                };
            } else if (section === "skills") {
                // Convert Set to Array for skills
                const updatedSkills = Array.from(value);
                setSkillValues(new Set(updatedSkills));
                return {
                    ...prevState,
                    skills: updatedSkills
                };
            }
            return prevState;
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const payload = {
                profile_data: resumeData,
                email: email,
            };

            const response = await makeRequest('post', 'storeProfileData', payload);
            // console.log('Response:', response);
            setPageNo((prevPageNo) => prevPageNo + 1)
        } catch (error) {
            console.error('Error submitting resume data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCountryChange = (countryName) => {
        handleChange('country', countryName, "about");
        const selectedCountry = countries.find(country => country.name === countryName);
        if (selectedCountry) {
            setStates(selectedCountry.states);
        } else {
            setStates([]);
        }
    };

    const handlePhoneNo = (event) => {
        const { value } = event.target;
        let formattedNumber = value.replace(/[^\d]/g, '');
        if (formattedNumber.length > 3 && formattedNumber.length <= 6) {
            formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3)}`;
        } else if (formattedNumber.length > 6) {
            formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3, 6)}-${formattedNumber.slice(6, 10)}`;
        }
        handleChange('phone', formattedNumber, "about");
    };

    const handleChipRemove = (valueToRemove) => {
        const updatedSkillValues = new Set(skillValues);
        updatedSkillValues?.delete(valueToRemove);
        setSkillValues(updatedSkillValues);
        handleChange("skills", updatedSkillValues, "skills")
    };

    const gender = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ]

    const degree = [
        { label: "Bachelors Degree", value: "Bachelors Degree" },
        { label: "Associate Degree", value: "Associate Degree" },
        { label: "Doctoral (PhD)", value: "Doctoral (PhD)" },
        { label: "Professional Degree", value: "Professional Degree" },
        { label: "Diploma", value: "Diploma" },
    ]

    return (
        <>
            <form onSubmit={handleSubmit}>
                <motion.div className={(wizard === 'professionalProfile' && pageNo === 2) ? "visible" : "hidden"} initial={{ x: '0' }} aria-label="Professional Profile contact component">
                    <div>
                        <div className="flex gap-2 mt-2">
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                            <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                        </div>
                        <small>3 remaining to complete</small>
                        <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-4 sm:pt-4"></div>
                        <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-2xl pb-5">Personal Information</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input
                                    type="text"
                                    label="Full Name"
                                    aria-label="Full Name"
                                    placeholder="Enter your Full Name"
                                    labelPlacement="outside"
                                    onChange={(e) => handleChange('fullName', e.target.value, "about")}
                                />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Select
                                    label="Gender Identity"
                                    placeholder="Select your Gender Identity"
                                    labelPlacement="outside"
                                    onChange={(e) => handleChange('gender', e.target.value, "about")}
                                    aria-label="Gender"
                                >
                                    {gender?.map((gender) => (
                                        <SelectItem key={gender.value} value={gender.value}>
                                            {gender.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input
                                    type="text"
                                    label="Address"
                                    aria-label="Address"
                                    placeholder="Enter your Address"
                                    labelPlacement="outside"
                                    onChange={(e) => handleChange('address', e.target.value, "about")}
                                />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Select
                                    label="Country"
                                    placeholder="Select your Country"
                                    labelPlacement="outside"
                                    onChange={(e) => handleCountryChange(e.target.value)}
                                    aria-label="Country"
                                >
                                    {loadingCountries ? (
                                        <SelectItem disabled key="loading" value="loading">
                                            Loading countries...
                                        </SelectItem>
                                    ) : (
                                        countries?.map((country) => (
                                            <SelectItem key={country.name} value={country.name}>
                                                {country.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </Select>
                                <Select
                                    label="State"
                                    placeholder="Select your State"
                                    labelPlacement="outside"
                                    onChange={(e) => handleChange('state', e.target.value, "about")}
                                    isDisabled={!resumeData.about?.country}
                                    aria-label="State"
                                >
                                    {
                                        resumeData?.about.country ? (
                                            states?.length ? (
                                                states?.map((state) => (
                                                    <SelectItem key={state.name} value={state.name}>
                                                        {state.name}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem disabled key="no-states" value="no-states">
                                                    No states available
                                                </SelectItem>
                                            )
                                        ) : (
                                            <SelectItem disabled key="select-country" value="select-country">
                                                Select Country
                                            </SelectItem>
                                        )}
                                </Select>
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input
                                    clearable
                                    bordered
                                    label="Phone Number"
                                    placeholder="999-999-9999"
                                    aria-label="Phone Number"
                                    labelPlacement="outside"
                                    value={resumeData?.about?.phone}
                                    onChange={handlePhoneNo}
                                    type="tel"
                                    status={resumeData?.about?.phone?.length === 12 ? 'success' : 'default'}
                                />
                            </div>
                            <div className="flex gap-2 sm:gap-4 mt-10 items-center">
                                <button type="button" onClick={() => { setPageNo(prevPageNo => prevPageNo - 2); }} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <BackArrowIcon />
                                </button>
                                <button type="button" onClick={() => setPageNo((prevPageNo) => prevPageNo + 1)} className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    Save and Continue
                                </button>
                                <button type="button" onClick={() => setPageNo((prevPageNo) => prevPageNo + 1)} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" >
                                    <FrontArrowIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
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
                                <Input
                                    type="text"
                                    label="School/College"
                                    aria-label="School/College"
                                    placeholder="Enter your School/College"
                                    labelPlacement="outside"
                                    onChange={(e) => handleChange("institution", e.target.value, "education")}
                                />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Select
                                    label="Degree"
                                    aria-label="Degree"
                                    placeholder="Select Your Degree"
                                    labelPlacement="outside"
                                    onSelectionChange={(value) => handleChange('degree', value.currentKey, "education")}
                                >
                                    {degree?.map((degree) => (
                                        <SelectItem key={degree.value} value={degree.value}>
                                            {degree.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input
                                    type="text"
                                    label="Major"
                                    aria-label="Major"
                                    placeholder="Enter your Major / Field of Study"
                                    labelPlacement="outside"
                                    onChange={(e) => handleChange("major", e.target.value, "education")}
                                />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input
                                    type="text"
                                    label="Location"
                                    aria-label="Location"
                                    placeholder="Enter your Location"
                                    labelPlacement="outside"
                                    onChange={(e) => handleChange("location", e.target.value, "education")}
                                />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <DatePicker
                                    label="Start date"
                                    aria-label="Start date"
                                    labelPlacement="outside"
                                    onChange={(value) => handleChange('startDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--", "education")}
                                />
                                <DatePicker
                                    label="End date"
                                    aria-label="End date"
                                    labelPlacement="outside"
                                    onChange={(value) => handleChange('endDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--", "education")}
                                    isDisabled={educationIsCurrent}
                                />
                            </div>
                            <Checkbox
                                isSelected={educationIsCurrent}
                                onChange={(e) => {
                                    setEducationIsCurrent(e.target.checked);
                                    if (e.target.checked) {
                                        handleChange("endDate", "present", "education");
                                    } else {
                                        handleChange("endDate", "--", "education");
                                    }
                                }}
                            >
                                I currently pursuing
                            </Checkbox>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input
                                    type="text"
                                    label="Grade"
                                    aria-label="Grade"
                                    placeholder="Enter your Grade 8.5/10 or 85%"
                                    labelPlacement="outside"
                                    onChange={(e) => handleChange("grade", e.target.value, "education")}
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
                                <Input
                                    type="text"
                                    label="Company"
                                    aria-label="Company"
                                    placeholder="Enter your Company"
                                    labelPlacement="outside"
                                    onChange={(e) => handleChange("company", e.target.value, "work")}
                                />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input
                                    type="text"
                                    label="Title"
                                    aria-label="Title"
                                    placeholder="Enter your Designation/Role"
                                    labelPlacement="outside"
                                    onChange={(e) => handleChange("title", e.target.value, "work")}
                                />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <DatePicker
                                    label="Position Start date"
                                    aria-label="Position Start date"
                                    labelPlacement="outside"
                                    onChange={(value) => handleChange('startDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--", "work")}
                                />
                                <DatePicker
                                    label="Position End date"
                                    aria-label="Position End date"
                                    labelPlacement="outside"
                                    onChange={(value) => handleChange('endDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--", "work")}
                                    isDisabled={workIsCurrent}
                                />
                            </div>
                            <Checkbox
                                isSelected={workIsCurrent}
                                onChange={(e) => {
                                    setWorkIsCurrent(e.target.checked);
                                    if (e.target.checked) {
                                        handleChange("endDate", "present", "work");
                                    } else {
                                        handleChange("endDate", "--", "work");
                                    }
                                }}
                            >
                                I currently work here
                            </Checkbox>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input
                                    type="text"
                                    label="Location"
                                    aria-label="Location"
                                    placeholder="Enter your Location"
                                    labelPlacement="outside"
                                    onChange={(e) => handleChange("location", e.target.value, "work")}
                                />
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Textarea
                                    label="Description"
                                    aria-label="Description"
                                    labelPlacement="outside"
                                    placeholder="Tell More about your Work Experience"
                                    onChange={(e) => handleChange("description", e.target.value, "work")}
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
                                    label="Skills"
                                    aria-label="Skills"
                                    selectionMode="multiple"
                                    placeholder="Enter all Applicable Skills"
                                    selectedKeys={skillValues}
                                    onSelectionChange={(value) => handleChange("skills", value, "skills")}
                                >
                                    {allSkills?.map((skill) => (
                                        <SelectItem key={skill} value={skill}>
                                            {skill}
                                        </SelectItem>
                                    ))}
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
                            </div>
                        </div>
                    </div>
                </motion.div>
            </form>
        </>
    )
}

export default UserProfile;