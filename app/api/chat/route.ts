import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { CHAT_ASSISTANT_PROMPT } from '@/lib/prompts';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('[Chat] Missing API key configuration');
      return NextResponse.json(
        { error: 'Server configuration error: Missing API key' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required' },
        { status: 400 }
      );
    }

    console.log('[Chat] Processing request with', messages.length, 'messages');

    // Create a streaming response using gpt-4o (latest and best model)
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o', // Using latest GPT-4 Omni model
      messages: [
        { role: 'system', content: CHAT_ASSISTANT_PROMPT },
        ...messages,
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 2000,
    });

    console.log('[Chat] OpenAI stream started');

    // Convert OpenAI stream to ReadableStream
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
          console.log('[Chat] Stream completed successfully');
        } catch (error) {
          console.error('[Chat] Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[Chat] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to process chat request', details: errorMessage },
      { status: 500 }
    );
  }
}

