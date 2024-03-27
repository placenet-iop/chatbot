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

  const handleUserText = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
       
        const message = await createMessage({
          "thread_id": threadId,
          "content": userText
        })
        console.log('gaudi habla', message.content)
        
        const messageToAudio = {
          "model": "tts-1",
          "voice": "onyx",
          "content": message.content	
        }
        console.log(messageToAudio.content)
        const audioData = await convertTextToAudio(messageToAudio)
        let audio = new Audio("./assets/response.mp3")
        audio.play()
        console.log(audioData)
        
        setIsLoading(true)
        setAudioSource(audioData)

        

        await playAudio(audioSource)
        
        
        //speak(message)
        
        
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

  return (
    <div className="relative top-0 z-50">
      
      <form 
        onSubmit={handleUserText}
        action="" 
        className="fixed left-0 bottom-[1px] w-full h-1/7 bg-stone-600 space-x-2 box-message pt-0   mx-auto">
        <input 
          value={userText}
          onChange={event => setUserText(event.target.value)}
          className="bg-white w-80 border rounded-full border-gray-900 p-2 outline-none m-3 text-black inline input-message" 
          type="text"
          placeholder="Ask me anything"
        />
        <button 
          disabled={isLoading}
          // onClick={() => speak(userText)}
          className="absolute bottom-3 w-15 mt-8 p-2 rounded-full bg-amber-950 disabled:cursor-not-allowed button-message text-white px-4">
{/*             { isLoading ? 'Loading...' : 'S' } */} 
<IoIosSend size={24} />
             {/*  <img src="./images/send_white.png" alt="" className="w-8" /> */}
        </button>
       
      </form>

      
    </div>
  )
}

export default TextToSpeech