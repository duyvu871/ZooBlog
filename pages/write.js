import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import FliedInput from '../components/Upload/FliedInput';
import Dropdown from '../components/Upload/Dropdown';
import { getCategories, getAuthors } from '../services';

const Editor = dynamic(() => import('../lib/Editor'), { ssr: false })

const Write = ({ categories, authors }) => {
 
  const [urlUpload, setUrlUpload] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  const handlebodydata = (e) => {
    setBody(e)
  }

  const validate = {
    url(url) {
        const isUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        const success = isUrl.test(url)
        if (!success) alert('URL không họp lệ nhập lại dùng cái')

        return {
            success,
            message: success ? url : false
        }
    },
    input(text, field) {
        const success = Boolean(text);
        if (!success) alert(`${field} không họp lệ nhập lại dùng cái`)

        return {
            success,
            message: success ? text : false
        }
    },
    slugConvert(text) {
        const success = Boolean(text);
        if (!success) alert('Slug không họp lệ nhập lại dùng cái')

        return {
            success,
            message: success ? text.trim().split(' ').join('-') : false
        }
    },
    author(id) {
        const success = Boolean(id);
        if (!success) alert('Author không họp lệ nhập lại dùng cái')

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
        fetch('/api/create-post', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res?.createPost?.id) {
                alert('Dăng bài thành công')
            } else {
                alert('không thành công, hãy thử lại sau')
            }
        })
        console.log(data);
    }
  }

  return (
    <>
        <FliedInput 
            setFieldUpload={setUrlUpload} 
            icon={'@'} 
            placeholder={'Image url'} 
            validate={validate.url}
        />
        <FliedInput 
            setFieldUpload={setTitle} 
            icon={'T'} 
            placeholder={'Title'} 
            validate={validate.input}
        />
        <FliedInput 
            setFieldUpload={setSlug} 
            icon={'S'} 
            placeholder={'Slug'}
            validate={validate.slugConvert} 
        />
        <FliedInput 
            setFieldUpload={setExcerpt} 
            icon={'E'} 
            placeholder={'Excerpt'}
            validate={validate.input} 
        />

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

        <div className='mx-4 my-8 h-fit' id='editor-parent'>
            <h1 className='text-lg font-bold'>Content</h1>
            <Editor 
                handlechange={handlebodydata} 
                value={body} 
                placeholder={'Viết nội dung vào đây....'} 
                style={{height: '200px'}}
            />
        </div>
        <div className='mx-4'>
            <button 
                onClick={uploadPost}
                className="
                py-2 px-4 bg-transparent font-semibold border border-red-600 rounded 
                bg-red-600 text-white  border-transparent
                "
            >Upload</button>
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
