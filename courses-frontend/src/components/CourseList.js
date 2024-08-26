// src/components/CourseList.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = () => {
    API.get('/courses/')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      API.delete(`/courses/${id}/`)
        .then(() => fetchCourses())
        .catch(error => console.error('Error deleting course:', error));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Courses</h2>
      <Button as={Link} to="/add-course" variant="primary" className="mb-3">Add Course</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Course Code</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.course_code}</td>
              <td>{course.description}</td>
              <td>
                {/* Placeholder for 'View' functionality */}
                <Button variant="info" size="sm" className="mr-2">View</Button>
                <Button variant="danger" size="sm" onClick={() => deleteCourse(course.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseList;
