import { useState, useEffect } from 'react'
import { createThread, createMessage, convertTextToAudio, getAssistantsLocal } from '../services/apiService'
import { IoIosSend } from "react-icons/io";
import AudioPlayer from './AudioPlayer';
import ChatMessages from './ChatMessages';


const ChatText = ({ fetchBinaryAudioData, assistantType }) => {
  const [userText, setUserText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState('')
  const [messages, setMessages] = useState([])
  const [messageToConvertToAudio, setMessageToConvertToAudio] = useState('')
  const [binaryAudioData, setBinaryAudioData] = useState(null)


  useEffect(() => {
    const fetchThread = async () => {
      let dataThread = {
        assistant_type: assistantType
      }
      const data = await createThread(dataThread);
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

      console.log('gaudi ====> ', botMessage.content)
      //handleAnimationStatus(1)

      setMessages(current => [...current, {
        sender: 'from-them',
        content: botMessage.content
      }])
      // Convert Bot Message to Audio
      let characterVoice = "onyx"
      if (assistantType == "ecogirl") {
        characterVoice = "nova"
      }
      const messageToAudio = {
        "model": "tts-1",
        "voice": characterVoice,
        "content": botMessage.content
      }



      // get the audio from api
      const audioData = await convertTextToAudio(messageToAudio)

      let audio = new Audio(audioData)
      audio.play()

      let binaryData = audioData.data
      setBinaryAudioData(binaryData)
      fetchBinaryAudioData(binaryData)
      setIsLoading(true)



    } catch (error) {
      let message = 'Lo siento, no puedo responder a eso'
      if (error instanceof Error) message = error.message
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (event) => {
    setUserText(event.target.value)
  }

  const formatAudioToBase64 = (audioData) => {
    const blobAudio = new Blob([audioData], { type: 'audio/mpeg' })
    const urlAudio = URL.createObjectURL(blobAudio)
    const audioBase64 = btoa(String.fromCharCode.apply(null, urlAudio))
    console.log('audio 64', audioBase64)
    return audioBase64
  }

  const playAudio = async (audioSource) => {
    let audio = new Audio(audioSource)
    // audio.play()
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
          {isLoading ? '...' : <IoIosSend size={30} />}
        </button>

      </form>

      {/* {binaryAudioData && 
           <AudioPlayer
           fetchBinaryAudioData={} 
           binaryAudioData={binaryAudioData} 
          //  onPlay={handlePlay}
          //  onEnded={handleEnded}
          //  onPause={handlePause}
         />
      } */}
    </div>
  )
}

export default ChatText