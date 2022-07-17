import React, {useState} from 'react'

const InfoAlert = ({message}) => {
    const [isHidden, setHidden] = useState(false);

    if (isHidden) return '';
    return (
        <div className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" role="alert" onClick={() => setHidden(true)}>
            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <div>
                <span className="font-medium">Info!</span> {message}
            </div>
        </div>
    )
}

const DangerAlert = ({message}) => {
    const [isHidden, setHidden] = useState(false);

    if (isHidden) return '';
    return (
        <div className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert" onClick={() => setHidden(true)}>
            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <div>
                <span className="font-medium">Danger!</span> {message}
            </div>
        </div>
    )
}

const SuccessAlert = ({message}) => {
    const [isHidden, setHidden] = useState(false);

    if (isHidden) return '';
    return (
        <div className="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert" onClick={() => setHidden(true)}>
            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <div>
                <span className="font-medium">Success!</span> {message}
            </div>
        </div>
    )
}

const WarningAlert = ({message}) => {
    const [isHidden, setHidden] = useState(false);

    if (isHidden) return '';
    return (
        <div className="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700" role="alert" onClick={() => setHidden(true)}>
            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <div>
                <span className="font-medium">Warning!</span> {message}
            </div>
        </div>
    )
}

export default function Alert({type, message}) {
  if (type === "info") {
    return <InfoAlert message={message}/>
  } else if (type === "warning") {
    return <WarningAlert message={message} />
  } else if (type === "danger") {
    return <DangerAlert  message={message} />
  } else if (type === "success") {
    return <SuccessAlert message={message} />
  } else {
    return <></>;
  }
  
}
