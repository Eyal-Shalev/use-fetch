import React from 'react';
import {About} from "./About";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import NavbarBrand from "react-bootstrap/NavbarBrand";

const App = () => <>
  <Navbar as='header' expand='sm' bg='dark' variant='dark' sticky='top'>
    <Container>
      <NavbarBrand href='/'>use-fetch</NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <Nav>
          <NavItem>
            <NavLink href='/' active={true}>Documentation</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='https://github.com/Eyal-Shalev/use-fetch'>GitHub</NavLink>
          </NavItem>
        </Nav>
      </NavbarCollapse>
    </Container>
  </Navbar>
  <Container as='main'>
    <About/>
  </Container>
</>;

export default App
