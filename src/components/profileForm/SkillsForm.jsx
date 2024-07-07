import React, { useEffect, useState } from 'react';
import { Button, Chip, Select, SelectItem, Spinner } from '@nextui-org/react';
import makeRequest from '../../api/useApi';

const SkillsForm = ({ skillsData: initialSkills, onSave, onChange, isLoading }) => {
    const allSkills = [
        "Python", "Java", "React", "Angular", "Rust", "LLM", "Gen AI", "Django",
        "Fast API", "MySQL", "Data analysis", "Pandas", "Numpy", "GCP", "Github"
    ];

    const [skillValues, setSkillValues] = useState(new Set(initialSkills));

    const handleChipRemove = (valueToRemove) => {
        const updatedSkillValues = new Set(skillValues);
        updatedSkillValues.delete(valueToRemove);
        setSkillValues(updatedSkillValues);
    };

    // useEffect(() => {
    //     onChange([...skillValues]);
    // }, [skillValues, onChange]);

    const handleCancel = () => {
        setSkillValues(new Set(initialSkills));
    };

    const unmatchedSkills = Array.from(skillValues).filter(skill => !allSkills.includes(skill));

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
            <div className="flex flex-col gap-4">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Select
                        label="Skills"
                        aria-label="Skills"
                        selectionMode="multiple"
                        placeholder="Enter all Applicable Skills"
                        selectedKeys={[...skillValues]}
                        onSelectionChange={setSkillValues}
                    >
                        {allSkills?.map((skill) => (
                            <SelectItem key={skill} value={skill}>
                                {skill}
                            </SelectItem>
                        ))}
                        {unmatchedSkills?.map((skill) => (
                            <SelectItem key={skill} value={skill}>
                                {skill}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="relative mb-6 mt-0">
                    <figure className="w-full">
                        <section className="text-md rounded-xl bg-gray-100 p-4 border-l-0 leading-8 tracking-tight text-gray-800">
                            <div className="flex flex-wrap gap-2">
                                {skillValues?.size === 0 ? (
                                    <p className="text-md text-gray-600">No Skills Selected</p>
                                ) : (
                                    <>
                                        {[...skillValues]?.map((value) => (
                                            <Chip key={value} variant="flat" onClose={() => handleChipRemove(value)}>
                                                {value}
                                            </Chip>
                                        ))}
                                    </>
                                )}
                            </div>
                        </section>
                    </figure>
                </div>
                <div className="flex gap-2 sm:gap-4 mt-2 justify-end items-center">
                    <Button color="secondary" variant="light" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button color="primary" variant="solid" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Spinner className="pr-2" color="current" size="sm" /> Submitting...
                            </>
                        ) : "Save"}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default SkillsForm;
