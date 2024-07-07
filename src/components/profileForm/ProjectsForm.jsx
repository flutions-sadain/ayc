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
import { RiFolderSettingsLine } from 'react-icons/ri'

const ProjectsForm = ({
    projectsData = [],
    onSave,
    onChange,
    isLoading,
}) => {

    const initialFormData = {
        title: "",
        description: "",
        technologies: "",
        link: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState();
    const [updatedProject, setUpdatedWork] = useState(projectsData);

    useEffect(() => {
        if (!isEditing) {
            setFormData(initialFormData);
        }
    }, [projectsData, isEditing]);

    const handleChange = (name, value, index) => {
        const updatedFormData = {
            ...formData,
            [name]: value,
        };
        let tempProjectData = [...projectsData];
        tempProjectData[index] = updatedFormData;
        setFormData(updatedFormData);
        onChange(tempProjectData);
    };

    const handleCancel = () => {
        setFormData(initialFormData);
        setIsEditing(false);
    };

    const handleEdit = (project, index) => {
        setFormData(project);
        setIsEditing(true);
        setCurrentIndex(index);
    };

    const handleAdd = () => {
        setFormData(initialFormData);
        setIsEditing(true);
        setCurrentIndex(updatedProject.length);
        setUpdatedWork(prev => [...prev, initialFormData]);
    };

    const handleSave = () => {
        // const dataToSave = {
        //     ...formData,
        //     startDate: formData.startDate,
        //     endDate: isCurrent ? "present" : formData.endDate,
        // };
        // let updatedProjectData = [...projectsData];
        // if (isEditing) {
        //     updatedProjectData[currentIndex] = dataToSave;
        // } else {
        //     updatedProjectData.push(dataToSave);
        // }
        onSave(projectsData);
        handleCancel();
    };

    return (
        <div>
            {projectsData?.map((projects, index) => (
                <div className="flex justify-start items-start flex-warp p-4 m-2 rounded-sm border shadow-sm gap-5">
                    <div className="p-2 border border-gray-400 rounded-sm">
                        <RiFolderSettingsLine className="text-3xl text-gray-600" />
                    </div>
                    <div className="w-full flex justify-between items-start">
                        <div>
                            {/* <h2 className="text-md font-semibold">E-commerce Website</h2> */}
                            <div className="flex items-center">
                                <a href={projects?.link}><h2 className="text-md font-semibold">{projects?.title} </h2></a>
                                <span> | </span>
                                <h2 className="text-sm font-normal"> {projects?.technologies}</h2>
                            </div>
                            <p className="text-sm">{projects?.description}</p>
                        </div>
                        <div>
                            <Button
                                color="secondary"
                                variant="faded"
                                startContent={<FaRegEdit />}
                                onClick={() => handleEdit(projects, index)}
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
                                label="Project Title"
                                aria-label="Project Title"
                                placeholder="Enter your Project Title"
                                labelPlacement="outside"
                                value={formData?.title}
                                onChange={(e) => handleChange("title", e.target.value, currentIndex)}
                            />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                type="text"
                                label="Project Link"
                                aria-label="Project Link"
                                placeholder="Enter your Project Link"
                                labelPlacement="outside"
                                value={formData?.link}
                                onChange={(e) => handleChange("link", e.target.value, currentIndex)}
                            />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                type="text"
                                label="Technology Name"
                                aria-label="Technology Name"
                                placeholder="Python, MySQL, JavaScript"
                                labelPlacement="outside"
                                value={formData?.technologies}
                                onChange={(e) => handleChange("technologies", e.target.value, currentIndex)}
                            />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Textarea label="Project Description" aria-label="Project Description" labelPlacement="outside" placeholder="Tell More about your Project" value={formData?.description}
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

            {!isEditing && (
                <Button
                    color="secondary"
                    variant="light"
                    startContent={<FaPlus />}
                    onClick={handleAdd}
                >
                    Add project
                </Button>
            )}
        </div>
    )
}

export default ProjectsForm