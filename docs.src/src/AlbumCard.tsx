import React, {useContext, useEffect, useState} from 'react';
import {Album as AlbumT, usePhotos, User, UsersContext} from "./data";
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";
import {Link} from "react-router-dom";

export const AlbumCard = ({album, ...props}: { album: AlbumT, [k: string]: any }) => {
  const {photos: cover} = usePhotos(album, 1);

  const users = useContext(UsersContext);
  const [author, setAuthor] = useState<User | undefined>(undefined);
  useEffect(() => {
    setAuthor(users.find(({id}) => id === album.userId))
  }, [users, album]);

  return (
    <Card as={Link} to={`/demo/albums/${album.id}`} {...props}>
      <Card.Header>
        <Card.Title>{album.title}</Card.Title>
        <Card.Subtitle>
          Created by {author ? author.name : ''}
        </Card.Subtitle>
      </Card.Header>
      {cover.length > 0
        ? <CardImg variant='bottom' alt={cover[0].title} src={cover[0].thumbnailUrl}/>
        : ''}
    </Card>
  );
};
