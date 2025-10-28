Text file: index.tsx
Latest content with line numbers:
1	import React from 'react';
2	import ReactDOM from 'react-dom/client';
3	import App from './App';
4	import ErrorBoundary from './components/ErrorBoundary';
5	
6	const rootElement = document.getElementById('root');
7	if (!rootElement) {
8	  throw new Error("Could not find root element to mount to");
9	}
10	
11	const root = ReactDOM.createRoot(rootElement);
12	root.render(
13	  <React.StrictMode>
14	    <ErrorBoundary>
15	      <App />
16	    </ErrorBoundary>
17	  </React.StrictMode>
18	);