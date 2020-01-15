import * as React from 'react';

import {PostsContext} from "./data";
import {Link} from 'react-router-dom';
import {LinkContainer} from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";

export const Posts = ({as, ...props}: { as: 'main' | 'aside', [k:string]: any }) => {
  const posts = React.useContext(PostsContext);

  props['className'] = props['className'] || '';
  props['className'] += ' posts';

  return React.createElement(as, props, [(
    <Nav key='nav' className='flex-column' variant='pills'>
      {posts.map(post => (
        <LinkContainer key={post.id} to={`/demo/posts/${post.id}`} activeClassName='active'>
          <NavLink as={Link} to={`/demo/posts/${post.id}`}>
            {post.title}
          </NavLink>
        </LinkContainer>
      ))}
    </Nav>
  )]);
};
