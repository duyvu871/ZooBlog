import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import FliedInput from '../components/Upload/FliedInput';
import Dropdown from '../components/Upload/Dropdown';
import { getCategories, getAuthors } from '../services';

const Editor = dynamic(() => import('../lib/Editor'), { ssr: false })

const Write = ({ categories, authors }) => {

  // fetch('/api/upload', {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({ image : "https://znews-photo.zingcdn.me/w860/Uploaded/ywfrd/2020_11_14/Heller_Distracted_Boyfriend_Meme_2017.jpg"})
  // })

  // fetch(`https://api-ap-south-1.graphcms.com/v2/cl0kwzyjg5hyr01xkc7ka492g/master/upload`, {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDcwNTk3MzgsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmdyYXBoY21zLmNvbS92Mi9jbDBrd3p5amc1aHlyMDF4a2M3a2E0OTJnL21hc3RlciIsImh0dHBzOi8vbWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImEzYWRiODU0LWI5NjUtNGQ1OC1hZjNiLTU2YmNkODA2YzJmZCIsImp0aSI6ImNsMG5jdWJsMzd5NmowMXhrYzkxc2F6cjUifQ.XbZ9oIlarl-ncxYeuUwkFkSJ8p7DJDmP971f3ttEI2AqnQ1XWR2Z1sSgUmmlKYHc8LInBpTLB8Iv9VEDK9EWMII7-2Vt2ziwf3DkUMNyXxPtsJtzf__TdVdLm-yOWA9aOtbCFOcL1StbA4dMPYAvWF4R0njdmAM7_8_fE6Q07cj8MksG9z_Vnj6SwcSAPtzaZuKEr0UF6M6le0CxiELZ0SoLpi9JyGb3rPs4srw0GoF5cQ-3RHKGgz2raQUYe8rPE7uRO3mbtagIlld7RW8G1i0WPKxlp_sLXaB5Ts2Qa4Mxmm9ZC_pLTugoiq0xzLMGdyUEV5KOPLhqtqYSiVygn1ivhRDQJIN8HfaO4OFbDkFQ5PtxBPKuzgMjX3S6sgYlJXR2aJkPG1bNcjXTCVUiQkHEPoYBxvmWIujPxQJrw8KtYTRgPGdNC29QiNmdnOSHuq4A7CP1opX7f46p62lituZuBY9AOeABJ8stCI0BattCoFBl-fK7XeSABTBdKRuXAGgl3AlUerbkFuqs4xPeZD6AdnuEMxj-hp1FLuhlRleJF_rrBzwKemHH5_jOMu7esJaEBIGZHeD8W4kZw7M2WHhR8MThAv1LnvquL8HqO47zo0S9u1_uVSGjYUuAhrlANkZMG1JIj684jnu6VQr0jJ6-pFXNc2sqdcNcK_oWYvQ'}`,
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: `url=${encodeURIComponent("https://znews-photo.zingcdn.me/w860/Uploaded/ywfrd/2020_11_14/Heller_Distracted_Boyfriend_Meme_2017.jpg")}`,
  // }).then(res => console.log(res));

  const [urlUpload, setUrlUpload] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [listItems, setList] = useState([]);
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  const handlebodydata = (e) => {
    setBody(e)
  }

  const uploadPost = () => {
    console.log({
        urlUpload,
        body,
        title,
        excerpt,
        slug,
        listItems,
        author
    });
  }

  return (
    <>
        <FliedInput setFliedUpload={setUrlUpload} icon={'@'} placeholder={'Image url'} />
        <FliedInput setFliedUpload={setTitle} icon={'T'} placeholder={'Title'} />
        <FliedInput setFliedUpload={setSlug} icon={'S'} placeholder={'Slug'} />
        <FliedInput setFliedUpload={setExcerpt} icon={'E'} placeholder={'Excerpt'} />

        <div className='mx-4'>
            <h1 className=' text-lg font-bold'>Categories</h1>
            <Dropdown list={categories} categoriesSelect={{listItems, setList}} />
        </div>

        <div className='mx-4'>
            <h1 className='text-lg font-bold'>Author</h1>
            <select name="author" id="" className=' border-2' onChange={({target}) => setAuthor(target.value) }>
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
