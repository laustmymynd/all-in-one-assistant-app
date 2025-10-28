import './BrowserWindow.css';

const BrowserWindow: React.FC = () => {
  const [url, setUrl] = useState('https://example.com');
  const [inputUrl, setInputUrl] = useState('https://example.com');
  const [history, setHistory] = useState(['https://example.com']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle URL navigation
  const navigateTo = (newUrl: string) => {
    let formattedUrl = newUrl;
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      formattedUrl = `https://${newUrl}`;
    }
    
    setUrl(formattedUrl);
    setInputUrl(formattedUrl);
    
    // Add to history
    if (formattedUrl !== history[historyIndex]) {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(formattedUrl);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }
    
    setIsLoading(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigateTo(inputUrl);
  };

  // Navigation handlers
  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
      setIsLoading(true);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
      setIsLoading(true);
    }
  };

  const refresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = url;
    }
  };

  const goHome = () => {
    navigateTo('https://example.com');
  };

  // Iframe event handlers
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    console.error('Failed to load page');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'r':
            e.preventDefault();
            refresh();
            break;
          case 'l':
            e.preventDefault();
            (document.querySelector('.url-bar-input') as HTMLElement)?.focus();
            break;
          case 'h':
            e.preventDefault();
            goHome();
            break;
          default:
            break;