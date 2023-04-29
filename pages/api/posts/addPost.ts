import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ error: "Sign in to write a post" });
    const title: string = req.body.title;

    //get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email || "" },
    });
    if (!prismaUser) {
      return res.status(404).json({ error: "User not found" });
    }

    //check title
    if (title.length > 300) {
      return res.status(403).json({ message: "Post is too long 🙃" });
    }
    if (!title.length) {
      return res
        .status(403)
        .json({ message: "Please do not leave field empty!" });
    }

    //create post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser!.id,
        },
      });
      return res.status(200).json({ message: "Post created!" });
    } catch (error) {
      return res.status(403).json({ error: "Something went wrong :(" });
    }
  }
}
