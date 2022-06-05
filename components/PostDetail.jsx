import React from 'react'
import moment from 'moment';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCalendar } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

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
export default function PostDetail({ post }) {

    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
    
        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }

        switch (type) {
            case 'heading-three':
              return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
            case 'paragraph':
              return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
            case 'heading-four':
              return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
            case 'image':
              return (
                <Image
<<<<<<< HEAD
<<<<<<< HEAD
=======
                  loader={myLoader}
>>>>>>> f26851b (add some feature in postcard and login page)
=======
                  loader={myLoader}
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
                  key={index}
                  alt={obj.title}
                  height={obj.height}
                  width={obj.width}
                  src={obj.src}
                />
              );
            default:
              return modifiedText;
          }
    };

  return (
    <div className='bg-white  lg:rounded-lg lg:p-8 pb-12 mb-8 border-b-8'>
        <div className='relative overflow-hidden shadow-md mb-6 border-t-4 border-black-600'>
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
                objectFit="cover"
                layout='responsive'
                height={1000}
                width={1000}
                className='object-top lg:rounded-t-lg ' 
            />
        </div>
        <div className='px-4 lg:px-0'>
            <div className='flex items-center mb-8 w-full justify-around flex-row'>
            <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 cursor-pointer">
<<<<<<< HEAD
<<<<<<< HEAD
                <Image 
=======
                <Image
                    loader={myLoader} 
>>>>>>> f26851b (add some feature in postcard and login page)
=======
                <Image
                    loader={myLoader} 
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
                    alt={post.author.name}
                    height="30px"
                    width="30px"
                    className="align-middle rounded-full"
                    src={post.author.photo.url}
                />
                <p className="inline align-middle text-gray ml-2 text-lg">{post.author.name}</p>
                </div>
                <div className="font-medium text-gray-700 w-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg> 
                    <span className='ml-2'>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                </div>
            </div>
            <h1 className='mb-8 text-3xl font-semibold '>
                {post.title}
            </h1>
            {/* {post.content.raw.children.map((typeObj, index) => {
                const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))

                return getContentFragment(index, children, typeObj, typeObj.type)
            })} */}
            <div className='post-render ' dangerouslySetInnerHTML={{__html: post.content.html}}>

            </div>
        </div>
    </div>
  )
}
