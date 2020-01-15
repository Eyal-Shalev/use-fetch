import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Comments} from './Comments';
import {Link, useParams} from "react-router-dom";
import {Post as PostT, PostsContext, User, UsersContext} from "./data";
import Card from "react-bootstrap/Card";


export const Post = ({...props}: {[k:string]: any}) => {
  const users = React.useContext(UsersContext);

  const withUser = (userId: number, callback: (user: User) => any) => {
    if (!users) return;
    const user = users.find(({id}) => id === userId);
    if (user) return callback(user)
  };

  const {id} = useParams();

  const posts = useContext(PostsContext);

  const [activePost, setActivePost] = useState<PostT>();
  useEffect(() => {
    if (!posts) return;
    setActivePost(posts.find(post => post.id === parseInt(id || '-1')))
  }, [id, posts]);

  if (!activePost) {
    return (<></>);
  }

  props['className'] = props['className'] || '';
  props['className'] += ' post';

  return (
    <Card as='article' style={{marginLeft: '15px'}} {...props}>
      <Card.Header as='header'><Card.Title>{activePost.title}</Card.Title></Card.Header>
      <Card.Body as='main'>
        <Card.Text>{activePost.body}</Card.Text>
        <Comments post={activePost} />
      </Card.Body>
      <Card.Footer as='footer'>
        {withUser(activePost.userId, (user: User) => (
          <header>Authored by <Link to={`/demo/users/${user.id}`}>{user.name}</Link></header>
        ))}
      </Card.Footer>
    </Card>
  )
};
