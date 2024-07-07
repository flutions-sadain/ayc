import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { CircularProgress, Textarea, Spinner, Select, SelectItem } from "@nextui-org/react";
import { Editor } from '@monaco-editor/react';
import makeRequest from '../../api/useApi.js';
import { BackArrowIcon } from "../../components/icons/BackArrowIcon.jsx";
import { FrontArrowIcon } from "../../components/icons/FrontArrowIcon.jsx";
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
    const dispatch = useDispatch();

    const languages = ['javascript', 'python', 'java', 'csharp', 'cpp', 'html', 'css'];
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    useEffect(() => {
        if (pageNo === 6) {
            fetchQuestions();
        }
    }, [pageNo]);

    const fetchQuestions = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append("complexity", "phase1");
            formData.append("email", email);
            setQuestionAnswer([])
            const response = await makeRequest('post', 'phaseQuestions', formData);

            response?.map((data) => {
                data?.questions.map((question) => {
                    setQuestionAnswer(prev => [...prev, {question, answer: '' }])
                })
            })
            setAssessmentData(response);
            setSelectedLanguages(response.map(category => category.questions.map(() => 'javascript')));
            setCategoryIndex(0);
            setShowQuestions(true);
        } catch (error) {
            console.error("Error fetching assessment data:", error);
        }
    };

    const handleAnswerChange = (index, value) => {
        const newQuestionAnswer = [...questionAnswer];
        if (newQuestionAnswer[index]) {
            newQuestionAnswer[index].answer = value;
            setQuestionAnswer(newQuestionAnswer);
        }
    };

    const handleLanguageChange = (categoryIdx, questionIdx, value) => {
        const newSelectedLanguages = [...selectedLanguages];
        if (newSelectedLanguages[categoryIdx] && newSelectedLanguages[categoryIdx][questionIdx]) {
            newSelectedLanguages[categoryIdx][questionIdx] = value;
            setSelectedLanguages(newSelectedLanguages);

            const newQuestionAnswer = [...questionAnswer];
            if (newQuestionAnswer[categoryIdx] && newQuestionAnswer[categoryIdx][questionIdx]) {
                newQuestionAnswer[categoryIdx][questionIdx].language = value;
                setQuestionAnswer(newQuestionAnswer);
            }
        }
    };

    const handlePreviousQuestion = () => {
        if (categoryIndex === 0) {
            setPageNo(prevPageNo => prevPageNo - 1);
        } else {
            setCategoryIndex(categoryIndex - 1);
            updateProgress(categoryIndex - 1, assessmentData);
        }
    };

    const handleNextQuestion = () => {
        if (categoryIndex === assessmentData.length - 1) {
            setPageNo(prevPageNo => prevPageNo + 1);
        } else {
            setCategoryIndex(categoryIndex + 1);
            updateProgress(categoryIndex + 1, assessmentData);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pageNo === 6 && categoryIndex === assessmentData.length - 1) {
            try {
                setIsLoading(true);
                const formData = new FormData();
                formData.append("examine_str", JSON.stringify(questionAnswer));
                formData.append("email", email);
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

    const indexFinder = (index) => {
        let sum = 0;
    
        for (let i = 0; i < index; i++) {
            if (Array.isArray(assessmentData[i].questions)) {
                sum += assessmentData[i].questions.length;
            }
        }
    
        return sum;
    }
    

    const updateProgress = (index, data) => {
        if (data) {
            const totalCategories = data.length;
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
        <div>
            {showQuestions && assessmentData.length > 0 && (
                <>
                    <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-4 sm:pt-4"></div>
                    <div className="flex items-center lg:items-end justify-between">
                        <div className="w-4/5">
                            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {assessmentData[categoryIndex].category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </h2>
                        </div>
                        <div className="max-sm:order-1">
                            <div className="flex max-w-fit rounded-xl align-middle -mb-4" x-data="timer(new Date().setDate(new Date().getDate() + 1))" x-init="init();">
                                <div className="flex flex-col items-center px-2">
                                    <span className="text-xl lg:text-xl">{Math.floor(timer / 60)}</span>
                                    <span className="text-gray-400">Mins</span>
                                </div>
                                <span className="w-[1px] h-12 bg-gray-800"></span>
                                <div className="flex flex-col items-center px-2">
                                    <span className="text-xl lg:text-xl">{timer % 60 < 10 ? '0' : ''}{timer % 60}</span>
                                    <span className="text-gray-400">Secs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="mt-2 text-md leading-8 text-gray-600">Quick Skill assessment exams through Questions</p>
                    <div className="flex gap-2 mt-4">
                        {assessmentData.map((_, index) => (
                            <span key={index} className={`mb-2 h-[7px] flex-1 rounded-xl ${index <= categoryIndex ? "bg-primary" : "bg-gray-900"}`} ></span>
                        ))}
                    </div>
                    <small>{categoryIndex + 1 === assessmentData.length ? ("Completed") : (`${assessmentData.length - categoryIndex - 1} remaining to complete`)}</small>
                    <div className="mt-4 space-y-16 border-t border-gray-200 pt-5 sm:mt-4 sm:pt-4"></div>
                    <div className="flex flex-col gap-4">
                        <form onSubmit={handleSubmit}>
                            {assessmentData[categoryIndex].questions.map((questionData, index) => (
                                <div key={index}>
                                    <div className="lg:col-span-5">
                                        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                                            {index + 1}. {questionData}
                                        </h2>
                                    </div>
                                    <div className="flex gap-4 mt-5 mb-10 items-center">
                                        <div className="relative space-y-2 w-full">
                                            {assessmentData[categoryIndex].category === 'code_questions' ? (
                                                <div className="bg-[#1e1e1e]">
                                                    <Select
                                                        className="dark w-40 mb-2 text-white"
                                                        radius="none"
                                                        aria-label="Programming Language Selector"
                                                        defaultSelectedKeys={['javascript']}
                                                        value={selectedLanguages[categoryIndex][index]}
                                                        onChange={(e) => handleLanguageChange(categoryIndex, index, e.target.value)}
                                                    >
                                                        {languages.map(lang => (
                                                            <SelectItem key={lang} value={lang}>{lang.toUpperCase()}</SelectItem>
                                                        ))}
                                                    </Select>
                                                    <Editor
                                                        height="200px"
                                                        theme="vs-dark"
                                                        aria-label="Code Editor"
                                                        language={selectedLanguages[categoryIndex][index]}
                                                        value={questionAnswer[indexFinder(categoryIndex) + index].answer}
                                                        onChange={(value) => handleAnswerChange(indexFinder(categoryIndex) + index, value)}
                                                    />
                                                </div>
                                            ) : (
                                                <Textarea
                                                    label="Answers"
                                                    aria-label="Question Answer Input"
                                                    value={questionAnswer[indexFinder(categoryIndex) + index].answer}
                                                    onChange={(e) => handleAnswerChange(indexFinder(categoryIndex) + index, e.target.value)}
                                                    placeholder="Write your Answer here"
                                                    minRows={6}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex gap-2 sm:gap-4 mt-10 items-center">
                                {categoryIndex === 0 ? "" : <button type="button" onClick={handlePreviousQuestion} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" ><BackArrowIcon /></button>}
                                <button type="submit" isdisabled={(pageNo === 6 && categoryIndex < assessmentData.length - 1)} className={`flex w-full justify-center rounded-md px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${pageNo === 6 && categoryIndex < assessmentData.length - 1 ? 'bg-gray-300 text-gray-600 !cursor-not-allowed' : 'bg-black text-white'}`} >
                                    {isLoading ? (
                                        <>
                                            <Spinner className="pr-2" color="current" size="sm" /> Submitting...
                                        </>
                                    ) : "Save and Continue"} </button>
                                {(pageNo === 6 && categoryIndex < assessmentData.length - 1) &&
                                    <button type="button" onClick={handleNextQuestion} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" ><FrontArrowIcon /></button>
                                }
                            </div>
                        </form>
                    </div>
                </>
            )}
            {!showQuestions && <div className='flex justify-center items-center w-full pt-10 lg:h-60 '>
                <div className="w-full text-center">
                    <Spinner color="secondary" size="lg" />
                    <p>We are preparing your Assessment...</p>
                </div>
            </div>}
        </div>
    );
};

export default SkillTest;


// import { useEffect, useState, useRef } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { CircularProgress, Textarea, Spinner, Select, SelectItem } from "@nextui-org/react";
// import { Editor } from '@monaco-editor/react';
// import makeRequest from '../../api/useApi.js';
// import { BackArrowIcon } from "../icons/BackArrowIcon.jsx";
// import { FrontArrowIcon } from "../icons/FrontArrowIcon.jsx";
// import { useDispatch, useSelector } from 'react-redux';
// import { setSkillTestData } from "../../store/slices/skillTestSlice.js";

// const SkillTest = ({ setPageNo, pageNo }) => {
//     const controls = useAnimation();
//     const email = localStorage.getItem('email');

//     const [value, setValue] = useState(0);
//     const [timer, setTimer] = useState(0);
//     const [showQuestions, setShowQuestions] = useState(false);
//     const [assessmentData, setAssessmentData] = useState([]);
//     const [categoryIndex, setCategoryIndex] = useState(0);
//     const [questionAnswer, setQuestionAnswer] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     // const isMounted = useRef(true);
//     const dispatch = useDispatch();

//     const languages = ['javascript', 'python', 'java', 'csharp', 'cpp', 'html', 'css'];
//     const [selectedLanguages, setSelectedLanguages] = useState([]);

//     // useEffect(() => {
//     //     return () => {
//     //         isMounted.current = false;
//     //     };
//     // }, []);

//     useEffect(() => {
//         if (pageNo === 6) {
//             fetchQuestions();
//         }
//     }, [pageNo]);

//     const fetchQuestions = async () => {
//         // if (!isMounted.current) return;
//         try {
//             const formData = new URLSearchParams();
//             formData.append("complexity", "phase1");
//             formData.append("email", email);
//             const response = await makeRequest('post', 'phaseQuestions', formData);
//             setAssessmentData(response);
//             let newQuestionAnswer = [];
//             Object.keys(response).forEach((category) => {
//                 response[category].forEach((question) => {
//                     newQuestionAnswer.push({ question: question, answer: "" });
//                 });
//             });
//             setQuestionAnswer(newQuestionAnswer);
//             setSelectedLanguages(newQuestionAnswer.map(() => 'javascript'));
//             setCategoryIndex(0);
//             setShowQuestions(true);
//         } catch (error) {
//             console.error("Error fetching assessment data:", error);
//         }
//     };

    // const handleAnswerChange = (index, value) => {
    //     const newQuestionAnswer = [...questionAnswer];
    //     if (newQuestionAnswer[index]) {
    //         newQuestionAnswer[index].answer = value;
    //         setQuestionAnswer(newQuestionAnswer);
    //     }
    // };

//     const handleLanguageChange = (index, value) => {
//         const newSelectedLanguages = [...selectedLanguages];
//         if (newSelectedLanguages[index]) {
//             newSelectedLanguages[index] = value;
//             setSelectedLanguages(newSelectedLanguages);

//             const newQuestionAnswer = [...questionAnswer];
//             if (newQuestionAnswer[index]) {
//                 newQuestionAnswer[index].language = value;
//                 setQuestionAnswer(newQuestionAnswer);
//             }
//         }
//     };


//     const handlePreviousQuestion = () => {
//         if (categoryIndex === 0) {
//             setPageNo(prevPageNo => prevPageNo - 1);
//         } else {
//             setCategoryIndex(categoryIndex - 1);
//             updateProgress(categoryIndex, assessmentData);
//         }
//     };

//     const handleNextQuestion = () => {
//         if (categoryIndex === Object.keys(assessmentData).length - 1) {
//             setPageNo(prevPageNo => prevPageNo + 1);
//         } else {
//             setCategoryIndex(categoryIndex + 1);
//             updateProgress(categoryIndex, assessmentData);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (pageNo === 6 && categoryIndex === Object.keys(assessmentData).length - 1) {
//             try {
//                 setIsLoading(true);
//                 const formData = new FormData();
//                 formData.append("examine_str", JSON.stringify(questionAnswer));
//                 const response = await makeRequest('post', 'assesProfile', formData);
//                 dispatch(setSkillTestData(response));
//                 setPageNo(prevPageNo => prevPageNo + 1);
//             } catch (error) {
//                 console.error("Error posting answers:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//     };

//     const updateProgress = (index, data) => {
//         if (data) {
//             const totalCategories = Object.keys(data).length;
//             const progress = Math.round(((index + 1) / totalCategories) * 100);
//             setValue(progress);
//         }
//     };

//     useEffect(() => {
//         controls.start({ x: '100vw' });
//         const interval = setInterval(() => {
//             setTimer(prevTimer => prevTimer + 1);
//         }, 1000);

//         return () => {
//             clearInterval(interval);
//         };
//     }, [controls]);

//     useEffect(() => {
//         if (assessmentData) {
//             updateProgress(categoryIndex, assessmentData);
//         }
//     }, [assessmentData, categoryIndex]);

//     // console.log("categoryIndex", categoryIndex);

//     return (
//         <div>
//             {showQuestions && assessmentData && (
//                 <>
//                     <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-4 sm:pt-4"></div>
//                     <div className="flex items-center lg:items-end justify-between">
//                         <div className="w-4/5 ">
//                             <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
//                                 {Object.keys(assessmentData)[categoryIndex].split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                             </h2>
//                         </div>
//                         <div className="max-sm:order-1">
//                             {/* <span className="w-[1px] h-24 bg-gray-400"></span> */}
//                             <div className="flex max-w-fit rounded-xl align-middle -mb-4" x-data="timer(new Date().setDate(new Date().getDate() + 1))" x-init="init();">
//                                 <div className="flex flex-col items-center px-2">
//                                     <span className="text-xl lg:text-xl">{Math.floor(timer / 60)}</span>
//                                     <span className="text-gray-400">Mins</span>
//                                 </div>
//                                 <span className="w-[1px] h-12 bg-gray-800"></span>
//                                 <div className="flex flex-col items-center px-2">
//                                     <span className="text-xl lg:text-xl">{timer % 60 < 10 ? '0' : ''}{timer % 60}</span>
//                                     <span className="text-gray-400">Secs</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <p className="mt-2 text-md leading-8 text-gray-600">Quick Skill assessment exams through Questions</p>
//                     <span className="w-[1px] h-24 bg-gray-400"></span>
//                     <div className="flex gap-2 mt-4">
//                         {Object.keys(assessmentData).map((heading, index) => (
//                             <span key={index} className={`mb-2 h-[7px] flex-1 rounded-xl ${index <= categoryIndex ? "bg-primary" : "bg-gray-900"}`} ></span>
//                         ))}
//                     </div>
//                     <small>{categoryIndex + 1 === Object.keys(assessmentData).length ? ("Completed") : (`${Object.keys(assessmentData).length - categoryIndex - 1} remaining to complete`)}</small>
//                     {/* <div className="flex items-start justify-start mt-4">
//                         <div className="relative ml-auto place-items-center align-middle mt-auto">
//                             <CircularProgress
//                                 classNames={{
//                                     svg: "w-24 h-24 drop-shadow-md",
//                                     indicator: "stroke-primary",
//                                     track: "stroke-primary/10",
//                                     value: "text-lg font-semibold text-black",
//                                 }}
//                                 aria-label="Loading..."
//                                 size="xl"
//                                 value={value}
//                                 color="primary"
//                                 showValueLabel={true}
//                             />
//                         </div>
//                     </div> */}
//                     <div className="mt-4 space-y-16 border-t border-gray-200 pt-5 sm:mt-4 sm:pt-4"></div>
//                     <div className="flex flex-col gap-4">
//                         <form onSubmit={handleSubmit}>
//                             {assessmentData[Object.keys(assessmentData)[categoryIndex]].map((question, index) => (
//                                 <div key={index}>
//                                     <div className="lg:col-span-5">
//                                         <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
//                                             {index + 1}. {question}
//                                         </h2>
//                                     </div>
//                                     <div className="flex gap-4 mt-5 mb-10 items-center">
//                                         <div className="relative space-y-2 w-full">
//                                             {Object.keys(assessmentData)[categoryIndex] === 'code_questions' ? (
//                                                 <div className="bg-[#1e1e1e]">
//                                                     <Select
//                                                         className="dark w-40 mb-2 text-white"
//                                                         radius="none"
//                                                         aria-label="Programming Language Selector"
//                                                         defaultSelectedKeys={['javascript']}
//                                                         value={selectedLanguages[categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index]}
//                                                         onChange={(e) => handleLanguageChange(categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index, e.target.value)}
//                                                     >
//                                                         {languages.map(lang => (
//                                                             <SelectItem key={lang} value={lang}>{lang.toUpperCase()}</SelectItem>
//                                                         ))}
//                                                     </Select>
//                                                     <Editor
//                                                         height="200px"
//                                                         theme="vs-dark"
//                                                         aria-label="Code Editor"
//                                                         language={selectedLanguages[categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index]}
//                                                         value={questionAnswer[categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index].answer}
//                                                         onChange={(value) => handleAnswerChange(categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index, value)}
//                                                     />
//                                                 </div>
//                                             ) : (
//                                                 <Textarea
//                                                     label="Answers"
//                                                     aria-label="Answers"
//                                                     value={questionAnswer[categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index].answer}
//                                                     onChange={(e) => handleAnswerChange(categoryIndex * assessmentData[Object.keys(assessmentData)[categoryIndex]].length + index, e.target.value)}
//                                                     placeholder="Write your Answer here"
//                                                     minRows={6}
//                                                 />
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                             <div className="flex gap-2 sm:gap-4 mt-10 items-center">
//                                 <button type="button" onClick={handlePreviousQuestion} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" ><BackArrowIcon /></button>
//                                 <button type="submit" isdisabled={(pageNo === 6 && categoryIndex < Object.keys(assessmentData).length - 1)} className={`flex w-full justify-center rounded-md px-3 py-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${pageNo === 6 && categoryIndex < Object.keys(assessmentData).length - 1 ? 'opacity-100 bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-black text-white'}`} >
//                                     {isLoading ? (
//                                         <>
//                                             <Spinner className="pr-2" color="current" size="sm" /> Submitting...
//                                         </>
//                                     ) : "Save and Continue"} </button>
//                                 {(pageNo === 6 && categoryIndex < Object.keys(assessmentData).length - 1) &&
//                                     <button type="button" onClick={handleNextQuestion} className="flex bg-primary leading-6 shadow-sm justify-center rounded-md px-2 sm:px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" ><FrontArrowIcon /></button>
//                                 }
//                             </div>
//                         </form>
//                     </div>
//                 </>
//             )}
//             {!showQuestions && <div className='flex justify-center items-center w-full pt-10 lg:h-60 '>
//                 <div className="w-full text-center">
//                     <Spinner color="secondary" size="lg" />
//                     <p>We are preparing your Assessment...</p>
//                 </div>
//             </div>}
//         </div>
//     );
// };

// export default SkillTest;
