import React, { useState, useRef } from 'react';
import Alert from '../components/Alert'

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
                        onClick={cancelBtn}
                    >Xóa</button>
                    <button 
                        type="button" 
                        className="btn bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 font-medium rounded w-[50px]"
                        onClick={saveBtn}
                    >Save</button>
                </div>
            </div>
	</div>
    )
}

const DownloadWidget = ({url}) => {
    return (
        <div className="preview h-[800px]">
            <iframe 
                id="widgetv2Api" 
                src={`https://convert2mp3s.com/api/widgetv2?url=${url}`} 
                width="100%" 
                height="100%" 
                allowtransparency="true" 
                scrolling="yes" 
                style={{border: 'none'}}
            >
            </iframe>
        </div>
    )
}

const Notification = {
    'success': <Alert type={'success'} message={'URL của bạn đã hợp lệ vui lòng chờ vài giây'} />,
    'error': <Alert type={'danger'} message={'URL của bạn không hợp lệ vui lòng nhập lại'} />
}

export default function DownloadYoutubeAudio() {
  const [notifiStatus, setNotifiStatus] = useState('');
  const [isShow, show] = useState(false)
  const [isPreview, setPreview] = useState(false);
  const [url, setUrl] = useState('');
  const inputEl = useRef('');

  const handleDownloadScript = () => {
    const url = inputEl.current.value;
    const isYoutubeLink = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/mg;
    if (isYoutubeLink.test(url)) {
        // const id = new URL(url).pathname.replace('/', '')
        setUrl(url);
        setNotifiStatus('success');
        show(true);
        setPreview(true);
    } else {
        setNotifiStatus('error');
        show(true)
        setPreview(false)
    }

  } 

  return (
    <div className='mx-4'>
        <div>
            {isShow && Notification[notifiStatus] } 
        </div>
        <div>
            <Field 
                saveBtn={handleDownloadScript} 
                cancelBtn={() => {inputEl.current.value = ''}} 
                field={{
                    title: 'Nhập url vào đây',
                    element: inputEl
                }}
            />
        </div>
        {isPreview && <DownloadWidget url={url} />}
    </div>
  )
}
