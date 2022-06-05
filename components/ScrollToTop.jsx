import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top ">
      {isVisible && 
        <div onClick={scrollToTop} className='bg-pink-600 inline-block p-4 mr-2 rounded-lg'>
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000 1000" fill="white"  className="w-6">
          <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
          <g><path d="M929.3,842.9H66.5c0,0-126.3-7.3-1.1-162.6C168.1,553,330.5,338.1,435.3,200c41.6-54.8,94.3-57.4,134.8-6.2C683.7,337.4,855,584.2,953.9,706.4C1047.6,821.9,929.3,842.9,929.3,842.9L929.3,842.9z"/></g>
          </svg>
        </div>}
    </div>
  );
}