import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { mainPages } from "../../pages";

export class Header extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="xl">
        <Container>
          <Navbar.Brand><Link to="/">SoftTech HR</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {mainPages.map((page) => (
                <Nav.Link as={Link} key={page.path} to={page.path}>
                  {page.title}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
