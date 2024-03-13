import { NextResponse } from "next/server"
import OpenAI from 'openai';

const { OPENAI_API_KEY } = process.env

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY 
});

export async function GET(request) {
  return new Response('Hello from OpenAI!')
}

export async function POST(request) {
  const {userText} = await request.json()
  
  // const chatCompletion = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [{"role": "user", "content": userText}],
  // });
  
  // const aiMessage = chatCompletion.choices[0].message
  // console.log(chatCompletion.choices[0].message);
  
  return NextResponse.json({ message: "No puedo responder a eso." }, { status: 200 })
}