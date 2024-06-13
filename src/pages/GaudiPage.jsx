import React, { useState, useEffect } from 'react'
import ChatBotCanvas from '../components/ChatBotCanvas'
import ChatText from '../components/ChatText'
import AudioPlayer from '../components/AudioPlayer'
import { gaudiDetails } from './../data/gaudi';
import { getAssistantsLocal, createAssistant } from '../services/apiService'

const GaudiPage = () => {

  const [isTalking, setIsTalking] = useState(false)
  const [assistantType, setAssistantType] = useState(null)
  const [binaryAudioData, setBinaryAudioData] = useState(null) // just for temporary audio
  const [convertedAudio, setConvertedAudio] = useState(null)

  useEffect(() => {
    const fetchAssistant = async () => {
      const data = await getAssistantsLocal()
      let needToCreateAssistant = true
      for (let assistant of data) {
        if (assistant.assistant_type == "gaudi") {
          needToCreateAssistant = false
          setAssistantType(assistant.assistant_type)
        }
      }
      if (needToCreateAssistant) {
        await createAssistant(gaudiDetails)
      }
    }
    fetchAssistant()
  }, [])


  const handlePlay = () => {
    setIsTalking(true)
  }

  const handleEnded = () => {
    setIsTalking(false)
  }

  const handleAnimationStatus = () => {

  }

  const fetchBinaryAudioData = (binaryAudioData) => {
    setBinaryAudioData(binaryAudioData)
  }

  return (
    <>
      {assistantType &&
        <ChatText
          fetchBinaryAudioData={fetchBinaryAudioData}
          assistantType={assistantType}
          handlePlay={handlePlay}
          handleEnded={handleEnded}
        />
      }
      {binaryAudioData &&
        <AudioPlayer
          binaryAudioData={binaryAudioData}
          onPlay={handlePlay}
          onEnded={handleEnded}
        />}

      <ChatBotCanvas
        isTalking={isTalking}
        selectedModel={assistantType}
      />
    </>
  )
}

export default GaudiPage