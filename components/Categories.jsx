import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { getCategories } from '../services';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
        .then( newCategories => { 
          setCategories(newCategories)
        })
  }, [])

  return (
    <div className='bg-white shadow-lg lg:rounded-lg p-8 lg:mb-8 pb-12 pt-0'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Danh Mục
      </h3>
      {categories.map(category => (
          <Link key={category.slug} href={`/category/${category.slug}`} passHref>
              <span className='cursor-pointer block pb-3 mb-3'>
                {category.name}
              </span>
          </Link>
        ))}
    </div>
  )
}
