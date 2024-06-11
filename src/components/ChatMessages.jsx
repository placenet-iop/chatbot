import React, { useRef, useEffect } from 'react'

const ChatMessages = ({ messages }) => {

  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView()
  }, [messages]);

  return (
    <div className="fixed left-0 w-full h-4/6 max-h-96 text-clip bottom-[65px] p-4 
          bg-white opacity-80 mx-auto container overflow-auto"
      style={{ maxHeight: "400px" }}
    >
      <div className="imessage " ref={listRef} >
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
