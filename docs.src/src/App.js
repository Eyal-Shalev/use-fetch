import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
import {About} from "./About";
import {Demo} from "./Demo";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="">
        <header className='navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar'>
          <Link className='navbar-brand mr-0 mr-md-2' to='/'>
            <img src={logo} alt='logo' width={36} height={36}/>
          </Link>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <LinkContainer className="nav-item" exact={true} to='/' activeClassName='active'>
              <Link className="nav-link" to='/'>Home </Link>
            </LinkContainer>
            <LinkContainer className="nav-item" to='/demo' activeClassName='active'>
              <Link className="nav-link" to="/demo">Demo</Link>
            </LinkContainer>
          </ul>
        </header>
      </div>
      <section className='container'>
        <Switch>
          <Route path='/demo'>
            <Demo />
          </Route>
          <Route path='/'>
            <About />
          </Route>
        </Switch>
      </section>
    </Router>
  );
}

export default App;
