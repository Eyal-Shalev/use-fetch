import React, {Reducer, useContext, useEffect, useReducer, useState} from 'react';
import CardColumns from "react-bootstrap/CardColumns";
import {useParams} from "react-router-dom";
import {AlbumsContext, Photo, PhotosContext} from "./data";
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import Image from "react-bootstrap/Image";
import Pagination from "react-bootstrap/Pagination";
import PageItem, {Next, Prev} from "react-bootstrap/PageItem";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import ModalDialog from "react-bootstrap/ModalDialog";
import CloseButton from "react-bootstrap/CloseButton";

export const Album = (props: { [k: string]: any }) => {
  const albums = useContext(AlbumsContext);
  const {id} = useParams();
  const [activeAlbum, setActiveAlbum] = useState();
  useEffect(() => {
    if (!id) return;
    if (albums.length === 0) return;
    setActiveAlbum(albums.find(((album) => album.id === parseInt(id))))
  }, [id, albums]);

  console.log({activeAlbum, id});
  const photos = useContext(PhotosContext);

  const [albumPhotos, setAlbumPhotos] = useState<Photo[]>([]);
  useEffect(() => {
    if (!id) return;
    setAlbumPhotos(photos.filter(({albumId}) => albumId === parseInt(id)))
  }, [id, photos]);

  const pageSize = 20;
  const [paginationSize, setPaginationSize] = useState(0);
  type Page = {
    photos: Photo[]
    page: number
  }
  const [currentPage, setPage] = useReducer<Reducer<Page, number>>((prev, page) => {
    return {page, photos: albumPhotos.slice(pageSize * page, pageSize * (page + 1))};
  }, {photos: [], page: 0});

  useEffect(() => {
    setPage(0);
    setPaginationSize(Math.ceil(albumPhotos.length / pageSize));
  }, [albumPhotos]);

  const [activePhoto, setActivePhoto] = useState<Photo | undefined>();

  return <>
    <Row as='nav' className='justify-content-center'>
      <Pagination size='lg'>
        <Prev disabled={currentPage.page === 0}/>
        {paginationSize < 11 &&
        Array.from({length: paginationSize}, (v, k) => k).map(i => (
          <PageItem key={i} active={currentPage.page === i} onClick={() => setPage(i)}>{i + 1}</PageItem>
        ))}

        <Next disabled={currentPage.page === pageSize - 1}/>
      </Pagination>
    </Row>
    <Row>
      <CardColumns {...props} className={`fade ${albumPhotos.length > 0 ? 'show' : ''}`}>
        {currentPage.photos.map(photo => (
          <Card key={photo.id} onClick={() => setActivePhoto(photo)}>
            <CardImg variant='top' src={photo.thumbnailUrl}/>
            <Card.ImgOverlay>
              <Card.Title>{photo.title}</Card.Title>
            </Card.ImgOverlay>
          </Card>
        ))}
      </CardColumns>
    </Row>
    <Modal dialogClassName='modal-fluid' show={!!activePhoto} onHide={() => setActivePhoto(undefined)}>
      <ModalHeader>
        <ModalTitle>{activePhoto && activePhoto.title}</ModalTitle>
        <CloseButton onClick={() => setActivePhoto(undefined)}><span aria-hidden="true">&times;</span></CloseButton>
      </ModalHeader>
      <ModalBody>
        <Image src={activePhoto && activePhoto.url} alt={activePhoto && activePhoto.title}/>
      </ModalBody>
    </Modal>
  </>;
};
