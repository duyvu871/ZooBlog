import React from 'react'
import Header from './Header'
import useModal from './Modal/useModal';
import MenuModal from './Modal/MenuModal';
import { ScrollToTop } from '.';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Layout({ children }) {
  const {isShowing, toggle} = useModal();
  const [isShowProfile, setShowProfile] = useState(false)
  
  const showProfile = () => {
    setShowProfile(true)
  }
  const hideProfile = () => {
    setShowProfile(false)
  }
  const myLoader = ({ src, width, quality }) => {
    return `/${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <>
      <Header />
      {children}
      <div className=''>
        <div className='fixed top-1 right-5 p-4 bg-pink-600 rounded-full' onClick={toggle}>
          <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000 1000" stroke='white' fill='white' className=' h-5 '>
            <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
              <g><path d="M377.5,561.3H71.3c-33.8,0-61.3,27.4-61.3,61.2v306.3c0,33.8,27.4,61.2,61.3,61.2h306.3c33.8,0,61.3-27.4,61.3-61.2V622.5C438.8,588.6,411.3,561.3,377.5,561.3z M316.3,869.4H132.5V683.8h183.8V869.4z M928.8,10H622.5c-33.9,0-61.3,27.4-61.3,61.3v306.3c0,33.8,27.4,61.3,61.3,61.3h306.3c33.9,0,61.3-27.4,61.3-61.3V71.2C990,37.4,962.6,10,928.8,10z M867.5,318.1H683.8l0-185.6h183.8L867.5,318.1z M377.5,10H71.3C37.4,10,10,37.4,10,71.2v306.3c0,33.8,27.4,61.3,61.3,61.3h306.3c33.8,0,61.3-27.4,61.3-61.3V71.2C438.8,37.4,411.3,10,377.5,10z M316.3,318.1H132.5V132.5h183.8V318.1z M928.8,561.3H622.5c-33.9,0-61.3,27.4-61.3,61.2v306.3c0,33.8,27.4,61.2,61.3,61.2h306.3c33.9,0,61.3-27.4,61.3-61.2V622.5C990,588.6,962.6,561.3,928.8,561.3z M867.5,869.4H683.8V683.8h183.8V869.4z"/></g>
          </svg>
        </div>
        <MenuModal isShowing={isShowing} hide={toggle}>                        
        </MenuModal>
      </div>
      <div className='fixed flex right-0 top-[15vh] bg-[#666] py-4 px-2 z-800 rounded-l-lg' 
           onClick={showProfile}
      >
        <Image
          src='arrow-left.svg'
          loader={myLoader}
          alt='Arrow left'
          width='20px'
          height='20px'
          className='bg-black-600'
        >
        </Image>
      </div>
         
      <div 
        className='fixed flex right-0 top-[15vh] bg-[#666] py-4 px-2 flex-col gap-3 z-1000 rounded-l-lg transition-all ease-in-out duration-500' 
        style={{right:isShowProfile ? '0px' : '-46px'}}
      >
        <Link href='https://www.facebook.com/profile.php?id=100017123670001' passHref >
          <a target='_blank'>
              <Image 
                src='icons8-facebook.svg'
                loader={myLoader}
                alt='Facebook'
                width='30px'
                height='30px'
              ></Image>
          </a>
        </Link>
        <Link href='https://www.instagram.com/buidu98/' passHref >
          <a target='_blank'>
          <Image 
                loader={myLoader}
                src='icons8-instagram.svg'
                alt='instagram'
                width='30px'
                height='30px'
                //className='bg-pink-600'
              ></Image>
          </a>
        </Link>
        <Link href='https://github.com/duyvu871' passHref >
          <a target='_blank'>
          <Image          
                loader={myLoader}
                src='icons8-octocat-48.png'
                alt='github'
                width='30px'
                height='30px'
                className='bg-black-600 '
              ></Image>
          </a>
        </Link>
        <div onClick={hideProfile} className='w-fit flex'>
          <Image
              loader={myLoader}
             src='arrow-right.svg'
             alt='hide'
             width='30px'
             height='30px'
             className='bg-black-600'
          ></Image>
        </div>
      </div>
      <ScrollToTop style={{width:'40px'}} />
    </>
  )
}
