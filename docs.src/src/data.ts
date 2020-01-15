import {useJson, useText} from "@eyalsh/use-fetch";
import * as React from "react";
import {createContext, ReactNode} from "react";

export const baseUrl = 'https://jsonplaceholder.typicode.com';

const queryString = (query: { [k: string]: any }) => Object.entries(query)
  .filter(([k, v]) => v !== null)
  .map(([k, v]) => `${k}=${v}`)
  .join('&');

export type Address = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: number
    lng: number
  }
}

export type Company = {
  name: string
  catchPhrase: string
  bs: string
}

export type User = {
  id: number
  name: string
  username: string
  address: Address
  phone: string
  website: string
  company: Company
}

export const UsersContext = createContext<User[]>([]);
export const useUsers = () => {
  const {value: users, loading, exception} = useJson<User[]>(`${baseUrl}/users`, {}, []);

  return {users, loading, exception}
};
export const WithUsers = ({children, ...props}: { children?: ReactNode[] }) => {
  const {users: value} = useUsers();

  return React.createElement(UsersContext.Provider, {value, ...props}, children)
};

export type Post = {
  id: number
  userId: number
  title: string
  body: string
}

export const usePosts = (user?: User) => {
  const query = {
    userId: user ? user.id : null,
  };
  const {value: posts, loading, exception} = useJson<Post[]>(`${baseUrl}/posts?${queryString(query)}`, {}, []);

  return {posts, loading, exception}
};
export const PostsContext = createContext<Post[]>([]);
export const WithPosts = ({children, ...props}: { children?: ReactNode[] }) => {
  const {posts: value} = usePosts();

  return React.createElement(PostsContext.Provider, {value, ...props}, children)
};

export type Comment = {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export const useComments = (post?: Post) => {
  const query = {
    postId: post ? post.id : null,
  };
  const {value: comments, loading, exception} = useJson<Comment[]>(`${baseUrl}/comments?${queryString(query)}`, {}, []);

  return {comments, loading, exception};
};

export const useReadme = () => useText('https://raw.githubusercontent.com/Eyal-Shalev/use-fetch/master/README.md');

export type Album = {
  id: number
  userId: number
  title: string
}
export const useAlbums = (user?: User) => {
  const query = {
    userId: user ? user.id : null,
  };

  const {value: albums, ...rest} = useJson<Album[]>(`${baseUrl}/albums?${queryString(query)}`, {}, []);

  return {albums, ...rest};
};
export const AlbumsContext = createContext<Album[]>([]);
export const WithAlbums = ({children, ...props}: { children?: ReactNode[] }) => {
  const {albums: value} = useAlbums();
  return React.createElement(AlbumsContext.Provider, {value, ...props}, children)
};

export type Photo = {
  id: number
  albumId: number
  title: string
  url: string
  thumbnailUrl: string
}
export const usePhotos = (album?: Album, limit?: number) => {
  const query = {
    albumId: album ? album.id : null,
    limit: (typeof limit === 'number') ? limit : null,
  };
  const {value: photos, ...rest} = useJson<Photo[]>(`${baseUrl}/photos?${queryString(query)}`, {}, []);

  return {photos, ...rest}
};
export const PhotosContext = createContext<Photo[]>([]);
export const WithPhotos = ({children, ...props}: { children?: ReactNode[] }) => {
  const {photos: value} = usePhotos();
  return React.createElement(PhotosContext.Provider, {value, ...props}, children)
};
