"use client";

import Image from "next/image";
import Link from "next/link";

interface PostProps {
  name: string;
  avatar: string;
  postTitle: string;
  id: string;
  Comment: string;
}

export default function Post({
  name,
  avatar,
  postTitle,
  id,
  Comment,
}: PostProps) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex items-center gap-4 cursor-pointer">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-blod text-gray-700">
            {Comment?.length === 1
              ? "1 Comment"
              : `${Comment?.length} Comments`}
          </p>
        </Link>
      </div>
    </div>
  );
}
