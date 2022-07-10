import React from 'react'
import FormData from 'form-data';

export default function uploadFile() {
  const uploadImage = (e) => {
    
    e.preventDefault();
    const file = e.target.myFile.files[0];
    const formData = new FormData();
    formData.append('myFile', file);

    fetch('/api/upload', {
        method: "POST",
        body: formData
    })
  }

  return (
    <form 
        encType="multipart/form-data" 
        method="post"
        // action='http://localhost:4000/uploadfile'
        onSubmit={uploadImage}
    >
        <input type="file" name="myFile" id="myFile" />
        <button type="submit">Upload</button>
    </form>
  )
}
