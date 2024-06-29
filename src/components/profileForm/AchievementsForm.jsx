import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Checkbox, Chip, DatePicker, Input, Select, SelectItem, Spinner, Tab, Tabs, Textarea } from '@nextui-org/react';
import axios from 'axios';
import makeRequest from '../../api/useApi';

const AchievementsForm = ({ achievementsData: initialAchievementsData, onSave, onChange, isLoading }) => {
    const [achievementsData, setAchievementsData] = useState(initialAchievementsData);
    const [originalAchievementsData, setOriginalAchievementsData] = useState(initialAchievementsData);

    const handleChange = (name, value) => {
        const updatedDetails = {
            ...achievementsData,
            [name]: value,
        };
        setAchievementsData(updatedDetails);
        onChange(updatedDetails);
    };

    const handleCancel = () => {
        setAchievementsData(originalAchievementsData);
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
            <div className="flex flex-col gap-4">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4">
                    <Textarea labelPlacement="outside" placeholder="Tell More about your Achievements" value={achievementsData?.description} onChange={(e) => handleChange('description', e.target.value)} />
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
                        ) : "Save"} </Button>
                </div>
            </div>
        </form>
    )
}

export default AchievementsForm