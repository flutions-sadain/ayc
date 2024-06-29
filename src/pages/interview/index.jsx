import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import InterviewForm from './InterviewForm';
import makeRequest from '../../api/useApi';
import { Button, Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import InterviewReport from '../../components/report/InterviewReport';

const Interview = () => {
    const [interviewHistory, setInterviewHistory] = useState([]);
    const [showInterviewForm, setShowInterviewForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const interviewId = queryParams.get('id');

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!isMounted.current) return;
        if (!interviewId) {
            const fetchInterviewHistory = async () => {
                setLoading(true);
                try {
                    const formData = new URLSearchParams();
                    formData.append("email", email);
                    const response = await makeRequest('POST', 'getInterviewHistoryByEmail', formData);
                    setInterviewHistory(response);
                } catch (error) {
                    console.error("Error fetching interview history:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchInterviewHistory();
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

    const handleViewReport = (interviewId) => {
        navigate(`/interview?id=${interviewId}`);
    };

    const handleTakeInterview = () => {
        setShowInterviewForm(true);
    };

    const handlePrevious = () => {
        setShowInterviewForm(false);
    };

    return (
        <Header>
            {loading ? (
                <div className='flex justify-center items-center h-[80vh] w-full pt-10'>
                    <div className="w-full text-center">
                        <Spinner color="secondary" size="lg" />
                    </div>
                </div>
            ) : (
                <>
                    {interviewId ? (
                        <InterviewReport interviewId={interviewId} />
                    ) : (
                        <>
                            {!showInterviewForm && interviewHistory.length > 0 && (
                                <div className="mx-5 lg:mx-40 my-10">
                                    <h1 className="text-4xl font-bold text-gray-900 sm:text-4xl py-2">AI Powered Interview Simulator</h1>
                                    <h2 className="text-lg font-medium text-gray-700 pb-5">Ace Your Next Interview with Confidence</h2>
                                    <p className="text-base text-gray-700 pb-2">Start practicing today and get one step closer to landing your dream job!</p>
                                    <Button className="mb-7" color="primary" variant="shadow" onClick={handleTakeInterview}>
                                        Take Interview
                                    </Button>
                                    <div className="">
                                        <Table isStriped aria-label="Example static collection table">
                                            <TableHeader>
                                                <TableColumn>ID</TableColumn>
                                                <TableColumn>DATE</TableColumn>
                                                <TableColumn>SCORE</TableColumn>
                                                <TableColumn>Report</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {interviewHistory.map((interview, index) => (
                                                    <TableRow key={interview.interviewId}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{new Date(interview.date).toLocaleDateString()}</TableCell>
                                                        <TableCell><Chip color={getColor(interview.score)} variant="dot">{interview.score}%</Chip></TableCell>
                                                        <TableCell>
                                                            <Button color="secondary" variant="shadow" onClick={() => handleViewReport(interview.interviewId)}>
                                                                View Report
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            )}
                            {(showInterviewForm || interviewHistory.length === 0) && (
                                <InterviewForm handlePrevious={handlePrevious} interviewHistory={interviewHistory} />
                            )}
                        </>
                    )}
                </>
            )}
        </Header>
    );
};

export default Interview;
