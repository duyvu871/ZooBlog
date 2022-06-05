import { stringify } from 'querystring';
import React, { useState, useEffect, useRef } from 'react';
import validator from 'validator';
import { submitComment } from '../services';
import Comments from './Comments';

export default function Comment({ slug }) {
    const [isUpdate, setUpdateState] = useState(false)

    const [isMessageSuccess, setMessageStatus] = useState(false)

    const [commentError, setCommentError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const[localStorage, setLocalStorage] = useState(null);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        const user_info =  JSON.parse(window.localStorage.getItem('user_info'))
        
        nameEl.current.value = user_info?.name || '';
        emailEl.current.value = user_info?.email || '';
    }, [])

    const checkField = (name, email, comment) => {
        let checked = true;

        if ( !comment ) {
            setCommentError(true)
            checked = false
        } else {
            setCommentError(false)
        }

        if (!email || !validator.isEmail(email)) {
            setEmailError(true)
            checked = false

        } else {
            setEmailError(false)
        }

        if (!name) {
            setNameError(true)
            checked = false

        } else {
            setNameError(false)
        }

        return checked
    }

    const handleCommentSubmission = () => {
        
        const { value: comment } = commentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { checked: storeData } = storeDataEl.current;

        if (!checkField( name, email, comment)) {
            return;
        }

        const commentObj = {
            name, email, comment, slug
        }

        if (storeData) {
            console.log('start');
            window.localStorage.setItem('user_info',JSON.stringify({
            name, email
            }))
        } else {
            window.localStorage.removeItem('user_info')
        }

        submitComment(commentObj)
                .then(res => {
                    setMessageStatus(true); 

                    setTimeout(() => {
                        setMessageStatus(false);
                        setUpdateState(true);
                    },3000);
                })
    }

  return (
    <>
        <div className='bg-white rounded-lg m-8 pb-12 mb-8 mt-8'>
        <h3 className='text-cl mb-8 font-semibold border-b pb-4'>Viết bình luận</h3>
        <div className='grid grid-cols-1 gap-4 mb-4'>
            <textarea 
                className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100'
                ref={commentEl}
                placeholder="Bình luận"
                name='comment'
            ></textarea>
            {commentError && <p className='text-xs text-red-500'>Nhập lại Comment của bạn</p>}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
            <input 
              ref={nameEl}
              type="text" 
              name="name"
              placeholder='Tên' 
              className='p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100'
            />
            {nameError && <p className='text-xs text-red-500'>Nhập lại tên của bạn</p>}
            <input 
              ref={emailEl}
              type="text" 
              name="email"
              placeholder='Email' 
              className='p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100'
            />
            {emailError && <p className='text-xs text-red-500'>Nhập lại Email của bạn</p>}
        </div>
        <div className='grid grid-cols-1 gap-4 mb-4'>
            <div className=''>
                <input 
                  type="checkbox" 
                  ref={storeDataEl}
                  id="storeData"
                  name="storeData"
                  value='true'  
                />
                <label className='text-gray-500 cursor-pointer pl-1' htmlFor='storeData'>Lưu thông tin của tôi cho lần sau</label>
            </div>
        </div>
        <div className='mt-8'>
            <button 
              type='button' 
              onClick={handleCommentSubmission}
              className='transition duration-500 ease hover:bg-indigo-600 inline-block bg-pink-600 text-lg rounded-full px-8 py-2 cursor-pointer text-white'
            >
                Đăng
            </button>
            {
              isMessageSuccess
               && 
              <span className='text-xl float-right font-semibold mt-3 text-green-500'>
                Bình luận đăng thành công
              </span>
            }
        </div>
        </div>
        <Comments slug={slug} isUpdate={isUpdate}/>
    </>
  )
}
