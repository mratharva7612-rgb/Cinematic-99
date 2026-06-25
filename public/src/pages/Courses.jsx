import React, { useState, useEffect } from 'react';

const Courses = ({ language }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses');
    }
  };

  return (
    <div className="courses">
      <h2>{language === 'en' ? 'Video Editing Courses' : 'व्हिडिओ संपादन अभ्यासक्रम'}</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h3>{language === 'en' ? course.title : course.titleMarathi}</h3>
            <p>{language === 'en' ? course.description : course.descriptionMarathi}</p>
            <p><strong>₹{course.price}</strong> / {language === 'en' ? 'month' : 'महिना'}</p>
            <p>{language === 'en' ? `${course.lessons} Lessons` : `${course.lessons} धड्यें`}</p>
            <button className="enroll-btn">{language === 'en' ? 'Enroll Now' : 'आता नोंदणी करा'}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;