'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import type { DatabaseScannerResult } from '@/lib/types';

export default function LatestPage() {
  const [data, setData] = useState<DatabaseScannerResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  const fetchLatest = async () => {
    try {
      const response = await fetch('/api/latest');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatest();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    setRefreshMessage(null);
    
    try {
      const response = await fetch('/api/refresh', {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to refresh');
      }

      const result = await response.json();
      
      setRefreshMessage(
        `✅ Successfully refreshed! Found ${result.stats.coding_tools} coding tools, ${result.stats.ml_resources} ML resources, ${result.stats.ai_models} AI models, and ${result.stats.trends} trends.`
      );

      // Refresh the data after a short delay
      setTimeout(() => {
        fetchLatest();
      }, 1000);
    } catch (err) {
      setRefreshMessage(
        `❌ Error: ${err instanceof Error ? err.message : 'Failed to refresh'}`
      );
    } finally {
      setRefreshing(false);
      // Clear message after 5 seconds
      setTimeout(() => setRefreshMessage(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading latest updates...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-900 dark:text-red-300 mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-700 dark:text-red-400">
            {error || 'No data available yet. The scanner may not have run yet.'}
          </p>
        </div>
      </div>
    );
  }

  const lastUpdate = new Date(data.created_at);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Latest Updates</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {format(lastUpdate, 'PPpp')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Focusing on: {data.run_metadata.time_window_focus}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {refreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <span>🔄</span>
                <span>Refresh Search</span>
              </>
            )}
          </button>
        </div>
        {refreshMessage && (
          <div className={`mt-4 p-4 rounded-lg ${
            refreshMessage.startsWith('✅')
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <p className={`text-sm ${
              refreshMessage.startsWith('✅')
                ? 'text-green-900 dark:text-green-300'
                : 'text-red-900 dark:text-red-300'
            }`}>
              {refreshMessage}
            </p>
          </div>
        )}
      </div>

      {/* Coding Tools */}
      {data.coding_tools && data.coding_tools.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">🛠️</span>
            Coding & Dev Tools ({data.coding_tools.length})
          </h2>
          <div className="space-y-4">
            {data.coding_tools.map((tool, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{tool.summary}</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-3">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                    <strong>Why it matters:</strong> {tool.why_it_matters_for_devs}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ML Resources */}
      {data.ml_resources && data.ml_resources.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">📚</span>
            ML Learning Resources ({data.ml_resources.length})
          </h2>
          <div className="space-y-4">
            {data.ml_resources.map((resource, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold">{resource.title}</h3>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
                      {resource.level}
                    </span>
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
                      {resource.format}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{resource.summary}</p>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-3">
                  <p className="text-sm font-medium text-green-900 dark:text-green-300">
                    <strong>What you'll learn:</strong> {resource.what_you_learn}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  >
                    Start learning →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AI Models */}
      {data.ai_models && data.ai_models.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">🤖</span>
            AI Models & Platforms ({data.ai_models.length})
          </h2>
          <div className="space-y-4">
            {data.ai_models.map((model, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold">{model.name}</h3>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded">
                      {model.type}
                    </span>
                    {model.is_new_or_updated && (
                      <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{model.summary}</p>
                <div className="mb-3">
                  <p className="text-sm font-medium mb-2">Key Capabilities:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {model.key_capabilities.map((capability, capIdx) => (
                      <li key={capIdx}>{capability}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                  Released/Updated: {model.released_or_updated_date}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {model.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={model.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  >
                    Explore →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trends */}
      {data.trends && data.trends.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">📈</span>
            Notable Trends & Patterns ({data.trends.length})
          </h2>
          <div className="space-y-4">
            {data.trends.map((trend, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-yellow-50 dark:bg-yellow-900/10"
              >
                <h3 className="text-xl font-bold mb-2">{trend.short_title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{trend.description}</p>
                <div>
                  <p className="text-sm font-medium mb-2">Evidence:</p>
                  <ul className="space-y-1">
                    {trend.evidence_links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}



