import { motion } from 'framer-motion';
import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import logo from "../../../public/images/logo.svg";
import Dashboard from "./Dashboard.jsx";
import Assessment from "./Assessment.jsx";
import Courses from "./Courses.jsx";
import Resumes from "./Resumes.jsx";



function Apps() {

    const [component, setComponent] = useState('dashboard');
    const switchComponent = (componentName) => {
        setComponent(componentName);
    };


    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="navigation-main">
                <nav className="navigation-wrap">

                    <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease"
                         data-easing2="ease" role="banner" className="navigation w-nav">
                        <div className="navigation-container">
                            <Link to="/">
                                <img src={logo} alt={"Advance Your Career"} className="brand logo-image"></img>
                            </Link>
                            <div className="navigation-main mt-4">

                                <nav role="navigation" className="nav-menu w-nav-menu">
                                    <Link to="/" className="navbar-link w-nav-link">Home</Link>
                                    <button onClick={() => switchComponent('dashboard')}
                                            className="navbar-link w-nav-link">Dashboard
                                    </button>
                                    <button onClick={() => switchComponent('assessment')}
                                            className="navbar-link w-nav-link">Assessment
                                    </button>
                                    <button onClick={() => switchComponent('resumes')} className="navbar-link w-nav-link">Resumes</button>
                                    <button onClick={() => switchComponent('courses')} className="navbar-link w-nav-link">Courses</button>
                                    <Link to="/aboutus" className="navbar-link w-nav-link">Account</Link>
                                </nav>
                            </div>

                            <div className="navigation-right">
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button type="button" onClick={() => setIsOpen(!isOpen)}
                                                className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            Udaya Karthick
                                            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                                 fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                      clip-rule="evenodd"/>
                                            </svg>
                                        </button>
                                    </div>
                                    {isOpen && (
                                        <div
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button"
                                            tabIndex="-1">
                                            <div className="py-1" role="none">
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm"
                                                   role="menuitem" tabIndex="-1" id="menu-item-0">Settings</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm"
                                                   role="menuitem" tabIndex="-1" id="menu-item-1">Support</a>
                                                <form method="POST" action="#" role="none">
                                                    <button type="submit"
                                                            className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                                                            role="menuitem" tabIndex="-1" id="menu-item-3">Sign out
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                    <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease-out"
                         data-easing2="ease-out" role="banner" className="navigation-mob w-nav"
                         style={{overflow: 'visible'}}>
                        <div className="navigation-container-mob">
                            <a href="#" className="brand w-nav-brand">
                                <img src={logo} alt={"Advance Your Career"} className="brand logo-2"
                                     style={{minWidth: "100px", marginLeft: 0, paddingLeft: 0}}></img>
                            </a>
                            <div className="nav-mobile-button-wrap">
                                <div className="menu-mob w-nav-button" onClick={toggleMenu}>
                                    <div className="w-icon-nav-menu"></div>
                                </div>
                            </div>
                            {isOpen && (
                                <nav role="navigation" className="nav-menu" style={{
                                    overflow: 'visible',
                                    display: "block",
                                    justifyContent: "space-around",
                                    position: "absolute",
                                    float: "right",
                                    left: 0,
                                    width: "100%",
                                    top: "100%",
                                    cursor: "pointer"
                                }}>
                                    <div className="nav-menu-inner" style={{overflow: 'visible'}}>
                                        <Link to="/" className="navbar-link w-nav-link">Home</Link>
                                        <Link to="/aboutus" className="navbar-link w-nav-link">Platform</Link>
                                        <Link to="/aboutus" className="navbar-link w-nav-link">Solutions</Link>
                                        <Link to="/aboutus" className="navbar-link w-nav-link">Careers</Link>
                                        <Link to="/contact" className="navbar-link w-nav-link">Events</Link>
                                        <Link to="/contact" className="navbar-link w-nav-link">Pricing</Link>
                                        <Link to="/contact" className="navbar-link w-nav-link">Resources</Link>
                                        <Link to="/aboutus" className="navbar-link w-nav-link">About us</Link>
                                        <Link to="/contact" className="navbar-link w-nav-link">Contact</Link>
                                        <Link to="/contact" className="navbar-link w-nav-link">Settings</Link>
                                        <Link to="/contact" className="navbar-link w-nav-link">Support</Link>
                                        <Link to="/aboutus" className="navbar-link w-nav-link">About us</Link>
                                        <Link to="/contact" className="navbar-link w-nav-link">Sign Out</Link>
                                    </div>
                                </nav>
                            )}
                        </div>
                    </div>

                </nav>
            </div>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}>
                <div className="container-large">
                    {component === 'dashboard' && <Dashboard/>}
                    {component === 'assessment' && <Assessment/>}
                    {component === 'courses' && <Courses/>}
                    {component === 'resumes' && <Resumes/>}
                </div>


            </motion.div>


        </>
    )
}


export default Apps
