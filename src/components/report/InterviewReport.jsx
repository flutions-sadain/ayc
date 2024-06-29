import React, { useState, useEffect, useRef } from 'react';
import { Button, CircularProgress, Progress, Spinner } from '@nextui-org/react';
import { FiDownload } from "react-icons/fi";
import { IoShareSocial } from "react-icons/io5";
import makeRequest from '../../api/useApi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InterviewReport = ({ interviewId }) => {
    const [reportData, setReportData] = useState(null);
    const email = localStorage.getItem('email');
    const fullName = localStorage.getItem('fullName');
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!isMounted.current) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const formData = new URLSearchParams();
                formData.append("interviewId", interviewId);

                const response = await makeRequest('POST', 'getInterviewReportDetailsById', formData);

                setReportData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (interviewId !== 'new') {
            fetchData();
        } else {
            const fetchNewReport = async () => {
                setIsLoading(true);
                try {
                    const formData = new URLSearchParams({ email });
                    const response = await makeRequest('POST', 'getInterviewReport', formData);

                    setReportData(response);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchNewReport();
        }
    }, [email, interviewId]);

    const getColor = (value) => {
        if (value < 33) {
            return 'danger';
        } else if (value >= 33 && value <= 66) {
            return 'warning';
        } else {
            return 'success';
        }
    };

    const calculateAverageScore = (scores) => {
        const total = scores?.reduce((acc, score) => acc + score?.percentage, 0);
        return total / scores?.length;
    };

    const hasReportData = reportData && reportData["Assessment Report"] && reportData["Assessment Report"].length > 0;
    const assessmentReport = hasReportData ? reportData["Assessment Report"][0] : null;

    const generatePDF = () => {
        if (!assessmentReport) return;

        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text('Interview Report', 14, 22);

        // Add candidate information
        doc.setFontSize(12);
        doc.text(`Name: ${fullName}`, 14, 32);
        doc.text(`Email: ${email}`, 14, 38);

        // Add overall scores
        doc.setFontSize(14);
        doc.text('Overall Scores', 14, 48);

        const overallScores = assessmentReport.overallScores.map(score => [score.label, score.percentage]);

        doc.autoTable({
            startY: 52,
            head: [['Skill', 'Percentage']],
            body: overallScores,
        });

        // Add detailed scores
        doc.text('Detailed Scores', 14, doc.previousAutoTable.finalY + 10);

        Object.entries(assessmentReport.detailedScores).forEach(([category, scores]) => {
            doc.setFontSize(12);
            doc.text(category, 14, doc.previousAutoTable.finalY + 16);
            const detailedScores = scores.map(score => [score.label, score.percentage, score.comment]);

            doc.autoTable({
                startY: doc.previousAutoTable.finalY + 18,
                head: [['Skill', 'Percentage', 'Comment']],
                body: detailedScores,
            });
        });

        // Add recommendations
        doc.text('Recommendations', 14, doc.previousAutoTable.finalY + 10);
        doc.setFontSize(12);
        const recommendations = assessmentReport.recommendations;
        doc.text(`Hiring Recommendation: ${recommendations.hiringRecommendation}`, 14, doc.previousAutoTable.finalY + 16);
        doc.text(`Suggested Role: ${recommendations.suggestedRole}`, 14, doc.previousAutoTable.finalY + 22);
        doc.text(`Potential for Growth: ${recommendations.potentialForGrowth}`, 14, doc.previousAutoTable.finalY + 28);
        doc.text(`Training Suggestions: ${recommendations.trainingSuggestions}`, 14, doc.previousAutoTable.finalY + 34);

        // Add summary
        doc.text('Summary', 14, doc.previousAutoTable.finalY + 44);
        doc.setFontSize(12);
        doc.text(assessmentReport.summary, 14, doc.previousAutoTable.finalY + 50, { maxWidth: 180 });

        doc.save('Interview_Report.pdf');
    };

    return (
        <div>
            <div className="w-full py-2 px-10 border bg-white">
                <ol className="flex items-center whitespace-nowrap">
                    <li className="inline-flex items-center">
                        <a className="flex items-center text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900" href="/">
                            Home
                        </a>
                        <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </li>
                    <li className="inline-flex items-center">
                        <a className="flex items-center text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900" href="/interview">
                            Interview
                            <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </a>
                    </li>
                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate" aria-current="page">
                        Report
                    </li>
                </ol>
            </div>
            {isLoading ? (
                <div className='flex justify-center items-center h-[80vh] w-full pt-10'>
                    <div className="w-full text-center">
                        <Spinner color="secondary" size="lg" />
                    </div>
                </div>
            ) : (
                hasReportData ? (
                    <div className="section-hero home bg-fixed z-0">
                        <div className="relative isolate h-auto">
                            <div className="mx-auto w-full md:w-3/4 lg:w-2/3 bg-black mt-5 mb-2 rounded-3xl shadow-xl">
                                <div className="relative min-w-full place-items-center py-5 sm:py-5 lg:py-5 px-5 md:px-10">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-5">
                                            <img src="https://img.freepik.com/free-photo/smiley-handsome-man-posing_23-2148911841.jpg" alt="Profile Photo" className="w-32 h-32 rounded-lg" />
                                            <div>
                                                <h2 className="text-lg font-semibold text-white">{fullName}</h2>
                                                <h2 className="text-lg font-semibold text-white">{email}</h2>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button color="primary" variant="flat" startContent={<IoShareSocial />} />
                                            <Button color="primary" variant="flat" startContent={<FiDownload />} onClick={generatePDF}>
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
                                                value={calculateAverageScore(assessmentReport?.overallScores)}
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
                                            {assessmentReport?.overallScores?.map((score, index) => (
                                                <Progress
                                                    key={index}
                                                    label={score.label}
                                                    size="md"
                                                    value={score.percentage}
                                                    maxValue={100}
                                                    color={getColor(score.percentage)}
                                                    showValueLabel={true}
                                                    classNames={{
                                                        base: "max-w-md py-1",
                                                        track: "drop-shadow-md border border-default",
                                                        label: "tracking-wider font-bold text-gray-900",
                                                        value: "text-gray-900 font-bold",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-auto w-full md:w-3/4 lg:w-2/3 bg-white mt-5 mb-2 py-4 rounded-3xl shadow-2xl">
                                {assessmentReport && Object.entries(assessmentReport.detailedScores).map(([category, scores], index) => (
                                    <div key={index} className="relative min-w-full place-items-center py-2 sm:py-3 lg:py-3 px-5 md:px-10">
                                        <h2 className="text-xl font-bold pb-2">
                                            {category}:
                                        </h2>
                                        {scores.map((item, index) => (
                                            <div key={index} className="py-2">
                                                <Progress
                                                    label={item.label}
                                                    size="md"
                                                    value={item.percentage}
                                                    maxValue={100}
                                                    color={getColor(item.percentage)}
                                                    showValueLabel={true}
                                                    classNames={{
                                                        base: "max-w-md py-1",
                                                        track: "drop-shadow-md border border-default",
                                                        label: "tracking-wider text-md font-bold text-gray-900",
                                                        value: "text-gray-900 text-md font-bold",
                                                    }}
                                                />
                                                <div className="flex text-sm pt-1 gap-2"><b>Comment: </b><p>{item.comment}</p></div>
                                            </div>
                                        ))}
                                        <div className="mt-5 min-w-full space-y-4 border-t border-gray-300"></div>
                                    </div>
                                ))}
                                <div className="relative min-w-full place-items-center py-5 sm:py-5 lg:py-5 px-5 md:px-10">
                                    <h2 className="text-xl font-bold pb-2">Recommendations:</h2>
                                    <p><strong>Hiring Recommendation:</strong> {assessmentReport?.recommendations.hiringRecommendation}</p>
                                    <p><strong>Suggested Role:</strong> {assessmentReport?.recommendations.suggestedRole}</p>
                                    <p><strong>Potential for Growth:</strong> {assessmentReport?.recommendations.potentialForGrowth}</p>
                                    <p><strong>Training Suggestions:</strong> {assessmentReport?.recommendations.trainingSuggestions}</p>
                                    <div className="mt-5 min-w-full space-y-4 border-t border-gray-300"></div>
                                </div>
                                <div className="relative min-w-full place-items-center py-5 sm:py-5 lg:py-5 px-5 md:px-10">
                                    <h2 className="text-xl font-bold pb-2">Summary:</h2>
                                    <p>{assessmentReport?.summary}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center items-center h-[80vh] w-full pt-10'>
                        <div className="w-full text-center">
                            <p className="text-lg font-semibold text-gray-900">Interview Report is empty</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default InterviewReport;
