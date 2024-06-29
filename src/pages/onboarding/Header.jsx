import React from 'react';
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuItem, NavbarMenuToggle, NavbarMenu } from "@nextui-org/react";
import { SearchIcon } from "../../components/icons/SearchIcon.jsx";
import logo from "/images/logo.svg";

const Header = ({ children }) => {
    // const email = useSelector((state) => state.user.email);
    // const fullName = useSelector((state) => state.user.name);
    const email = localStorage.getItem('email');
    const fullName = localStorage.getItem('fullName');
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    };

    return (
        <motion.div>
            <Navbar
                className="lg:px-12 items-center relative flex h-full"
                maxWidth='full'
                style={{ backgroundColor: "transparent", color: "#000", zIndex: "10", backdropFilter: "none" }}
            >
                {/* <NavbarContent className="lg:hidden" justify="center">
                        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                    </NavbarContent> */}

                <NavbarContent className="lg:hidden flex pr-3" justify="start">
                    <NavbarBrand>
                        <Link href="/">
                            <img src={logo} alt="Advance Your Career" className="brand h-[80px] w-[80px]" />
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden lg:flex gap-4" justify="center">
                    <NavbarBrand>
                        <Link href="/">
                            <img src={logo} alt={"Advance Your Career"}
                                className="brand h-[80px] w-[80px]" />
                        </Link>
                    </NavbarBrand>
                    {/* <NavbarItem className="text-white" isActive={location.pathname === '/home'}>
                            <Link aria-current="Home" href="/home" className="text-white">
                                Home
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white" isActive={location.pathname === '/recommendedCourse'}>
                            <Link href="recommendedCourse" aria-current="RecommendedCourse" className="text-white">
                                Courses
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white" isActive={location.pathname === '/resume'}>
                            <Link href="/resume" aria-current="Resumes" className="text-white">
                                Resumes
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white" isActive={location.pathname === '/interview'}>
                            <Link className="text-white" aria-current="Interview" href="interview">
                                Interview
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white" isActive={location.pathname === '/Assessments'}>
                            <Link className="text-white" aria-current="Assessments" href="#">
                                Assessments
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white" isActive={location.pathname === '/Workshop'}>
                            <Link className="text-white" aria-current="workshop" href="#">
                                Workshop
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white" isActive={location.pathname === '/Contest'}>
                            <Link className="text-white" aria-current="Contest" href="#">
                                Contest
                            </Link>
                        </NavbarItem> */}
                </NavbarContent>

                <NavbarContent as="div" className="items-center" justify="end">
                    {/* <NavbarItem className="hidden lg:flex items-center">
                        <Input
                            classNames={{
                                base: "max-w-full h-10",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                            placeholder="Type to search..."
                            size="sm"
                            startContent={<SearchIcon size={18} />}
                            type="search"
                        />
                    </NavbarItem> */}
                    <NavbarItem>
                        <p className="text-md font-medium max-sm:hidden lg:block">{fullName}</p>
                    </NavbarItem>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name={fullName}
                                size="sm"
                                // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                src="https://img.freepik.com/free-photo/smiley-handsome-man-posing_23-2148911841.jpg"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{email}</p>
                            </DropdownItem>
                            {/* <DropdownItem key="account">Account</DropdownItem> */}
                            <DropdownItem key="subscriptions">Subscriptions</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                </NavbarContent>

                {/* <NavbarMenu className="bg-black">
                        <NavbarMenuItem>
                            <Input
                                classNames={{
                                    base: "max-w-full h-10",
                                    mainWrapper: "h-full",
                                    input: "text-small",
                                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                }}
                                placeholder="Type to search..."
                                size="sm"
                                startContent={<SearchIcon size={18} />}
                                type="search"
                            />
                        </NavbarMenuItem>
                        <NavbarMenuItem className="text-white" isActive={location.pathname === '/home'}>
                            <Link aria-current="Home" href="#" className="text-white">
                                Home
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem className="text-white" isActive={location.pathname === '/recommendedCourse'}>
                            <Link href="recommendedCourse" aria-current="recommendedCourse" className="text-white">
                                Courses
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem className="text-white" isActive={location.pathname === '/Resumes'}>
                            <Link href="#" aria-current="Resumes" className="text-white">
                                Resumes
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem className="text-white" isActive={location.pathname === '/interview'}>
                            <Link className="text-white" aria-current="Interview" href="interview">
                                Interview
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem className="text-white" isActive={location.pathname === '/Assessments'}>
                            <Link className="text-white" aria-current="Assessments" href="#">
                                Assessments
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem className="text-white" isActive={location.pathname === '/Workshop'}>
                            <Link className="text-white" aria-current="Workshop" href="#">
                                Workshop
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem className="text-white" isActive={location.pathname === '/Contest'}>
                            <Link className="text-white" aria-current="Contest" href="#">
                                Contest
                            </Link>
                        </NavbarMenuItem>
                    </NavbarMenu> */}
            </Navbar>
            <main>
                {children}
            </main>
        </motion.div>
    )
}

export default Header