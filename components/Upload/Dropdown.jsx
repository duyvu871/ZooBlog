import React, { useState } from 'react'

export default function Dropdown({ list, getList, setList }) {
  

  const removeDuplicateInList = (list) => {
    return list.filter((value, index, self) =>
        index === self.findIndex((t) => t.id === value.id )
    )
  } 
  const addItemToList = ({ target }) => {
    const { id, name, checked } = target;
    const slug = target.getAttribute('slug');

    if (checked) {
        setList(oldList => {
            const newList =  [...oldList, {id, slug, name}];
            return removeDuplicateInList(newList)
        });

        return;
    }

    setList(getList.filter(person => person.id !== id))    
    
    return;
  }


  return (
<div className="w-full md:w-1/2 flex flex-col items-center h-fit mx-auto">
    <div className="w-full">
        <div className="flex flex-col items-center relative">
            <div className="w-full  svelte-1l8159u">
                <div className="my-2 p-1 flex border border-gray-200 bg-white rounded svelte-1l8159u">
                    <div className="flex flex-auto flex-wrap">

                        {getList.map(item => (     
                            <div 
                                className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 "
                                key={item.id}    
                            >
                                <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                    {item.name}
                                </div>
                                <div className="flex flex-auto flex-row-reverse">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-[10px] h-4 ml-2">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
        
                        <div className="flex-1">
                            <input placeholder="" className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800" />
                        </div>
                    </div>
                    <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
                        <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="relative shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
                <div className="flex flex-col w-full">

                    {list.map(item => (
                        <div 
                            className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100" 
                            key={item.id}    
                        >
                            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                <div className="w-full items-center flex">
                                    <div className="mx-2 leading-6  ">{item.name}</div>
                                </div>
                            
                                <input 
                                    type="checkbox" 
                                    name={item.name} 
                                    id={item.id} 
                                    slug={item.slug}  
                                    key={item.id} 
                                    onChange={addItemToList}
                                />
                            </div>
                        </div>
                    ))}
                
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
