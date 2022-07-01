import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const myLoader = ({ src, width, quality }) => {
  return  `${src}?w=${width}&q=${quality || 75}`
}

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-56 ">
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-56 " style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-56" />
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white mb-4 text-shadow font-semibold text-xs">{moment(post.createdAt).format('M/ DD/ YY')}</p>
      <p className="text-white mb-4 text-shadow font-semibold text-lg text-center line-clamp-2 lg:line-clamp-none">{post.title}</p>
      <div className="flex items-center absolute bottom-5 w-full justify-center">
        <Image
          loader={myLoader}
          alt={post.author.name}
          height="30px"
          width="30px"
          className="align-middle drop-shadow-lg rounded-full"
          src={post.author.photo.url}
        />
        <p className="inline align-middle text-white text-shadow ml-2 text-xs font-medium">{post.author.name}</p>
      </div>
    </div>
    <Link href={`/post/${post.slug}`} passHref><span className="cursor-pointer absolute w-full h-full" /></Link>
  </div>
);

export default FeaturedPostCard;