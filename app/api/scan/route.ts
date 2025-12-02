import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabaseAdmin } from '@/lib/supabase';
import { BACKGROUND_SCANNER_PROMPT } from '@/lib/prompts';
import type { ScannerResult } from '@/lib/types';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes for cron job

export async function POST(request: NextRequest) {
  try {
    // Check for required environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error('[Scan] Missing API key configuration');
      return NextResponse.json(
        { error: 'Server configuration error: Missing API key' },
        { status: 500 }
      );
    }

    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('[Scan] Starting scanner job...');

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Call OpenAI to run the scan using gpt-4o (latest model)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Using latest GPT-4 Omni model
      messages: [
        { role: 'system', content: BACKGROUND_SCANNER_PROMPT },
        {
          role: 'user',
          content: 'Search the internet now and return the most relevant NEW or RECENT items using the JSON format in the system prompt.',
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const responseText = completion.choices[0].message.content;

    if (!responseText) {
      throw new Error('No response from AI');
    }

    console.log('[Scan] Received response from AI');

    // Parse the JSON response
    let scannerResult: ScannerResult;
    try {
      // Remove markdown code blocks if present
      const cleanedText = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      scannerResult = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('[Scan] Failed to parse JSON:', parseError);
      console.error('[Scan] Response text:', responseText);
      throw new Error('Failed to parse scanner result JSON');
    }

    // Store in database
    const { data, error } = await supabaseAdmin
      .from('scanner_results')
      .insert({
        run_metadata: scannerResult.run_metadata,
        coding_tools: scannerResult.coding_tools_and_workflows,
        ml_resources: scannerResult.ml_learning_resources,
        ai_models: scannerResult.ai_models_and_platforms,
        trends: scannerResult.notable_trends_or_patterns,
      })
      .select()
      .single();

    if (error) {
      console.error('[Scan] Database error:', error);
      throw new Error('Failed to save scanner result to database');
    }

    console.log('[Scan] Successfully saved result to database:', data.id);

    return NextResponse.json({
      success: true,
      result_id: data.id,
      timestamp: data.created_at,
      stats: {
        coding_tools: scannerResult.coding_tools_and_workflows.length,
        ml_resources: scannerResult.ml_learning_resources.length,
        ai_models: scannerResult.ai_models_and_platforms.length,
        trends: scannerResult.notable_trends_or_patterns.length,
      },
    });
  } catch (error) {
    console.error('[Scan] Error:', error);
    return NextResponse.json(
      {
        error: 'Scanner job failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: Manual trigger endpoint for testing
export async function GET(request: NextRequest) {
  // Check for a test secret in query params
  const { searchParams } = new URL(request.url);
  const testSecret = searchParams.get('secret');

  if (testSecret !== process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Forward to POST handler
  return POST(request);
}

