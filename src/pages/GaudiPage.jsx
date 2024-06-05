import React, { useState, useEffect } from 'react'
import ChatBotCanvas from '../components/ChatBotCanvas'
import ChatText from '../components/ChatText'
import AudioPlayer from '../components/AudioPlayer'
import { gaudiDetails } from './../data/gaudi';
import { getAssistantsLocal, createAssistant } from '../services/apiService'


const GaudiPage = () => {
    const [isTalking, setIsTalking] = useState(false)
    const [messageToAudio, setMessageToAudio] = useState(null)
    const [assistantType, setAssistantType] = useState(null)

    useEffect(() => {
      const fetchAssistant = async () => {
        const data = await getAssistantsLocal()
        let needToCreateAssistant = true
        for(let assistant of data) {
          if(assistant.assistant_type == "gaudi"){
            needToCreateAssistant = false
            setAssistantType(assistant.assistant_type)
          }
        }
        if(needToCreateAssistant) {
          await createAssistant(gaudiDetails)
        }
      }
      fetchAssistant()
    }, []) 

    console.log('assistant type', assistantType)
    const handlePlay = () => {
        setIsTalking(true)
    }

    const handleEnded = () => {
        setIsTalking(false)
    }

    const handleAnimationStatus = () => {

    }
     
  return (
    <div>
      {/* <ChatBotCanvas isTalking={isTalking} selectedModel="gaudi"/> */}
      { assistantType && 
        <ChatText 
          handleAnimationStatus={handleAnimationStatus} 
          assistantType={assistantType} 
        />
      }
      
      {/* <AudioPlayer 
        messageTo Audio={messageToAudio}
        onPlay={handlePlay}
        onEnded={handleEnded}
      /> */}
    </div>
  )
}

export default GaudiPage
