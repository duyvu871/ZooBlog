import React , { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getSimilarPosts, getRecentPosts } from '../services' 
import Image from 'next/image';
import { isUrl } from '../lib/exception';

const myLoader = ({ src, width, quality }) => {
  return `${src}`
}

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
                    loader={myLoader}
                    src={
                      post?.featuredImage?.url 
                      || post?.featuredImageUrl
                      || '/bg.jpg'
                    } 
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
