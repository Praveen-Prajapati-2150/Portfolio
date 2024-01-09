import React from 'react';
import { Link } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Main from '../layouts/Main';

import Education from '../components/Resume/Education';
import Experience from '../components/Resume/Experience';
import Skills from '../components/Resume/Skills';
// import Courses from '../components/Resume/Courses';
// import References from '../components/Resume/References';

// import courses from '../data/resume/courses';
import degrees from '../data/resume/degrees';
import positions from '../data/resume/positions';
import { skills, categories } from '../data/resume/skills';
// import { faDownload } from '@fortawesome/free-regular-svg-icons/faDownload';
// import Download from '../../public/images/projects/download.svg';
import Download from '../assets/svg/download';

const sections = [
  'Education',
  'Experience',
  'Skills',
  // 'Courses',
  // 'References',
];

const Resume = () => (
  <Main title="Resume" description="Praveen Prajapati's Resume.">
    <article className="post" id="resume">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <>
                <Link to="resume">Resume</Link>{' '}
              </>
              <div style={{ cursor: 'pointer' }}>
                <a href="/public/pdf/Praveen_Prajapati_updated.pdf" download>
                  <Download />
                </a>
              </div>
            </div>
          </h2>
          <div className="link-container">
            {sections.map((sec) => (
              <h4 key={sec}>
                <a href={`#${sec.toLowerCase()}`}>{sec}</a>
              </h4>
            ))}
          </div>
        </div>
      </header>
      <Education data={degrees} />
      <Experience data={positions} />
      <Skills skills={skills} categories={categories} />
      {/* <Courses data={courses} /> */}
      {/* <References /> */}
    </article>
  </Main>
);

export default Resume;
