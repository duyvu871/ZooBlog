import React, { useState, useRef } from 'react'
import dynamic from 'next/dynamic';
import FliedInput from '../components/Upload/FliedInput';
import Dropdown from '../components/Upload/Dropdown';
import { getCategories, getAuthors } from '../services';
import { Loader } from '../components';
import Image from 'next/image';

const Editor = dynamic(() => import('../lib/Editor'), { ssr: false })
const Field = ({field , cancelBtn, saveBtn}) => {
    return (
    <div className="p-2 bg-white border shadow rounded w-ful mx-[auto] my-[15px] ">
            <div className="flex justify-between items-center text-[10px]">
                <input 
                    type="search" 
                    className="w-full bg-gray-100 rounded p-1 mr-2 border focus:outline-none focus:border-blue-500" 
                    placeholder={field.title}
                    ref={field.element}
                />

                <div className="flex justify-center items-center space-x-2">
                    <button 
                        type="button"  
                        className="btn bg-gray-200 hover:bg-gray-300 px-2 py-2 font-medium rounded w-[50px]"
                        ref={cancelBtn}
                    >
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        className="btn bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 font-medium rounded w-[50px]"
                        ref={saveBtn}
                    >
                        Save
                    </button>
                </div>
            </div>
	</div>
    )
}

const SelectAuthor = ({ authors, setAuthor }) => {
    return (
        <select name="author" id="" className=' border-2' onChange={({target}) => setAuthor(target.value || authors[0].id) }>
            <option value="" >Chọn tác giả</option>
            {authors.map(author => (
            <option value={author.id} key={author.id}>{author.name}</option>
            ))}
        </select>
    )
}

const Write = ({ categories, authors }) => {
  const [isDisable, setDisableStatus] = useState(false);

  const [imagePreview, setImagePreview] = useState('');
  const [isPreview, setPreview] = useState(false);

  const saveBtn = useRef('');
  const cancelBtn = useRef('');
  const fieldEl = useRef('');
  const [fieldShow, setFieldShow] = useState(false);
  const [fieldTitle, setFieldTitle] = useState('');

  const [urlUpload, setUrlUpload] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  const handleBodyData = (e) => {
    setBody(e)
  }

  const validate = {
    url(url) {
        const isUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        const success = isUrl.test(url)
        setPreview(false);

        if (success) {
            const isImage =  /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(new URL(url).pathname);
            if (isImage) {
                setImagePreview(url)
                setPreview(true)
            }
        }

        return {
            success,
            message: success ? url : false
        }
    },
    input(text, field) {
        const success = Boolean(text);

        return {
            success,
            message: success ? text : false
        }
    },
    slugConvert(text) {
        const success = Boolean(text);
       
        return {
            success,
            message: success ? text.trim().toLowerCase().split(' ').join('-') : false
        }
    },
    author(id) {
        const success = Boolean(id);

        return {
            success,
            message: success ? id : false
        }
    }
  }

  const uploadPost = () => {
    let isPublish = true;
    const data = {
        featuredImageUrl: urlUpload.message,
        content: body,
        title: title.message,
        excerpt: excerpt.message,
        slug: slug.message,
        categories: categoriesList,
        authorID: author,
    }

    for (const key in data) {
        if (!data[key])  {
            alert(`${key} không họp lệ`)
            isPublish = false
        }
    }

    if (isPublish) {
        setDisableStatus(true);
        fetch('/api/create-post', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                alert('Đăng bài thành công')
            } else {
                alert('không thành công, hãy thử lại sau')
            }

            setDisableStatus(false)
        })
        // console.log(data);
    }
  }

  const fieldInput = [
    ['url-upload', '@', 'Url ảnh nền', validate.url, setUrlUpload, ],
    ['title-upload', 'T', 'Title', validate.input, setTitle],
    ['slug-upload', 'S','Slug (Viết ngắn gọn với không dấu nhé)', validate.slugConvert, setSlug],
    ['excerpt-upload', 'E', 'Trích đoạn', validate.input, setExcerpt]
  ]

  return (
    <div className='flex flex-col'>
        {isPreview 
            && 
        <div className='relative bg-gray-200 rounded-lg p-2 mx-2'>
            <Image 
                src={imagePreview}
                unoptimized
                objectFit='contain'
                layout='responsive'
                width={1000}
                height={700}
            />            
        </div>}
        {fieldInput.map(item => (
            <FliedInput 
                key={item[0]}
                icon={item[1]} 
                placeholder={item[2]} 
                validate={item[3]}
                setFieldUpload={item[4]} 
           />
        ))}
        <div className='mx-4 my-4'>
            <h1 className=' text-lg font-bold'>Categories</h1>
            <Dropdown list={categories} getList={categoriesList} setList={setCategoriesList} />
        </div>
        <div className='mx-4 my-4'>
            <h1 className='text-lg font-bold'>Author</h1>
            <SelectAuthor authors={authors} setAuthor={setAuthor} />
        </div>
        <div className=' my-8 h-fit' id='editor-parent'>
            <h1 className='text-lg font-bold mx-4'>Content</h1>
            <div className='mx-[15px]'>
                {fieldShow 
                    && 
                <Field  
                    field={{
                        title: fieldTitle,
                        element: fieldEl
                    }} 
                    saveBtn={saveBtn}
                    cancelBtn={cancelBtn} 
                />}   
            </div>
            <Editor 
                handlechange={handleBodyData} 
                value={body} 
                placeholder={'Viết nội dung vào đây....'}
                field={{
                    title: {setFieldTitle},
                    setFieldShow,
                    fieldEl,
                    inputBtn: {
                        cancelBtn,
                        saveBtn
                    }
                }}
                style={{height: '200px'}}
            />
        </div>
        <div className='mx-4 flex flex-row gap-[15px]'>
            <button 
                onClick={uploadPost}
                disabled={isDisable}
                className="
                py-2 px-4 bg-transparent font-semibold border border-red-600 rounded 
                bg-red-600 text-white  border-transparent
                "
            >Upload</button>
            {isDisable && <Loader />}
        </div>
    </div>
  )
}

export default Write;

export async function getServerSideProps() {
    const categories = (await getCategories()) || [];
    const authors = (await getAuthors()) || [];
    return {
        props : {
            categories,
            authors
        }
    }
}
