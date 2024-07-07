import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import AssessmentForm from './AssessmentForm';
import makeRequest from '../../api/useApi';
import { Button, Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import AssessmentReport from '../../components/report/AssessmentReport';

const Assessment = () => {
    const [assessmentHistory, setAssessmentHistory] = useState();
    const [showAssessmentForm, setShowAssessmentForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const assessmentID = queryParams.get('id');

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!isMounted.current) return;
        if (!assessmentID) {
            const fetchAssessmentHistory = async () => {
                setLoading(true);
                try {
                    const formData = new URLSearchParams();
                    formData.append("email", email);
                    const response = await makeRequest('POST', 'getAssessmentHistoryByEmail', formData);
                    setAssessmentHistory(response);
                } catch (error) {
                    console.error("Error fetching assessment history:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchAssessmentHistory();
        }
    }, [email, assessmentID]);

    const getColor = (value) => {
        if (value < 33) {
            return 'danger';
        } else if (value >= 33 && value <= 66) {
            return 'warning';
        } else {
            return 'success';
        }
    };

    const handleViewReport = (assessmentID) => {
        navigate(`/assessment?id=${assessmentID}`);
    };

    const handleTakeAssessment = () => {
        setShowAssessmentForm(true);
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
                    {assessmentID ? (
                        <AssessmentReport assessmentID={assessmentID} />
                    ) : (
                        <>
                            {!showAssessmentForm && assessmentHistory?.length > 0 && (
                                <div className="mx-5 lg:mx-40 my-10">
                                    <h1 className="text-4xl font-bold text-gray-900 sm:text-4xl py-2">AI Powered Assessment Simulator</h1>
                                    <h2 className="text-lg font-medium text-gray-700 pb-5">Ace Your Next Assessment with Confidence</h2>
                                    <p className="text-base text-gray-700 pb-2">Start practicing today and get one step closer to landing your dream job!</p>
                                    <Button className="mb-7" color="primary" variant="shadow" onClick={handleTakeAssessment}>
                                        Take Assessment
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
                                                {assessmentHistory?.map((assessment, index) => (
                                                    <TableRow key={assessment.assessmentID}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{new Date(assessment.date).toLocaleDateString()}</TableCell>
                                                        <TableCell><Chip color={getColor(assessment.score)} variant="dot">{assessment.score}%</Chip></TableCell>
                                                        <TableCell>
                                                            <Button color="secondary" variant="shadow" onClick={() => handleViewReport(assessment.assessmentID)}>
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
                            {(showAssessmentForm || assessmentHistory?.length === 0) && (
                                <AssessmentForm setShowAssessmentForm={setShowAssessmentForm} showAssessmentForm={showAssessmentForm} assessmentHistory={assessmentHistory} />
                            )}
                        </>
                    )}
                </>
            )}
        </Header>
    )
}

export default Assessment