import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import {WithPosts, WithUsers} from "./data";
import {Posts} from "./Posts";
import {Users} from "./Users";
import {Albums} from "./Albums";
import {LinkContainer} from "react-router-bootstrap";
import {Post} from "./Post";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

export const Demo = (props) => {
  return (
    <WithUsers>
      <WithPosts>
        <Container fluid={true}>
          <Row>
            <aside className='col-md-1'>
              <Nav variant='pills' className='flex-column'>
                <LinkContainer to='/demo/posts' activeClassName='active'>
                  <Link className="nav-link" to='/demo/posts'>Posts </Link>
                </LinkContainer>
                <LinkContainer to='/demo/albums' activeClassName='active'>
                  <Link className="nav-link" to="/demo/albums">Albums</Link>
                </LinkContainer>
                <LinkContainer to='/demo/users' activeClassName='active'>
                  <Link className="nav-link" to="/demo/users">Users</Link>
                </LinkContainer>
              </Nav>
            </aside>
            <section className='col row'>
              <Switch>
                <Route path='/demo/posts' exact={true}>
                  <Posts as='main'/>
                </Route>
                <Route path='/demo/posts/:id'>
                  <Posts as='aside' className='col-3'/>
                  <Post className='col'/>
                </Route>
                <Route path='/demo/albums'>
                  <Albums/>
                </Route>
                <Route path='/demo/users'>
                  <Users/>
                </Route>
                <Route path='/demo'>
                  <Redirect to="/demo/posts"/>
                </Route>
              </Switch>
            </section>
          </Row>
        </Container>
      </WithPosts>
    </WithUsers>
  );
};
