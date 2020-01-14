import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Comments} from './Comments';
import {useParams} from "react-router-dom";
import {Post as PostT, PostsContext} from "./data";

export const Post = (props: object) => {
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

  return (
    <article {...props}>
      <header><h3>{activePost.title}</h3></header>
      <main>{activePost.body}</main>
      <footer>
        <Comments post={activePost} />
      </footer>
    </article>
  )
};
