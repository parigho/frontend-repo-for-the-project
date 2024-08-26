// src/components/CourseForm.js
import React, { useState } from 'react';
import API from '../api';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/path');


const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/courses/', {
      title,
      course_code: courseCode,
      description,
    })
      .then(() => {
        history.push('/courses');
      })
      .catch(error => console.error('Error adding course:', error));
  };

  return (
    <div className="container mt-4">
      <h2>Add New Course</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Course Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCourseCode">
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Add Course</Button>
      </Form>
    </div>
  );
};

export default CourseForm;
