// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';

const Navbar = () => {
  return (
    <BootstrapNavbar bg="light" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/">Courses App</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
          <Nav.Link as={Link} to="/instances">Instances</Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
