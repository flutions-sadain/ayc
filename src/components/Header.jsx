import React from 'react';
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuItem, NavbarMenuToggle, NavbarMenu } from "@nextui-org/react";
import { SearchIcon } from "./icons/SearchIcon.jsx";
import logo from "/images/logo-white.svg";

const Header = ({ children }) => {
    // const email = useSelector((state) => state.user.email);
    const email = localStorage.getItem('email');
    const fullName = useSelector((state) => state.user.name);
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
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                shouldHideOnScroll
                classNames={{
                    item: [
                        "flex",
                        "relative",
                        "h-full",
                        "items-center",
                        "data-[active=true]:after:content-['']",
                        "data-[active=true]:after:absolute",
                        "data-[active=true]:after:bottom-0",
                        "data-[active=true]:after:left-0",
                        "data-[active=true]:after:right-0",
                        "data-[active=true]:after:h-[2px]",
                        "data-[active=true]:after:rounded-[2px]",
                        "data-[active=true]:after:bg-primary",
                    ],
                }}
                maxWidth='full'
                style={{ backgroundColor: "#000", color: "#fff", zIndex: "10" }}
            >
                <NavbarContent className="lg:hidden" justify="center">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>

                <NavbarContent className="lg:hidden flex pr-3" justify="start">
                    <NavbarBrand>
                        <Link href="/">
                            <img src={logo} alt="Advance Your Career" className="brand h-[100px] w-[100px]" />
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden lg:flex gap-4" justify="center">
                    <NavbarBrand>
                        <Link href="/">
                            <img src={logo} alt={"Advance Your Career"}
                                className="brand h-[100px] w-[100px]" />
                        </Link>
                    </NavbarBrand>
                    <NavbarItem className="text-white" isActive={location.pathname === '/'}>
                        <Link aria-current="Home" href="/" className="text-white">
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="text-white" isActive={location.pathname === '/recommendedCourse'}>
                        <Link href="recommendedCourse" aria-current="RecommendedCourse" className="text-white">
                            Courses
                        </Link>
                    </NavbarItem>
                    {/* <NavbarItem className="text-white" isActive={location.pathname === '/resume'}>
                        <Link href="/resume" aria-current="Resumes" className="text-white">
                            Resumes
                        </Link>
                    </NavbarItem> */}
                    <NavbarItem className="text-white" isActive={location.pathname === '/interview'}>
                        <Link className="text-white" aria-current="Interview" href="interview">
                            Interview
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="text-white" isActive={location.pathname === '/assessment'}>
                        <Link className="text-white" aria-current="Assessment" href="assessment">
                            Assessment
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
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent as="div" className="items-center" justify="end">
                    <NavbarItem className="hidden lg:flex items-center">
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
                    </NavbarItem>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="default"
                                name="Jason Hughes"
                                size="sm"
                                src="https://img.freepik.com/free-photo/smiley-handsome-man-posing_23-2148911841.jpg"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{email}</p>
                            </DropdownItem>
                            <DropdownItem key="profile" href="/profile">Profile</DropdownItem>
                            <DropdownItem key="subscriptions">Subscriptions</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>

                <NavbarMenu className="bg-black">
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
                    <NavbarMenuItem className="text-white" isActive={location.pathname === '/'}>
                        <Link aria-current="Home" href="#" className="text-white">
                            Home
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem className="text-white" isActive={location.pathname === '/recommendedCourse'}>
                        <Link href="recommendedCourse" aria-current="recommendedCourse" className="text-white">
                            Courses
                        </Link>
                    </NavbarMenuItem>
                    {/* <NavbarMenuItem className="text-white" isActive={location.pathname === '/Resumes'}>
                        <Link href="#" aria-current="Resumes" className="text-white">
                            Resumes
                        </Link>
                    </NavbarMenuItem> */}
                    <NavbarMenuItem className="text-white" isActive={location.pathname === '/interview'}>
                        <Link className="text-white" aria-current="Interview" href="interview">
                            Interview
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem className="text-white" isActive={location.pathname === '/assessments'}>
                        <Link className="text-white" aria-current="Assessments" href="assessment">
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
                </NavbarMenu>
            </Navbar>
            <main>
                {children}
            </main>
        </motion.div>
    )
}

export default Header;