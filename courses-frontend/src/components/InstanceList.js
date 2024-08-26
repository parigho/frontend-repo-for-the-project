// src/components/InstanceList.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import { Button, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const InstanceList = () => {
  const [instances, setInstances] = useState([]);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

  const fetchInstances = () => {
    if (year && semester) {
      API.get(`/instances/${year}/${semester}/`)
        .then(response => setInstances(response.data))
        .catch(error => console.error('Error fetching instances:', error));
    } else {
      setInstances([]);
    }
  };

  useEffect(() => {
    // Optionally, fetch all instances or set default filters
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchInstances();
  };

  const deleteInstance = (id) => {
    if (window.confirm("Are you sure you want to delete this instance?")) {
      API.delete(`/instances/${year}/${semester}/${id}/`)
        .then(() => fetchInstances())
        .catch(error => console.error('Error deleting instance:', error));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Course Instances</h2>
      <Form inline onSubmit={handleFilter} className="mb-3">
        <Form.Group controlId="formYear" className="mr-3">
          <Form.Label className="mr-2">Year:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSemester" className="mr-3">
          <Form.Label className="mr-2">Semester:</Form.Label>
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

        <Button variant="primary" type="submit">Filter</Button>
      </Form>

      <Button as={Link} to="/add-instance" variant="primary" className="mb-3">Add Instance</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course</th>
            <th>Year</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instances.map(instance => (
            <tr key={instance.id}>
              <td>{instance.course.title}</td>
              <td>{instance.year}</td>
              <td>{instance.semester}</td>
              <td>
                {/* Placeholder for 'View' functionality */}
                <Button variant="info" size="sm" className="mr-2">View</Button>
                <Button variant="danger" size="sm" onClick={() => deleteInstance(instance.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InstanceList;
