import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Checkbox, Chip, DatePicker, Input, Select, SelectItem, Spinner, Tab, Tabs, Textarea } from '@nextui-org/react';
import axios from 'axios';
import makeRequest from '../../api/useApi';
import { FaPlus, FaRegEdit } from 'react-icons/fa';
import { IoSchoolOutline } from 'react-icons/io5';
import { useDateFormatter } from '@react-aria/i18n';

const EducationForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (name, value) => {
        setUserDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log("changed", value)
    };

    let formatter = useDateFormatter();

    const degree = [
      { label: "Bachelors Degree", value: "Bachelors Degree" },
      { label: "Associate Degree", value: "Associate Degree" },
      { label: "Doctoral (PhD)", value: "Doctoral (PhD)" },
      { label: "Professional Degree", value: "Professional Degree" },
      { label: "Diploma", value: "Diploma" },
    ]

    return (
        <div>
            <div className="flex justify-start items-start flex-warp p-4 m-2 rounded-sm border shadow-sm gap-5">
                <div className="p-2 border border-gray-400 rounded-sm">
                    <IoSchoolOutline className="text-3xl text-gray-600" />
                </div>
                <div className="w-full flex justify-between items-start">
                    <div>
                        <h2 className="text-md font-semibold">Priyadarshini Engineering College</h2>
                        <div className="flex items-center">
                            <h2 className="text-md font-medium">BEng </h2>
                            <span> - </span>
                            <h2 className="text-md font-medium"> Computer Science and Engineering</h2>
                        </div>
                        <h2 className="text-md text-gray-700">Jun 2019 to Jun 2023</h2>
                        <h2 className="text-md text-gray-700 mb-3">8.65/10 GPA</h2>
                    </div>
                    <div>
                        <Button color="secondary" variant="faded" startContent={<FaRegEdit />}>
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-start items-start flex-warp p-4 m-2 rounded-sm border shadow-sm gap-5">
                <div className="p-2 border border-gray-400 rounded-sm">
                    <IoSchoolOutline className="text-3xl text-gray-600" />
                </div>
                <div className="w-full flex justify-between items-start">
                    <div>
                        <h2 className="text-md font-semibold">Islamiah Higher Secondary School</h2>
                        <div className="flex items-center">
                            <h2 className="text-md font-medium">12th </h2>
                            <span> - </span>
                            <h2 className="text-md font-medium"> HSSC</h2>
                        </div>
                        <h2 className="text-md text-gray-700">Jun 2018 to Mar 2019</h2>
                        <h2 className="text-md text-gray-700 mb-3">84% </h2>
                    </div>
                    <div>
                        <Button color="secondary" variant="faded" startContent={<FaRegEdit />}>
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
            <Button color="secondary" variant="light" startContent={<FaPlus />}>
                Add education
            </Button>
            <form>
                <div className="flex flex-col gap-4">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text"
                            label="School/College"
                            aria-label="School/College"
                            placeholder="Enter your School/College"
                            labelPlacement="outside"
                            onChange={(e) => handleChange('college', e.target.value)}
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Select
                            label="Degree"
                            aria-label="Degree"
                            placeholder="Select Your Degree"
                            labelPlacement="outside"
                            onSelectionChange={(value) => handleChange('degree', value.currentKey)}
                        >
                            {degree?.map((degree) => (
                                <SelectItem key={degree.value} value={degree.value}>
                                    {degree.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text"
                            label="Major"
                            aria-label="Major"
                            placeholder="Enter your Major / Field of Study"
                            labelPlacement="outside"
                            onChange={(e) => handleChange('Major', e.target.value)}
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <DatePicker label="Start date" aria-label="Start date" labelPlacement="outside" onChange={(value) => handleChange('EducationStartDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--")} />
                        <DatePicker label="End date" aria-label="End date" labelPlacement="outside" onChange={(value) => handleChange('EducationEndDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--")} />
                    </div>
                    <Checkbox>I currently work here</Checkbox>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text"
                            label="Grade"
                            aria-label="Grade"
                            placeholder="Enter your Grade 8.5/10 or 85%"
                            labelPlacement="outside"
                            onChange={(e) => handleChange('grade', e.target.value)}
                        />
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

export default EducationForm