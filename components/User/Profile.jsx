import React from 'react';
import Image from 'next/image';
import myLoader from '../../lib/loader';

export default function Profile({ user }) {
  return (
    <div className=" h-fit w-full flex flex-row justify-center items-center">
      <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow pt-4">
         <div className='flex place-content-center'>
             <Image 
                className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" 
                src={user?.photo?.url || "/icons8-instagram.svg"} 
                loader={myLoader}
                width="120px"
                height="120px"
                // objectFit='cover'
                // layout="responsive"
                alt="" 
            />
         </div>
         <div className="text-center mt-2 text-3xl font-medium">{user.name}</div>
         <div className="text-center mt-2 font-light text-sm">@devpenzil</div>
         <div className="text-center font-normal text-lg">Kerala</div>
         <div className="px-6 text-center mt-2 font-light text-sm border-b-gray border-">
           <p>
             {user.bio}
           </p>
         </div>
         {/* <hr className="mt-8"> */}
         <div className="flex p-4">
           <div className="w-1/2 text-center">
             <span className="font-bold">1.8 k</span> Followers
           </div>
           <div className="w-0 border border-gray-300">
             
           </div>
           <div className="w-1/2 text-center">
             <span className="font-bold">2.0 k</span> Following
           </div>
         </div>
      </div>
    </div>
  )
}
