import { useState, useEffect } from 'react'
import { createThread, createMessage, convertTextToAudio } from '../services/apiService'
import { IoIosSend } from "react-icons/io";
import AudioPlayer from './AudioPlayer';
import ChatMessages from './ChatMessages';


const TextToSpeech = ({ handleAnimationStatus }) => {

  const [userText, setUserText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState('')
  const [audioSource, setAudioSource] =  useState(null)
  const [messages, setMessages] = useState([])
  const [messageToConvertToAudio, setMessageToConvertToAudio] = useState('')


  useEffect(() => {
    const fetchThread = async () => {
      const data = await createThread();
      setThreadId(data.thread_id)
    }
    fetchThread()
  }, []) 


  const playAudio = async (audioSource) => {
    let audio = new Audio(audioSource)
    audio.play()
  }

  const handleUserSubmitText = async (event) => {
    event.preventDefault()
    
    try {
        setIsLoading(true)
        setMessages(current => [...current, {
          sender: 'from-me', 
          content: userText
        }])
        setUserText('')
        const botMessage = await createMessage({
          "thread_id": threadId,
          "content": userText
        })
        
        console.log('gaudi ====> ', botMessage.content)
        handleAnimationStatus(1)
        // console.log('*** START of Talking...')
        

        setMessages(current => [...current,{
          sender: 'from-them', 
          content: botMessage.content
        }])
        // Convert Bot Message to Audio
        const messageToAudio = {
          "model": "tts-1",
          "voice": "onyx",
          "content": botMessage.content	
        }
        
        const audioData = await convertTextToAudio(messageToAudio)
        console.log()
        console.log('audio headers ', audioData.headers)
        const audioBase64 = formatAudioToBase64(audioData.data)
        console.log('message to convert to audio', audioBase64)
        setMessageToConvertToAudio(audioBase64)


        let audio = new Audio(audioBase64)
        audio.play()
        // //console.log('data audio', audioData.data)
        setAudioSource(audioBase64)
        playAudio(audioBase64)
        
        
        setIsLoading(true)

       
        
        
    } catch (error) {
        let message = 'Lo siento, no puedo responder a eso'
        if (error instanceof Error) message = error.message
    } finally {
        
        setIsLoading(false)
        // Stop talking
        handleAnimationStatus(1)
        // console.log('*** END of Talking...')
    }
  }

  const handleChange = (event) => {
    setUserText(event.target.value)
  }

  const formatAudioToBase64 = (audioData) => {
    const blobAudio = new Blob([audioData], { type: 'audio/mpeg'})
    const urlAudio = URL.createObjectURL(blobAudio)
    // const uint8Array = new TextEncoder().encode(urlAudio)
    const audioBase64 = btoa(String.fromCharCode.apply(null, urlAudio))
    console.log('audio 64', audioBase64)
    return audioBase64
  }

  
  return (
    <div className="relative top-0 z-50">
      {messages.length !== 0 && 
        <ChatMessages messages={messages} />
      }
      <form 
        onSubmit={handleUserSubmitText}
        action="" 
        className="fixed left-0 bottom-[0px] w-full h-1/7 bg-stone-600 space-x-2 box-message pt-0 mx-auto">
        <input 
          value={userText}
          onChange={handleChange}
          className="bg-white w-80 border rounded-full border-gray-900 p-2 outline-none m-3 text-black inline input-message" 
          type="text"
          placeholder="Ask me anything"
        />
        <button 
          disabled={isLoading}
          // onClick={() => speak(userText)}
          className="absolute bottom-3 w-15 mt-8 p-2 rounded-full bg-amber-950 disabled:cursor-not-allowed button-message text-white px-4">
          { isLoading ? '...' : <IoIosSend size={30} /> }  
        </button>
       
      </form>

      {messageToConvertToAudio && 
          <AudioPlayer messageToConvertToAudio={messageToConvertToAudio} />
      }
    </div>
  )
}

export default TextToSpeech