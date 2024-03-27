import React from 'react'

const ChatMessages = () => {
  return (
    <div className="fixed left-0 bottom-[230px] m-2 mx-4 w-5/6">

        <div className="relative m-2 ml-14"> 
            <div className="flex items-end gap-2">
                <div className="flex flex-col w-full max-w-[300px] leading-1.5 p-2 border-gray-200 bg-stone-600 rounded-s-xl rounded-t-xl dark:bg-gray-700">
                    <p className="text-sm font-normal py-2.5 text-stone-200 dark:text-white px-2">
                        Hola
                    </p>
                </div>
            </div>
        </div>

        <div className="m-2"> 
            <div className="flex items-end gap-2">
                <div className="flex flex-col w-full max-w-[200px] leading-1.5 p-2 border-gray-200 bg-stone-100 rounded-e-xl rounded-t-xl dark:bg-gray-700">
                    <p className="text-sm font-normal py-2.5 text-stone-800 dark:text-white ">
                        ¡Hola! ¿En qué puedo ayudarte hoy?
                    </p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ChatMessages
