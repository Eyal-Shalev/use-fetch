import React, {useEffect, useState} from "react";
import {useComments} from "./data";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export const Comments = ({post, ...props}) => {
  const {comments} = useComments(post);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(comments.length > 0);
  }, [comments]);

  useEffect(() => {
    setShow(false)
  }, [post]);

  return (
    <section {...props}>
      <ListGroup className={`fade ${show ? 'show' : ''}`}>
        {comments.map((comment) => (
          <ListGroupItem key={comment.id}>
            <main>{comment.body}</main>
            <footer>Commented by: <a href={comment.email}>{comment.name} &lt;{comment.email}&gt;</a></footer>
          </ListGroupItem>
        ))}
      </ListGroup>
    </section>
  );
};
