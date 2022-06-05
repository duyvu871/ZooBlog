import React from 'react'
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return src
}

export default function Author({ author }) {
  
  return (
    <div className='px-10'> 
        <Image 
          loader={myLoader}
          src={author.background.url} 
          alt=""
          width='1000px'
          height='350px'
          objectFit='cover'
          layout="responsive"
          className='object-cover rounded-t-lg'
        />
        <div className='text-center h-48 relative rounded-b-lg bg-black bg-opacity-30'>
          <div className='absolute left-6 right-2 -top-9 flex align-center'>
            <Image
                loader={myLoader} 
                src={author.photo.url} 
                alt={author.name}
                height="70px"
                width='70px'
                className='align-middle rounded-full' 
            />
            <h3 className='text-white text-xl font-bold h-fit mx-3 translate-y-3/4'>{author.name}</h3>
          </div>
          <div className='absolute left-0 w-full p-8 mt-2 flex flex-col items-start'>
            <div className='float-left text-white text-left'>
              <b>{'Liên hệ  '}</b>
              <div className='text-xs pl-4'>
                <p className='text-white '>
                  <b><em>Email: </em></b> 
                  {author.email}
                </p>
                <p className='text-white '>
                  <b><em>Hotline: </em></b> 
                  {'0869794205'}
                </p>
              </div>
            </div>
            <div className='float-left text-white text-left'>
              <b>{'Mô tả  '}</b>
              <div className='text-xs pl-4'>
                <p className='text-white '>{author.bio}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
