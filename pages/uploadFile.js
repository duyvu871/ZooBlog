import React from 'react';

export default function uploadFile() {
  const uploadImage = (e) => {
    
    e.preventDefault();
    // const file = e.target.myFile.files[0];
    // const formData = new FormData();
    // formData.append('myFile', file);

    // fetch('/api/upload', {
    //     method: "POST",
    //     body: formData
    // })
    // console.log(process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN);
    // fetch(`${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}/upload`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: `url=${encodeURIComponent(
    //     'https://firebasestorage.googleapis.com/v0/b/chat-app-e5ec2.appspot.com/o/img%2F1647285872315%2Fcode-4.jpg?alt=media&token=2a9a305a-dc3e-424c-b94b-ddd2ca4877b5'
    //   )}`,
    // }).then(res => res.json()).then(res => console.log(res));
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
