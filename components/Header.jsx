import React, {useState, useEffect, useContext} from 'react'
import Link from 'next/link';
import { getCategories } from '../services';


export default function Header() {
    

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then( newCategories => { 
            setCategories(newCategories)
            })
    }, [])

    return (
        <div className="container mx-auto px-2 mb-8 ">
            <div className="border-b w-full inline-block border-blue-400 py-4">
                <div className="md:float-left block">
                    <Link href="/" passHref >
                        <span className="cursor-pointer font-bold text-2xl ">
                            <span className='text-pink-600'>Hentai</span><span className='text-yellow-500'>With</span><span className='text-blue-600'>Me</span>
                        </span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map(category => (
                        <Link href={`/category/${category.slug}`} key={category.slug} passHref >
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer"> 
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
