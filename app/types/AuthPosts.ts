import { type } from "os";

export type AuthPosts = {
  email: string;
  id: string;
  name: string;
  image: string;
  Post: {
    id: string;
    title: string;
    createdAt: string;
    Comment?: {
      id: string;
      createdAt: string;
      postId: string;
      title: string;
      userId: string;
    }[];
  }[];
};
