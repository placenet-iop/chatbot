import React, { useRef, useState } from 'react'
import { div } from 'three/examples/jsm/nodes/Nodes.js'

const TakePicture = () => {
    const webcamRef = useRef(null)
    const [imageSrc, setImageSrc] = useState(null)

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot()
        setImageSrc(imageSrc)
    }
  return (
    <>
      <Webcam 
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <button onClick={capture}> Capture Picture</button>
      {imageSrc && (
        <div>
            <h3>Captured Image: </h3>
            <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </>
  )
}

export default TakePicture
