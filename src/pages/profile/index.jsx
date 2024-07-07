import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import { Button, Spinner, Tab, Tabs } from '@nextui-org/react';
import ProfileOverview from './ProfileOverview';
import UserDetailsForm from '../../components/profileForm/UserDetailsForm';
import SocialForms from '../../components/profileForm/SocialForms';
import WorkExperienceForm from '../../components/profileForm/WorkExperienceForm';
import EducationForm from '../../components/profileForm/EducationForm';
import SkillsForm from '../../components/profileForm/SkillsForm';
import ProjectsForm from '../../components/profileForm/ProjectsForm';
import AchievementsForm from '../../components/profileForm/AchievementsForm';
import ResumeUploadForm from '../../components/profileForm/ResumeUploadForm';
import { FiUpload } from 'react-icons/fi';
import makeRequest from '../../api/useApi';

const Profile = () => {
  const [selected, setSelected] = useState("Profile");
  const [resumeData, setResumeData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    userDetails: false,
    socialProfiles: false,
    workExperience: false,
    education: false,
    skills: false,
    projects: false,
    achievements: false,
  });

  const email = localStorage.getItem('email');
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    if (!isMounted.current) return;
    try {
      setIsLoading(true);
      const formData = new URLSearchParams();
      formData.append("email", email);
      const response = await makeRequest('post', 'getProfileData', formData);

      // const response = {
      //   "profile_data": {
      //     "about": {
      //       "fullName": "John Doe",
      //       "email": "johndoe@example.com",
      //       "gender": "Male",
      //       "country": "India",
      //       "state": "Tamil Nadu",
      //       "phone": "123-456-7890",
      //       "address": "123 Main St, City, Country",
      //       "summary": "Passionate software developer with 5 years of experience..."
      //     },
      //     "social_profiles": [
      //       {
      //         "platform": "Website",
      //         "url": "https://sadain.com"
      //       },
      //       {
      //         "platform": "LinkedIn",
      //         "url": "https://www.linkedin.com/in/johndoe"
      //       },
      //       {
      //         "platform": "GitHub",
      //         "url": "https://github.com/johndoe"
      //       },
      //       {
      //         "platform": "Twitter",
      //         "url": "https://x.com/username"
      //       },
      //     ],
      //     "work_experience": [
      //       // {
      //       //   "company": "Tech Corp",
      //       //   "location": "City, Country",
      //       //   "title": "Software Engineer",
      //       //   "startDate": "2019-01-01",
      //       //   "endDate": "present",
      //       //   "description": "Developed and maintained web applications..."
      //       // },
      //       // {
      //       //   "company": "Web Solutions",
      //       //   "location": "City, Country",
      //       //   "title": "Junior Developer",
      //       //   "startDate": "2016-06-01",
      //       //   "endDate": "2018-12-31",
      //       //   "description": "Assisted in the development of e-commerce platforms..."
      //       // }
      //     ],
      //     "education": [
      //       // {
      //       //   "institution": "University of Technology",
      //       //   "location": "City, Country",
      //       //   "degree": "Bachelor of Science",
      //       //   "major": "Computer Science",
      //       //   "startDate": "2012-09-01",
      //       //   "endDate": "2016-06-01",
      //       //   "grade": "8.5/10"
      //       // }
      //     ],
      //     "skills": [
      //       // "JavaScript",
      //       // "React",
      //       // "Node.js",
      //       // "CSS",
      //       // "HTML"
      //     ],
      //     "achievements": {
      //       "description": "Awarded for outstanding performance and contribution to the company's success."
      //     },
      //     "projects": [
      //       // {
      //       //   "title": "Project A",
      //       //   "description": "Developed a full-stack web application...",
      //       //   "technologies": "React, Node.js",
      //       //   "link": "https://github.com/johndoe/project-a"
      //       // },
      //       // {
      //       //   "title": "Project B",
      //       //   "description": "Created a mobile app for tracking expenses...",
      //       //   "technologies": "React Native, Firebase",
      //       //   "link": "https://github.com/johndoe/project-b"
      //       // }
      //     ]
      //   }
      // };
      setResumeData(response.profile_data);
      setOriginalData(response.profile_data);
    } catch (error) {
      console.error('Error fetching resume data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const payload = {
        profile_data: resumeData,
        email: email,
      };

      const response = await makeRequest('post', 'storeProfileData', payload);
      // console.log('Response:', response);
    } catch (error) {
      console.error('Error submitting resume data:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSave = (section) => {
    setLoadingStates(prev => ({ ...prev, [section]: true }));
    handleSubmit().then(() => {
      setLoadingStates(prev => ({ ...prev, [section]: false }));
    });
  };

  const handleChange = (section, data) => {
    // console.log("work", data)
    setResumeData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  return (
    <Header>
      <div className="mx-5 lg:mx-40 my-10">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-4xl mb-5">Edit your AYC profile</h1>
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" variant='bordered' color='primary' selectedKey={selected} onSelectionChange={setSelected}>
            <Tab key="Overview" title="Overview">
              {resumeData && <ProfileOverview resumeData={resumeData} />}
            </Tab>
            <Tab key="Profile" title="Profile">
              <div className="bg-white rounded-xl shadow-medium p-4">
                {isLoading && !resumeData ? (
                  <div className='flex justify-center items-center h-[80vh] w-full pt-10'>
                    <div className="w-full text-center">
                      <Spinner color="secondary" size="lg" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-wrap justify-between items-start mb-5">
                      <div className="w-1/3">
                        <h2 className="text-xl font-bold text-gray-800">
                          About
                        </h2>
                        <p className="text-sm text-gray-600 text-wrap w-3/4">
                          Tell us about yourself so companies know who you are.
                        </p>
                      </div>
                      <div className="w-2/3">
                        <div className="flex items-center gap-5 mb-4">
                          <img className="inline-block size-20 rounded-full ring-2 ring-white" src="https://img.freepik.com/free-photo/smiley-handsome-man-posing_23-2148911841.jpg" alt="Image Description" />
                          <div className="flex gap-x-2">
                            <div>
                              <Button color="secondary" variant="flat" startContent={<FiUpload />}>
                                Upload a New photo
                              </Button>
                            </div>
                          </div>
                        </div>
                        {resumeData && (
                          <UserDetailsForm
                            userDetailsData={resumeData?.about}
                            onSave={() => handleSave('userDetails')}
                            onChange={(data) => handleChange('about', data)}
                            isLoading={loadingStates.userDetails}
                          />
                        )}
                      </div>
                    </div>
                    <div className="my-5 space-y-4 border-t border-gray-200"></div>
                    <div className="flex flex-wrap justify-between items-start mb-5">
                      <div className="w-1/3">
                        <h2 className="text-xl font-bold text-gray-800">
                          Social Profiles
                        </h2>
                        <p className="text-sm text-gray-600 text-wrap w-3/4">
                          Where can people find you online?
                        </p>
                      </div>
                      <div className="w-2/3">
                        {resumeData && (
                          <SocialForms
                            socialProfileData={resumeData?.social_profiles}
                            onSave={() => handleSave('socialProfiles')}
                            onChange={(data) => handleChange('social_profiles', data)}
                            isLoading={loadingStates.socialProfiles}
                          />
                        )}
                      </div>
                    </div>
                    <div className="my-5 space-y-4 border-t border-gray-200"></div>
                    <div className="flex flex-wrap justify-between items-start mb-5">
                      <div className="w-1/3">
                        <h2 className="text-xl font-bold text-gray-800">
                          Work Experience
                        </h2>
                        <p className="text-sm text-gray-600 text-wrap w-3/4">
                          Companies you have worked for in the past.
                        </p>
                      </div>
                      <div className="w-2/3">
                        {resumeData && (
                          <WorkExperienceForm
                            workExperienceData={resumeData?.work_experience}
                            onSave={() => handleSave('workExperience')}
                            onChange={(data) => handleChange('work_experience', data)}
                            isLoading={loadingStates.workExperience}
                          />
                        )}
                      </div>
                    </div>
                    <div className="my-5 space-y-4 border-t border-gray-200"></div>
                    <div className="flex flex-wrap justify-between items-start mb-5">
                      <div className="w-1/3">
                        <h2 className="text-xl font-bold text-gray-800">
                          Education
                        </h2>
                        <p className="text-sm text-gray-600 text-wrap w-3/4">
                          What schools have you studied at?
                        </p>
                      </div>
                      <div className="w-2/3">
                        {resumeData && (
                          <EducationForm
                            educationData={resumeData?.education}
                            onSave={() => handleSave('education')}
                            onChange={(data) => handleChange('education', data)}
                            isLoading={loadingStates.education}
                          />
                        )}
                      </div>
                    </div>
                    <div className="my-5 space-y-4 border-t border-gray-200"></div>
                    <div className="flex flex-wrap justify-between items-start mb-5">
                      <div className="w-1/3">
                        <h2 className="text-xl font-bold text-gray-800">
                          Your Skills
                        </h2>
                        <p className="text-sm text-gray-600 text-wrap w-3/4">
                          This will help companies hone in on your strengths.
                        </p>
                      </div>
                      <div className="w-2/3">
                        {resumeData && (
                          <SkillsForm
                            skillsData={resumeData?.skills}
                            onSave={() => handleSave('skills')}
                            onChange={(data) => handleChange('skills', data)}
                            isLoading={loadingStates.skills}
                          />
                        )}
                      </div>
                    </div>
                    <div className="my-5 space-y-4 border-t border-gray-200"></div>
                    <div className="flex flex-wrap justify-between items-start mb-5">
                      <div className="w-1/3">
                        <h2 className="text-xl font-bold text-gray-800">
                          Project
                        </h2>
                        <p className="text-sm text-gray-600 text-wrap w-3/4">
                          Project details for the companies' knowledge.
                        </p>
                      </div>
                      <div className="w-2/3">
                        {resumeData && (
                          <ProjectsForm
                            projectsData={resumeData?.projects}
                            onSave={() => handleSave('projects')}
                            onChange={(data) => handleChange('projects', data)}
                            isLoading={loadingStates.projects}
                          />
                        )}
                      </div>
                    </div>
                    <div className="my-5 space-y-4 border-t border-gray-200"></div>
                    <div className="flex flex-wrap justify-between items-start mb-5">
                      <div className="w-1/3">
                        <h2 className="text-xl font-bold text-gray-800">
                          Achievements
                        </h2>
                        <p className="text-sm text-gray-600 text-wrap w-3/4">
                          Sharing more details about yourself will help you stand out more.
                        </p>
                      </div>
                      <div className="w-2/3">
                        {resumeData && (
                          <AchievementsForm
                            achievementsData={resumeData?.achievements}
                            onSave={() => handleSave('achievements')}
                            onChange={(data) => handleChange('achievements', data)}
                            isLoading={loadingStates.achievements}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Tab>
            <Tab key="Resume" title="Resume">
              <div className="bg-white rounded-xl shadow-medium p-4">
                <div className="flex flex-wrap justify-between items-start mb-5">
                  <div className="w-1/3">
                    <h2 className="text-xl font-bold text-gray-800">
                      Upload your recent resume or CV
                    </h2>
                    <p className="text-sm text-gray-600 text-wrap w-3/4">
                      Upload your most up-to-date resume File types: DOC, DOCX, PDF, TXT
                    </p>
                  </div>
                  <div className="w-2/3">
                    <ResumeUploadForm />
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div >
    </Header >
  );
};

export default Profile;
