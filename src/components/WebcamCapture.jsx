import React, { useRef, useCallback } from 'react'
import Webcam from 'react-webcam'

const WebcamCapture = ({ onCapture }) => {
    const webcamRef = useRef(null)

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot()
        onCapture(imageSrc)
    }, [webcamRef, onCapture])

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={640}
                height={480}
                style={{ visibility: 'hidden', position: 'absolute' }}  
            />
            <button
                style={{ padding: '5px 10px', fontSize: '16px', cursor: 'pointer', color: "#fff" }}
                onClick={capture}
            >
                Capture Picture
            </button>
        </>
    )
}

export default WebcamCapture
