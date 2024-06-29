import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Checkbox, Chip, DatePicker, Input, Select, SelectItem, Spinner, Tab, Tabs, Textarea } from '@nextui-org/react';
import axios from 'axios';
import makeRequest from '../../api/useApi';
import { RiFolderSettingsLine } from 'react-icons/ri'
import { FaPlus, FaRegEdit } from 'react-icons/fa';

const ProjectsForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (name, value) => {
        setUserDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log("changed", value)
    };
    
    return (
        <div>
            <div className="flex justify-start items-start flex-warp p-4 m-2 rounded-sm border shadow-sm gap-5">
                <div className="p-2 border border-gray-400 rounded-sm">
                    <RiFolderSettingsLine className="text-3xl text-gray-600" />
                </div>
                <div className="w-full flex justify-between items-start">
                    <div>
                        {/* <h2 className="text-md font-semibold">E-commerce Website</h2> */}
                        <div className="flex items-center">
                            <h2 className="text-md font-semibold">E-commerce Website </h2>
                            <span> | </span>
                            <h2 className="text-sm font-normal"> Next.js, JavaScript, Tailwind CSS</h2>
                        </div>
                        <p className="text-sm">
                            • Contributed to the UI design, enhancing user experience and interface aesthetics. <br />
                            • Refactored existing code to improve performance and maintainability. <br />
                            • Integrated product synchronization for seamless inventory updates. <br />
                            • Utilized Redux for efficient state management and improved application scalability. <br />
                        </p>
                    </div>
                    <div>
                        <Button color="secondary" variant="faded" startContent={<FaRegEdit />}>
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
            <Button color="secondary" variant="light" startContent={<FaPlus />}>
                Add Projects
            </Button>
            <form>
                <div className="flex flex-col gap-4">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text"
                            label="Project Title"
                            aria-label="Project Title"
                            placeholder="Enter your Project Title"
                            labelPlacement="outside"
                            onChange={(e) => handleChange('projectTitle', e.target.value)}
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text"
                            label="Project Link"
                            aria-label="Project Link"
                            placeholder="Enter your Project Link"
                            labelPlacement="outside"
                            onChange={(e) => handleChange('projectLink', e.target.value)}
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text"
                            label="Technology Name"
                            aria-label="Technology Name"
                            placeholder="Python, MySQL, JavaScript"
                            labelPlacement="outside"
                            onChange={(e) => handleChange('projectTitle', e.target.value)}
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Textarea label="Project Description" aria-label="Project Description" labelPlacement="outside" placeholder="Tell More about your Project" onChange={(e) => handleChange('ProjectDescription', e.target.value)} />
                    </div>
                    <div className="flex gap-2 sm:gap-4 mt-2 justify-end items-center">
                        <Button color="secondary" variant="light">
                            Cancel
                        </Button>
                        <Button color="primary" variant="solid" type="button">
                            {isLoading ? (
                                <>
                                    <Spinner className="pr-2" color="current" size="sm" /> Submitting...
                                </>
                            ) : "Save"} </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProjectsForm