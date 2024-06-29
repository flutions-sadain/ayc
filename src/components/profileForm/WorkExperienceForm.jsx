import React, { useState, useEffect } from 'react';
import { Button, Checkbox, DatePicker, Input, Textarea, Spinner } from '@nextui-org/react';
import { FaPlus, FaRegEdit } from 'react-icons/fa';
import { LiaIndustrySolid } from 'react-icons/lia';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';

const WorkExperienceForm = ({ workExperienceData = [], onSave, onChange, isLoading }) => {
  const initialFormData = {
    company: '',
    title: '',
    startDate: null,
    endDate: null,
    location: '',
    description: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    // Reset form data when workExperienceData changes or when exiting edit mode
    if (!isEditing) {
      setFormData(initialFormData);
      setIsCurrent(false);
    }
  }, [workExperienceData, isEditing, initialFormData]);

  const handleChange = (name, value) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    onChange(updatedFormData); // Notify parent component of changes
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsCurrent(false);
    setIsEditing(false);
  };

  const handleEdit = (experience) => {
    setFormData({
      ...experience,
      startDate: parseDate(experience.startDate),
      endDate: experience.endDate === 'present' ? parseDate(new Date().toISOString().split('T')[0]) : parseDate(experience.endDate)
    });
    setIsCurrent(experience.endDate === 'present');
    setIsEditing(true);
  };

  const handleAdd = () => {
    setFormData(initialFormData);
    setIsEditing(true);
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      startDate: formData.startDate ? formData.startDate.toString() : null,
      endDate: isCurrent ? 'present' : formData.endDate ? formData.endDate.toString() : null
    };
    onSave(dataToSave);
    handleCancel();  // Reset the form after saving
  };

  const handleCheckboxChange = (checked) => {
    setIsCurrent(checked);
    setFormData({ ...formData, endDate: checked ? null : formData.endDate }); // Reset endDate if 'I currently work here' is checked
    onChange({ ...formData, endDate: checked ? null : formData.endDate }); // Update resumeData
  };

  let formatter = useDateFormatter({ dateStyle: 'full' });

  return (
    <div>
      {/* Display existing work experiences */}
      {workExperienceData.map((experience, index) => (
        <div key={index} className="flex justify-start items-start flex-warp p-4 m-2 rounded-sm border shadow-sm gap-5">
          <div className="p-2 border border-gray-400 rounded-sm">
            <LiaIndustrySolid className="text-3xl text-gray-600" />
          </div>
          <div className="w-full flex justify-between items-start">
            <div>
              <h2 className="text-md font-semibold">{experience.title}</h2>
              <div className="flex items-center">
                <h2 className="text-md font-medium">{experience.company}</h2>
                <span> - </span>
                <h2 className="text-md font-medium">{experience.location}</h2>
              </div>
              <h2 className="text-md text-gray-700 mb-3">
                {formatter.format(parseDate(experience.startDate).toDate(getLocalTimeZone()))} to {experience.endDate === 'present' ? 'Present' : formatter.format(parseDate(experience.endDate).toDate(getLocalTimeZone()))}
              </h2>
              <p className="text-sm">{experience.description}</p>
            </div>
            <div>
              <Button color="secondary" variant="faded" startContent={<FaRegEdit />} onClick={() => handleEdit(experience)}>
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
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="text"
                label="Title"
                aria-label="Title"
                placeholder="Enter your Designation/Role"
                labelPlacement="outside"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <DatePicker
                label="Position Start date"
                aria-label="Position Start date"
                labelPlacement="outside"
                value={formData.startDate}
                onChange={(date) => handleChange('startDate', date)}
              />
              <DatePicker
                label="Position End date"
                aria-label="Position End date"
                labelPlacement="outside"
                value={formData.endDate}
                onChange={(date) => handleChange('endDate', date)}
                isDisabled={isCurrent}
              />
            </div>
            <Checkbox isSelected={isCurrent} onChange={(e) => handleCheckboxChange(e.target.checked)}>
              I currently work here
            </Checkbox>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="text"
                label="Location"
                aria-label="Location"
                placeholder="Enter your Location"
                labelPlacement="outside"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Textarea
                label="Description"
                aria-label="Description"
                labelPlacement="outside"
                placeholder="Tell More about your Work Experience"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
            <div className="flex gap-2 sm:gap-4 mt-2 justify-end items-center">
              <Button color="secondary" variant="light" onClick={handleCancel}>
                Cancel
              </Button>
              <Button color="primary" variant="solid" type="button" onClick={handleSave}>
                {isLoading ? (
                  <>
                    <Spinner className="pr-2" color="current" size="sm" /> Submitting...
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Show 'Add work experience' button when not editing */}
      {!isEditing && (
        <Button color="secondary" variant="light" startContent={<FaPlus />} onClick={handleAdd}>
          Add work experience
        </Button>
      )}
    </div>
  );
};

export default WorkExperienceForm;


// import React, { useEffect, useRef, useState } from 'react'
// import { Button, Card, CardBody, Checkbox, Chip, DatePicker, Input, Select, SelectItem, Spinner, Tab, Tabs, Textarea } from '@nextui-org/react';
// import axios from 'axios';
// import makeRequest from '../../api/useApi';
// import { LiaIndustrySolid } from 'react-icons/lia';
// import { FaPlus, FaRegEdit } from 'react-icons/fa';
// import { useDateFormatter } from '@react-aria/i18n';

// const WorkExperienceForm = () => {

//     let formatter = useDateFormatter();

//     return (
//         <div>
//             <div className="flex justify-start items-start flex-warp p-4 m-2 rounded-sm border shadow-sm gap-5">
//                 <div className="p-2 border border-gray-400 rounded-sm">
//                     <LiaIndustrySolid className="text-3xl text-gray-600" />
//                 </div>
//                 <div className="w-full flex justify-between items-start">
//                     <div>
//                         <h2 className="text-md font-semibold">Software Engineer</h2>
//                         <div className="flex items-center">
//                             <h2 className="text-md font-medium">Flutions </h2>
//                             <span> - </span>
//                             <h2 className="text-md font-medium"> Chennai</h2>
//                         </div>
//                         <h2 className="text-md text-gray-700 mb-3">Jan 2024 to Present</h2>
//                         <p className="text-sm">• Led the delivery of high-quality production code for a diverse client projects<br />
//                             • Provided leadership within the engineering department through collaboration, knowledge shares, and mentorship <br />
//                             • Developed, maintained, and shipped production code for client websites using HTML, CSS, Sass, JavaScript, React js, PHP, and MySQL</p>
//                     </div>
//                     <div>
//                         <Button color="secondary" variant="faded" startContent={<FaRegEdit />}>
//                             Edit
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex justify-start items-start flex-warp p-4 m-2 rounded-sm border shadow-sm gap-5">
//                 <div className="p-2 border border-gray-400 rounded-sm">
//                     <LiaIndustrySolid className="text-3xl text-gray-600" />
//                 </div>
//                 <div className="w-full flex justify-between items-start">
//                     <div>
//                         <h2 className="text-md font-semibold">Software Engineer</h2>
//                         <div className="flex items-center">
//                             <h2 className="text-md font-medium">Flutions </h2>
//                             <span> - </span>
//                             <h2 className="text-md font-medium"> Chennai</h2>
//                         </div>
//                         <h2 className="text-md text-gray-700 mb-3">Jan 2024 to Present</h2>
//                         <p className="text-sm">• Led the delivery of high-quality production code for a diverse client projects<br />
//                             • Provided leadership within the engineering department through collaboration, knowledge shares, and mentorship <br />
//                             • Developed, maintained, and shipped production code for client websites using HTML, CSS, Sass, JavaScript, React js, PHP, and MySQL</p>
//                     </div>
//                     <div>
//                         <Button color="secondary" variant="faded" startContent={<FaRegEdit />}>
//                             Edit
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <Button color="secondary" variant="light" startContent={<FaPlus />}>
//                 Add work experience
//             </Button>
//             <form>
//                 <div className="flex flex-col gap-4">
//                     <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                         <Input
//                             type="text"
//                             label="Company"
//                             aria-label="Company"
//                             placeholder="Enter your Company"
//                             labelPlacement="outside"
//                             onChange={(e) => handleChange('company', e.target.value)}
//                         />
//                     </div>
//                     <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                         <Input
//                             type="text"
//                             label="Title"
//                             aria-label="Title"
//                             placeholder="Enter your Designation/Role"
//                             labelPlacement="outside"
//                             onChange={(e) => handleChange('title', e.target.value)}
//                         />
//                     </div>
//                     <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                         <DatePicker label="Position Start date" aria-label="Position Start date" labelPlacement="outside" onChange={(value) => handleChange('positionStDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--")} />
//                         <DatePicker label="Position End date" aria-label="Position End date" labelPlacement="outside" onChange={(value) => handleChange('positionEdDate', value ? formatter?.format(value.toDate(getLocalTimeZone())) : "--")} />
//                     </div>
//                     <Checkbox>I currently work here</Checkbox>
//                     <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                         <Input
//                             type="text"
//                             label="Location"
//                             aria-label="Location"
//                             placeholder="Enter your Location"
//                             labelPlacement="outside"
//                             onChange={(e) => handleChange('location', e.target.value)}
//                         />
//                     </div>
//                     <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                         <Textarea label="Description" aria-label="Description" labelPlacement="outside" placeholder="Tell More about your Work Experience" onChange={(e) => handleChange('description', e.target.value)} />
//                     </div>
//                     <div className="flex gap-2 sm:gap-4 mt-2 justify-end items-center">
//                         <Button color="secondary" variant="light">
//                             Cancel
//                         </Button>
//                         <Button color="primary" variant="solid" type="button">
//                             {isLoading ? (
//                                 <>
//                                     <Spinner className="pr-2" color="current" size="sm" /> Submitting...
//                                 </>
//                             ) : "Save"} </Button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default WorkExperienceForm