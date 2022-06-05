import React , { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getSimilarPosts, getRecentPosts } from '../services' 
import Image from 'next/image';

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
const myLoader = ({ src, width, quality }) => {
  return src
}

<<<<<<< HEAD
>>>>>>> f26851b (add some feature in postcard and login page)
=======
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
export default function PostWidget({ categories, slug }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(slug, categories)
        .then(result => setRelatedPosts(result));
    }
    else {
      getRecentPosts()
          .then(result => setRelatedPosts(result))
    }
  }, [slug, categories])
  
  return (
    <div className='bg-white lg:rounded-lg p-8 lg:mb-8 pt-0'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 '>
        {slug ? "Bài Viết Liên Quan" : "Bài Viết Gần Đây"}
      </h3>
      {relatedPosts.slice().reverse().map(post => (
          <div key={post.title} className='flex items-center w-full mb-4'>
              <div className='w-16 flex-none'>
                  <Image 
<<<<<<< HEAD
<<<<<<< HEAD
=======
                    loader={myLoader}
>>>>>>> f26851b (add some feature in postcard and login page)
=======
                    loader={myLoader}
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
                    src={post.featuredImage.url} 
                    alt={post.title}
                    height='40px'
                    width="60px"
                    className='align-middle round-full object-contain' 
                  />
              </div>
              <div className='flex-grow ml-4'>
                <p className='text-gray-500 font-xs'>
                  {moment(post.createdAt).format('MMM DD, YYYY')}
                </p>
                <Link href={`/post/${post.slug}`} key={post.title} className='text-md'>
                  {post.title}
                </Link>
              </div>
          </div>
      ))}
    </div>
  )
}
