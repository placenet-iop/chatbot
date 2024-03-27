import { useState, useEffect } from 'react'
import { createThread, createMessage, convertTextToAudio } from '../services/apiService'
import { IoIosSend } from "react-icons/io";
import AudioPlayer from './AudioPlayer';
import ChatMessages from './ChatMessages';


const TextToSpeech = () => {

  const [userText, setUserText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState('')
  const [audioSource, setAudioSource] =  useState(null)
  const [messages, setMessages] = useState([])


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
      
        const botMessage = await createMessage({
          "thread_id": threadId,
          "content": userText
        })
        console.log('gaudi ====> ', botMessage.content)
        
        setMessages([ 
          ...messages,
          {
            sender: 'from-me', 
            content: userText
          },
          {
            sender: 'from-them', 
            content: botMessage.content
          }
        ])
        
        const messageToAudio = {
          "model": "tts-1",
          "voice": "onyx",
          "content": botMessage.content	
        }
        console.log(messageToAudio.content)
        const audioData = await convertTextToAudio(messageToAudio)

        let audio = new Audio("./assets/response.mp3")
        audio.play()
        console.log('data audio', audioData)
        setAudioSource(audioData)
        //await playAudio(audioSource)
        
        //speak(message)
        
        setIsLoading(true)
        
    } catch (error) {
        let message = 'Lo siento, no puedo responder a eso'
        //speak(message)
        if (error instanceof Error) message = error.message
        console.log(message)
    } finally {
        setUserText('')
        setIsLoading(false)
    }
  }

  const handleChange = (event) => {
    setUserText(event.target.value)
  }

  
  return (
    <div className="relative top-0 z-50">
      <div className="fixed left-0 w-full h-4/7 max-h-48 text-clip overflow-hidden bottom-[65px] p-4 bg-white opacity-80 mx-auto container">
        <div className="imessage">
          {messages && messages.map((message, index) => 
            <p key={index} className={message.sender}>
              {message.content}
            </p>  
          )}
        </div>
       
      </div>
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
          { isLoading ? 'Loading...' : <IoIosSend size={30} /> }  
        </button>
       
      </form>

      
    </div>
  )
}

export default TextToSpeech