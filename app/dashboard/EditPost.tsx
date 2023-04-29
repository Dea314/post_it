"use client";

import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Toggle from "./Toggle";
import axios from "axios";
import toast from "react-hot-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  const [toggle, setToggle] = useState(false);
  let deleteToastID: string;
  const queryClient = useQueryClient();

  //delete post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete(`/api/posts/deletePost`, { data: id }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting post", { id: deleteToastID });
      },
      onSuccess: (data) => {
        toast.success("Post deleted", { id: deleteToastID });
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );

  const deletePost = () => {
    deleteToastID = toast.loading("Deleting post...", { id: deleteToastID });
    mutate(id);
  };

  /*   const deletePost = async (postId: string) => {
    deleteToastID = toast.loading("your post.", { id: deleteToastID });
    try {
      await axios.delete(`/api/posts/deletePost`, { data: { postId } });
      toast.success("Post deleted", { id: deleteToastID });
      queryClient.invalidateQueries(["auth-posts"]);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting the post");
    }
  }; */

  /*   const { mutate } = useMutation(
    async (id: string) => {
      const body = JSON.stringify({ id });
      await axios.delete(`/api/posts/deletePost`, { data: body });
    },
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting the post");
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["auth-posts"]);
        toast.success("Post deleted", { id: deleteToastID });
      },
    }
  );

  const deletePost = () => {
    deleteToastID = toast.loading("Deleting your post.", { id: deleteToastID });
    mutate(id);
  }; */

  /* export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  //toggle
  const [toggle, setToggle] = useState(false);
  let deleteToastID: string;
  const queryClient = useQueryClient();

  //delete post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete(`/api/posts/deletePost`, { data: id }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting post", { id: deleteToastID });
      },
      onSuccess: (data) => {
        toast.success("Post deleted", { id: deleteToastID });
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );
  const deletePost = () => {
    deleteToastID = toast.loading("Deleting post...", { id: deleteToastID });
    mutate(id);
  }; */

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image width={32} height={32} src={avatar} alt="avatar" />
          <h3 className="font-bold text-gray-700"> {name} </h3>
        </div>
        <div className="my-8">
          <p className="break-all"> {title} </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}
          </p>
          <button className="text-sm font-bold text-violet-700">Edit</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setToggle(true);
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && (
        <Toggle deletePost={deletePost} setToggle={setToggle} id={id} />
      )}
    </>
  );
}
