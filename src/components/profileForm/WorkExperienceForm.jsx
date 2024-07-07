import React, { useState, useEffect } from "react";
import {
    Button,
    Checkbox,
    DatePicker,
    Input,
    Textarea,
    Spinner,
} from "@nextui-org/react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { LiaIndustrySolid } from "react-icons/lia";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

const WorkExperienceForm = ({
    workExperienceData = [],
    onSave,
    onChange,
    isLoading,
}) => {

    function formatDate(date) {
        const year = date?.getFullYear();
        const month = String(date?.getMonth() + 1)?.padStart(2, '0');
        const day = String(date?.getDate())?.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const initialFormData = {
        company: "",
        title: "",
        startDate: formatDate(new Date()),
        endDate: formatDate(new Date()),
        location: "",
        description: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [isCurrent, setIsCurrent] = useState(false);
    const [currentIndex, setCurrentIndex] = useState();
    const [updatedWork, setUpdatedWork] = useState(workExperienceData);

    useEffect(() => {
        if (!isEditing) {
            setFormData(initialFormData);
            setIsCurrent(false);
        }
    }, [workExperienceData, isEditing]);

    const handleChange = (name, value, index) => {
        const updatedFormData = {
            ...formData,
            [name]: value,
        };
        let tempExperienceData = [...workExperienceData];
        tempExperienceData[index] = updatedFormData;
        setFormData(updatedFormData);
        onChange(tempExperienceData);
    };

    const handleCancel = () => {
        setFormData(formData);
        console.log("cancelled", formData);
        setIsCurrent(false);
        setIsEditing(false);
    };

    const handleEdit = (experience, index) => {
        const formattedExperience = {
            ...experience,
            startDate: formatDate(new Date(experience?.startDate)),
            endDate: experience?.endDate === "present" ? "present" : formatDate(new Date(experience?.endDate)),
        };
        setFormData(formattedExperience);
        setIsCurrent(experience?.endDate === "present");
        setIsEditing(true);
        setCurrentIndex(index);
    };

    const handleAdd = () => {
        setFormData(initialFormData);
        setIsEditing(true);
        setCurrentIndex(updatedWork?.length);
        setUpdatedWork(prev => [...prev, initialFormData]);
    };

    const handleSave = () => {
        const dataToSave = {
            ...formData,
            startDate: formData?.startDate,
            endDate: isCurrent ? "present" : formData?.endDate,
        };
        let updatedWorkData = [...workExperienceData];
        if (isEditing) {
            updatedWorkData[currentIndex] = dataToSave;
        } else {
            updatedWorkData.push(dataToSave);
        }
        onSave(updatedWorkData);
        handleCancel();
    };

    // const handleCheckboxChange = (checked, index) => {
    //     setIsCurrent(checked);
    //     const updatedEndDate = checked ? "present" : formatDate(new Date());
    //     let tempExperienceData = [...workExperienceData];
    //     tempExperienceData[index] = { ...formData, endDate: updatedEndDate };
    //     setFormData({ ...formData, endDate: updatedEndDate });
    //     onChange(tempExperienceData);
    // };

    let formatter = useDateFormatter();

    return (
        <div>
            {/* Display existing work experiences */}
            {workExperienceData?.map((experience, index) => (
                <div
                    key={index}
                    className="flex justify-start items-start p-4 m-2 rounded-sm border shadow-sm gap-5"
                >
                    <div className="p-2 border border-gray-400 rounded-sm">
                        <LiaIndustrySolid className="text-3xl text-gray-600" />
                    </div>
                    <div className="w-full flex justify-between items-start">
                        <div>
                            <h2 className="text-md font-semibold">{experience?.title}</h2>
                            <div className="flex items-center space-x-1">
                                <h2 className="text-md font-medium">{experience?.company}</h2>
                                <span>-</span>
                                <h2 className="text-md font-medium">{experience?.location}</h2>
                            </div>
                            <h2 className="text-md text-gray-700 mb-3">
                                {formatter?.format(parseDate(experience?.startDate)?.toDate(getLocalTimeZone()))}{" "}
                                to{" "}
                                {experience?.endDate === "present"
                                    ? "Present"
                                    : formatter?.format(parseDate(experience?.endDate)?.toDate(getLocalTimeZone()))}
                            </h2>
                            <p className="text-sm">{experience?.description}</p>
                        </div>
                        <div>
                            <Button
                                color="secondary"
                                variant="faded"
                                startContent={<FaRegEdit />}
                                onClick={() => handleEdit(experience, index)}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Show form when editing or adding */}
            {isEditing && (
                <form>
                    <div className="flex flex-col gap-4">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                type="text"
                                label="Company"
                                aria-label="Company"
                                placeholder="Enter your Company"
                                labelPlacement="outside"
                                value={formData?.company}
                                onChange={(e) => handleChange("company", e.target.value, currentIndex)}
                            />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                type="text"
                                label="Title"
                                aria-label="Title"
                                placeholder="Enter your Designation/Role"
                                labelPlacement="outside"
                                value={formData?.title}
                                onChange={(e) => handleChange("title", e.target.value, currentIndex)}
                            />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <DatePicker
                                label="Position Start date"
                                aria-label="Position Start date"
                                labelPlacement="outside"
                                value={parseDate(formData?.startDate)}
                                onChange={(date) => handleChange("startDate", formatDate(date?.toDate(getLocalTimeZone())), currentIndex)}
                            />
                            <DatePicker
                                label="Position End date"
                                aria-label="Position End date"
                                labelPlacement="outside"
                                value={formData?.endDate !== "present" ? parseDate(formData?.endDate) : null}
                                onChange={(date) => handleChange("endDate", formatDate(date?.toDate(getLocalTimeZone())), currentIndex)}
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
                            I currently work here
                        </Checkbox>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                type="text"
                                label="Location"
                                aria-label="Location"
                                placeholder="Enter your Location"
                                labelPlacement="outside"
                                value={formData?.location}
                                onChange={(e) => handleChange("location", e.target.value, currentIndex)}
                            />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Textarea
                                label="Description"
                                aria-label="Description"
                                labelPlacement="outside"
                                placeholder="Tell More about your Work Experience"
                                value={formData?.description}
                                onChange={(e) => handleChange("description", e.target.value, currentIndex)}
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

            {/* Show 'Add work experience' button when not editing */}
            {!isEditing && (
                <Button
                    color="secondary"
                    variant="light"
                    startContent={<FaPlus />}
                    onClick={handleAdd}
                >
                    Add work experience
                </Button>
            )}
        </div>
    );
};

export default WorkExperienceForm;