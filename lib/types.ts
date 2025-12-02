// Database types for TypeScript

export interface RunMetadata {
  generated_at_utc: string;
  time_window_focus: string;
}

export interface CodingTool {
  title: string;
  summary: string;
  why_it_matters_for_devs: string;
  link: string;
  tags: string[];
}

export interface MLResource {
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  format: 'course' | 'blog' | 'notebook' | 'tutorial' | 'video' | 'docs';
  summary: string;
  what_you_learn: string;
  link: string;
  tags: string[];
}

export interface AIModel {
  name: string;
  type: 'llm' | 'vision' | 'audio' | 'multimodal' | 'tool' | 'platform';
  summary: string;
  key_capabilities: string[];
  is_new_or_updated: boolean;
  released_or_updated_date: string;
  link: string;
  tags: string[];
}

export interface Trend {
  short_title: string;
  description: string;
  evidence_links: string[];
}

export interface ScannerResult {
  run_metadata: RunMetadata;
  coding_tools_and_workflows: CodingTool[];
  ml_learning_resources: MLResource[];
  ai_models_and_platforms: AIModel[];
  notable_trends_or_patterns: Trend[];
}

export interface DatabaseScannerResult {
  id: string;
  created_at: string;
  run_metadata: RunMetadata;
  coding_tools: CodingTool[];
  ml_resources: MLResource[];
  ai_models: AIModel[];
  trends: Trend[];
}

