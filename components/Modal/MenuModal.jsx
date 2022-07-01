import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  padding:10px;
  opacity: .5;

`
const MainModal = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  border-radius:10px;
  z-index:1050;
  
`
const Modal = ({ isShowing, hide, isUser, categories }) => {

  const onSignOut = () => {
    if (window.confirm('Bạn có chắc muốn đăng xuất không ?')) {
      signOut();
      return;
    } 
    return;
  }
  
  return isShowing ? ReactDOM.createPortal(
      <React.Fragment>
      <div>
        <Overlay onClick={hide}>
          
        </Overlay>
        <MainModal className='w-full px-8 mt-4'>
          
          <div className='bg-white shadow-lg rounded-lg p-8 lg:mb-8 mt-4 pb-12'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
              Categories
            </h3>
            {categories.map(category => (
                <Link key={category.slug} href={`/category/${category.slug}`} passHref>
                    <span className='cursor-pointer block pb-3 mb-3'>
                      {category.name}
                    </span>
                </Link>
              ))}
             
              <div onClick={isUser ? onSignOut : signIn} className="">
                {isUser ? 
                  <div className='flex flex-row '>
                    <span className='mr-2 flex place-content-center w-[20px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z"/></svg>
                    </span>
                    Đăng xuất
                  </div> : 
                  <div className='flex flex-row '>
                     <span className='mr-2 flex place-content-center w-[20px]'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M344.7 238.5l-144.1-136C193.7 95.97 183.4 94.17 174.6 97.95C165.8 101.8 160.1 110.4 160.1 120V192H32.02C14.33 192 0 206.3 0 224v64c0 17.68 14.33 32 32.02 32h128.1v72c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C354.3 264.4 354.3 247.6 344.7 238.5zM416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32z"/></svg>
                     </span>
                     Đăng nhập
                  </div>
                  }
              </div>
              
          </div>
    
          </MainModal>
      </div>
      </React.Fragment>, document.body
    ) : null;
}

export default Modal