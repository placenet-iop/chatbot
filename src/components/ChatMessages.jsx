import React from 'react'

const ChatMessages = ({ messages }) => {
  return (
    <div className="fixed left-0 w-full h-4/7 max-h-48 text-clip overflow-hidden bottom-[65px] p-4 
          bg-white opacity-80 mx-auto container">
        <div className="imessage">
          {messages && messages.map((message, index) => 
            <p key={index} className={message.sender}>
              {message.content}
            </p>  
          )}
        </div>     
    </div>
  )
}

export default ChatMessages
