import { getCsrfToken } from "next-auth/react";
import Link from 'next/link';

export default function SignIn({ csrfToken }) {
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      
	    <div
		      className=" bg-white shadow-md border border-gray-200 rounded-lg mx-8 p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
			  <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">Sign in </h3>
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
            placeholder="••••••••" 
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                      block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
					<div className="flex items-center justify-between  mb-4">
						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input 
                  id="remember" 
                  type="checkbox" 
                  className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded 
                            dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" 
                />
              </div>
								<div className="text-sm">
									<label htmlFor="remember" className="font-medium text-gray-900 dark:text-gray-300">
                    Lưu thông tin
                  </label>
								</div>
						</div>
            {"   "}
						<Link href="/auth/rest-password" className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500">
                  Quên mật khẩu ?
            </Link>
					</div>
					<button 
            type="submit" 
            className="w-full mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
                      rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-80"
          >
            Đăn nhập
          </button>
					<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
						Chưa có {' '}
            <Link href="/auth/createUser" className="text-blue-700 hover:underline dark:text-blue-500">
								Tài Khoản
            </Link>
            ?
					</div>
    	</div>
       
    </form>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}