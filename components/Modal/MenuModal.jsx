import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Link from 'next/link';
import { getCategories } from '../../services';

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
const Modal = ({ isShowing, hide }) => {
    
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
        .then( newCategories => { 
          setCategories(newCategories)
        })
  }, [])

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
          </div>
    
          </MainModal>
      </div>
      </React.Fragment>, document.body
    ) : null;
}

export default Modal