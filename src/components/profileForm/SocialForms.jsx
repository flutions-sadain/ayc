import React, { useState, useEffect } from 'react';
import { Button, Input, Spinner } from '@nextui-org/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TbWorld } from 'react-icons/tb';

const SocialForms = ({ socialProfileData: initialSocialProfile, onSave, onChange, isLoading }) => {
  const [socialProfileData, setSocialProfileData] = useState(initialSocialProfile);
  const [originalSocialProfileData, setOriginalSocialProfileData] = useState(initialSocialProfile);

  const handleChange = (platform, value) => {
    const updatedProfiles = socialProfileData.map(profile => 
      profile.platform === platform ? { ...profile, url: value } : profile
    );
    setSocialProfileData(updatedProfiles);
    onChange(updatedProfiles);
  };

  const getProfileUrl = (platform) => {
    const profile = socialProfileData?.find(profile => profile.platform === platform);
    return profile ? profile.url : '';
  };

  const handleCancel = () => {
    setSocialProfileData(originalSocialProfileData);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text"
            label="Website"
            aria-label="Website"
            placeholder="https://"
            labelPlacement="outside"
            startContent={
              <TbWorld className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            value={getProfileUrl('Website')}
            onChange={(e) => handleChange('Website', e.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text"
            label="LinkedIn"
            aria-label="LinkedIn"
            placeholder="https://www.linkedin.com/in/username"
            labelPlacement="outside"
            startContent={
              <FaLinkedin className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            value={getProfileUrl('LinkedIn')}
            onChange={(e) => handleChange('LinkedIn', e.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text"
            label="Github"
            aria-label="Github"
            placeholder="https://github.com/username"
            labelPlacement="outside"
            startContent={
              <FaGithub className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            value={getProfileUrl('GitHub')}
            onChange={(e) => handleChange('GitHub', e.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text"
            label="Twitter"
            aria-label="Twitter"
            placeholder="https://x.com/username"
            labelPlacement="outside"
            startContent={
              <FaXTwitter className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            value={getProfileUrl('Twitter')}
            onChange={(e) => handleChange('Twitter', e.target.value)}
          />
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

export default SocialForms;



// import React, { useEffect, useRef, useState } from 'react'
// import { Button, Card, CardBody, Checkbox, Chip, DatePicker, Input, Select, SelectItem, Spinner, Tab, Tabs, Textarea } from '@nextui-org/react';
// import axios from 'axios';
// import makeRequest from '../../api/useApi';
// import { FaGithub, FaLinkedin } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';
// import { TbWorld } from 'react-icons/tb';

// const SocialForms = ({ socialProfileData: initialSocialProfile }) => {

//     return (
//         <form>
//             <div className="flex flex-col gap-4">
//                 <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                     <Input
//                         type="text"
//                         label="Website"
//                         aria-label="Website"
//                         placeholder="https://"
//                         labelPlacement="outside"
//                         startContent={
//                             <TbWorld className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                         }
//                         onChange={(e) => handleChange('website', e.target.value)}
//                     />
//                 </div>
//                 <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                     <Input
//                         type="text"
//                         label="LinkedIn"
//                         aria-label="LinkedIn"
//                         placeholder="https://www.linkedin.com/in/username"
//                         labelPlacement="outside"
//                         startContent={
//                             <FaLinkedin className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                         }
//                         onChange={(e) => handleChange('linkedIn', e.target.value)}
//                     />
//                 </div>
//                 <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                     <Input
//                         type="text"
//                         label="Github"
//                         aria-label="Github"
//                         placeholder="https://github.com/username"
//                         labelPlacement="outside"
//                         startContent={
//                             <FaGithub className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                         }
//                         onChange={(e) => handleChange('github', e.target.value)}
//                     />
//                 </div>
//                 <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                     <Input
//                         type="text"
//                         label="Twitter"
//                         aria-label="Twitter"
//                         placeholder="https://x.com/username"
//                         labelPlacement="outside"
//                         startContent={
//                             <FaXTwitter className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                         }
//                         onChange={(e) => handleChange('twitter', e.target.value)}
//                     />
//                 </div>
//                 <div className="flex gap-2 sm:gap-4 mt-2 justify-end items-center">
//                     <Button color="secondary" variant="light">
//                         Cancel
//                     </Button>
//                     <Button color="primary" variant="solid" type="button">
//                         {isLoading ? (
//                             <>
//                                 <Spinner className="pr-2" color="current" size="sm" /> Submitting...
//                             </>
//                         ) : "Save"} </Button>
//                 </div>
//             </div>
//         </form>
//     )
// }

// export default SocialForms