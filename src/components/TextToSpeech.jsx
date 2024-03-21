import { useState, useEffect } from 'react'
import { createThread } from '../services/apiService'

const TextToSpeech = () => {

  const [userText, setUserText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState('')

  useEffect(() => {
    const fetchThread = async () => {
      const data = await createThread();
      console.log('data', data)
      setThreadId(data)
    }
    fetchThread()
    
   
  }, [])

  const handleUserText = async (event) => {
    
    event.preventDefault()
    setIsLoading(true)
    try {
        console.log('usertext', userText)
        console.log('threadId', threadId)
        //const message = await createMessage({ thread_id: threadId, content: userText })
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
        className="absolute top-[900px] left-[300px] space-x-2 pt-2">
        <input 
          value={userText}
          onChange={event => setUserText(event.target.value)}
          className="bg-neutral-400 w-[510px] border rounded border-lime-800 p-2 outline-none m-4 text-lime-400" 
          type="text"
          placeholder="Ask me anything"
        />
        <button 
          disabled={isLoading}
          // onClick={() => speak(userText)}
          className="text-neutral-900 p-2 border rounded-xl disable:text-blue-100 border-lime-800 px-6 bg-neutral-400 disabled:cursor-not-allowed">
            { isLoading ? 'Loading...' : 'Ask' }
        </button>
      </form>
    </div>
  )
}

export default TextToSpeech