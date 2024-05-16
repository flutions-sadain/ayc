import { motion, useAnimation, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react';
import {
    CircularProgress,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Button,
    CardBody,
    Card,
    Tab,
    AutocompleteItem,
    Autocomplete,
    Pagination,
    DatePicker,
    Textarea,
    Select,
    SelectItem,
    Slider,
    Chip,
    Code
} from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon.jsx";
import { AcmeLogo } from "../icons/AcmeLogo.jsx";
import logo from "/images/logo-white.svg";
import { Tabs } from "@mui/material";
import { BackArrowIcon } from "../icons/BackArrowIcon.jsx";
import { FrontArrowIcon } from "../icons/FrontArrowIcon.jsx";
import autoCompleteData from "../../data/autocompleteData.js"


function Home() {
    const controls = useAnimation();
    const allSkills = ["Python", "Java", "React", "Angular", "Rust", "LLM", "Gen AI", "Django", "Fast API", "Data science", "Deep Learning", "Machine Learning", "MySQL", "Data analysis", "Pandas", "Numpy", "GCP", "Github"];
    const allTechSkills = ["Mobile App","Data science", "Deep Learning", "Machine Learning", "Data analysis", "Github"];
    const [fruits, setFruits] = useState(allSkills);
    const [isLoaded, setIsLoaded] = useState(false);
    const [phone, setPhone] = useState('');
    const [wizard, setWizard] = useState("userOnboarding");
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState(null);


    const { name, email, phonenumber, skills, previous_company_details, } = autoCompleteData.summary;

    const [skillValues, setSkillValues] = useState(new Set(skills));
    const [techSkillValues, settechSkillValues] = useState("");

    const handleChipRemove = (valueToRemove) => {
        const updatedskillValues = new Set(skillValues);
        updatedskillValues.delete(valueToRemove);
        setSkillValues(updatedskillValues);
    };

    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };
    const [value, setValue] = useState(0);
    const [timer, setTimer] = useState(0);
    const handleChange = (event) => {
        const { value } = event.target;
        let formattedNumber = value.replace(/[^\d]/g, ''); // Remove non-numeric chars
        if (formattedNumber.length > 3 && formattedNumber.length <= 6) {
            formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3)}`;
        } else if (formattedNumber.length > 6) {
            formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3, 6)}-${formattedNumber.slice(6, 10)}`;
        }
        setPhone(formattedNumber); // Update the state
    };

    const [pageNo, setPageNo] = useState(1);

    const handleClose = (fruitToRemove) => {
        setFruits(fruits.filter(fruit => fruit !== fruitToRemove));
        if (fruits.length === 1) {
            setFruits(allSkills);
        }
    };


    const animals = [
        { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
        { label: "Dog", value: "dog", description: "The most popular pet in the world" },
        { label: "Elephant", value: "elephant", description: "The largest land animal" },
        { label: "Lion", value: "lion", description: "The king of the jungle" },
        { label: "Tiger", value: "tiger", description: "The largest cat species" },
        { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
        { label: "Dolphin", value: "dolphin", description: "A widely distributed and diverse group of aquatic mammals" },
        { label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds" },
        { label: "Zebra", value: "zebra", description: "A several species of African equids" },
        { label: "Shark", value: "shark", description: "A group of elasmobranch fish characterized by a cartilaginous skeleton" },
        { label: "Whale", value: "whale", description: "Diverse group of fully aquatic placental marine mammals" },
        { label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae" },
        { label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile" },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 500);
        controls.start({ x: '100vw' });

        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 1000);


        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };

    }, [controls]);

    useEffect(() => {
        if (pageNo === 1) {
            setWizard('userOnboarding');
        } else if (pageNo >= 2 && pageNo <= 5) {
            setWizard('professionalProfile');
        } else if (pageNo >= 6 && pageNo <= 6) {
            setWizard('skillTest');
        } else {
            setWizard('finish');
        }
    }, [pageNo]);

    const startAnimation = () => {
        controls.start({
            x: 0,
            transition: { type: 'spring', stiffness: 60, damping: 20 }
        });
    };

    const divVariants = {
        hidden: { y: "100%" }, // start from the bottom
        visible: {
            y: "0%", // end at the top
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    const calculateTopPosition = (currentWizard) => {
        switch (currentWizard) {
            case 'userOnboarding':
                return '0';
            case 'professionalProfile':
                return '-200px';
            case 'skillTest':
                return '-400px';
            case 'finish':
                return '-600px';
            default:
                return '0';
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setFile(files[0]);
        }
    };

    return (
        <>
            <div className="bg-white">
                <motion.div>
                    <Navbar classNames={{
                        item: [
                            "flex",
                            "relative",
                            "h-full",
                            "items-center",
                            "data-[active=true]:after:content-['']",
                            "data-[active=true]:after:absolute",
                            "data-[active=true]:after:bottom-0",
                            "data-[active=true]:after:left-0",
                            "data-[active=true]:after:right-0",
                            "data-[active=true]:after:h-[2px]",
                            "data-[active=true]:after:rounded-[2px]",
                            "data-[active=true]:after:bg-primary",
                        ],
                    }} maxWidth="full" className="px-10" style={{ backgroundColor: "#000", color: "#fff" }}>
                        <NavbarContent>
                            <NavbarBrand className="max-w-md w-max">
                                <Link to="/">
                                    <img src={logo} alt={"Advance Your Career"}
                                        className="brand h-[100px] w-[100px]"></img>
                                </Link>
                            </NavbarBrand>
                            <NavbarContent className="hidden sm:flex gap-8 text-white" justify="center">
                                <NavbarItem className="text-white" isActive>
                                    <Link aria-current="Home" href="#" className="text-white">
                                        Home
                                    </Link>
                                </NavbarItem>
                                <NavbarItem className="text-white">
                                    <Link href="#" aria-current="Resumes" className="text-white">
                                        Courses
                                    </Link>
                                </NavbarItem>
                                <NavbarItem className="text-white">
                                    <Link href="#" aria-current="Resumes" className="text-white">
                                        Resumes
                                    </Link>
                                </NavbarItem>
                                <NavbarItem className="text-white">
                                    <Link className="text-white" href="#">
                                        Interview
                                    </Link>
                                </NavbarItem>
                                <NavbarItem className="text-white">
                                    <Link className="text-white" href="#">
                                        Assessments
                                    </Link>
                                </NavbarItem>
                                <NavbarItem className="text-white">
                                    <Link className="text-white" href="#">
                                        Workshop
                                    </Link>
                                </NavbarItem>
                                <NavbarItem className="text-white">
                                    <Link className="text-white" href="#">
                                        Contest
                                    </Link>
                                </NavbarItem>
                            </NavbarContent>
                        </NavbarContent>
                        <NavbarContent className="hidden sm:flex text-white" justify="end">
                            <Input
                                classNames={{
                                    base: "max-w-full sm:max-w-[32rem] h-10",
                                    mainWrapper: "h-full",
                                    input: "text-small",
                                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                }}
                                placeholder="Search Anything on AYC..."
                                size="md"
                                startContent={<SearchIcon size={18} />}
                                type="search"
                            />
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        color="secondary"
                                        name="Jason Hughes"
                                        size="sm"
                                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Signed in as</p>
                                        <p className="font-semibold">udaya.rkrish@gmail.com</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings">Account</DropdownItem>
                                    <DropdownItem key="team_settings">Subscriptions</DropdownItem>
                                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                    <DropdownItem key="logout" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarContent>
                    </Navbar>
                </motion.div>

                <div className="relative isolate bg-white" style={{ height: 'calc(100vh - 4rem)' }}>
                    <div className="mx-auto grid max-w-full grid-cols-1 lg:grid-cols-2">
                        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                                <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2" style={{ top: calculateTopPosition(wizard) }}>
                                    <div className="py-24 sm:py-32 p-40">
                                        <div className="flow-root">
                                            <ul role="list" className="-mb-8">
                                                <motion.div
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={textVariants}
                                                >
                                                    <li>
                                                        <div className="relative pb-8">
                                                            <span
                                                                className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                                                                aria-hidden="true"></span>
                                                            <div className="relative flex items-start space-x-6">
                                                                <div className="relative -ml-2">
                                                                    <div
                                                                        className={wizard === 'userOnboarding' ? 'flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white' : 'flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white'}>
                                                                        <img
                                                                            src={wizard === 'userOnboarding' ? "/images/handshake.svg" : '/images/handshake-white.svg'}
                                                                            alt="Handshake"
                                                                            className="h-10 w-10" />
                                                                    </div>
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="mx-auto max-w-full px-6 lg:px-8">
                                                                        <div className="mx-auto max-w-2xl lg:mx-0">
                                                                            <motion.h2 initial="initial"
                                                                                animate={isLoaded && wizard === 'userOnboarding' ? {
                                                                                    fontSize: "4em",
                                                                                    opacity: 1
                                                                                } : {
                                                                                    fontSize: "3.7em",
                                                                                    opacity: 0.25
                                                                                }}
                                                                                transition={{
                                                                                    type: 'spring',
                                                                                    stiffness: 100
                                                                                }}
                                                                                className="text-7xl font-bold tracking-tight text-gray-900 sm:text-7xl">User
                                                                                Onboarding
                                                                            </motion.h2>
                                                                            <p className={wizard === 'userOnboarding' ? "mt-6 text-lg leading-8 text-gray-600" : "mt-6 text-lg leading-8 text-gray-200"}>
                                                                                Upload your resume and to create you
                                                                                professional profile with AYC. We will
                                                                                help you to get your dream job.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </motion.div>
                                                <motion.div
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={textVariants}
                                                >
                                                    <li>
                                                        <div className="relative pb-8">
                                                            <span
                                                                className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                                                                aria-hidden="true"></span>
                                                            <div className="relative flex items-start space-x-3">
                                                                <div className="relative -ml-2">
                                                                    <div
                                                                        className={wizard === 'professionalProfile' ? 'flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white' : 'flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white'}>
                                                                        <img
                                                                            src={wizard === 'professionalProfile' ? "/images/pro.svg" : '/images/pro-white.svg'}
                                                                            alt="Handshake"
                                                                            className="h-10 w-10" />
                                                                    </div>
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="mx-auto max-w-full px-6 lg:px-8">
                                                                        <div className="mx-auto max-w-2xl lg:mx-0">
                                                                            <motion.h2 initial="initial"
                                                                                animate={isLoaded && wizard === 'professionalProfile' ? {
                                                                                    fontSize: "4em",
                                                                                    opacity: 1
                                                                                } : {
                                                                                    fontSize: "3.7em",
                                                                                    opacity: 0.25
                                                                                }}
                                                                                transition={{
                                                                                    type: 'spring',
                                                                                    stiffness: 100
                                                                                }}
                                                                                className="text-xl font-bold tracking-tight text-gray-900 sm:text-6xl">Professional
                                                                                Profile
                                                                            </motion.h2>
                                                                            <p className={wizard === 'professionalProfile' ? "mt-6 text-lg leading-8 text-gray-600" : "mt-6 text-lg leading-8 text-gray-200"}>
                                                                                Create your Technical Skills,
                                                                                Profession, experience & career interest
                                                                                profile with AYC.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </motion.div>
                                                <motion.div
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={textVariants}
                                                >
                                                    <li>
                                                        <div className="relative pb-8">
                                                            <span
                                                                className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                                                                aria-hidden="true"></span>
                                                            <div className="relative flex items-start space-x-3">
                                                                <div className="relative -ml-2">
                                                                    <div
                                                                        className={wizard === 'skillTest' ? 'flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white' : 'flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white'}>
                                                                        <img
                                                                            src={wizard === 'skillTest' ? "/images/skill.svg" : '/images/skill-white.svg'}
                                                                            alt="Handshake"
                                                                            className="h-10 w-10" />
                                                                    </div>
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="mx-auto max-w-full px-6 lg:px-8">
                                                                        <div className="mx-auto max-w-2xl lg:mx-0">
                                                                            <motion.h2 initial="initial"
                                                                                animate={isLoaded && wizard === 'skillTest' ? {
                                                                                    fontSize: "4em",
                                                                                    opacity: 1
                                                                                } : {
                                                                                    fontSize: "3.7em",
                                                                                    opacity: 0.25
                                                                                }}
                                                                                transition={{
                                                                                    type: 'spring',
                                                                                    stiffness: 100
                                                                                }}
                                                                                className="text-xl font-bold tracking-tight text-gray-900 sm:text-6xl">Skill
                                                                                Test
                                                                            </motion.h2>
                                                                            <p className={wizard === 'skillTest' ? "mt-6 text-lg leading-8 text-gray-600" : "mt-6 text-lg leading-8 text-gray-200"}>
                                                                                Take the MCQ test to know your skill
                                                                                level,
                                                                                So AYC can tailor the Professional
                                                                                growth
                                                                                recommendation for you.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </motion.div>
                                                <motion.div
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={textVariants}
                                                >
                                                    <motion.li
                                                        initial="hidden"
                                                        animate="visible"
                                                        variants={textVariants}
                                                    >
                                                        <div className="relative pb-8">
                                                            <span
                                                                className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                                                                aria-hidden="true"></span>
                                                            <div className="relative flex items-start space-x-3">
                                                                <div className="relative -ml-2">
                                                                    <div
                                                                        className={wizard === 'finish' ? 'flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white' : 'flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white'}>
                                                                        <img
                                                                            src={wizard === 'finish' ? "/images/fin.svg" : '/images/fin-white.svg'}
                                                                            alt="Handshake"
                                                                            className="h-10 w-10" />
                                                                    </div>
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="mx-auto max-w-full px-6 lg:px-8">
                                                                        <div className="mx-auto max-w-2xl lg:mx-0">
                                                                            <motion.h2 initial="initial"
                                                                                animate={isLoaded && wizard === 'finish' ? {
                                                                                    fontSize: "4em",
                                                                                    opacity: 1
                                                                                } : {
                                                                                    fontSize: "3.7em",
                                                                                    opacity: 0.25
                                                                                }}
                                                                                transition={{
                                                                                    type: 'spring',
                                                                                    stiffness: 100
                                                                                }}
                                                                                className="text-xl font-bold tracking-tight text-gray-900 sm:text-6xl">Finish
                                                                            </motion.h2>
                                                                            <p className={wizard === 'finish' ? "mt-6 text-lg leading-8 text-gray-600" : "mt-6 text-lg leading-8 text-gray-200"}>
                                                                                You are all set to get your dream job.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.li>
                                                </motion.div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>

                            <motion.div className={(wizard === 'userOnboarding' && pageNo === 1) ? "visible" : "hidden"} initial={{ x: '0' }}>
                                <div className="mx-auto min-w-full lg:mr-0">
                                    <div className="relative min-w-full place-items-center p-40">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Personal
                                            Information</h2>
                                        <p className="mt-2 text-lg leading-8 text-gray-600">Please provide your contact
                                            information</p>
                                        <div
                                            className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Autocomplete
                                                    allowsCustomValue
                                                    label="Full Name"
                                                    defaultItems={name ? [name] : []}
                                                    placeholder="Enter your Full Name"
                                                    className="custom-autocomplete-field"
                                                >
                                                    {name && <AutocompleteItem>{name}</AutocompleteItem>}
                                                </Autocomplete>
                                                {/* <Input type="text" label="First Name"
                                                    placeholder="Enter your First Name" />
                                                <Input type="text" label="Last Name"
                                                    placeholder="Enter your Last Name" /> */}
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Autocomplete
                                                    allowsCustomValue
                                                    label="Email"
                                                    defaultItems={email ? [email] : []}
                                                    placeholder="Enter your Email"
                                                    className="custom-autocomplete-field"
                                                >
                                                    {email && <AutocompleteItem>{email}</AutocompleteItem>}
                                                </Autocomplete>
                                                {/* <Input type="email" label="Email"
                                                    placeholder="Enter your Email" /> */}
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Autocomplete
                                                    label="Sex"
                                                    defaultItems={animals}
                                                    placeholder="Select your Sex"
                                                >
                                                    <AutocompleteItem>Male</AutocompleteItem>
                                                    <AutocompleteItem>Female</AutocompleteItem>
                                                    <AutocompleteItem>Other</AutocompleteItem>
                                                </Autocomplete>
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="Address"
                                                    placeholder="Enter your Address" />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="Address Line 2"
                                                    placeholder="Enter your Address Line 2" />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Autocomplete
                                                    label="Country"
                                                    placeholder="Select your Country"
                                                    className="max-w-xs"
                                                    defaultItems={animals}
                                                >
                                                    {(item) => <AutocompleteItem
                                                        key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
                                                <Input type="text" label="State"
                                                    placeholder="Enter Your State" />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input
                                                    clearable
                                                    bordered
                                                    label="Phone Number"
                                                    placeholder="Enter your phone number"
                                                    value={phone}
                                                    onChange={handleChange}
                                                    type="tel"
                                                    status={phone.length === 12 ? 'success' : 'default'} // Basic validation for US phone numbers
                                                />
                                                {/* <Autocomplete
                                                    allowsCustomValue
                                                    label="Phone Number"
                                                    defaultItems={phonenumber ? [phonenumber] : []}
                                                    // status={phone.length === 12 ? 'success' : 'default'}
                                                    placeholder="Enter your Phone Number"
                                                    className="custom-autocomplete-field"
                                                    onInputChange={onInputChange}
                                                >
                                                    {phonenumber && <AutocompleteItem>{phonenumber}</AutocompleteItem>}
                                                </Autocomplete> */}
                                            </div>
                                            <div className="flex gap-4 mt-10 items-center">
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Save
                                                    and Continue
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <FrontArrowIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </motion.div>

                            <motion.div className={(wizard === 'professionalProfile' && pageNo === 2) ? "visible" : "hidden"}>
                                <div className="mx-auto min-w-full lg:mr-0">
                                    <div className="mx-auto min-w-full lg:mr-0">
                                        <div className="relative min-w-full place-items-center p-40">
                                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Resume</h2>
                                            <p className="mt-2 text-lg leading-8 text-gray-600">Upload your Resume or a
                                                curriculum Vitae</p>
                                            <div className="flex gap-2 mt-4">
                                                <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                                <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                                <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                                <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                            </div>
                                            <small>3 remaining to complete</small>
                                            <div
                                                className="mt-10 space-y-4 border-t border-gray-200 pt-5 max-sm:mt-16 max-sm:pt-16">
                                            </div>

                                            <div className="relative py-4 mb-6 mt-0">
                                                <figure className="w-full">
                                                    <section
                                                        className="text-md rounded-2xl bg-gray-100 p-10 border-l-0 leading-8 tracking-tight text-gray-800">
                                                        <p>
                                                            You can upload your resume to our AYC portal to build your
                                                            Academic and Professional Profile with us for Tailored
                                                            Opportunities, Streamlined Process and professional visibility.
                                                        </p>
                                                    </section>
                                                </figure>
                                            </div>

                                            <div className="mx-auto max-w-full">
                                                <label
                                                    className={`flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-1.5 border-dashed ${dragging ? 'border-slate-800' : 'border-gray-400'} p-6 transition-all`}
                                                    onDragOver={handleDragOver}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={handleDrop}
                                                >
                                                    <div className="space-y-1 text-center">
                                                        <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" strokeWidth="1.5"
                                                                stroke="currentColor" className="h-6 w-6 text-gray-500">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                                            </svg>
                                                        </div>
                                                        {file ? (
                                                            <>
                                                                <div className="text-gray-600 flex flex-wrap">
                                                                    <h6 className="text-sm font-medium"><span className="text-primary-500 hover:text-primary-700">Click to upload </span> or drag and drop</h6>

                                                                </div>
                                                                <p className="text-md font-bold text-gray-500">{file?.name}</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="text-gray-600">
                                                                    <a href="#" className="font-medium text-primary-500 hover:text-primary-700">
                                                                        Click to upload
                                                                    </a> or drag and drop
                                                                </div>
                                                                <p className="text-sm text-gray-500">Upload valid .pdf or .docx</p>
                                                            </>
                                                        )}
                                                    </div>
                                                    <input id="example5" type="file" className="sr-only" onChange={handleFileChange} />
                                                </label>
                                            </div>

                                            <div className="flex gap-4 mt-10 items-center">
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo - 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <BackArrowIcon />
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Save
                                                    and Continue
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <FrontArrowIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className={(wizard === 'professionalProfile' && pageNo === 3) ? "visible" : "hidden"}>
                                <div className="mx-auto min-w-full lg:mr-0">
                                    <div className="relative min-w-full place-items-center p-40">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Educational
                                            Experience</h2>
                                        <p className="mt-2 text-lg leading-8 text-gray-600">Update your Highest degrees,
                                            specialization and
                                            institution</p>
                                        <div className="flex gap-2 mt-4">
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                        </div>
                                        <small>2 remaining to complete</small>
                                        <div
                                            className="mt-2 space-y-16 border-t border-gray-200 pt-10 sm:mt-2 sm:pt-16">
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="School/College"
                                                    placeholder="Please Enter Name of School or College"></Input>
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="University"
                                                    placeholder="Please Enter Name of University"></Input>
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Autocomplete
                                                    label="Degree"
                                                    defaultItems={animals}
                                                    placeholder="Select Your Degree">
                                                    <AutocompleteItem>Masters Degree</AutocompleteItem>
                                                    <AutocompleteItem>Bachelors Degree</AutocompleteItem>
                                                    <AutocompleteItem>Associate Degree</AutocompleteItem>
                                                    <AutocompleteItem>Doctoral (PhD)</AutocompleteItem>
                                                    <AutocompleteItem>Professional Degree</AutocompleteItem>
                                                    <AutocompleteItem>Diploma</AutocompleteItem>
                                                </Autocomplete>
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <DatePicker label="Degree Start date" />
                                                <DatePicker label="Degree End date" />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="Grade"
                                                    placeholder="Enter your Grade or Score"></Input>
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="Activities and Societies"
                                                    placeholder="Ex. Sports Team, Groups, Accolades etc."></Input>
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Textarea
                                                    label="Description"
                                                    placeholder="Tell More about your Educational Experience"
                                                />
                                            </div>
                                            <div className="flex gap-4 mt-10 items-center">
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo - 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <BackArrowIcon />
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Save
                                                    and Continue
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <FrontArrowIcon />
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className={(wizard === 'professionalProfile' && pageNo === 4) ? "visible" : "hidden"}>
                                <div className="mx-auto min-w-full lg:mr-0">
                                    <div className="relative min-w-full place-items-center p-40">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Professional
                                            Experience</h2>
                                        <p className="mt-2 text-lg leading-8 text-gray-600">Update Your Work Experience</p>
                                        <div className="flex gap-2 mt-4">
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                        </div>
                                        <small>1 remaining to complete</small>
                                        <div
                                            className="mt-2 space-y-16 border-t border-gray-200 pt-10 sm:mt-2 sm:pt-16">
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Autocomplete
                                                    allowsCustomValue
                                                    label="Title"
                                                    defaultItems={previous_company_details.map(role => role['Role'])}
                                                    placeholder="Enter your Designation/Role"
                                                    className="custom-autocomplete-field"
                                                >
                                                    {previous_company_details.map((role, index) => <AutocompleteItem key={index}>{role['Role']}</AutocompleteItem>)}
                                                </Autocomplete>
                                                {/* <Input type="text" label="Title"
                                                    placeholder="Enter your Designation/Role"></Input> */}
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="Employment Type"
                                                    placeholder="Please Enter Employment Type"></Input>
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Autocomplete
                                                    allowsCustomValue
                                                    label="Previous Company"
                                                    defaultItems={previous_company_details.map(company => company['Company Name'])}
                                                    placeholder="Enter your Previous Company"
                                                    className="custom-autocomplete-field"
                                                >
                                                    {previous_company_details.map((company, index) => <AutocompleteItem key={index}>{company['Company Name']}</AutocompleteItem>)}
                                                </Autocomplete>
                                                {/* <Input type="text" label="Company name"
                                                    placeholder="Enter Company Name"></Input> */}
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <DatePicker showMonthAndYearPickers label="Position Start date" />
                                                <DatePicker showMonthAndYearPickers label="Position End date" />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Autocomplete
                                                    allowsCustomValue
                                                    label="Location"
                                                    defaultItems={previous_company_details.map(location => location['Location'])}
                                                    placeholder="Enter work Location"
                                                    className="custom-autocomplete-field"
                                                >
                                                    {previous_company_details.map((location, index) => <AutocompleteItem key={index}>{location['Location']}</AutocompleteItem>)}
                                                </Autocomplete>
                                                {/* <Input type="text" label="Location"
                                                    placeholder="Enter Work Location"></Input> */}
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="Location Type"
                                                    placeholder="Enter your current Location Type"></Input>
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Slider
                                                    label="Total Years of Experience"
                                                    step={1}
                                                    maxValue={25}
                                                    minValue={0}
                                                    defaultValue={[0, 800]}
                                                    showSteps={true}
                                                    showTooltip={true}
                                                    showOutline={true}
                                                    disableThumbScale={true}
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
                                            <div className="flex gap-4 mt-10 items-center">
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo - 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <BackArrowIcon />
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Save
                                                    and Continue
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <FrontArrowIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className={(wizard === 'professionalProfile' && pageNo === 5) ? "visible" : "hidden"}>
                                <div className="mx-auto min-w-full lg:mr-0">
                                    <div className="relative min-w-full place-items-center p-40">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Skillset</h2>
                                        <p className="mt-2 text-lg leading-8 text-gray-600">Choose all relevant skills
                                            applies to your profile</p>
                                        <div className="flex gap-2 mt-4">
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                        </div>
                                        <div
                                            className="mt-2 space-y-16 border-t border-gray-200 pt-10 sm:mt-2 sm:pt-16">
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Select
                                                    label="Technology Profile"
                                                    selectionMode="multiple"
                                                    placeholder="Enter all Applicable Technology"
                                                    defaultItems={techSkillValues}
                                                >
                                                    {allTechSkills.map((skill) => (
                                                        <SelectItem key={skill} value={skill}>
                                                            {skill}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Select
                                                    label="Skills"
                                                    selectionMode="multiple"
                                                    placeholder="Enter all Applicable Skills"
                                                    selectedKeys={skillValues}
                                                    onSelectionChange={setSkillValues}
                                                >
                                                    {allSkills.map((skill) => (
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
                                                            {skillValues.size === 0 ? (
                                                                <p className="text-md text-gray-600">No Skills Selected</p>
                                                            ) : (
                                                                <>
                                                                    {[...skillValues].map((value) => (
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

                                            <div className="flex gap-4 mt-10 items-center">
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo - 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <BackArrowIcon />
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Save
                                                    and Continue
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <FrontArrowIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className={(wizard === 'skillTest' && pageNo === 6) ? "visible" : "hidden"} initial={{ x: '0' }}>
                                <div className="mx-auto min-w-full lg:mr-0">
                                    <div className="relative min-w-full place-items-center p-40">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Online
                                            Skill Evaluation
                                            {/* <span
                                            className="ml-20 text-lg leading-8 text-gray-600">{Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</span>*/}

                                        </h2>
                                        <p className="mt-2 text-lg leading-8 text-gray-600">Quick Skill assessment exams
                                            through Multiple Choice Questions</p>
                                        <div className="flex gap-2 mt-4">
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-primary"></span>
                                            <span className="mb-2 h-[15px] flex-1 rounded-xl bg-gray-900"></span>
                                        </div>
                                        <span className="w-[1px] h-24 bg-gray-400"></span>

                                        <div className="flex items-start justify-start mt-4">
                                            <div
                                                className="flex max-w-fit p-3 rounded-xl  align-middle mt-2"
                                                x-data="timer(new Date().setDate(new Date().getDate() + 1))"
                                                x-init="init();">
                                                <div className="flex flex-col items-center px-2">
                                                    <span
                                                        className="text-xl lg:text-xl">{Math.floor(timer / 60)}</span>
                                                    <span className="text-gray-400">Mins</span>
                                                </div>
                                                <span className="w-[1px] h-16 bg-gray-800"></span>
                                                <div className="flex flex-col items-center px-2">
                                                    <span
                                                        className="text-xl lg:text-xl">{timer % 60 < 10 ? '0' : ''}{timer % 60}</span>
                                                    <span className="text-gray-400">Secs</span>
                                                </div>
                                            </div>

                                            <div className="relative ml-auto place-items-center align-middle mt-auto">
                                                <CircularProgress
                                                    classNames={{
                                                        svg: "w-24 h-24 drop-shadow-md",
                                                        indicator: "stroke-primary",
                                                        track: "stroke-primary/10",
                                                        value: "text-lg font-semibold text-black",
                                                    }}
                                                    aria-label="Loading..."
                                                    size="xl"
                                                    value={value}
                                                    color="primary"
                                                    showValueLabel={true}
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="mt-8 space-y-16 border-t border-gray-200 pt-10 sm:mt-8 sm:pt-8">
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="lg:col-span-5">
                                                <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                                                    1. What is the output of the code below?</h2>
                                                <Code className="m-3">
                                                    def calculate_difference(lst):<br></br>
                                                    return max(lst) - min(lst)<br></br>
                                                    <br></br>
                                                    numbers = [10, 20, 30, 40, 50]<br></br>
                                                    result = calculate_difference(numbers)<br></br>
                                                    print(result)<br></br>
                                                </Code>
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">

                                                <div className="relative space-y-2 w-full">
                                                    <label htmlFor="option-1"
                                                        className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                                                        <input type="checkbox"
                                                            className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                            id="option-1" />
                                                        <span
                                                            className="text-sm text-gray-500 ms-3 dark:text-neutral-400">40</span>
                                                    </label>

                                                    <label htmlFor="option-2"
                                                        className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                                                        <input type="checkbox"
                                                            className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                            id="option-2" />
                                                        <span
                                                            className="text-sm text-gray-500 ms-3 dark:text-neutral-400">50</span>
                                                    </label>
                                                    <label htmlFor="option-3"
                                                        className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                                                        <input type="checkbox"
                                                            className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                            id="option-3" />
                                                        <span
                                                            className="text-sm text-gray-500 ms-3 dark:text-neutral-400">10</span>
                                                    </label>

                                                    <label htmlFor="option-4"
                                                        className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                                                        <input type="checkbox"
                                                            className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                            id="option-4" />
                                                        <span
                                                            className="text-sm text-gray-500 ms-3 dark:text-neutral-400">30</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="flex gap-4 mt-10 items-center">
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo - 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <BackArrowIcon />
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Save
                                                    and Continue
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <FrontArrowIcon />
                                                </button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className={(wizard === 'finish' && pageNo === 7) ? "visible" : "hidden"} initial={{ x: '0' }}>
                                <div className="mx-auto min-w-full lg:mr-0">
                                    <div className="relative min-w-full place-items-center p-40">
                                        <div className="flex items-center">
                                            <img
                                                src={wizard === 'finish' ? "/images/success.svg" : '/images/fin-white.svg'}
                                                alt="Handshake"
                                                className="h-12 w-12 mb-5" />
                                        </div>
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Onboarding
                                            Complete</h2>
                                        <p className="mt-2 text-lg leading-8 text-gray-600">Tailored Roadmap for your Career
                                            with us</p>
                                        <div
                                            className="mt-5 space-y-8 border-t border-gray-200 pt-10 sm:mt-8 sm:pt-8">
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <p className="text-sm max-w-full bg-gray-100 p-4 rounded-2xl p-">Your
                                                Score is better than 57% of similar Profiles! Keep
                                                it going!</p>
                                            <div className="border-t border-gray-100">
                                                <dl className="divide-y divide-gray-100">

                                                    <div
                                                        className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                                        <dt className="text-sm font-medium leading-6 place-items-center text-gray-900 my-auto">Overall
                                                            Assessment Score
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                            <CircularProgress
                                                                classNames={{
                                                                    svg: "w-20 h-20 drop-shadow-md",
                                                                    value: "text-md font-semibold",
                                                                }}
                                                                size="lg"
                                                                value={70}
                                                                color="secondary"
                                                                showValueLabel={true}
                                                            />
                                                        </dd>

                                                    </div>

                                                    <div
                                                        className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Technical
                                                            Skills
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Python,
                                                            Javascript, React, NodeJS, ExpressJS, MongoDB
                                                        </dd>
                                                    </div>
                                                    <div
                                                        className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Skill
                                                            Level
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Beginner
                                                        </dd>
                                                    </div>
                                                    <div
                                                        className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Technical
                                                            Profile - Current
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Full
                                                            Stack Developer - Beginner
                                                        </dd>
                                                    </div>
                                                    <div
                                                        className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Technical
                                                            Profile - Target
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Full
                                                            Stack Developer - Intermediate
                                                        </dd>
                                                    </div>
                                                    <div
                                                        className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Course
                                                            Duration
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">60
                                                            Days
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                            <div className="flex gap-4 mt-2 items-center">
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo - 1);
                                                }}
                                                    className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <BackArrowIcon />
                                                </button>
                                                <button onClick={() => {
                                                    setPageNo(prevPageNo => prevPageNo + 1);
                                                }}
                                                    className="flex w-full justify-center rounded-md bg-black text-white px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    Goto Membership
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
