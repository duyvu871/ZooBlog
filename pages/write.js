import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import FliedInput from '../components/Upload/FliedInput';
import Dropdown from '../components/Upload/Dropdown';
import { getCategories, getAuthors } from '../services';
import { Loader } from '../components';

const Editor = dynamic(() => import('../lib/Editor'), { ssr: false })

const Write = ({ categories, authors }) => {
  const [isDisable, setDisableStatus] = useState(false);

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
        authorID: author.message,
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
    <>
        {fieldInput.map(item => (
            <FliedInput 
                key={item[0]}
                icon={item[1]} 
                placeholder={item[2]} 
                validate={item[3]}
                setFieldUpload={item[4]} 
           />
        ))}

        <div className='mx-4'>
            <h1 className=' text-lg font-bold'>Categories</h1>
            <Dropdown list={categories} getList={categoriesList} setList={setCategoriesList} />
        </div>

        <div className='mx-4'>
            <h1 className='text-lg font-bold'>Author</h1>
            <select name="author" id="" className=' border-2' onChange={({target}) => setAuthor(validate.author(target.value || authors[0].id)) }>
            <option value="" disabled hidden>Chọn tác giả</option>
                {authors.map(author => (
                  <option value={author.id} key={author.id}>{author.name}</option>
                ))}
            </select>
        </div>

        <div className=' my-8 h-fit' id='editor-parent'>
            <h1 className='text-lg font-bold mx-4'>Content</h1>
            <Editor 
                handlechange={handleBodyData} 
                value={body} 
                placeholder={'Viết nội dung vào đây....'} 
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
    </>
  )
}

export default Write


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
