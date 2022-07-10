

export default async function upload(req, res) {

  const file = req.file;

  fetch(`http://localhost:4000/uploadfile`, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryTh9KPzCqSUdedgbQ',
        'Accept': 'multipart/form-data'
      },
      body: req.file,
  }).then(res => console.log(res))
  
}