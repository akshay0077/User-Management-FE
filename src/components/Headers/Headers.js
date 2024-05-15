import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const Headers = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "50px" }}>
        <Container className="d-flex justify-content-center">
          <NavLink to="/" className="text-decoration-none text-light">
            MERN Stack Developer Practical Task
          </NavLink>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
