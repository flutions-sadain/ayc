import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon.jsx";
import logo from "/images/logo-white.svg";

const Header = () => {
    const email = useSelector((state) => state.user.email);
    const fullName = useSelector((state) => state.user.name);

    return (
        <motion.div>
            <Navbar classNames={{
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
            }} maxWidth="full" className="px-10" style={{ backgroundColor: "#000", color: "#fff" }}>
                <NavbarContent>
                    <NavbarBrand className="max-w-md w-max">
                        <Link to="/">
                            <img src={logo} alt={"Advance Your Career"}
                                className="brand h-[100px] w-[100px]"></img>
                        </Link>
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-8 text-white" justify="center">
                        <NavbarItem className="text-white" isActive>
                            <Link aria-current="Home" href="#" className="text-white">
                                Home
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white">
                            <Link href="#" aria-current="Resumes" className="text-white">
                                Courses
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white">
                            <Link href="#" aria-current="Resumes" className="text-white">
                                Resumes
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white">
                            <Link className="text-white" href="#">
                                Interview
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white">
                            <Link className="text-white" href="#">
                                Assessments
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white">
                            <Link className="text-white" href="#">
                                Workshop
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="text-white">
                            <Link className="text-white" href="#">
                                Contest
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex text-white" justify="end">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[32rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Search Anything on AYC..."
                        size="md"
                        startContent={<SearchIcon size={18} />}
                        type="search"
                    />
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">Account</DropdownItem>
                            <DropdownItem key="team_settings">Subscriptions</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </motion.div>
    )
}

export default Header