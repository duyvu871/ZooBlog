import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import myLoader from '../../lib/loader'

export default function MenuUser({ user }) {
  const flexCenter = 'flex place-content-center'
  if (!user) {
    return ;
  }
  return (
    <div className="place-content-between flex flex-row mx-2  h-[50px] mb-[1rem] mr-[40px]">
      <div className={flexCenter + ' ' + ' rounded-full mr-[10px]'} >
        <Link
          href={'/account'}
          passHref
        >
          <Image
            src={user?.photo?.url || "/icons8-instagram.svg"}
            loader={myLoader}
            width="50px"
            height="50px"
            objectFit='cover'
            // layout="responsive"
            alt=""
            className="mx-auto  border-white rounded-full"
          ></Image>
        </Link>
      </div>
      <div className={flexCenter}>
        <div
          className="mx-auto flex max-w-md items-center rounded-full bg-white "
        >
          <div className="w-full h-[45px] mr-[5px]">
            <input
              type="search"
              className="w-full h-full rounded-full px-4 py-1 text-gray-800 border-gray border-2 focus:outline-none"
              placeholder="Tìm bài viết "
              x-model="search"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
