import React, {useContext} from "react";
import {UsersContext} from "./data";

export const Users = () => {
  const users = useContext(UsersContext);
  return (
    <ul className='card-columns'>
      {users.map(user => (
        <li key={user.id} className='card'>
          <header className='card-header'>
            <h3 className='card-title'>{user.name} (<em>{user.username}</em>)</h3>
          </header>
          <main className='card-body'>
            <details style={{display: !user.address ? 'none' : 'block'}}>
              <summary>Address</summary>
              <address>
                <pre>{JSON.stringify(user.address, null, '\t')}</pre>
              </address>
            </details>
            <div style={{display: !user.phone ? 'none' : 'block'}}>
              <span>Phone:</span> <a href={`tel:${user.phone}`}>{user.phone}</a>
            </div>
            <div style={{display: !user.website ? 'none' : 'block'}}>
              <span>Website:</span> <a href={user.website}>{user.website}</a>
            </div>
            <details style={{display: !user.company ? 'none' : 'block'}}>
              <summary>Company</summary>
              <pre>{JSON.stringify(user.company, null, '\t')}</pre>
            </details>
          </main>
        </li>
      ))}
    </ul>
  )
};
