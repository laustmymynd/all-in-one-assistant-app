Text file: ErrorBoundary.tsx
Latest content with line numbers:
1	import React, { ErrorInfo, ReactNode } from 'react';
2	import { AlertCircleIcon } from './icons/AlertCircleIcon';
3	import { CopyIcon } from './icons/CopyIcon';
4	import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';
5	
6	interface Props {
7	  children: ReactNode;
8	}
9	
10	interface State {
11	  hasError: boolean;
12	  error: Error | null;
13	  errorInfo: ErrorInfo | null;
14	  isCopied: boolean;
15	}
16	
17	class ErrorBoundary extends React.Component<Props, State> {
18	  constructor(props: Props) {
19	    super(props);
20	    this.state = {
21	      hasError: false,
22	      error: null,
23	      errorInfo: null,
24	      isCopied: false,
25	    };
26	    
27	    this.handleQuickReset = this.handleQuickReset.bind(this);
28	    this.handleHardReset = this.handleHardReset.bind(this);
29	    this.handleCopyError = this.handleCopyError.bind(this);
30	  }
31	
32	  static getDerivedStateFromError(error: Error): Partial<State> {
33	    return { hasError: true, error };
34	  }
35	
36	  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
37	    console.error("Uncaught error:", error, errorInfo);
38	    this.setState({ errorInfo });
39	  }
40	
41	  handleQuickReset() {
42	    try {
43	        localStorage.removeItem('assistant-session');
44	    } catch (e) {
45	        console.error("Failed to clear session from localStorage:", e);
46	    } finally {
47	        window.location.reload();
48	    }
49	  }
50	  
51	  handleHardReset() {
52	    try {
53	        localStorage.removeItem('assistant-session');
54	        localStorage.removeItem('assistant-history');
55	        localStorage.removeItem('assistant-draft-code');
56	        localStorage.removeItem('assistant-draft-language');
57	        localStorage.removeItem('assistant-draft-action');
58	        localStorage.removeItem('assistant-draft-persona');
59	        localStorage.removeItem('assistant-draft-web-search');
60	    } catch (e) {
61	        console.error("Failed to clear localStorage:", e);
62	    } finally {
63	        window.location.reload();
64	    }
65	  }
66	
67	  handleCopyError() {
68	    if (this.state.error) {
69	        const errorDetails = `
70	Error: ${this.state.error.toString()}
71	
72	Stack: ${this.state.error.stack || 'Not available'}
73	
74	Component Stack: ${this.state.errorInfo?.componentStack || 'Not available'}
75	        `;
76	        navigator.clipboard.writeText(errorDetails.trim());
77	        this.setState({ isCopied: true });
78	        setTimeout(() => this.setState({ isCopied: false }), 2000);
79	    }
80	  }
81	
82	  render() {
83	    if (this.state.hasError) {
84	      return (
85	        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-300 p-4">
86	          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden">
87	            <div className="flex items-center gap-4 p-4 border-b border-zinc-800 bg-zinc-800/30">
88	              <AlertCircleIcon className="w-10 h-10 text-red-500 flex-shrink-0" />
89	              <div>
90	                <h1 className="text-xl font-bold text-red-400">Application Error</h1>
91	                <p className="text-sm text-zinc-400">An unexpected problem has occurred, preventing the app from starting correctly.</p>
92	              </div>
93	            </div>
94	
95	            <div className="p-6">
96	              <div className="bg-zinc-800/50 p-3 rounded-md mb-6 border border-zinc-700">
97	                <p className="font-mono text-sm text-red-400 break-words">
98	                  <strong>{this.state.error?.name}:</strong> {this.state.error?.message}
99	                </p>
100	              </div>
101	              
102	              <h2 className="text-lg font-semibold text-zinc-100 mb-4">How to fix this</h2>
103	              <div className="space-y-4">
104	                <div className="flex items-start gap-4">
105	                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-lg">1</div>
106	                  <div>
107	                    <h3 className="font-semibold text-zinc-200">Try a Quick Reset</h3>
108	                    <p className="text-sm text-zinc-400 mb-3">This often fixes temporary issues without losing your work history.</p>
109	                    <button
110	                      onClick={this.handleQuickReset}
111	                      className="px-4 py-1.5 bg-orange-600 text-white text-sm font-semibold rounded-md hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-orange-500"
112	                    >
113	                      Quick Reset
114	                    </button>
115	                  </div>
116	                </div>
117	
118	                <div className="flex items-start gap-4">
119	                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-lg">2</div>
120	                  <div>
121	                    <h3 className="font-semibold text-zinc-200">Perform a Hard Reset</h3>
122	                    <p className="text-sm text-zinc-400 mb-3">If the problem persists, this will clear all application data and start fresh. <strong className="text-amber-400">Your session history will be permanently deleted.</strong></p>
123	                    <button
124	                      onClick={this.handleHardReset}
125	                      className="px-4 py-1.5 bg-red-700 text-white text-sm font-semibold rounded-md hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-red-600"
126	                    >
127	                      Hard Reset Application
128	                    </button>
129	                  </div>
130	                </div>
131	              </div>
132	
133	              <details className="mt-8 text-left bg-zinc-800/50 border border-zinc-700 rounded-md text-xs text-zinc-400">
134	                <summary className="cursor-pointer font-semibold text-zinc-300 p-3">
135	                  Show Technical Details for Bug Report
136	                </summary>
137	                <div className="relative border-t border-zinc-700 p-3">
138	                  <button 
139	                    onClick={this.handleCopyError}
140	                    className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-xs text-zinc-300 transition-colors"
141	                  >
142	                    {this.state.isCopied ? <ClipboardCheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
143	                    {this.state.isCopied ? 'Copied!' : 'Copy'}
144	                  </button>
145	                  <pre className="mt-4 whitespace-pre-wrap break-words font-mono text-zinc-400">
146	                    {`Error: ${this.state.error?.toString()}\n\nStack: ${this.state.error?.stack || 'Not available'}\n\nComponent Stack: ${this.state.errorInfo?.componentStack || 'Not available'}`}
147	                  </pre>
148	                </div>
149	              </details>
150	            </div>
151	          </div>
152	        </div>
153	      );
154	    }
155	
156	    return this.props.children;
157	  }
158	}
159	
160	export default ErrorBoundary;
161	