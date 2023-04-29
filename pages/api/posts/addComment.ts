"use client";
import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Please sign in" });

    //get User
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session!.user!.email!,
      },
    });

    //add a comment to a post
    try {
      const { title, postId } = req.body.data;

      if (!title.length) {
        return res.status(400).json({ error: "Please enter a comment" });
      }
      const result = await prisma.comment.create({
        data: {
          message: title,
          postId,
          userId: prismaUser?.id as string,
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(403).json({ error: "Something went wrong 😟" });
    }
  }
}
