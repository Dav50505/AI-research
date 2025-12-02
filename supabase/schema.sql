-- AI Dev Radar Database Schema
-- Run this in your Supabase SQL Editor

-- Create the main table for scanner results
CREATE TABLE IF NOT EXISTS scanner_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  run_metadata JSONB NOT NULL,
  coding_tools JSONB DEFAULT '[]'::jsonb NOT NULL,
  ml_resources JSONB DEFAULT '[]'::jsonb NOT NULL,
  ai_models JSONB DEFAULT '[]'::jsonb NOT NULL,
  trends JSONB DEFAULT '[]'::jsonb NOT NULL
);

-- Create an index for faster queries
CREATE INDEX idx_scanner_results_created_at ON scanner_results(created_at DESC);

-- Optional: Create a function to get the latest result
CREATE OR REPLACE FUNCTION get_latest_scanner_result()
RETURNS TABLE (
  id UUID,
  created_at TIMESTAMPTZ,
  run_metadata JSONB,
  coding_tools JSONB,
  ml_resources JSONB,
  ai_models JSONB,
  trends JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    scanner_results.id,
    scanner_results.created_at,
    scanner_results.run_metadata,
    scanner_results.coding_tools,
    scanner_results.ml_resources,
    scanner_results.ai_models,
    scanner_results.trends
  FROM scanner_results
  ORDER BY created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a view for recent results (last 7 days)
CREATE OR REPLACE VIEW recent_scanner_results AS
SELECT *
FROM scanner_results
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

