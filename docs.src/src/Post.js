import React from 'react';
import {useFetch} from "use-fetch";

export const Post = ({baseUrl, post}) => {
  const {useJson: useComments} = useFetch(`${baseUrl}/posts/${post.id}/comments`, {}, []);
  const {json: comments} = useComments([]);

  return (
    <details>
      <summary>{post.title}</summary>
      <main>{post.body}</main>
      <footer>
        <ul>
          {comments.map((comment => (
            <li key={comment.id}>
              <main>{comment.body}</main>
              <footer>{comment.name} &lt;{comment.email}&gt;</footer>
            </li>
          )))}
        </ul>
      </footer>
    </details>
  );
};
