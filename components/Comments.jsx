import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse  from 'html-react-parser';
import { getComments } from '../services';

export default function Comments({ slug , isUpdate}) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug).then(res => setComments(res))
  }, [slug, isUpdate]);

  return (
    <>
      {
        comments.length > 0 && 
        (
          <div className='bg-white border-b lg:rounded-lg m-8 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
              {comments.length + ' '}Bình luận 
            </h3>
            {[...comments].reverse().map(comment => (
                <div key={comment.createdAt} className="border=b border-gray-100 mb-4 pb4">
                    <p className='mb-4'>
                        <span className='font-semibold'>{comment.name}</span>
                        {' - '}&#x1F558;{' '}{moment(comment.createdAt).format('M /D/ YYYY, h:mm A')}
                    </p>
                    <p className='whitespace-pre-line text-gray-600 w-full'>{comment.comment}</p>
                </div>
            ))}
          </div>
        )
      }
    </>
  )
}
