import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React, { useLayoutEffect } from 'react'

const PostsContent = async ({
  params
}: {
  params: {
    postId: string
  }
}) => {
  const { postId } = params;
  const session = await getServerSession(authOptions);
  // const posts = await getPosts();

  return (
    <div>
        Microsoft
    </div>
  )
}

export default PostsContent