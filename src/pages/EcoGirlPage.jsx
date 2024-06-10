import React, { useState, useEffect } from 'react'
import ChatBotCanvas from '../components/ChatBotCanvas'
import ChatText from '../components/ChatText'
import AudioPlayer from '../components/AudioPlayer'
import WebcamCapture from '../components/WebcamCapture';
import { ecogirlDetails } from './../data/ecogirl';
import { getAssistantsLocal, createAssistant } from '../services/apiService'

const EcoGirlPage = () => {
  const [isTalking, setIsTalking] = useState(false)
  const [assistantType, setAssistantType] = useState(null)
  const [binaryAudioData, setBinaryAudioData] = useState(null)
  const [capturedImage, setCapturedImage] = useState(null);


  useEffect(() => {
    const fetchAssistant = async () => {
      const data = await getAssistantsLocal()
      let needToCreateAssistant = true
      for (let assistant of data) {
        if (assistant.assistant_type == "ecogirl") {
          needToCreateAssistant = false
          setAssistantType(assistant.assistant_type)
        }
      }
      if (needToCreateAssistant) {
        await createAssistant(ecogirlDetails)
      }
    }
    fetchAssistant()
  }, [])

  const handlePlay = () => {
    setAnimate(true)
  }

  const handleEnded = () => {
    setAnimate(false)
  }

  const fetchBinaryAudioData = (binaryAudioData) => {
    setBinaryAudioData(binaryAudioData)

  }

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
    console.log('Captured image in Base64:', imageSrc);
  };
  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '10px', display: 'relative', zIndex: 200 }}>
        <WebcamCapture onCapture={handleCapture} />
        {/* {capturedImage && (
          <div>
            <h3>Captured Image:</h3>
            <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%', marginTop: '10px' }} />
          </div>
        )} */}
      </div>
      {assistantType &&
        <ChatText
          fetchBinaryAudioData={fetchBinaryAudioData}
          assistantType={assistantType}
        />
      }

      {/* <AudioPlayer 
        binaryAudioData={binaryAudioData}
        onPlay={handlePlay}
        onEnded={handleEnded}
      /> */}
      <ChatBotCanvas
        isTalking={isTalking}
        selectedModel={assistantType}
      />

    </>
  )
}

export default EcoGirlPage
