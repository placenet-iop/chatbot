import { useState, useEffect } from 'react'
//import { createThread } from '../services/apiService'

const TextToSpeech = () => {

  const [userText, setUserText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState('')

 /*  useEffect(() => {
    const fetchThread = async () => {
      const data = await createThread();
      console.log('data', data)
      setThreadId(data)
    }
    fetchThread()
    
   
  }, []) */

  const handleUserText = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
        console.log('usertext', userText)
        console.log('threadId', threadId)
        //const message = await createMessage({ thread_id: threadId, content: userText })
        let message = "Hola"
        speak(message)
        //console.log('Aqui va el codigo de la API', message)
    } catch (error) {
        let message = 'Lo siento, no puedo responder a eso'
        speak(message)
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
        className="fixed left-0 bottom-[1px] w-full bg-stone-600 space-x-2 pt-2 box-message py-2 mx-auto">
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
          className="text-neutral-900 p-2 px-1 rounded-full bg-amber-950 disabled:cursor-not-allowed button-message text-white">
{/*             { isLoading ? 'Loading...' : 'S' } */} S
              <img src="./images/send_black.png" alt="" className="w-10 bg-white" />
        </button>
      </form>
    </div>
  )
}

export default TextToSpeech