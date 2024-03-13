import ChatBotCanvas from "@/components/ChatBotCanvas";
import TextToSpeech from "@/components/TextToSpeech";


export default function Home() {

  // handle which character to display

  return (
    <div className="bg-gray-400 h-full">
      <TextToSpeech />
      <ChatBotCanvas /> 
    </div>
  );
}
