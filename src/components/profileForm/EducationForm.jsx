import React, { useState, useEffect } from "react";
import {
    Button,
    Checkbox,
    DatePicker,
    Input,
    Select,
    SelectItem,
    Spinner,
} from "@nextui-org/react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { IoSchoolOutline } from 'react-icons/io5';
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

const EducationForm = ({
    educationData = [],
    onSave,
    onChange,
    isLoading,
}) => {

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const initialFormData = {
        institution: "",
        location: "",
        degree: "",
        major: "",
        startDate: formatDate(new Date()),
        endDate: formatDate(new Date()),
        grade: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [isCurrent, setIsCurrent] = useState(false);
    const [currentIndex, setCurrentIndex] = useState();
    const [updatedEducation, setUpdatedEducation] = useState(educationData);

    useEffect(() => {
        if (!isEditing) {
            setFormData(initialFormData);
            setIsCurrent(false);
        }
    }, [educationData, isEditing]);

    const handleChange = (name, value, index) => {
        const updatedFormData = {
            ...formData,
            [name]: value,
        };
        let tempEducationData = [...educationData];
        tempEducationData[index] = updatedFormData;
        setFormData(updatedFormData);
        onChange(tempEducationData);
    };

    const handleCancel = () => {
        setFormData(initialFormData);
        setIsCurrent(false);
        setIsEditing(false);
    };

    const handleEdit = (education, index) => {
        const formattedEducation = {
            ...education,
            startDate: formatDate(new Date(education.startDate)),
            endDate: education.endDate === "present" ? "present" : formatDate(new Date(education.endDate)),
        };
        setFormData(formattedEducation);
        setIsCurrent(education.endDate === "present");
        setIsEditing(true);
        setCurrentIndex(index);
    };

    const handleAdd = () => {
        setFormData(initialFormData);
        setIsEditing(true);
        setCurrentIndex(updatedEducation.length);
        setUpdatedEducation(prev => [...prev, initialFormData]);
    };

    const handleSave = () => {
        const dataToSave = {
            ...formData,
            startDate: formData.startDate,
            endDate: isCurrent ? "present" : formData.endDate,
        };
        let updatedEducationData = [...educationData];
        if (isEditing) {
            updatedEducationData[currentIndex] = dataToSave;
        } else {
            updatedEducationData.push(dataToSave);
        }
        onSave(updatedEducationData);
        handleCancel();
    };

    const degree = [
        { label: "Bachelors Degree", value: "Bachelors Degree" },
        { label: "Associate Degree", value: "Associate Degree" },
        { label: "Doctoral (PhD)", value: "Doctoral (PhD)" },
        { label: "Professional Degree", value: "Professional Degree" },
        { label: "Diploma", value: "Diploma" },
    ]

    let formatter = useDateFormatter();

    return (
        <div>
            {educationData?.map((education, index) => (
                <div key={index} className="flex justify-start items-start flex-warp p-4 m-2 rounded-sm border shadow-sm gap-5">
                    <div className="p-2 border border-gray-400 rounded-sm">
                        <IoSchoolOutline className="text-3xl text-gray-600" />
                    </div>
                    <div className="w-full flex justify-between items-start">
                        <div>
                            <div className="flex items-center space-x-1">
                                <h2 className="text-md font-semibold">{education?.institution}</h2>
                                <span>-</span>
                                <h2 className="text-md font-medium"> {education?.location}</h2>
                            </div>
                            <div className="flex items-center space-x-1">
                                <h2 className="text-md font-medium">{education?.degree} </h2>
                                <span>-</span>
                                <h2 className="text-md font-medium"> {education?.major}</h2>
                            </div>
                            <h2 className="text-md text-gray-700">
                                {formatter.format(parseDate(education?.startDate).toDate(getLocalTimeZone()))}{" "}
                                to{" "}
                                {education?.endDate === "present"
                                    ? "Present"
                                    : formatter.format(parseDate(education?.endDate).toDate(getLocalTimeZone()))}
                            </h2>
                            <h2 className="text-md text-gray-700 mb-3">{education?.grade}</h2>
                        </div>
                        <div>
                            <Button
                                color="secondary"
                                variant="faded"
                                startContent={<FaRegEdit />}
                                onClick={() => handleEdit(education, index)}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {isEditing && (
                <form>
                    <div className="flex flex-col gap-4">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                type="text"
                                label="School/College"
                                aria-label="School/College"
                                placeholder="Enter your School/College"
                                labelPlacement="outside"
                                value={formData?.institution}
                                onChange={(e) => handleChange("institution", e.target.value, currentIndex)}
                            />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Select
                                label="Degree"
                                aria-label="Degree"
                                placeholder="Select Your Degree"
                                labelPlacement="outside"
                                selectedKeys={[formData?.degree]}
                                onSelectionChange={(value) => handleChange('degree', value.currentKey, currentIndex)}
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
                                value={formData?.major}
                                onChange={(e) => handleChange("major", e.target.value, currentIndex)}
                            />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <DatePicker
                                label="Position Start date"
                                aria-label="Position Start date"
                                labelPlacement="outside"
                                value={parseDate(formData?.startDate)}
                                onChange={(date) => handleChange("startDate", formatDate(date.toDate(getLocalTimeZone())), currentIndex)}
                            />
                            <DatePicker
                                label="Position End date"
                                aria-label="Position End date"
                                labelPlacement="outside"
                                value={formData?.endDate !== "present" ? parseDate(formData?.endDate) : null}
                                onChange={(date) => handleChange("endDate", formatDate(date.toDate(getLocalTimeZone())), currentIndex)}
                                isDisabled={isCurrent}
                            />
                        </div>
                        <Checkbox
                            isSelected={isCurrent}
                            onChange={(e) => {
                                setIsCurrent(e.target.checked);
                                if (e.target.checked) {
                                    setFormData(prevFormData => ({
                                        ...prevFormData,
                                        endDate: "present"
                                    }));
                                    handleChange("endDate", "present", currentIndex);
                                } else {
                                    setFormData(prevFormData => ({
                                        ...prevFormData,
                                        endDate: formatDate(new Date())
                                    }));
                                    handleChange("endDate", formatDate(new Date()), currentIndex);
                                }
                            }}
                        >
                            I currently pursuing
                        </Checkbox>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                type="text"
                                label="Grade"
                                aria-label="Grade"
                                placeholder="Enter your Grade 8.5/10 or 85%"
                                labelPlacement="outside"
                                value={formData?.grade}
                                onChange={(e) => handleChange("grade", e.target.value, currentIndex)}
                            />
                        </div>
                        <div className="flex gap-2 sm:gap-4 mt-2 justify-end items-center">
                            <Button color="secondary" variant="light" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                variant="solid"
                                type="button"
                                onClick={handleSave}
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner className="pr-2" color="current" size="sm" />{" "}
                                        Submitting...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            )}
            {!isEditing && (
                <Button
                    color="secondary"
                    variant="light"
                    startContent={<FaPlus />}
                    onClick={handleAdd}
                >
                    Add education
                </Button>
            )}
        </div>
    )
}

export default EducationForm