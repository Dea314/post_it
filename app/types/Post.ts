export type PostType = {
  title: string;
  id: string;
  updatedAt?: string;
  user: {
    name: string;
    image: string;
    id: string;
    email: string;
  };
  Comment: {
    createdAt: string;
    id: string;
    postId: string;
    title: string;
    userId: string;
    user: {
      name: string;
      image: string;
      id: string;
      email: string;
    };
  }[];
};
