import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import AboutUs from "./components/AboutUs.jsx";
import Contact from "./components/Contact.jsx";
import Register from "./components/Register.jsx";
import Apps from "./components/platform/Apps.jsx";
import { NextUIProvider } from "@nextui-org/react";
import NewResumeUpload from './components/Dashboard/ResumeUpload';
import ProfileForm from "./components/Dashboard/ProfileForm";
import AssessmentScreen from "./components/Dashboard/Assessment";
import AssessmentScore from "./components/Dashboard/AssessmentScore";
import NewDashboard from "./components/Dashboard/Dashboard";
import CourseDetailsContent from "./components/Dashboard/CourseDetails";
import Login from './components/Login.jsx';
import Home from "./components/Dashboardv2/Home.jsx";
import { Provider } from 'react-redux';
import store from './store';

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
        element: <Apps />
    },
    {
        path: "/newResume",
        element: <NewResumeUpload />
    },
    {
        path: "/profileForm",
        element: <ProfileForm />
    },
    {
        path: "/newAssessment",
        element: <AssessmentScreen />
    },
    {
        path: "/assessmentScore",
        element: <AssessmentScore />
    },
    {
        path: "/newDashboard",
        element: <NewDashboard />
    },
    {
        path: "/courseDetailsContent",
        element: <CourseDetailsContent />
    },
    {
        path: "/home",
        element: <Home />
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

    ,
)
