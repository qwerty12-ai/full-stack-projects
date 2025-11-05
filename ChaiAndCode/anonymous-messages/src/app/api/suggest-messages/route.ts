import { openai, createOpenAI } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages, APICallError } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const ai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // Add your prompt as a "system" message
    const promptMessage: UIMessage = {
      id: crypto.randomUUID(),
      role: 'system',
      parts: [
        {
          type: 'text',
          text: "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."
        }
      ]
    };


    // Combine the prompt with user messages
    const allMessages = [promptMessage, ...messages];

    const result = streamText({
      model: openai('gpt-4o'),
      messages: convertToModelMessages(allMessages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    if (error instanceof APICallError) {
      const { name, statusCode, responseHeaders, message } = error;
      return NextResponse.json({
        name,
        statusCode,
        responseHeaders,
        message,
      }, {status: statusCode});
    } else {
      console.error("An unexpected error occured: ", error);
      throw error;
    }
  }
}
