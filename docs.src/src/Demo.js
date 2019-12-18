import React, {useEffect, useState} from 'react';
import {useFetch} from "use-fetch";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
} from 'react-router-dom';

const baseUrl = 'https://jsonplaceholder.typicode.com';

/**
 * @typedef post
 * @param {number} id
 * @param {number} userId
 * @param {string} title
 * @param {string} body
 */
/**
 * @typedef user
 * @param {number} id
 * @param {string} name
 * @param {string} userName
 * @param {address} address
 * @param {string} phone
 * @param {string} website
 * @param {company} company
 */
/**
 * @typedef address
 * @param {string} street
 * @param {string} suite
 * @param {string} city
 * @param {string} zipcode
 * @param {{lat: number, lng: number}} geo
 */
/**
 * @typedef company
 * @param {string} name
 * @param {string} catchPhrase
 * @param {string} bs
 */

/**
 *
 * @returns {*}
 * @constructor
 */
export const Demo = () => {
  const {useJson: useUsers} = useFetch(`${baseUrl}/users`);
  const {json: users} = useUsers([]);

  const {useJson: usePosts} = useFetch(`${baseUrl}/posts`);
  const {json: posts} = usePosts([]);

  const [activePost, setActivePost] = useState();
  const withActivePost = (callback) => activePost ? callback(activePost) : null;

  const [activePostId, setActivePostId] = useState();
  useEffect(() => {
    setActivePostId(activePost ? activePost.id : null)
  }, [activePost]);

  const {useJson: useActiveComments, reload: reloadComments, controller: commentsController} = useFetch(`${baseUrl}/post/${activePostId}/comments`);
  commentsController.abort();
  const {json: activeComments} = useActiveComments([]);
  useEffect(() => {reloadComments()}, [activePost, reloadComments]);

  const withUser = (userId, callback) => {
    const user = users.find(({id}) => id === userId);
    if (user) return callback(user)
  };

  return (
    <div>
      <header className='row'><h2>Demo</h2></header>
      <div className='row'>
        <aside className='col-md-3'>
          <header><h3>Posts</h3></header>
          <main>
            <ul className='posts'>
              {posts.map(post => (
                <li key={post.id} onClick={() => setActivePost(post)}
                    className={`${activePost === post ? 'active' : ''}`}>
                  <header>{post.title}</header>
                  {withUser(post.userId, (user) => (
                    <footer>Authored by <Link to={`/demo/users/${user.id}`}>{user.name}</Link></footer>
                  ))}
                </li>
              ))}
            </ul>
          </main>
        </aside>
        <main className='col-md-8'>
          {withActivePost((post) => (
            <article>
              <header><h3>{post.title}</h3></header>
              <main>{post.body}</main>
              <footer>
                <ul>
                  {activeComments.map(c => (
                    <li key={c.id}>
                      <main>{c.body}</main>
                      <footer>Commented by <a href={`mailto:${c.email}`}>{c.name} &lt;{c.email}&gt;</a></footer>
                    </li>
                  ))}
                </ul>
              </footer>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
};
