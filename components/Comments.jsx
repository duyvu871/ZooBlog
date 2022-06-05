import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse  from 'html-react-parser';
import { getComments } from '../services';

<<<<<<< HEAD
<<<<<<< HEAD
export default function Comments({ slug }) {
=======
export default function Comments({ slug , isUpdate}) {
>>>>>>> f26851b (add some feature in postcard and login page)
=======
export default function Comments({ slug , isUpdate}) {
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug).then(res => setComments(res))
<<<<<<< HEAD
<<<<<<< HEAD
  }, [slug])
=======
  }, [slug, isUpdate]);
>>>>>>> f26851b (add some feature in postcard and login page)
=======
  }, [slug, isUpdate]);
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8

  return (
    <>
      {
        comments.length > 0 && 
        (
          <div className='bg-white border-b lg:rounded-lg m-8 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
              {comments.length + ' '}Bình luận 
            </h3>
<<<<<<< HEAD
<<<<<<< HEAD
            {comments.map(comment => (
                <div key={comment.createdAt} className="border=b border-gray-100 mb-4 pb4">
                    <p className='mb-4'>
                        <span className='font-semibold'>{comment.name}</span>
                        {' '}tại{' '}{moment(comment.createdAt).format('MMM DD, YYYY')}
=======
=======
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
            {[...comments].reverse().map(comment => (
                <div key={comment.createdAt} className="border=b border-gray-100 mb-4 pb4">
                    <p className='mb-4'>
                        <span className='font-semibold'>{comment.name}</span>
                        {' - '}&#x1F558;{' '}{moment(comment.createdAt).format('M /D/ YYYY, h:mm A')}
<<<<<<< HEAD
>>>>>>> f26851b (add some feature in postcard and login page)
=======
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
                    </p>
                    <p className='whitespace-pre-line text-gray-600 w-full'>{parse(comment.comment)}</p>
                </div>
            ))}
          </div>
        )
      }
    </>
  )
}
