import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react';
import Header from './Header.jsx';
import UserDetailsForm from './UserDetailsForm.jsx';
import ResumeUploadForm from './ResumeUploadForm.jsx';
import UserProfile from './UserProfile.jsx';
import SkillTest from './SkillTest.jsx';
import FinalReport from './FinalReport.jsx';
import Certificate from '../../components/Certificate/Certificate.jsx';
import { FiDownload } from 'react-icons/fi';
import { Button } from '@nextui-org/react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import Footer from '../../components/Footer.jsx';

const Onboarding = () => {
    const controls = useAnimation();

    const [isLoaded, setIsLoaded] = useState(false);
    const [wizard, setWizard] = useState("userOnboarding");
    const [pageNo, setPageNo] = useState(0);
    const [value, setValue] = useState(0);
    const [timer, setTimer] = useState(0);
    const svgRef = useRef(null);
    const [showDownloadButton, setShowDownloadButton] = useState(false);
    const fullName = localStorage.getItem('fullName');

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
    //     }
    // }

    const handleMouseEnter = () => {
        setShowDownloadButton(true);
    };

    const handleMouseLeave = () => {
        setShowDownloadButton(false);
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
        } else if (pageNo === 6) {
            setWizard('skillTest');
        } else if (pageNo === 7){
            setWizard('finish');
        }
    }, [pageNo]);
    // console.log("page no", pageNo);

    const calculateTopPosition = (currentWizard) => {
        switch (currentWizard) {
            case 'userOnboarding':
                return '0';
            case 'professionalProfile':
                return '-200px';
            case 'skillTest':
                return '-400px';
            case 'finish':
                return '-500px';
            default:
                return '0';
        }
    };



    const handleDownloadPDF = () => {
        const svgElement = svgRef.current.querySelector('svg');
        if (!svgElement) {
            console.error('SVG element not found.');
            return;
        }

        // Create a new jsPDF instance
        const pdf = new jsPDF('landscape');

        // Convert SVG to data URL
        const svgXML = new XMLSerializer().serializeToString(svgElement);
        const svgDataURL = 'data:image/svg+xml;base64,' + btoa(svgXML);

        // Create a new canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions based on SVG dimensions
        canvas.width = svgElement.width.baseVal.value;
        canvas.height = svgElement.height.baseVal.value;

        // Create an image element
        const img = new Image();
        img.onload = function () {
            // Draw SVG image onto canvas
            ctx.drawImage(img, 0, 0);

            // Convert canvas to data URL
            const canvasDataURL = canvas.toDataURL('image/jpeg', 1.0);

            // Add canvas image to PDF
            pdf.addImage(canvasDataURL, 'JPEG', 0, 0, 297, 210); // Adjust dimensions as necessary

            // Save the PDF
            pdf.save('certificate.pdf');
        };
        img.src = svgDataURL;
    };

    // const startAnimation = () => {
    //     controls.start({
    //         x: 0,
    //         transition: { type: 'spring', stiffness: 60, damping: 20 }
    //     });
    // };

    // const divVariants = {
    //     hidden: { y: "100%" }, // start from the bottom
    //     visible: {
    //         y: "0%", // end at the top
    //         transition: {
    //             type: 'spring',
    //             stiffness: 100
    //         }
    //     }
    // };

    return (
        <>
            <Header>


                <div className="section-hero home bg-fixed -mt-16 pt-16 z-0">
                    <div className="relative isolate h-auto">
                        {/* <div className="mx-auto grid max-w-full grid-cols-1 lg:grid-cols-2">
                            <div className="max-lg:hidden relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                                <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                                    <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2" style={{ top: calculateTopPosition(wizard) }}>
                                        <div className="my-24 md:my-10 mx-10 md:mx-10 xl:mx-40">
                                            <div className="flow-root">
                                                <ul role="list" className="-mb-8">
                                                    <motion.div
                                                        initial="hidden"
                                                        animate="visible"
                                                        variants={textVariants}
                                                    >
                                                        <li>
                                                            <div className="relative pb-8">
                                                                <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                                                <div className="relative flex items-start space-x-6">
                                                                    <div className="relative -ml-2">
                                                                        <div className={wizard === 'userOnboarding' ? 'flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white' : 'flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white'}>
                                                                            <img src={wizard === 'userOnboarding' ? "/images/handshake.svg" : '/images/handshake-white.svg'} alt="Handshake" className="h-10 w-10" />
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
                                                                        <div className={wizard === 'skillTest' ? 'flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white' : 'flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white'}>
                                                                            <img src={wizard === 'skillTest' ? "/images/skill.svg" : '/images/skill-white.svg'} alt="Handshake" className="h-10 w-10" />
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
                        </div> */}
                        {pageNo === 0 &&
                            <div className="relative mx-40 my-20 py-5">
                                <div>
                                    <h1 className="text-5xl font-bold text-gray-400 text-center sm:text-5xl mb-2">User Onboarding</h1>
                                    <h1 className="text-3xl font-bold text-gray-900 text-center sm:text-3xl mb-1">Are you uploading an existing resume?</h1>
                                    <p className="text-lg font-base text-gray-500 text-center mb-10">Just review, edit, and update it with new information</p>
                                </div>
                                <div className="flex flex-wrap justify-center items-center gap-8 m-2">
                                    <div onClick={() => { setPageNo(prevPageNo => prevPageNo + 1); }} className="max-w-lg px-8 py-10 text-center bg-white border-2 border-gray-500 rounded-2xl shadow-md transition-all duration-300 hover:border-2 hover:border-gray-900 hover:shadow-medium cursor-pointer">
                                        <div className="flex h-14 w-14 mb-6 items-center text-black mx-auto justify-center rounded-full bg-primary ring-8 ring-white">
                                            <IoCloudUploadOutline className="text-3xl text-black" />
                                        </div>
                                        <h5 className="mb-2 text-2xl font-semibold text-gray-900">Yes, upload from my resume/linkedIn</h5>
                                        <p className="mb-3 font-normal text-gray-500">Easily update your information and ensure your resume is up-to-date.</p>
                                    </div>
                                    <div onClick={() => { setPageNo(prevPageNo => prevPageNo + 2); }} className="max-w-lg px-8 py-10 text-center bg-white border-2 border-gray-500 rounded-2xl shadow-md transition-all duration-300 hover:border-2 hover:border-gray-900 hover:shadow-medium cursor-pointer">
                                        <div className="flex h-14 w-14 mb-6 items-center text-black mx-auto justify-center rounded-full bg-primary ring-8 ring-white">
                                            <MdOutlineDriveFileRenameOutline className="text-3xl text-black" />
                                        </div>
                                        <h5 className="mb-2 text-2xl font-semibold text-gray-900">No, start from scratch</h5>
                                        <p className="mb-3 font-normal text-gray-500">Build a resume from scratch, and we'll assist you in finding the right career opportunities.</p>
                                    </div>
                                </div>
                            </div>
                        }
                        {pageNo != 0 && (<>
                            {pageNo != 7 ? (
                                <div className="mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white my-10 rounded-3xl shadow-medium">
                                    <div className="relative min-w-full place-items-center py-24 sm:py-20 lg:py-10 px-5 md:px-10">

                                        <motion.div className={(wizard === 'userOnboarding' && pageNo === 1) ? 'visible' : 'hidden'} initial={{ x: '0' }} aria-label="User Onboarding">
                                            <div className="relative pb-4">
                                                <div className="relative flex items-center md:items-start md:space-x-6">
                                                    <div className="relative -ml-2">
                                                        <div className={wizard === 'userOnboarding' ? 'flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white' : 'flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white'}>
                                                            <img src={wizard === 'userOnboarding' ? "/images/handshake.svg" : '/images/handshake-white.svg'} alt="Handshake" className="h-10 w-10" />
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="mx-auto max-w-full px-6 lg:px-2">
                                                            <div className="mx-auto max-w-2xl lg:mx-0">
                                                                <motion.h2 initial="initial" animate={isLoaded && wizard === 'userOnboarding' ? { fontSize: "3em", opacity: 1 } : { fontSize: "3.5em", opacity: 0.25 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-lg:hidden lg:visible font-bold tracking-tight text-gray-900 sm:text-7xl">User Onboarding</motion.h2>
                                                                <motion.h2 initial="initial" animate={isLoaded && wizard === 'userOnboarding' ? { fontSize: "2em", opacity: 1 } : { fontSize: "2.7em", opacity: 0.25 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-md:visible lg:hidden font-bold tracking-tight text-gray-900 sm:text-7xl">User Onboarding</motion.h2>
                                                                <p className={wizard === 'userOnboarding' ? "mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-600" : "mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-200"}>
                                                                    Upload your resume or LinkedIn URL to create your professional profile with AYC. We'll help you get your dream job.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                                                <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                                                <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                                            </div>
                                            <small>2 remaining to complete</small>
                                        </motion.div>
                                        <motion.div className={(wizard === 'professionalProfile' && pageNo <= 5) ? 'visible' : 'hidden'} initial={{ x: '0' }} aria-label="Professional Profile">
                                            <div className="relative pb-4">
                                                <div className="relative flex items-center md:items-start md:space-x-6">
                                                    <div className="relative -ml-2">
                                                        <div
                                                            className={wizard === 'professionalProfile' ? 'flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white' : 'flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white'}>
                                                            <img src={wizard === 'professionalProfile' ? "/images/pro.svg" : '/images/pro-white.svg'} alt="Handshake" className="h-10 w-10" />
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="mx-auto max-w-full px-6 lg:px-8">
                                                            <div className="mx-auto max-w-2xl lg:mx-0">
                                                                <motion.h2 initial="initial" animate={isLoaded && wizard === 'professionalProfile' ? { fontSize: "3em", opacity: 1 } : { fontSize: "3.5em", opacity: 0.25 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-lg:hidden lg:visible font-bold tracking-tight text-gray-900 sm:text-7xl">Professional Profile</motion.h2>
                                                                <motion.h2 initial="initial" animate={isLoaded && wizard === 'professionalProfile' ? { fontSize: "2em", opacity: 1 } : { fontSize: "2.7em", opacity: 0.25 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-md:visible lg:hidden font-bold tracking-tight text-gray-900 sm:text-7xl">Professional Profile</motion.h2>
                                                                <p className={wizard === 'professionalProfile' ? "mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-600" : "mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-200"}>
                                                                    Please provide your contact information, Technical Skills, Profession, Experience & Career interest profile with AYC.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div className={(wizard === 'skillTest' && pageNo === 6) ? 'visible' : 'hidden'} initial={{ x: '0' }} aria-label="Skill Test">
                                            <div className="relative pb-4">
                                                <div className="relative flex items-center md:items-start md:space-x-6">
                                                    <div className="relative -ml-2">
                                                        <div className={wizard === 'skillTest' ? 'flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white' : 'flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white'}>
                                                            <img src={wizard === 'skillTest' ? "/images/skill.svg" : '/images/skill-white.svg'} alt="Handshake" className="h-10 w-10" />
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="mx-auto max-w-full px-6 lg:px-2">
                                                            <div className="mx-auto max-w-2xl lg:mx-0">
                                                                <motion.h2 initial="initial" animate={isLoaded && wizard === 'skillTest' ? { fontSize: "3em", opacity: 1 } : { fontSize: "3.5em", opacity: 0.25 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-lg:hidden lg:visible font-bold tracking-tight text-gray-900 sm:text-7xl">Assessment</motion.h2>
                                                                <motion.h2 initial="initial" animate={isLoaded && wizard === 'skillTest' ? { fontSize: "2em", opacity: 1 } : { fontSize: "2.7em", opacity: 0.25 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-md:visible lg:hidden font-bold tracking-tight text-gray-900 sm:text-7xl">Assessment</motion.h2>
                                                                <p className={wizard === 'skillTest' ? "mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-600" : "mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-200"}>
                                                                    Take the Assessment test to know your skill level, So AYC can tailor the Professional growth recommendation for you.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                                                <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                                                <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                                            </div>
                                            <small>1 remaining to complete</small>
                                        </motion.div>

                                        <motion.div className={(wizard === 'userOnboarding' && pageNo === 1) ? 'visible' : 'hidden'} initial={{ x: '0' }} aria-label="User Onboarding component">
                                            <ResumeUploadForm setPageNo={setPageNo} />
                                        </motion.div>
                                        {/* <motion.div className={(wizard === 'professionalProfile' && pageNo === 2) ? "visible" : "hidden"} initial={{ x: '0' }} aria-label="Professional Profile contact component">
                                            <UserDetailsForm setPageNo={setPageNo} />
                                        </motion.div> */}
                                        <UserProfile wizard={wizard} pageNo={pageNo} setPageNo={setPageNo} />
                                        <motion.div className={(wizard === 'skillTest' && pageNo === 6) ? "visible" : "hidden"} initial={{ x: '0' }} aria-label="Skill Test component">
                                            <SkillTest setPageNo={setPageNo} pageNo={pageNo} />
                                        </motion.div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 max-sm:mt-20 lg:h-[91vh]">
                                    <div className="min-md:mt-20 ">
                                        <div className="cursor-pointer lg:mx-10 h-auto" id="certificate-svg" onClick={handleDownloadPDF} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                            <div className={`${showDownloadButton ? "opacity-70" : ""}`}>
                                                {showDownloadButton &&
                                                    <div className="absolute lg:inset-x-10 lg:inset-y-72 w-1/2 opacity-100 h-auto z-10">
                                                        <p className="text-black text-xl py-5 text-center bg-primary font-semibold">Click here to download</p>
                                                    </div>
                                                }
                                                <div ref={svgRef} id="svg-container">
                                                    <Certificate fullName={fullName} skillTestReportData={skillTestReportData} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="h-full overflow-y-auto z-10">
                                        <motion.div className={(wizard === 'finish' && pageNo === 7) ? "visible" : "hidden"} initial={{ x: '0' }} aria-label="Finish component">
                                            <FinalReport setPageNo={setPageNo} wizard={wizard} />
                                        </motion.div>
                                    </div>
                                </div>
                            )}
                            {/* </div> */}
                        </>
                        )}
                        <Footer />
                    </div>
                </div>
            </Header>
        </>
    )
}

export default Onboarding;
