import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Link, Navigate, RouterProvider } from "react-router-dom";
import AboutUs from "./components/AboutUs.jsx";
import Contact from "./components/Contact.jsx";
import Register from "./components/Register.jsx";
import Apps from "./components/platform/Apps.jsx";
import { NextUIProvider } from "@nextui-org/react";
import NewResumeUpload from './components/Dashboard/ResumeUpload';
import ProfileForm from "./components/Dashboard/ProfileForm";
import AssessmentScore from "./components/Dashboard/AssessmentScore";
import NewDashboard from "./components/Dashboard/Dashboard";
import CourseDetailsContent from "./components/Dashboard/CourseDetails";
import RecommendedCourse from "./components/course/RecommendedCourse";
import CourseDetails from './components/course/CourseDetails';
import Interview from './pages/interview/index.jsx';
import InterviewSimulator from './pages/interview/InterviewSimulator.jsx';
import Login from './components/Login.jsx';
import Onboarding from "./pages/onboarding/index.jsx";
import Profile from './pages/profile/index.jsx';
import { Provider } from 'react-redux';
import store from './store';
import Assessment from './pages/assessment/index.jsx'



const ProtectedRoute = ({ Component, ...rest }) => {
    //const { isAuthenticated } = useAuth(); // Replace with your authentication logic

    const userToken = localStorage.getItem('userToken')

    return userToken ? <Component {...rest} /> : <Navigate to="/login" />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "aboutUs",
        element: <AboutUs />
    },
    {
        path: "contact",
        element: <Contact />
    },
    {
        path: "register",
        element: <Register />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: "apps",
        element: <ProtectedRoute Component={Apps} />,
    },
    {
        path: "/newResume",
        element: <ProtectedRoute Component={NewResumeUpload} />,
    },
    {
        path: "/profileForm",
        element: <ProtectedRoute Component={ProfileForm} />,
    },
    {
        path: "/newAssessment",
        element: <ProtectedRoute Component={AssessmentScore} />,
    },
    {
        path: "/assessmentScore",
        element: <ProtectedRoute Component={AssessmentScore} />,
    },
    {
        path: "/newDashboard",
        element: <ProtectedRoute Component={NewDashboard} />,
    },
    {
        path: "/courseDetailsContent",
        element: <ProtectedRoute Component={CourseDetailsContent} />,
    },
    {
        path: "/onboarding",
        element: <ProtectedRoute Component={Onboarding} />
    },
    {
        path: "/recommendedCourse",
        element: <ProtectedRoute Component={RecommendedCourse} />
    },
    {
        path: "/courseDetails",
        element: <ProtectedRoute Component={CourseDetails} />
    },
    {
        path: "/interview",
        element: <ProtectedRoute Component={Interview} />
    },
    {
        path: "/interviewSimulator",
        element: <ProtectedRoute Component={InterviewSimulator} />
    },
    {
        path: "/assessment",
        element: <ProtectedRoute Component={Assessment} />
    },
    {
        path: "/profile",
        element: <ProtectedRoute Component={Profile} />
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <NextUIProvider>
            <Provider store={store}>
                <div className="page-wrapper">
                    <div className="main-wrapper">
                        <RouterProvider router={router} />
                    </div>
                </div>
            </Provider>
        </NextUIProvider>
    </React.StrictMode>
);
