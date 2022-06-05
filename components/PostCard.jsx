
import Image from 'next/image';
import { useState } from 'react';
import { submitEmotions, getEmotions} from '../services';

const myLoader = ({ src, width, quality }) => {
    return src;
};

export default function PostCard( {post} ) {
    const [likes, setLikes] = useState(post.like);
    const [dislikes, setDislikes] = useState(post.dislike);

    

    const sendEmotions = (type) => {
        if (type === "like") {
            getEmotions({
                id: post.id,
                slug: post.slug
            }).then(res => {
                submitEmotions({
                    like: res.like + 1,
                    id: post.id,
                    slug: post.slug,
                }).then(_ => {
                    setLikes(res.likelike + 1);
                });
            });
        } else if (type === "dislike") {
            getEmotions({
                id: post.id,
                slug: post.slug
            }).then(res => {
                submitEmotions({
                    dislike: res.dislike + 1,
                    id: post.id,
                    slug: post.slug,
                }).then(_ =>  setDislikes(res.dislike + 1));
            });
        }
    };
    
  return (
    <div className="bg-white border-b rounded-lg mx-2 lg:p-8 py-4 lg:mb-8 flex flex-col">
      <div className=" flex flex-row">
            <div className="block  mb-8 w-fit">
                <div className="flex items-center justify-center lg:mb-0  lg:w-auto w-16 cursor-pointer">
                    <Image
                        loader={myLoader} 
                        alt={post.author.name}
                        height="30px"
                        width="30px"
                        className="align-middle rounded-full"
                        src={post.author.photo.url}
                    />
                    
                </div>
                <div className='flex flex-col items-center gap-2 text-[14px] font-semibold text-[#db2777]'>
                    <div className="flex items-center justify-center mt-2 lg:mb-0 lg:w-auto cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={'20px'} fill="#db2777">
                            <path d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z"/>
                        </svg>
                    </div>
                    <span>{post.author.follows}</span>
                </div>
            </div>
            <div className='flex flex-col pr-3'>
                    <p className="inline align-middle text-blue-600 text-sm">{post.author.name}</p>
                    <div className="font-medium text-gray-700">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg> */}
                        <span className='text-xs'>{moment(post.createdAt).format('M /D/ YYYY, h:mm A')}</span>
                    </div>
                    <div className="relative overflow-hidden shadow-md mb-6 hidden"> 
                        <Image
                            loader={myLoader} 
                            src={post.featuredImage.url}
                            alt={post.title}
                            layout="responsive"
                            height="500px"
                            width='1000px'
                            className="object-top absolute object-cover shadow-lg lg:rounded-lg"
                        />
                    </div>
                    <h1 className="transition duration-700  mb-1 w-fit text-left cursor-pointer
                            hover:text-pink-600 text-xl font-normal
                    ">
                        <Link href={`/post/${post.slug}`} passHref>
                            {post.title}
                        </Link>
                    </h1>   
                
                    <p className='text-xs text-gray-700 font-normal  lg:px-20 line-clamp-2 lg:line-clamp-none'>{post.excerpt}</p>
                    <div className='flex flex-row pt-1'>
                       {
                           post.categories.map(category => (
                            <div className='bg-gray-200 rounded-lg p-1 text-xs mr-2' key={category.slug}>
                               <Link href={`/category/${category.slug}`} passHref> 
                                    {category.name}
                                </Link>
                            </div>
                           ))
                       }
                    </div>
                    {/* <div className='text-center'>
                        <Link href={`/post/${post.slug}`} passHref>
                            <span className='
                                transition duration-500 transform 
                                hover:-translate-y-1 inline-block 
                                bg-pink-600 text-lg 
                                font-medium rounded-full 
                                px-8 py-3 
                                text-white cursor-pointer
                            '>
                                Continue Reading
                            </span>
                        </Link>
                    </div> */}
            </div>
      </div>
      <div className="flex flex-row place-content-between p-6 text-[14px] font-semibold">
            <div className='flex flex-row  items-center rounded-lg border-2 h-fit'>      
                    <div className='flex flex-row  items-center py-1 px-2 border-r-2 '>
                        <div className=''>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={'12px'} height={'12px'} fill="#c1c2c5">
                                <path d="M416 176C416 78.8 322.9 0 208 0S0 78.8 0 176c0 39.57 15.62 75.96 41.67 105.4c-16.39 32.76-39.23 57.32-39.59 57.68c-2.1 2.205-2.67 5.475-1.441 8.354C1.9 350.3 4.602 352 7.66 352c38.35 0 70.76-11.12 95.74-24.04C134.2 343.1 169.8 352 208 352C322.9 352 416 273.2 416 176zM599.6 443.7C624.8 413.9 640 376.6 640 336C640 238.8 554 160 448 160c-.3145 0-.6191 .041-.9336 .043C447.5 165.3 448 170.6 448 176c0 98.62-79.68 181.2-186.1 202.5C282.7 455.1 357.1 512 448 512c33.69 0 65.32-8.008 92.85-21.98C565.2 502 596.1 512 632.3 512c3.059 0 5.76-1.725 7.02-4.605c1.229-2.879 .6582-6.148-1.441-8.354C637.6 498.7 615.9 475.3 599.6 443.7z"/>
                            </svg>
                        </div>
                        <span className='ml-2 h-fit'>{post.comments.length}</span>
                    </div>
                    <div className=' py-1 px-3 border-r-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={'12px'} height={'21px'} fill="#c1c2c5">
                            <path d="M384 48V512l-192-112L0 512V48C0 21.5 21.5 0 48 0h288C362.5 0 384 21.5 384 48z"/>
                        </svg>
                    </div>
                    <div className='py-1 px-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={'12px'} height={'21px'} fill="#c1c2c5">
                            <path d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"/>
                        </svg>
                    </div>
            </div>
            <div className='flex flex-row h-fit gap-2'>
                <div 
                    className='flex flex-row rounded-lg p-1 border-2 border-[#26a69a] text-[#26a69a] cursor-pointer' 
                    value={post.like}
                    onClick={() => {sendEmotions('like')}}
                >
                    <p className='h-fit'>&#9650;</p>
                    <span className='place-content-center ml-1 h-fit'>{likes}</span>
                </div>
                <div 
                    className='flex flex-row rounded-lg p-1 border-2 border-[#ef5350] text-[#ef5350] cursor-pointer' 
                    value={post.dislike}
                    onClick={() => {sendEmotions('dislike')}}
                >
                    <p className='h-fit'>&#9660;</p>
                    <span className='place-content-center ml-1 h-fit'>{dislikes}</span>
                </div>
            </div>
      </div>
    </div>
  )
}
