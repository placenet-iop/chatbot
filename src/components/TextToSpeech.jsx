import { useState, useEffect, useRef } from 'react'
import { createThread, createMessage, convertTextToAudio } from '../services/apiService'
import { IoIosSend } from "react-icons/io";
import ChatMessages from './ChatMessages';


const TextToSpeech = ({ handleAnimationStatus }) => {
  const [userText, setUserText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState('')
  const [messages, setMessages] = useState([])



  useEffect(() => {
    const fetchThread = async () => {
      const data = await createThread();
      setThreadId(data.thread_id)
    }
    fetchThread()
  }, []) 


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
        
        // get the audio from api
        const audioData = await convertTextToAudio(messageToAudio)
        
        let binaryData = audioData.data
        setBinaryAudioData(binaryData)
        setIsLoading(true)

      
    } catch (error) {
        let message = 'Lo siento, no puedo responder a eso'
        console.log(message, error)
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
          className="absolute bottom-3 w-15 mt-8 p-2 rounded-full bg-amber-950 disabled:cursor-not-allowed button-message text-white px-4">
          { isLoading ? '...' : <IoIosSend size={30} /> }  
        </button>
      </form>
    </div>
  )
}

export default TextToSpeech