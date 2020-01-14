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

export const Demo = (props) => {
  return (
    <WithUsers>
      <WithPosts>
        <div className='container-fluid' {...props}>
          <div className='row'>
            <aside className='col-1'>
              <nav>
                <ul className="navbar-nav">
                  <LinkContainer className="nav-item" to='/demo/posts' activeClassName='active'>
                    <Link className="nav-link" to='/demo/posts'>Posts </Link>
                  </LinkContainer>
                  <LinkContainer className="nav-item" to='/demo/albums' activeClassName='active'>
                    <Link className="nav-link" to="/demo/albums">Albums</Link>
                  </LinkContainer>
                  <LinkContainer className="nav-item" to='/demo/users' activeClassName='active'>
                    <Link className="nav-link" to="/demo/users">Users</Link>
                  </LinkContainer>
                </ul>
              </nav>
            </aside>
            <Switch>
              <Route path='/demo/posts' exact={true}>
                <Posts as='main' className='col'/>
              </Route>
              <Route path='/demo/posts/:id'>
                <Posts as='aside' className='col'/>
                <Post className='col-8'/>
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
          </div>
        </div>
      </WithPosts>
    </WithUsers>
  );
};
