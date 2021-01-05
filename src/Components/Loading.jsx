import React, {  useEffect,useRef } from 'react';
import lottie from 'lottie-web'
function Loading() {
     const container = useRef(null)
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
     lottie.loadAnimation({
         container:container.current,
         renderer:'svg',
         loop:true,
         autoplay:true,
         animationData: require('../Lottie JSON/home.json')
     })
    },[]);
  
    return (
      <div className="container" ref={container}>
      
      </div>
    );
  }
  export default Loading