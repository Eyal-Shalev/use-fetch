import React from 'react';
import {useFetch} from "use-fetch";
import {Post} from "./Post";

const baseUrl = 'https://jsonplaceholder.typicode.com';

export const Demo = () => {
  const {useJson: usePosts} = useFetch(`${baseUrl}/posts`, {}, []);
  const {json: posts} = usePosts([]);

  return (
    <div>
      <header><h2>Demo</h2></header>
      <main>
        <section>
          <header><h3>Posts</h3></header>
          <main>
            <ul>
              {posts.map(post => (
                <li key={post.id}>
                  <Post baseUrl={baseUrl} post={post}/>
                </li>
              ))}
            </ul>
          </main>
        </section>
      </main>
    </div>
  );
};
