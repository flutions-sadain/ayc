import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import Logo from "../../../public/images/logo.svg";
import Profile from "../../assets/images/Profile.jpg";

const Header = () => {
    return (
        <>
        <nav className="bg-white px-10">
            <div className="mx-auto">
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center">
                        <img className="w-20 pt-2 pb-2" src={Logo} alt="Selma" />
                        <form className="pl-20">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <IoIosSearch className="text-xl text-gray-500" />
                                </div>
                                <input type="search" id="default-search" className="block w-96   p-2 ps-10 text-sm text-[#333334] bg-[#EEEEEE] border border-gray-300 rounded-sm focus:border-none" placeholder="Search Mockups, Logos..." required />
                                {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center pt-3 pb-2">
                        <div className="relative">
                            <div className="flex items-center focus:outline-none">
                                <img src={Profile} alt="Profile" className="w-8 h-8 rounded-full" />
                                <div className="text-start flex items-center justify-center">
                                    <span className="text-Black text-start font-semibold text-md ml-2">Evans Marcus</span>
                                    <span className="text-Black text-sm ml-2"><IoIosArrowDown /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <nav className="bg-slate-600 px-10">
            <ul className="flex space-x-6 py-2 pb-0">
                <Link to="/" className="text-white pb-2font-medium  active:text-[#dbfe01] hover:text-[#dbfe01] cursor-pointer">Home</Link>
                <Link to="/newDashboard" className="text-[#dbfe01] pb-2 font-medium border-b-[3px] border-[#dbfe01] active:text-[#dbfe01] hover:text-[#dbfe01] cursor-pointer">Dashboard</Link>
                <Link to="#" className="text-white pb-2 font-medium active:text-[#dbfe01] hover:text-[#dbfe01] cursor-pointer">Courses</Link>
                <Link to="#" className="text-white pb-2 font-medium active:text-[#dbfe01] hover:text-[#dbfe01] cursor-pointer">Explore Workshops</Link>
                <Link to="#" className="text-white pb-2 font-medium active:text-[#dbfe01] hover:text-[#dbfe01] cursor-pointer">Contests</Link>
            </ul>
        </nav>
        </>
    )
}

export default Header;