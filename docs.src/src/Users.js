import React, {useContext} from "react";
import {UsersContext} from "./data";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";

export const Users = () => {
  const users = useContext(UsersContext);
  return (
    <CardColumns>
      {users.map(user => (
        <Card key={user.id}>
          <Card.Header as='header'>
            <Card.Title>{user.name}</Card.Title>
            <Card.Subtitle>{user.username}</Card.Subtitle>
          </Card.Header>
          <Card.Body>
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
          </Card.Body>
        </Card>
      ))}
    </CardColumns>
  )
};
