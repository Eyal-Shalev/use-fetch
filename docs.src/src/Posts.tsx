import * as React from 'react';

import {User, UsersContext, PostsContext} from "./data";
import {Link} from 'react-router-dom';
import {LinkContainer} from "react-router-bootstrap";

export const Posts = ({as, ...props}: { as: 'main' | 'aside', props: object }) => {
  const users = React.useContext(UsersContext);
  const posts = React.useContext(PostsContext);

  const withUser = (userId: number, callback: (user: User) => any) => {
    if (!users) return;
    const user = users.find(({id}) => id === userId);
    if (user) return callback(user)
  };

  return React.createElement(as, props, [
    <header key='header'><h3>Posts</h3></header>,
    <nav key='nav'>
      <ul className='posts'>
        {posts.map(post => (
          <LinkContainer key={post.id} to={`/demo/posts/${post.id}`} activeClassName='active'>
            <li>
              <Link to={`/demo/posts/${post.id}`}>{post.title}</Link>
              {withUser(post.userId, (user) => (
                <footer>Authored by <Link to={`/demo/users/${user.id}`}>{user.name}</Link></footer>
              ))}
            </li>
          </LinkContainer>
        ))}
      </ul>
    </nav>]);
};
