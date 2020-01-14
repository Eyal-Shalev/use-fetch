import {useJson} from "@eyalsh/use-fetch";
import * as React from "react";
import {createContext, ReactNode} from "react";

export const baseUrl = 'https://jsonplaceholder.typicode.com';

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
export const WithUsers = ({children, ...props}: {children?:ReactNode[]}) => {
  const {users: value} = useUsers();

  return React.createElement(UsersContext.Provider, {value, ...props}, children)
};

export type Post = {
  id: number
  userId: number
  title: string
  body: string
}

export const PostsContext = createContext<Post[]>([]);
export const usePosts = (user?: User) => {
  const {value: posts, loading, exception} = useJson<Post[]>(`${baseUrl}/posts?` + (user ? `userId=${user.id}` : ''), {}, []);

  return {posts, loading, exception}
};
export const WithPosts = ({children, ...props}: {children?:ReactNode[]}) => {
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
  const {value: comments, loading, exception} = useJson<Comment[]>(`${baseUrl}/comments?` + (post ? `postId=${post.id}` : ''), {}, []);

  return {comments, loading, exception};
};
