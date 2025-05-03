// portfolio_app.tsx - React/TypeScript application for Labib Bin Shahed's portfolio
// Author: Grok 3 (xAI)
// Date: May 03, 2025
// Description: A Vite-based React app with TypeScript that dynamically renders a portfolio
// website, allowing users to update text content via input forms, replicating the provided HTML.

// -----------------------------
// 1. index.html
// Entry point HTML file
// -----------------------------

/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AURIX</title>
  <link rel="icon" type="image/png" href="/favicon.png" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
*/

// -----------------------------
// 2. main.tsx
// Application entry point
// -----------------------------

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// -----------------------------
// 3. index.css
// Global styles with Tailwind CSS
// -----------------------------

/*
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: 'Open Sans', 'Raleway', 'Poppins', sans-serif;
  background: #1a252f;
  color: #fff;
}

.typing::after {
  content: '';
  display: inline-block;
  width: 2px;
  height: 1em;
  background: #12D640;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
*/

// -----------------------------
// 4. vite.config.ts
// Vite configuration
// -----------------------------

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
});

// -----------------------------
// 5. Interfaces
// TypeScript interfaces for portfolio data
// -----------------------------

interface Profile {
  name: string;
  title: string;
  profilePictureUrl: string;
}

interface About {
  description: string;
  birthday: string;
  phone: string;
  hometown: string;
  email: string;
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  coursework: string[];
}

interface Certification {
  name: string;
  url: string;
  badgeUrl: string;
}

interface ResearchPublication {
  title: string;
  doi: string;
  publishedIn: string;
  location: string;
  isbn?: string;
  issn?: string;
  date: string;
}

interface Experience {
  organization: string;
  role: string;
  period: string;
  responsibilities: string[];
}

interface Project {
  name: string;
  type: 'Web-App' | 'Project';
  imageUrl: string;
  detailsUrl: string;
}

