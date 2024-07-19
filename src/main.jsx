import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs.jsx';
import Contact from './components/Contact.jsx';
import Register from './components/Register.jsx';
import Apps from './components/platform/Apps.jsx';
import { NextUIProvider } from '@nextui-org/react';
import NewResumeUpload from './components/Dashboard/ResumeUpload';
import ProfileForm from './components/Dashboard/ProfileForm';
import AssessmentScore from './components/Dashboard/AssessmentScore';
import NewDashboard from './components/Dashboard/Dashboard';
import CourseDetailsContent from './components/Dashboard/CourseDetails';
import RecommendedCourse from './components/course/RecommendedCourse';
import CourseDetails from './components/course/CourseDetails';
import Interview from './pages/interview/index.jsx';
import InterviewSimulator from './pages/interview/InterviewSimulator.jsx';
import Login from './components/Login.jsx';
import Onboarding from './pages/onboarding/index.jsx';
import Profile from './pages/profile/index.jsx';
import Enterprise from './pages/enterprise/index.jsx';
import EnterpriseOnboarding from './pages/enterprise/onboarding/index.jsx';
import ResumeFiltering from './pages/enterprise/ResumeFiltering.jsx';
import AddingCandidates from './pages/enterprise/AddingCandidates.jsx';
import { Provider } from 'react-redux';
import store from './store';
import Assessment from './pages/assessment/index.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <NextUIProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <AuthProvider>
                        <div className="page-wrapper">
                            <div className="main-wrapper">
                                <Routes>
                                    <Route path="/" element={<App />} />
                                    <Route path="/aboutUs" element={<AboutUs />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/apps" element={<ProtectedRoute Component={Apps} />} />
                                    <Route path="/newResume" element={<ProtectedRoute Component={NewResumeUpload} />} />
                                    <Route path="/profileForm" element={<ProtectedRoute Component={ProfileForm} />} />
                                    <Route path="/newAssessment" element={<ProtectedRoute Component={AssessmentScore} />} />
                                    <Route path="/assessmentScore" element={<ProtectedRoute Component={AssessmentScore} />} />
                                    <Route path="/newDashboard" element={<ProtectedRoute Component={NewDashboard} />} />
                                    <Route path="/courseDetailsContent" element={<ProtectedRoute Component={CourseDetailsContent} category="student" />} />
                                    <Route path="/onboarding" element={<ProtectedRoute Component={Onboarding} category="student" />} />
                                    <Route path="/recommendedCourse" element={<ProtectedRoute Component={RecommendedCourse} category="student" />} />
                                    <Route path="/courseDetails" element={<ProtectedRoute Component={CourseDetails} category="student" />} />
                                    <Route path="/interview" element={<ProtectedRoute Component={Interview} category="student" />} />
                                    <Route path="/interviewSimulator" element={<ProtectedRoute Component={InterviewSimulator} category="student" />} />
                                    <Route path="/assessment" element={<ProtectedRoute Component={Assessment} category="student" />} />
                                    <Route path="/profile" element={<ProtectedRoute Component={Profile} category="student" />} />

                                    <Route path="/enterprise" element={<ProtectedRoute Component={Enterprise} category="corporate" />} />
                                    <Route path="/enterprise/onboarding" element={<ProtectedRoute Component={EnterpriseOnboarding} category="corporate" />} />
                                    <Route path="/enterprise/resumeFiltering" element={<ProtectedRoute Component={ResumeFiltering} category="corporate" />} />
                                    <Route path="/enterprise/addingCandidates" element={<ProtectedRoute Component={AddingCandidates} category="corporate" />} />
                                </Routes>
                            </div>
                        </div>
                    </AuthProvider>
                </BrowserRouter>
            </Provider>
        </NextUIProvider>
    </React.StrictMode>
);


// const router = createBrowserRouter([
//     { path: '/', element: <App /> },
//     { path: '/aboutUs', element: <AboutUs /> },
//     { path: '/contact', element: <Contact /> },
//     { path: '/register', element: <Register /> },
//     { path: '/login', element: <Login /> },
//     { path: '/apps', element: <ProtectedRoute Component={Apps} /> },
//     { path: '/newResume', element: <ProtectedRoute Component={NewResumeUpload} /> },
//     { path: '/profileForm', element: <ProtectedRoute Component={ProfileForm} /> },
//     { path: '/newAssessment', element: <ProtectedRoute Component={AssessmentScore} /> },
//     { path: '/assessmentScore', element: <ProtectedRoute Component={AssessmentScore} /> },
//     { path: '/newDashboard', element: <ProtectedRoute Component={NewDashboard} /> },
//     { path: '/courseDetailsContent', element: <ProtectedRoute Component={CourseDetailsContent} /> },
//     { path: '/onboarding', element: <ProtectedRoute Component={Onboarding} category="student" /> },
//     { path: '/recommendedCourse', element: <ProtectedRoute Component={RecommendedCourse} category="student" /> },
//     { path: '/courseDetails', element: <ProtectedRoute Component={CourseDetails} category="student" /> },
//     { path: '/interview', element: <ProtectedRoute Component={Interview} category="student" /> },
//     { path: '/interviewSimulator', element: <ProtectedRoute Component={InterviewSimulator} category="student" /> },
//     { path: '/assessment', element: <ProtectedRoute Component={Assessment} category="student" /> },
//     { path: '/profile', element: <ProtectedRoute Component={Profile} category="student" /> },
// ]);