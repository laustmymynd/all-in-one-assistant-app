Text file: App.tsx
Latest content with line numbers:
2	
3	import React, { useState, useEffect, useCallback, useRef } from 'react';
4	import { v4 as uuidv4 } from 'uuid';
5	import Header from './components/Header';
6	import Background from './components/Background';
7	import AssistantPanel from './components/AssistantPanel';
8	import FeedbackDisplay from './components/FeedbackDisplay';
9	import SettingsModal from './components/SettingsModal';
10	import { ComparisonPanel } from './components/ComparisonPanel';
11	import {
12	  runAssistant,
13	  runComparison,
14	  runDebate,
15	  runCollaboration,
16	  runAnalysis,
17	  runScholarlyReview
18	} from './services/geminiService';
19	import { Interaction, InteractionMode, ModelSelection, InteractionResult, ComparisonTurn, DebateTurn, CollaborationTurn, AnalysisTurn, AssistantResult } from './types';
20	import { AVAILABLE_MODELS, GEMMA_MODELS } from './constants';
21	import { AssistantIcon } from './components/icons/AssistantIcon';
22	import { BalanceIcon } from './components/icons/BalanceIcon';
23	import { DebateIcon } from './components/icons/DebateIcon';
24	import { CollaborateIcon } from './components/icons/CollaborateIcon';
25	import { GraphIcon } from './components/icons/GraphIcon';
26	import { ShieldCheckIcon } from './components/icons/ShieldCheckIcon';
27	import { HistoryIcon } from './components/icons/HistoryIcon';
28	import { BrowserIcon } from './components/icons/BrowserIcon';
29	import { SpinnerIcon } from './components/icons/SpinnerIcon';
30	import DebateDisplay from './components/DebateDisplay';
31	import CollaborationDisplay from './components/CollaborationDisplay';
32	import AnalysisDisplay from './components/AnalysisDisplay';
33	import ScholarlyReviewDisplay from './components/ScholarlyReviewDisplay';
34	import HistoryDashboard from './components/HistoryDashboard';
35	import BrowserWindow from './components/BrowserWindow';
36	
37	const SESSION_KEY = 'assistant-session';
38	
39	// Helper to ensure model selections for multi-model modes are always arrays
40	const getModelsAsArray = (models: string | string[] | undefined): string[] => {
41	  if (Array.isArray(models)) return models;
42	  if (typeof models === 'string' && models) return [models];
43	  return [];
44	};
45	
46	
47	const App: React.FC = () => {
48	  const [mode, setMode] = useState<InteractionMode>('assistant');
49	  const [isLoading, setIsLoading] = useState<boolean>(false);
50	  const [result, setResult] = useState<InteractionResult>(null);
51	  const [error, setError] = useState<string | null>(null);
52	  const [history, setHistory] = useState<Interaction[]>([]);
53	  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
54	  const [settings, setSettings] = useState<ModelSelection>({
55	    assistant: AVAILABLE_MODELS[0],
56	    comparison: [AVAILABLE_MODELS[0], GEMMA_MODELS[0]],
57	    debate: [AVAILABLE_MODELS[0], GEMMA_MODELS[0]],
58	    collaboration: [AVAILABLE_MODELS[0], GEMMA_MODELS[0]],
59	    analysis: [AVAILABLE_MODELS[0], GEMMA_MODELS[0]],
60	    'scholarly-review': AVAILABLE_MODELS[1],
61	  });
62	  const [currentInteraction, setCurrentInteraction] = useState<Partial<Interaction> | null>(null);
63	  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
64	  const isInitialMount = useRef(true);
65	
66	  // Load state from localStorage on initial mount
67	  useEffect(() => {
68	    try {
69	        const savedHistory = localStorage.getItem('assistant-history');
70	        if (savedHistory) {
71	            const parsed = JSON.parse(savedHistory);
72	            if (Array.isArray(parsed)) {
73	                setHistory(parsed);
74	            } else {
75	                console.warn("Malformed history data in localStorage, discarding.");
76	                localStorage.removeItem('assistant-history');
77	            }
78	        }
79	    } catch (e) {
80	        console.error("Failed to parse history data from localStorage", e);
81	        localStorage.removeItem('assistant-history');
82	    }
83	
84	    const savedSession = localStorage.getItem(SESSION_KEY);
85	    if (savedSession) {
86	      try {
87	        const session = JSON.parse(savedSession);
88	        
89	        if (!session || typeof session !== 'object' || Array.isArray(session)) {
90	            throw new Error("Session data is not a valid object.");
91	        }
92	
93	        const restoredMode = session.mode || 'assistant';
94	        let restoredResult = session.result || null;
95	        
96	        // Validate that the restored result matches the restored mode to prevent crashes
97	        if (restoredResult) {
98	          const arrayModes: InteractionMode[] = ['comparison', 'collaboration', 'analysis'];
99	          const textModes: InteractionMode[] = ['assistant', 'scholarly-review'];
100	          