import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { DatabaseScannerResult } from '@/lib/types';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Get the latest scanner result from database
    const { data, error } = await supabaseAdmin
      .from('scanner_results')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch latest data' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'No data available yet' },
        { status: 404 }
      );
    }

    // Transform database format to API format
    const result: DatabaseScannerResult = {
      id: data.id,
      created_at: data.created_at,
      run_metadata: data.run_metadata,
      coding_tools: data.coding_tools,
      ml_resources: data.ml_resources,
      ai_models: data.ai_models,
      trends: data.trends,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/latest:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


