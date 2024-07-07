import { Button } from '@nextui-org/react';
import React, { useRef } from 'react';
import { FiDownload } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';

const ProfileOverview = ({ resumeData }) => {
    // const resumeData = {
    //     "about": {
    //         "fullName": "John Doe",
    //         "email": "johndoe@example.com",
    //         "gender": "Male",
    //         "country": "India",
    //         "state": "Tamil Nadu",
    //         "phone": "123-456-7890",
    //         "address": "123 Main St, City, Country",
    //         "summary": "Passionate software developer with 5 years of experience..."
    //     },
    //     "social_profiles": [
    //         {
    //             "platform": "Website",
    //             "url": "https://sadain.com"
    //         },
    //         {
    //             "platform": "LinkedIn",
    //             "url": "https://www.linkedin.com/in/johndoe"
    //         },
    //         {
    //             "platform": "GitHub",
    //             "url": "https://github.com/johndoe"
    //         },
    //         {
    //             "platform": "Twitter",
    //             "url": "https://x.com/username"
    //         }
    //     ],
    //     "work_experience": [
    //         {
    //             "company": "Tech Corp",
    //             "location": "City, Country",
    //             "title": "Software Engineer",
    //             "startDate": "2019-01-01",
    //             "endDate": "present",
    //             "description": "• Led the delivery of high-quality production code for diverse client projects, ensuring robust and scalable solutions, including responsive UI design and deployments.\n• Provided leadership within the engineering department through effective collaboration, knowledge sharing, and mentorship.\n• Developed, maintained, and shipped production code for client websites using HTML, CSS, Sass, JavaScript, React.js, PHP, MySQL, and WordPress"
    //         },
    //         {
    //             "company": "Web Solutions",
    //             "location": "City, Country",
    //             "title": "Junior Developer",
    //             "startDate": "2016-06-01",
    //             "endDate": "2018-12-31",
    //             "description": "• Led the delivery of high-quality production code for diverse client projects, ensuring robust and scalable solutions, including responsive UI design and deployments.\n• Provided leadership within the engineering department through effective collaboration, knowledge sharing, and mentorship.\n• Developed, maintained, and shipped production code for client websites using HTML, CSS, Sass, JavaScript, React.js, PHP, MySQL, and WordPress"
    //         }
    //     ],
    //     "education": [
    //         {
    //             "institution": "University of Technology",
    //             "location": "City, Country",
    //             "degree": "Bachelor of Science",
    //             "major": "Computer Science",
    //             "startDate": "2012-09-01",
    //             "endDate": "2016-06-01",
    //             "grade": "8.5/10"
    //         }
    //     ],
    //     "skills": [
    //         "JavaScript",
    //         "React",
    //         "Node.js",
    //         "CSS",
    //         "HTML"
    //     ],
    //     "achievements": {
    //         "description": "Awarded for outstanding performance and contribution to the company's success."
    //     },
    //     "projects": [
    //         {
    //             "title": "Project A",
    //             "description": "Developed a full-stack web application...",
    //             "technologies": "React, Node.js",
    //             "link": "https://github.com/johndoe/project-a"
    //         },
    //         {
    //             "title": "Project B",
    //             "description": "Created a mobile app for tracking expenses...",
    //             "technologies": "React Native, Firebase",
    //             "link": "https://github.com/johndoe/project-b"
    //         }
    //     ]
    // };

    const formatDescription = (description) => {
        return description.split('\n').map((line, index) => (
            <p key={index} className="ml-4">{line}</p>
        ));
    };

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="bg-white rounded-xl shadow-medium">
            <div className="flex justify-end pt-4 pr-4">
                <Button onClick={handlePrint} color="primary" variant="shadow" startContent={<FiDownload />}>Download PDF</Button>
            </div>
            <div className="p-8" ref={componentRef}>
                <div className="text-center">
                    <h1 className="text-3xl font-bold">{resumeData.about.fullName}</h1>
                    <div className="flex justify-center items-center space-x-1">
                        <div>
                            {resumeData.social_profiles.map((profile, index) => (
                                <span key={index}>
                                    <a href={profile.url} className="underline text-blue-600">{profile.platform}</a>{' | '}
                                </span>
                            ))}
                        </div>
                        <p><a href={`tel:${resumeData.about.phone}`} className="underline text-blue-600">{resumeData.about.phone}</a></p>
                    </div>
                    <p>{resumeData.about.address}, {resumeData.about.state}, {resumeData.about.country}</p>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold">Summary</h2>
                    <hr className="my-2" />
                    <p>{resumeData.about.summary}</p>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold">Education</h2>
                    <hr className="my-2" />
                    {resumeData.education.map((edu, index) => (
                        <div key={index} className="flex justify-between text-md">
                            <div className="w-1/2">
                                <p>{edu.institution}</p>
                                <p>{edu.degree} in {edu.major}</p>
                                <p>({edu.grade})</p>
                            </div>
                            <div className="w-1/2 text-right">
                                <p>{edu.startDate} - {edu.endDate}</p>
                                <p>{edu.location}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold">Work Experience</h2>
                    <hr className="my-2" />
                    {resumeData.work_experience.map((work, index) => (
                        <div key={index} className="py-2">
                            <div className="flex justify-between">
                                <p>{work.title}</p>
                                <p>{work.startDate} - {work.endDate}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>{work.company}</p>
                                <p className="text-right">{work.location}</p>
                            </div>
                            <p className="ml-4 text-base">{formatDescription(work.description)}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold">Projects</h2>
                    <hr className="my-2" />
                    {resumeData.projects.map((project, index) => (
                        <div key={index}>
                            <p>
                                <a href={project.link} className="underline text-blue-600">{project.title}</a> | {project.technologies}
                            </p>
                            <p className="ml-4 text-base">{formatDescription(project.description)}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold">Skills</h2>
                    <hr className="my-2" />
                    <p>{resumeData.skills.join(', ')}</p>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold">Achievements</h2>
                    <hr className="my-2" />
                    <p className="ml-4 text-base">{formatDescription(resumeData.achievements.description)}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileOverview;
