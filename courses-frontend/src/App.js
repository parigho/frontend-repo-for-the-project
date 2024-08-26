// src/App.js
import React from 'react';

import Navbar from './components/Navbar';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import InstanceList from './components/InstanceList';
import InstanceForm from './components/InstanceForm';
import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';
// In your JSX:
<Routes>
    <Route path="/" element={<Home />} />
    {/* Other routes */}
    <Route path="*" element={<Navigate to="/" />} />
</Routes>


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/courses" />
        </Route>
        <Route exact path="/courses" component={CourseList} />
        <Route exact path="/add-course" component={CourseForm} />
        <Route exact path="/instances" component={InstanceList} />
        <Route exact path="/add-instance" component={InstanceForm} />
        {/* Add more routes as needed */}
        <Route path="*">
          <div className="container mt-4">
            <h2>404 - Page Not Found</h2>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
