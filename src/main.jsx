import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import AboutUs from "./components/AboutUs.jsx";
import Contact from "./components/Contact.jsx";
import Register from "./components/Register.jsx";
import Apps from "./components/platform/Apps.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element:<App/>

    },
    {
        path: "aboutUs",
        element: <AboutUs/>
    },
    {
        path: "contact",
        element: <Contact/>
    },
    {
        path: "register",
        element: <Register/>
    },
    {
        path: "apps",
        element: <Apps/>
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className="page-wrapper">
            <div className="main-wrapper">
                <RouterProvider router={router} />
            </div>
        </div>
    </React.StrictMode>
,
)
