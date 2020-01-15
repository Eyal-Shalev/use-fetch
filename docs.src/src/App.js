import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
import {About} from "./About";
import {Demo} from "./Demo";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import NavbarBrand from "react-bootstrap/NavbarBrand";
// className='navbar navbar-collapse'
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar expand='sm' bg='dark' variant='dark' sticky='top'>
        <Container>
          <LinkContainer to='/' exact={true}>
            <NavbarBrand as={Link} to='/'>use-fetch</NavbarBrand>
          </LinkContainer>
          <NavbarToggle />
          <NavbarCollapse>
            <Nav>
              <LinkContainer exact={true} to='/' activeClassName='active'>
                <NavItem>
                  <NavLink as={Link} to='/'>Home</NavLink>
                </NavItem>
              </LinkContainer>
              <LinkContainer to='/demo' activeClassName='active'>
                <NavItem>
                  <NavLink as={Link} to='/demo'>Demo</NavLink>
                </NavItem>
              </LinkContainer>
              <NavItem>
                <NavLink href='https://github.com/Eyal-Shalev/use-fetch'>GitHub</NavLink>
              </NavItem>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
      <Switch>
        <Route path='/demo'>
          <Demo />
        </Route>
        <Route path='/'>
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
