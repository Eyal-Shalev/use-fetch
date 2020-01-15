import React, {useContext} from "react";
import {AlbumsContext} from "./data";
import CardColumns from "react-bootstrap/CardColumns";
import {AlbumCard} from "./AlbumCard";

export const Albums = (props) => {
  const albums = useContext(AlbumsContext);
  return (
    <CardColumns {...props}>
      {albums.map(album => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </CardColumns>
  );
};
