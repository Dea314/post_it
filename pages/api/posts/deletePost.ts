import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Session } from "next-auth";

interface CustomSession extends Session {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Please sign in" });
  }

  const user = (session as CustomSession).user;
  const { postId } = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId as string,
      },
      select: {
        userId: true,
      },
    });
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    if (post.userId !== user.id) {
      res.status(403).json({ error: "You can't delete this post" });
      return;
    }

    const result = await prisma.post.delete({
      where: {
        id: postId as string,
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(403).json({ error: "Something went wrong 😟" });
  }
}
