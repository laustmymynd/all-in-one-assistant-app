import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Code, Database, FileJson, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Debugging "Failure to Load" Error
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            A comprehensive guide to diagnosing and fixing persistent React application loading failures
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-12">
        {/* Executive Summary */}
        <Card className="mb-8 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              A <strong>"Failed to load"</strong> error that persists even after fixing the ErrorBoundary component typically indicates one of three root causes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Corrupted localStorage data</strong> causing a crash during initial state restoration</li>
              <li><strong>Syntax or configuration errors</strong> in <code className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-xs">index.html</code> or the import map</li>
              <li><strong>Top-level errors in index.tsx</strong> or App.tsx that occur before React can render</li>
            </ul>
          </CardContent>
        </Card>

        {/* Suspect #1 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-600" />
              Suspect #1: Corrupted localStorage Data
            </CardTitle>
            <CardDescription>Highest Probability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">The Scenario</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>Your application saves invalid or corrupted data to localStorage</li>
                <li>On the next load, App.tsx tries to restore this data</li>
                <li><code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">JSON.parse()</code> fails or the data structure is unexpected</li>
                <li>An error is thrown during the initial render, before ErrorBoundary can catch it</li>
                <li>The entire application crashes with "Failure to load"</li>
              </ol>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">How to Diagnose</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>Open your browser's Developer Tools (F12)</li>
                <li>Go to the <strong>Application</strong> tab</li>
                <li>Select <strong>Local Storage</strong> from the left sidebar</li>
                <li>Examine the keys and values for your domain</li>
                <li>Look for malformed JSON, <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">null</code>, or unexpected data structures</li>
              </ol>
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Quick Fix</h4>
              <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                Clear localStorage and reload the page:
              </p>
              <code className="block bg-slate-900 text-green-400 p-3 rounded text-xs overflow-x-auto mb-3">
                localStorage.clear(); location.reload();
              </code>
              <p className="text-sm text-green-800 dark:text-green-200">
                If the app loads successfully after this, localStorage corruption was the culprit.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Permanent Solution</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                Wrap your entire session restoration logic in App.tsx with a comprehensive try...catch block:
              </p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded text-xs overflow-x-auto">
{`try {
  const savedSession = localStorage.getItem('session');
  if (savedSession) {
    const parsed = JSON.parse(savedSession);
    // Apply parsed session to state
    setSessionState(parsed);
  }
} catch (error) {
  console.error('Failed to restore session:', error);
  // Remove corrupted data
  localStorage.removeItem('session');
  // Reset to clean state
  setSessionState(defaultState);
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Suspect #2 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="w-5 h-5 text-purple-600" />
              Suspect #2: Errors in index.html
            </CardTitle>
            <CardDescription>Second Highest Probability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Common Issues</h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>
                  <strong>Incorrect import map URLs:</strong> A typo or broken CDN link prevents React, ReactDOM, or other critical libraries from loading
                </li>
                <li>
                  <strong>Missing or malformed JSON:</strong> A trailing comma, missing quote, or syntax error in the importmap
                </li>
                <li>
                  <strong>Wrong script path:</strong> <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">&lt;script type="module" src="/index.tsx"&gt;</code> may need to be <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">/src/index.tsx</code>
                </li>
                <li>
                  <strong>Missing root element:</strong> The <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">&lt;div id="root"&gt;&lt;/div&gt;</code> may be missing or commented out
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">How to Diagnose</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>Open Developer Tools (F12) and go to the <strong>Console</strong> tab</li>
                <li>Look for errors like <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">404 Not Found</code>, <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">CORS error</code>, or <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">Failed to fetch module</code></li>
                <li>Check the <strong>Network</strong> tab to see if all imported libraries are being fetched successfully</li>
                <li>Validate your importmap JSON syntax using an online JSON validator</li>
              </ol>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Verification Steps</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                Test each URL in the importmap by opening it in a new browser tab:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li>Does it load without a 404 error?</li>
                <li>Is it valid JavaScript?</li>
                <li>Are there any CORS errors in the console?</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Suspect #3 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-600" />
              Suspect #3: Top-Level Errors in index.tsx or App.tsx
            </CardTitle>
            <CardDescription>Third Highest Probability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Common Issues</h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>
                  <strong>Import errors:</strong> Importing from a file that doesn't exist or has a typo in the path
                </li>
                <li>
                  <strong>Null root element:</strong> <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">document.getElementById('root')</code> returns <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">null</code>
                </li>
                <li>
                  <strong>Top-level code errors:</strong> Code outside the main render call that fails before React initializes
                </li>
                <li>
                  <strong>Initialization logic:</strong> Global variables or constants that depend on unavailable browser features
                </li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">The "Bare Minimum" Test</h4>
              <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                Strip everything down to the simplest possible React app:
              </p>
              <pre className="bg-slate-900 text-green-400 p-3 rounded text-xs overflow-x-auto mb-3">
{`// Simplified App.tsx
export default function App() {
  return <h1>Hello World</h1>;
}

// Simplified index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found!');
}`}
              </pre>
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>If this loads:</strong> The problem is in your actual App.tsx logic. Add components back one by one until it breaks.
              </p>
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>If this still fails:</strong> The problem is 100% in index.html or the server configuration.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Debugging Workflow */}
        <Card className="mb-8 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              Systematic Debugging Workflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 dark:bg-green-500 text-white flex items-center justify-center font-bold text-sm">1</span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Clear localStorage</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Run <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">localStorage.clear(); location.reload();</code> in the console</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 dark:bg-green-500 text-white flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Check the console for errors</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Look for 404, CORS, or module loading errors</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 dark:bg-green-500 text-white flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Verify index.html</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Check the importmap syntax and verify all URLs are correct</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 dark:bg-green-500 text-white flex items-center justify-center font-bold text-sm">4</span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Run the bare minimum test</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Simplify App.tsx to just <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">&lt;h1&gt;Hello World&lt;/h1&gt;</code></p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 dark:bg-green-500 text-white flex items-center justify-center font-bold text-sm">5</span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Add components back incrementally</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Add ErrorBoundary, then real App logic, until you find what breaks</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Key Takeaways */}
        <Card>
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>A "Failure to load" error is a symptom, not a diagnosis.</strong> The actual problem could be corrupted data, configuration errors, or code-level bugs. By systematically eliminating possibilities, you can pinpoint the exact cause.
            </p>
            <p>
              <strong>localStorage corruption is the most common culprit.</strong> Always implement atomic, comprehensive error handling for session restoration to ensure your app can recover gracefully.
            </p>
            <p>
              <strong>The "bare minimum" test is your debugging superpower.</strong> When all else fails, strip everything down to the simplest possible React app. If it works, the problem is in your code. If it fails, the problem is in your configuration.
            </p>
            <p>
              <strong>Error boundaries are powerful, but they have limits.</strong> They can't catch errors in their own lifecycle methods or during the initial render of the root component. Always be defensive about top-level code.
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-12">
        <div className="container max-w-4xl mx-auto px-4 py-6 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>A comprehensive debugging guide for persistent React application loading failures</p>
        </div>
      </footer>
    </div>
  );
}

