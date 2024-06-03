import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react';
import Header from '../Dashboardv2/Header';
import InterviewForm from './InterviewForm';

const interview = () => {
    const controls = useAnimation();

    const [isLoaded, setIsLoaded] = useState(false);
    const [wizard, setWizard] = useState("interviewForm");
    const [pageNo, setPageNo] = useState(1);

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
            setWizard('interviewForm');
        } else {
            setWizard('interviewInstructions');
        }
    }, [pageNo]);

    return (
        <div>
            <Header />
            <div className="section-hero home bg-fixed z-0">
                <div className="relative isolate h-auto">
                    <div className="mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white my-10 rounded-3xl shadow-xl">
                        <div className="relative min-w-full place-items-center py-24 sm:py-20 lg:py-10 px-5 md:px-10">
                            <motion.div className={(wizard === 'interviewForm' && pageNo === 1) ? 'visible' : 'hidden'} initial={{ x: '0' }} aria-label="User Onboarding">
                                <div className="relative pb-4">
                                    <div className="relative flex items-center md:items-start md:space-x-6">
                                        <div className="relative -ml-2">
                                            <div className={wizard === 'interviewForm' ? 'flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white' : 'flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white'}>
                                                <img src='/images/skill.svg' alt="interview" className="h-10 w-10" />
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mx-auto max-w-full px-6 lg:px-2">
                                                <div className="mx-auto max-w-2xl lg:mx-0">
                                                    <motion.h2 initial="initial" animate={isLoaded && wizard === 'interviewForm' ? { fontSize: "3em", opacity: 1 } : { fontSize: "3.5em", opacity: 0.25 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-lg:hidden lg:visible font-bold tracking-tight text-gray-900 sm:text-7xl">Interview Prep</motion.h2>
                                                    <motion.h2 initial="initial" animate={isLoaded && wizard === 'interviewForm' ? { fontSize: "2em", opacity: 1 } : { fontSize: "2.7em", opacity: 0.25 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-md:visible lg:hidden font-bold tracking-tight text-gray-900 sm:text-7xl">Interview Prep</motion.h2>
                                                    <p className={wizard === 'interviewForm' ? "mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-600" : "mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-200"}>
                                                        Provide the following details to tailor your interview simulation experience.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="flex gap-2 mt-2">
                                    <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                                    <span className="mb-2 h-[7px] flex-1 rounded-xl bg-black"></span>
                                </div>
                                <small>1 remaining to complete</small> */}
                            </motion.div>
                            <motion.div className={(wizard === 'interviewInstructions' && pageNo === 2) ? 'visible' : 'hidden'} initial={{ x: '0' }} aria-label="User Onboarding">
                                <div className="relative pb-4">
                                    <div className="relative flex items-center md:items-start md:space-x-6">
                                        <div className="relative -ml-2">
                                            <div className={wizard === 'interviewInstructions' ? 'flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-8 ring-white' : 'flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white'}>
                                                <img src={wizard === 'interviewInstructions' ? "/images/handshake.svg" : '/images/handshake-white.svg'} alt="Handshake" className="h-10 w-10" />
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mx-auto max-w-full px-6 lg:px-2">
                                                <div className="mx-auto max-w-2xl lg:mx-0">
                                                    <motion.h2 initial="initial" animate={isLoaded && wizard === 'interviewInstructions' ? { fontSize: "3em", opacity: 1 } : { fontSize: "3.5em", opacity: 0.25 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-lg:hidden lg:visible font-bold tracking-tight text-gray-900 sm:text-7xl">User Onboarding</motion.h2>
                                                    <motion.h2 initial="initial" animate={isLoaded && wizard === 'interviewInstructions' ? { fontSize: "2em", opacity: 1 } : { fontSize: "2.7em", opacity: 0.25 }} transition={{ type: 'spring', stiffness: 100 }} className="text-7xl max-md:visible lg:hidden font-bold tracking-tight text-gray-900 sm:text-7xl">User Onboarding</motion.h2>
                                                    <p className={wizard === 'interviewInstructions' ? "mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-600" : "mt-2 max-md:hidden lg:visible text-md leading-8 text-gray-200"}>
                                                        Upload your resume or LinkedIn URL to create your professional profile with AYC. We'll help you get your dream job.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                                    <span className="mb-2 h-[7px] flex-1 rounded-xl bg-primary"></span>
                                </div>
                                <small>Completed</small>
                            </motion.div>

                            <motion.div className={(wizard === 'interviewForm' && pageNo === 1) ? 'visible' : 'hidden'} initial={{ x: '0' }} aria-label="User Onboarding component">
                                <InterviewForm setPageNo={setPageNo} />
                            </motion.div>
                            {/* <motion.div className={(wizard === 'interviewInstructions' && pageNo === 2) ? "visible" : "hidden"} initial={{ x: '0' }} aria-label="Professional Profile contact component">
                                <UserDetailsForm setPageNo={setPageNo} />
                            </motion.div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default interview