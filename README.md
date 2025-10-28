# All-in-One Digital Assistant

An AI-powered code intelligence platform that harnesses the power of multiple AI models working together to analyze, refine, and perfect your code.

## Features

- **Real-Time Collaboration**: Work with multiple AI models simultaneously, getting diverse perspectives on your code in real-time.
- **Code Execution Sandbox**: Test and execute code in a secure, isolated environment with full browser capabilities.
- **Multi-Language Support**: Generate and analyze code in Python, JavaScript, Go, Rust, and 50+ programming languages.
- **Prompt Template Library**: Access a curated library of optimized prompts and save your own templates for reuse.
- **Model Comparison**: Compare responses from different AI models side-by-side to find the best solution.
- **Export & Share**: Export your entire workflow as JSON or Markdown and share with your team.
- **Custom Fine-Tuning**: Customize AI model selection for each interaction mode to match your workflow.
- **Knowledge Graph**: Visualize relationships between your prompts and interactions for better insights.

## Interaction Modes

1. **Assistant**: Get intelligent code analysis and suggestions from your chosen AI model.
2. **Comparison**: Compare responses from multiple models to find the best approach.
3. **Debate**: Watch AI models debate different approaches to your coding problem.
4. **Collaboration**: Get iterative refinements as models build upon each other's suggestions.
5. **Analysis**: Deep analysis of your code from multiple expert perspectives.
6. **Scholarly Review**: Academic-level code review with comprehensive documentation.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/all-in-one-assistant-app.git
   cd all-in-one-assistant-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Technology Stack

- **React 18.2.0**: UI library
- **Vite 6.2.0**: Build tool and development server
- **TypeScript 5.8.2**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **ReactFlow**: Node-based UI library
- **Monaco Editor**: Code editor component
- **Google GenAI**: AI model integration

## Project Structure

```
all-in-one-assistant-app/
├── index.html              # HTML entry point
├── main.jsx               # React entry point
├── App.jsx                # Main application component
├── vite.config.js         # Vite configuration
├── package.json           # Project dependencies
├── README.md              # This file
└── src/                   # Source files (if organized)
    ├── components/        # React components
    ├── services/          # API and utility services
    └── styles/            # CSS and styling
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on the GitHub repository or contact the development team.

---

**Version**: 0.0.0  
**Last Updated**: October 2025
