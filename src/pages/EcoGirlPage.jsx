import React, { useState, useEffect } from 'react'
import ChatBotCanvas from '../components/ChatBotCanvas'
import ChatText from '../components/ChatText'
import AudioPlayer from '../components/AudioPlayer'
import { ecogirlDetails } from './../data/ecogirl';
import { getAssistantsLocal, createAssistant } from '../services/apiService'

const EcoGirlPage = () => {
  const [isTalking, setIsTalking] = useState(false)
  const [assistantType, setAssistantType] = useState(null)
  const [binaryAudioData, setBinaryAudioData] = useState(null )

  useEffect(() => {
    const fetchAssistant = async () => {
      const data = await getAssistantsLocal()
      let needToCreateAssistant = true
      for(let assistant of data) {
        if(assistant.assistant_type == "ecogirl"){
          needToCreateAssistant = false
          setAssistantType(assistant.assistant_type)
        }
      }
      if(needToCreateAssistant) {
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
  return (
    <>
     
      { assistantType && 
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
