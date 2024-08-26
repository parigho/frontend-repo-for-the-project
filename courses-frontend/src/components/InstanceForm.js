// src/components/InstanceForm.js
import React, { useState, useEffect } from 'react';
import API from '../api';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const InstanceForm = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/courses/')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/instances/', {
      course: selectedCourse,
      year,
      semester,
    })
      .then(() => {
        navigate('/instances');
      })
      .catch(error => console.error('Error adding instance:', error));
  };

  return (
    <div className="container mt-4">
      <h2>Add New Course Instance</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCourse">
          <Form.Label>Course</Form.Label>
          <Form.Control
            as="select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formYear">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSemester">
          <Form.Label>Semester</Form.Label>
          <Form.Control
            as="select"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            {/* Add more semesters if needed */}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">Add Instance</Button>
      </Form>
    </div>
  );
};

export default InstanceForm;
