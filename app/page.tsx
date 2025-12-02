import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Stay Ahead in AI Development
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Track the latest AI coding tools, machine learning resources, and AI model releases.
          Updated automatically every 12 hours.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/latest"
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-80 transition-opacity"
          >
            View Latest Updates
          </Link>
          <Link
            href="/chat"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            Ask AI Assistant
          </Link>
        </div>
      </div>

      {/* What We Track */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">What We Track</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="text-3xl mb-4">🛠️</div>
            <h3 className="text-xl font-bold mb-3">Coding & Dev Tools</h3>
            <p className="text-gray-600 dark:text-gray-400">
              AI coding assistants, IDE plugins, code completion tools, debugging aids, 
              and automated testing frameworks.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• GitHub Copilot updates</li>
              <li>• Cursor, Windsurf, Replit</li>
              <li>• AI pair programming tools</li>
              <li>• Code generation & refactoring</li>
            </ul>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-3">ML Learning Resources</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Courses, tutorials, notebooks, and hands-on labs for machine learning 
              and deep learning.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Online courses & certifications</li>
              <li>• Interactive notebooks</li>
              <li>• Video tutorials</li>
              <li>• Hands-on projects</li>
            </ul>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-3">AI Models & Platforms</h3>
            <p className="text-gray-600 dark:text-gray-400">
              New LLMs, multimodal models, vision models, open-source releases, 
              and AI APIs.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• GPT, Claude, Gemini updates</li>
              <li>• Open-source models (Llama, Mistral)</li>
              <li>• Multimodal AI</li>
              <li>• Model APIs & platforms</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-bold mb-2">1. Automated Scanning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our AI scans the web every 12 hours for new developments in AI coding, 
              ML learning, and AI models.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold mb-2">2. Smart Filtering</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We filter for practical, developer-focused content—no hype, 
              just tools and resources you can use.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold mb-2">3. Clean Presentation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View organized updates or ask our AI assistant questions about 
              the latest developments.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Stay Updated?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Check out the latest findings or chat with our AI assistant
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/latest"
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-80 transition-opacity"
          >
            Latest Updates
          </Link>
          <Link
            href="/chat"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            Ask AI
          </Link>
        </div>
      </div>
    </div>
  );
}

