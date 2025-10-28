import React from 'react'

export default function App() {
  const features = [
    {
      icon: '🤝',
      title: 'Real-Time Collaboration',
      description: 'Work with multiple AI models simultaneously, getting diverse perspectives on your code in real-time.'
    },
    {
      icon: '🧪',
      title: 'Code Execution Sandbox',
      description: 'Test and execute code in a secure, isolated environment with full browser capabilities.'
    },
    {
      icon: '💻',
      title: 'Multi-Language Support',
      description: 'Generate and analyze code in Python, JavaScript, Go, Rust, and 50+ programming languages.'
    },
    {
      icon: '📚',
      title: 'Prompt Template Library',
      description: 'Access a curated library of optimized prompts and save your own templates for reuse.'
    },
    {
      icon: '📊',
      title: 'Model Comparison',
      description: 'Compare responses from different AI models side-by-side to find the best solution.'
    },
    {
      icon: '📤',
      title: 'Export & Share',
      description: 'Export your entire workflow as JSON or Markdown and share with your team.'
    },
    {
      icon: '🎯',
      title: 'Custom Fine-Tuning',
      description: 'Customize AI model selection for each interaction mode to match your workflow.'
    },
    {
      icon: '🧠',
      title: 'Knowledge Graph',
      description: 'Visualize relationships between your prompts and interactions for better insights.'
    }
  ]

  const modes = [
    {
      name: 'Assistant',
      description: 'Get intelligent code analysis and suggestions from your chosen AI model.'
    },
    {
      name: 'Comparison',
      description: 'Compare responses from multiple models to find the best approach.'
    },
    {
      name: 'Debate',
      description: 'Watch AI models debate different approaches to your coding problem.'
    },
    {
      name: 'Collaboration',
      description: 'Get iterative refinements as models build upon each other\'s suggestions.'
    },
    {
      name: 'Analysis',
      description: 'Deep analysis of your code from multiple expert perspectives.'
    },
    {
      name: 'Scholarly Review',
      description: 'Academic-level code review with comprehensive documentation.'
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <h1 className="text-xl font-bold">All-in-One Assistant</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-zinc-400 hover:text-white transition">Features</a>
            <a href="#modes" className="text-zinc-400 hover:text-white transition">Modes</a>
            <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition">
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Your <span className="gradient-text">AI-Powered Code</span> Intelligence Platform
          </h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Harness the power of multiple AI models working together to analyze, refine, and perfect your code. Get diverse perspectives, compare approaches, and make better decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cta-button px-8 py-4 rounded-lg font-semibold text-lg">
              Start Free Trial
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold text-lg border border-zinc-700 hover:border-orange-500 transition">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">7</div>
            <p className="text-zinc-400">Powerful Features</p>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">6</div>
            <p className="text-zinc-400">Interaction Modes</p>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">50+</div>
            <p className="text-zinc-400">Languages Supported</p>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">∞</div>
            <p className="text-zinc-400">Possibilities</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4">Powerful Features</h3>
          <p className="text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
            Everything you need to elevate your coding workflow with AI intelligence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card p-6 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/50">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-zinc-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modes Section */}
      <section id="modes" className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4">6 Interaction Modes</h3>
          <p className="text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
            Choose the perfect mode for your workflow
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modes.map((mode, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50 transition">
                <h4 className="text-lg font-semibold mb-2 gradient-text">{mode.name}</h4>
                <p className="text-zinc-400 text-sm">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Input Code', desc: 'Paste your code and select your interaction mode' },
              { step: '2', title: 'Configure', desc: 'Choose AI models and customize settings' },
              { step: '3', title: 'Analyze', desc: 'Get instant feedback from multiple perspectives' },
              { step: '4', title: 'Export', desc: 'Download results in JSON or Markdown format' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Coding?</h3>
          <p className="text-zinc-400 mb-8">
            Join developers and teams who are using AI intelligence to write better code faster.
          </p>
          <button className="cta-button px-8 py-4 rounded-lg font-semibold text-lg">
            Launch the App Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition">Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-8 text-center text-zinc-500 text-sm">
          <p>&copy; 2025 All-in-One Digital Assistant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

