"use client"

import { useEffect, useState } from "react";

interface chatHistoryComponentProps {
  gymPhoneNumber: string;
  userPhoneNumber: string;
}

export default function ChatHistoryComponent({gymPhoneNumber, userPhoneNumber}: chatHistoryComponentProps) {
  const [chatHistory, setChatHistory] = useState("");
  let chatHistorySections: string[][] = []
  useEffect(() => {
    if(gymPhoneNumber !== undefined && userPhoneNumber !== undefined ){
      fetch(`http://localhost:3000/gym/${gymPhoneNumber}/chats/${userPhoneNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setChatHistory(data)
      })
    }

  }, [gymPhoneNumber, userPhoneNumber])

  const formatSection = function(chatHistory: string){
    const historyArray = chatHistory.split("\n")
      const chunkSize = 2;
      for (let i = 0; i < historyArray.length; i += chunkSize) {
          let chunk = historyArray.slice(i, i + chunkSize);
          chunk = [chunk[0].split(/^Q: |^A: /)[1], chunk[1].split(/^Q: |^A: /)[1]]
          chatHistorySections.push(chunk)
      }
  
  }

  if(chatHistory.length > 1 && chatHistory !== ""){
    formatSection(chatHistory)
  }


  return (  
  <div id="chatbox" className="p-4 h-80 overflow-y-auto border border-black rounded-lg">
    {chatHistorySections.map((section, idx) => (
      <span key={"chat" + idx}>
        <div className="mb-2 text-right">
          <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">{section[0]}</p>
        </div>
        <div className="float-right">
            <img className="w-8 h-8 rounded-full" src="/user.avif" alt="chatbot avatar"></img>
            <span className="block text-gray-500">User</span>
        </div>
        <div className="mb-2">
          <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">{section[1]}</p>
          <img className="w-8 h-8 rounded-full" src="/chatbot.avif" alt="chatbot avatar"></img>
          <span className="inline-block text-gray-500">PunchLine</span>
        </div>
      </span>
    ))}
  </div>
  );
}
