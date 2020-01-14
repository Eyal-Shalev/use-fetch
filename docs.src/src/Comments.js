import React from "react";
import {useComments} from "./data";

export const Comments = ({post, ...props}) => {
  const {comments, loading} = useComments(post);

  if (loading) return (<span>loading comments...</span>);

  return (
    <ul {...props}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <main>{comment.body}</main>
          <footer>Commented by: <a href={comment.email}>{comment.name} &lt;{comment.email}&gt;</a></footer>
        </li>
      ))}
    </ul>
  );
};
