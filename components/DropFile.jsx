import React, {useState} from 'react'
import { useMutation, gql } from '@apollo/client';

const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      url
    }
  }
`
export default function DropFile() {
  const [file, setFile] = useState(null)
  const [upload] =  useMutation(UPLOAD_FILE, {
    onCompleted: data => console.log(data)
  });

  const handleFileUpload = () => {
    if(!file) return;
    upload({ variables:  { file } });
  }
  
  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  )
}