import React from 'react'
import { useRouter } from 'next/router'

export default function CreateUser() {
  const  router = useRouter();

  const redirect = () => {
    router.push('/auth/credentials-signin')
  }

  const onPost = (event) => {

    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
      bio: event.target.bio.value,
      name: event.target.name.value,
    };

    const JSONData = JSON.stringify(data);

    const endpoint = '/api/createUser';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONData,
    };

    const response = fetch(endpoint, options);
    
    response.then(
      res => {
        console.log(res);
        if (res.ok === true) {
          redirect();
        } else {
          alert("đăng kí không thành công vui lòng xem lại thông tin");
        }
      })
  }  
  
  return (
    <form onSubmit={onPost}>
        <div
		      className=" bg-white shadow-md border border-gray-200 rounded-lg mx-8 p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
			  <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">Tạo tài khoản</h3>
			  <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 
                      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
            placeholder="name@company.com" 
          />
        </div>
				<div className="mb-4">
					<label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Mật khẩu</label>
					<input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="••••" 
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                      block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div className="mb-4">
					<label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Tên người dùng</label>
					<input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Jupiter Blue" 
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                      block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div className="mb-4">
					<label htmlFor="bio" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Một số thông tin bổ sung</label>
					<textarea 
            type="text" 
            name="bio" 
            id="bio" 
            placeholder="Viết gì đó về bạn ...." 
            className="h-30 resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                      block w-full  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          ></textarea>
        </div>
					<button 
            type="submit" 
            className="w-full mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
                      rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-80"
          >
           Tạo tài khoản
          </button>
    	</div>
    </form>
  )
}