interface Skill {
  name: string;
  logoUrl: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Contact {
  address: string;
  email1: string;
  email2: string;
  phone: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// -----------------------------
// 6. App.tsx
// Main application component
// -----------------------------

import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import AboutSection from './components/AboutSection.tsx';
import EducationSection from './components/EducationSection.tsx';
import ExperienceSection from './components/ExperienceSection.tsx';
import ProjectsSection from './components/ProjectsSection.tsx';
import SkillsSection from './components/SkillsSection.tsx';
import ResumeSection from './components/ResumeSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import { Typed } from './types/typed.d.ts';

const App: React.FC = () => {
  // State for portfolio data
  const [profile, setProfile] = useState<Profile>({
    name: 'Labib Bin Shahed',
    title: 'CS & Engineering Student @ BRACU | ML, NLP, Blockchain Researcher',
    profilePictureUrl: '/assets/img/profile.jpeg',
  });

  const [about, setAbout] = useState<About>({
    description: 'Focused and enthusiastic developer with a keen interest in software development and artificial intelligence...',
    birthday: '18th January 2003',
    phone: '+1 480-400-800',
    hometown: 'Jessore, Bangladesh',
    email: 'labib.45x@gmail.com',
  });

  const [education, setEducation] = useState<Education>({
    institution: 'BRAC University',
    degree: 'B.Sc in Computer Science and Engineering',
    period: 'January 2022 - Present',
    coursework: ['Cloud Computing, ML & DL', 'Database Management Systems', 'Algorithms & Optimization'],
  });

  // Load from local storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) setProfile(JSON.parse(savedProfile));

    const savedAbout = localStorage.getItem('about');
    if (savedAbout) setAbout(JSON.parse(savedAbout));

    const savedEducation = localStorage.getItem('education');
    if (savedEducation) setEducation(JSON.parse(savedEducation));

    // Initialize Typed.js
    const typed = new Typed('.typing', {
      strings: ['<b>Coder</b>', '<b>Developer</b>', '<b>AI Enthusiast</b>', '<b>Researcher</b>'],
      loop: true,
      typeSpeed: 65,
      backSpeed: 65,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // Save to local storage on update
  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('about', JSON.stringify(about));
  }, [about]);

  useEffect(() => {
    localStorage.setItem('education', JSON.stringify(education));
  }, [education]);

  // Static data for other sections
  const certifications: Certification[] = [
    {
      name: 'Programmable Messaging and Voice',
      url: 'https://www.linkedin.com/learning/certificates/759119dcc46bdb4e63fb82dc49ed0ad4288a97d9031dd360fdb0686f65b0b398',
      badgeUrl: '/assets/img/certification/tw.jpg',
    },
    // Add more certifications
  ];

  const researchPublications: ResearchPublication[] = [
    {
      title: 'Blockchain in Project Management for Information Security, Transparency and Accountability',
      doi: '10.1109/ICEIC64972.2025.10879668',
      publishedIn: '2025 International Conference on Electronics, Information, and Communication (ICEIC)',
      location: 'Osaka, Japan',
      isbn: '979-8-3315-1075-6',
      issn: '2767-7699',
      date: '19-22 January 2025',
    },
    // Add more publications
  ];

  const experiences: Experience[] = [
    {
      organization: 'IEEE Computer Society Bangladesh Chapter Secretariat',
      role: 'President',
      period: 'January 2025 - Present',
      responsibilities: [
        'Shape the Chapter’s vision and set strategic goals...',
        'Design, host, and measure impactful events...',
      ],
    },
    // Add more experiences
  ];

  const projects: Project[] = [
    {
      name: 'MoodScope',
      type: 'Web-App',
      imageUrl: '/assets/img/project/MoodScope.jpg',
      detailsUrl: '/projects/MoodScope.html',
    },
    // Add more projects
  ];

  const skillCategories: SkillCategory[] = [
    {
      name: 'Languages and Databases',
      skills: [
        { name: 'Python', logoUrl: 'https://www.vectorlogo.zone/logos/python/python-horizontal.svg' },
        // Add more skills
      ],
    },
    // Add more categories
  ];

  const contact: Contact = {
    address: 'To obtain address, email me first',
    email1: 'labib.45x@gmail.com',
    email2: 'labib-x@protonmail.com',
    phone: '+1 480-400-800',
  };

  const socialLinks: SocialLink[] = [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/la-b-ib/', icon: 'bx bxl-linkedin' },
    { platform: 'GitHub', url: 'https://github.com/la-b-ib', icon: 'bx bxl-github' },
    { platform: 'Google', url: 'mailto:labib.45x@gmail.com', icon: 'bx bxl-google' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        profile={profile}
        setProfile={setProfile}
        socialLinks={socialLinks}
      />
      <AboutSection
        about={about}
        setAbout={setAbout}
        profilePictureUrl={profile.profilePictureUrl}
        researchPublications={researchPublications}
      />
      <EducationSection
        education={education}
        setEducation={setEducation}
        certifications={certifications}
      />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <SkillsSection skillCategories={skillCategories} />
      <ResumeSection />
      <ContactSection contact={contact} socialLinks={socialLinks} />
    </div>
  );
};

export default App;

// -----------------------------
// 7. components/Header.tsx
// Header component with navigation and edit form
// -----------------------------

import React, { useState } from 'react';

interface HeaderProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  socialLinks: SocialLink[];
}

const Header: React.FC<HeaderProps> = ({ profile, setProfile, socialLinks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Profile>({ ...profile });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  const navItems = [
    { name: 'Home', href: '#header' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#portfolio' },
    { name: 'Skills', href: '#skills' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contacts' },
  ];

  return (
    <header id="header" className="fixed top-0 w-full bg-gray-800 shadow-lg z-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center">
          <a href="#header">{profile.name}</a>
        </h1>
        <h2 className="text-xl text-center mt-2">
          I'm <span className="typing text-green-400"></span>
        </h2>
        <nav className="hidden lg:flex justify-center mt-4">
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-lg font-semibold hover:text-green-400 transition">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex justify-center mt-4 space-x-4">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-green-400">
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        {isEditing && (
          <form onSubmit={handleSubmit} className="mt-4 max-w-lg mx-auto bg-gray-700 p-6 rounded">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium">Title</label>
              <textarea
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                rows={3}
                required
              />
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;

// -----------------------------
// 8. components/AboutSection.tsx
// About section with edit form
// -----------------------------

import React, { useState } from 'react';

interface AboutSectionProps {
  about: About;
  setAbout: React.Dispatch<React.SetStateAction<About>>;
  profilePictureUrl: string;
  researchPublications: ResearchPublication[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ about, setAbout, profilePictureUrl, researchPublications }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<About>({ ...about });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAbout(formData);
    setIsEditing(false);
  };

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">About</h2>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 mb-6 lg:mb-0">
            <img src={profilePictureUrl} alt="Profile" className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="lg:w-2/3 lg:pl-8">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded">
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium">Description</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                    rows={5}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="birthday" className="block text-sm font-medium">Birthday</label>
                  <input
                    type="text"
                    id="birthday"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="hometown" className="block text-sm font-medium">Hometown</label>
                  <input
                    type="text"
                    id="hometown"
                    value={formData.hometown}
                    onChange={(e) => setFormData({ ...formData, hometown: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                    required
                  />
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <p className="mb-4">{about.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="list-none">
                    <li><i className="ri-arrow-right-circle-line mr-2"></i><strong>Birthday:</strong> {about.birthday}</li>
                    <li><i className="ri-arrow-right-circle-line mr-2"></i><strong>Phone:</strong> {about.phone}</li>
                  </ul>
                  <ul className="list-none">
                    <li><i className="ri-arrow-right-circle-line mr-2"></i><strong>Home Town:</strong> {about.hometown}</li>
                    <li><i className="ri-arrow-right-circle-line mr-2"></i><strong>Email:</strong> <a href={`mailto:${about.email}`}>{about.email}</a></li>
                  </ul>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Edit About
                </button>
              </>
            )}
            <h4 className="mt-6 text-xl font-semibold">Research Contributions</h4>
            {researchPublications.map((pub, index) => (
              <div key={index} className="mt-4">
                <p><i className="ri-arrow-right-circle-line mr-2"></i><strong>Title:</strong> <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-green-400">{pub.title}</a></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="list-none">
                    <li><strong>DOI:</strong> <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">{pub.doi}</a></li>
                    <li><strong>Published in:</strong> {pub.publishedIn}</li>
                  </ul>
                  <ul className="list-none">
                    <li><strong>Location:</strong> {pub.location}</li>
                    <li><strong>Date:</strong> {pub.date}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

// -----------------------------
// 9. components/EducationSection.tsx
// Education section with edit form
// -----------------------------

import React, { useState } from 'react';

interface EducationSectionProps {
  education: Education;
  setEducation: React.Dispatch<React.SetStateAction<Education>>;
  certifications: Certification[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, setEducation, certifications }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Education>({ ...education });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEducation({
      ...formData,
      coursework: formData.coursework.join('\n').split('\n').filter(line => line.trim()),
    });
    setIsEditing(false);
  };

  return (
    <section id="education" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-700 p-6 rounded">
            <div className="mb-4">
              <label htmlFor="institution" className="block text-sm font-medium">Institution</label>
              <input
                type="text"
                id="institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="degree" className="block text-sm font-medium">Degree</label>
              <input
                type="text"
                id="degree"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="period" className="block text-sm font-medium">Period</label>
              <input
                type="text"
                id="period"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="coursework" className="block text-sm font-medium">Coursework (one per line)</label>
              <textarea
                id="coursework"
                value={formData.coursework.join('\n')}
                onChange={(e) => setFormData({ ...formData, coursework: e.target.value.split('\n') })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                rows={5}
                required
              />
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="text-center">
            <img src="/assets/img/education/bu.png" alt="BRAC University" className="w-32 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">{education.degree}</h3>
            <p className="text-lg">{education.institution}</p>
            <p className="text-md">{education.period}</p>
            <h4 className="mt-4 text-lg font-semibold">Relevant Coursework</h4>
            <ul className="list-none text-left max-w-md mx-auto">
              {education.coursework.map((course, index) => (
                <li key={index} className="flex items-center">
                  <i className="ri-arrow-right-circle-line mr-2"></i>{course}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Edit Education
            </button>
          </div>
        )}
        <h2 className="text-3xl font-bold text-center mt-12 mb-8">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded">
              <img src={cert.badgeUrl} alt={cert.name} className="w-full h-40 object-cover rounded" />
              <h4 className="mt-2 text-lg font-semibold">{cert.name}</h4>
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                View Certificate
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

// -----------------------------
// 10. components/ExperienceSection.tsx
// Experience section (static for brevity)
// -----------------------------

import React from 'react';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
        {experiences.map((exp, index) => (
          <div key={index} className="mb-8 bg-gray-700 p-6 rounded">
            <h3 className="text-xl font-semibold">
              <a href="#" className="text-green-400">{exp.organization}</a>
            </h3>
            <p className="text-lg">{exp.role}</p>
            <p className="text-md">{exp.period}</p>
            <ul className="list-none mt-4">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-center">
                  <i className="ri-arrow-right-circle-line mr-2"></i>{resp}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;

// -----------------------------
// 11. components/ProjectsSection.tsx
// Projects section (static for brevity)
// -----------------------------

import React from 'react';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section id="portfolio" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <div className="bg-gray-700 rounded overflow-hidden">
                <img src={project.imageUrl} alt={project.name} className="w-full h-48 object-cover" />
                <a href={project.detailsUrl} className="block py-2 text-green-400 hover:underline">Details</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

// -----------------------------
// 12. components/SkillsSection.tsx
// Skills section (static for brevity)
// -----------------------------

import React from 'react';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skillCategories }) => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        {skillCategories.map((category, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold">{category.name}</h3>
            <div className="flex flex-wrap gap-4 mt-4">
              {category.skills.map((skill, idx) => (
                <img key={idx} src={skill.logoUrl} alt={skill.name} className="h-12" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;

// -----------------------------
// 13. components/ResumeSection.tsx
// Resume section
// -----------------------------

import React from 'react';

const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Resume</h2>
        <iframe
          src="https://la-b-ib.github.io/resume/"
          className="w-full h-[80vh] border-none"
          title="Resume"
        ></iframe>
      </div>
    </section>
  );
};

export default ResumeSection;

// -----------------------------
// 14. components/ContactSection.tsx
// Contact section
// -----------------------------

import React from 'react';

interface ContactSectionProps {
  contact: Contact;
  socialLinks: SocialLink[];
}

const ContactSection: React.FC<ContactSectionProps> = ({ contact, socialLinks }) => {
  return (
    <section id="contacts" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact</h2>
        <p className="text-center mb-8">
          <strong>I’m hyped to crush it on AI, cybersecurity, sustainability, and career-shaping projects! Slide into my DMs, and let’s spark game-changing, community-driven solutions that light up the world!</strong>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-6 rounded flex items-center">
            <i className="ri-map-pin-line text-3xl mr-4"></i>
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p>{contact.address}</p>
            </div>
          </div>
          <div className="bg-gray-700 p-6 rounded flex items-center">
            <i className="ri-share-line text-3xl mr-4"></i>
            <div>
              <h3 className="text-lg font-semibold">Social Profiles</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-green-400">
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-700 p-6 rounded flex items-center">
            <i className="ri-mail-line text-3xl mr-4"></i>
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p><a href={`mailto:${contact.email1}`} className="text-green-400">{contact.email1}</a></p>
              <p><a href={`mailto:${contact.email2}`} className="text-green-400">{contact.email2}</a></p>
            </div>
          </div>
          <div className="bg-gray-700 p-6 rounded flex items-center">
            <i className="ri-phone-line text-3xl mr-4"></i>
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <p>{contact.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

// -----------------------------
// 15. types/typed.d.ts
// Type declaration for Typed.js
// -----------------------------

declare class Typed {
  constructor(element: string | Element, options: {
    strings: string[];
    loop?: boolean;
    typeSpeed?: number;
    backSpeed?: number;
  });
  destroy(): void;
}

export { Typed };

// -----------------------------
// 16. package.json (for reference)
// Dependencies and scripts
// -----------------------------

/*
{
  "name": "portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typed.js": "^2.0.12"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}
*/

// -----------------------------
// 17. tailwind.config.js
// Tailwind CSS configuration
// -----------------------------

/*
/** @type {import('tailwindcss').Config} *\/
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
*/

// -----------------------------
// 18. tsconfig.json
// TypeScript configuration
// -----------------------------

/*
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
*/