import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { CircularProgress, Textarea, Spinner, Select, SelectItem } from "@nextui-org/react";
import { Editor } from '@monaco-editor/react';
import makeRequest from '../../api/useApi.js';
import { BackArrowIcon } from "../icons/BackArrowIcon.jsx";
import { FrontArrowIcon } from "../icons/FrontArrowIcon.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { setSkillTestData } from "../../store/slices/skillTestSlice.js";

const SkillTest = ({ setPageNo, pageNo }) => {
    const controls = useAnimation();
    const email = localStorage.getItem('email');

    const [value, setValue] = useState(0);
    const [timer, setTimer] = useState(0);
    const [showQuestions, setShowQuestions] = useState(false);
    const [assessmentData, setAssessmentData] = useState([]);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [questionAnswer, setQuestionAnswer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(true);
    const dispatch = useDispatch();

    const languages = ['javascript', 'python', 'java', 'csharp', 'cpp', 'html', 'css'];
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        if (!isMounted.current) return;
        try {
            const formData = new URLSearchParams();
            formData.append("complexity", "phase2");
            formData.append("email", email);
            const response = await makeRequest('post', 'phaseQuestions', formData);
            setAssessmentData(response);
            let newQuestionAnswer = [];
            Object.keys(response).forEach((category) => {
                response[category].forEach((question) => {
                    newQuestionAnswer.push({ question: question, answer: ""});
                });
            });
            setQuestionAnswer(newQuestionAnswer);
            setSelectedLanguages(newQuestionAnswer.map(() => 'javascript'));
            setCategoryIndex(0);
            setShowQuestions(true);
        } catch (error) {
            console.error("Error fetching assessment data:", error);
        }
    };

    const handleAnswerChange = (index, value) => {
        const newQuestionAnswer = [...questionAnswer];
        newQuestionAnswer[index].answer = value;
        setQuestionAnswer(newQuestionAnswer);
    };

    const handleLanguageChange = (index, value) => {
        const newSelectedLanguages = [...selectedLanguages];
        newSelectedLanguages[index] = value;
        setSelectedLanguages(newSelectedLanguages);

        const newQuestionAnswer = [...questionAnswer];
        newQuestionAnswer[index].language = value;
        setQuestionAnswer(newQuestionAnswer);
    };

    const handlePreviousQuestion = () => {
        if (categoryIndex === 0) {
            setPageNo(prevPageNo => prevPageNo - 1);
        } else {
            setCategoryIndex(categoryIndex - 1);
            updateProgress(categoryIndex, assessmentData);
        }
    };

    const handleNextQuestion = () => {
        if (categoryIndex === Object.keys(assessmentData).length - 1) {
            setPageNo(prevPageNo => prevPageNo + 1);
        } else {
            setCategoryIndex(categoryIndex + 1);
            updateProgress(categoryIndex, assessmentData);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pageNo === 6 && categoryIndex === Object.keys(assessmentData).length - 1) {
            try {
                setIsLoading(true);
                const formData = new FormData();
                formData.append("examine_str", JSON.stringify(questionAnswer));
                const response = await makeRequest('post', 'assesProfile', formData);
                dispatch(setSkillTestData(response));
                setPageNo(prevPageNo => prevPageNo + 1);
            } catch (error) {
                console.error("Error posting answers:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const updateProgress = (index, data) => {
        if (data) {
            const totalCategories = Object.keys(data).length;
            const progress = Math.round(((index + 1) / totalCategories) * 100);
            setValue(progress);
        }
    };

    useEffect(() => {
        controls.start({ x: '100vw' });
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [controls]);

    useEffect(() => {
        if (assessmentData) {
            updateProgress(categoryIndex, assessmentData);
        }
    }, [assessmentData, categoryIndex]);

    return (
        <div className="mx-auto min-w-full lg:mr-0">
            <div className="relative min-w-full place-items-center p-5 md:p-20 lg:p-10 xl:py-10 xl:px-40">

                {showQuestions && assessmentData && (
                    <>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {Object.keys(assessmentData)[categoryIndex].split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">Quick Skill assessment exams through Questions</p>
                        <span className="w-[1px] h-24 bg-gray-400"></span>
                        <div className="flex gap-2 mt-4">
                            {Object.keys(assessmentData).map((heading, index) => (
                                <span
                                    key={index}
                                    className={`mb-2 h-[15px] flex-1 rounded-xl ${index <= categoryIndex ? "bg-primary" : "bg-gray-900"}`}
                                ></span>
                            ))}
                        </div>
                        <span className="w-[1px] h-24 bg-gray-400"></span>
                        <div className="flex items-start justify-start mt-4">

                            <div className="flex max-w-fit p-3 rounded-xl align-middle mt-2" x-data="timer(new Date().setDate(new Date().getDate() + 1))" x-init="init();">
                                <div className="flex flex-col items-center px-2">
                                    <span className="text-xl lg:text-xl">{Math.floor(timer / 60)}</span>
                                    <span className="text-gray-400">Mins</span>
                                </div>
                                <span className="w-[1px] h-16 bg-gray-800"></span>
                                <div className="flex flex-col items-center px-2">
                                    <span className="text-xl lg:text-xl">{timer % 60 < 10 ? '0' : ''}{timer % 60}</span>
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
                        <div className="mt-8 space-y-16 border-t border-gray-200 pt-10 sm:mt-8 sm:pt-8"></div>
                        <div className="flex flex-col gap-4">
                            <form onSubmit={handleSubmit}>
                                {assessmentData[Object.keys(assessmentData)[categoryIndex]].map((question, index) => (
                                    <div key={index}>
                                        <div className="lg:col-span-5">
                                            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                                                {index + 1}. {question}
                                            </h2>
                                        </div>
                                        <div className="flex gap-4 mt-5 mb-10 items-center">
                                            <div className="relative space-y-2 w-full">
                                                {Object.keys(assessmentData)[categoryIndex] === 'code_questions' ? (
                                                    <div className="bg-[#1e1e1e]">
                                                        <Select
                                                            className="dark w-40 mb-2 text-white"
                                                            radius="none"
                                                            defaultSelectedKeys={['javascript']}
                                                            value={selectedLanguages[categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index]}
                                                            onChange={(e) => handleLanguageChange(categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index, e.target.value)}
                                                        >
                                                            {languages.map(lang => (
                                                                <SelectItem key={lang} value={lang}>{lang.toUpperCase()}</SelectItem>
                                                            ))}
                                                        </Select>
                                                        <Editor
                                                            height="200px"
                                                            theme="vs-dark"
                                                            language={selectedLanguages[categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index]}
                                                            value={questionAnswer[categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index].answer}
                                                            onChange={(value) => handleAnswerChange(categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index, value)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <Textarea
                                                        label="Answers"
                                                        value={questionAnswer[categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index].answer}
                                                        onChange={(e) => handleAnswerChange(categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index, e.target.value)}
                                                        placeholder="Write your Answer here"
                                                        minRows={6}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex gap-2 sm:gap-4 mt-10 items-center">
                                    <button type="button" onClick={handlePreviousQuestion} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" ><BackArrowIcon /></button>
                                    <button type="submit" isdisabled={(pageNo === 6 && categoryIndex < Object.keys(assessmentData).length - 1).toString()} className={`flex w-full justify-center rounded-md px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${pageNo === 6 && categoryIndex < Object.keys(assessmentData).length - 1 ? 'opacity-100 bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-black text-white'}`} >
                                        {isLoading ? (
                                            <>
                                                <Spinner className="pr-2" color="current" size="sm" /> Submitting...
                                            </>
                                        ) : "Save and Continue"} </button>
                                    <button type="button" onClick={handleNextQuestion} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" ><FrontArrowIcon /></button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
                {!showQuestions && <div className='flex justify-center items-center w-full h-screen md:h-96 '><Spinner color="secondary" size="lg" /></div>}
            </div>
        </div>
    );
};

export default SkillTest;
