import React from 'react'

const ProfileOverview = () => {
    const resumeData = {
        "about": {
            "fullName": "John Doe",
            "email": "johndoe@example.com",
            "gender": "Male",
            "country": "India",
            "state": "Tamil Nadu",
            "phone": "123-456-7890",
            "address": "123 Main St, City, Country",
            "summary": "Passionate software developer with 5 years of experience..."
        },
        "social_profiles": [
            {
                "platform": "Website",
                "url": "https://sadain.com"
            },
            {
                "platform": "LinkedIn",
                "url": "https://www.linkedin.com/in/johndoe"
            },
            {
                "platform": "GitHub",
                "url": "https://github.com/johndoe"
            },
            {
                "platform": "Twitter",
                "url": "https://x.com/username"
            }
        ],
        "work_experience": [
            {
                "company": "Tech Corp",
                "location": "City, Country",
                "title": "Software Engineer",
                "startDate": "2019-01-01",
                "endDate": "present",
                "description": "Developed and maintained web applications..."
            },
            {
                "company": "Web Solutions",
                "location": "City, Country",
                "title": "Junior Developer",
                "startDate": "2016-06-01",
                "endDate": "2018-12-31",
                "description": "Assisted in the development of e-commerce platforms..."
            }
        ],
        "education": [
            {
                "institution": "University of Technology",
                "location": "City, Country",
                "degree": "Bachelor of Science",
                "major": "Computer Science",
                "startDate": "2012-09-01",
                "endDate": "2016-06-01",
                "grade": "8.5/10"
            }
        ],
        "skills": [
            "JavaScript",
            "React",
            "Node.js",
            "CSS",
            "HTML"
        ],
        "achievements": {
            "description": "Awarded for outstanding performance and contribution to the company's success."
        },
        "projects": [
            {
                "title": "Project A",
                "description": "Developed a full-stack web application...",
                "technologies": "React, Node.js",
                "link": "https://github.com/johndoe/project-a"
            },
            {
                "title": "Project B",
                "description": "Created a mobile app for tracking expenses...",
                "technologies": "React Native, Firebase",
                "link": "https://github.com/johndoe/project-b"
            }
        ]
    }

    return (
        <div className="bg-white rounded-xl shadow-medium p-4">
            {/* resume */}
        </div>
    )
}

export default ProfileOverview