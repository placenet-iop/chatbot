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
                style={{ padding: '10px 10px', fontSize: '16px', cursor: 'pointer', color: "#fff" }}
                onClick={capture}
            >
                Capture Photo
            </button>
        </>
    )
}

export default WebcamCapture
