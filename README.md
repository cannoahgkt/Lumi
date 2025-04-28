# LUMI AI Chat Interface

A futuristic, dark-themed chat interface for interacting with Ollama's Llama 3 model.

![LUMI AI Chat Interface](https://placeholder.svg?height=400&width=800)

## Features

- 🤖 Integration with Ollama's Llama 3 model
- 🎨 Sleek, cyberpunk-inspired UI with glassmorphism effects
- 🔊 Speech-to-text functionality
- 📎 File upload and preview
- 📱 Responsive design for all screen sizes
- ⚡ Real-time chat with message history

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or newer)
- [Ollama](https://ollama.ai/download)
- Llama 3 model pulled to your Ollama instance

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/lumi-ai-chat.git
   cd lumi-ai-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Ollama and pull the Llama 3 model:
   ```bash
   # Install Ollama from https://ollama.ai/download
   
   # After installation, pull the Llama 3 model
   ollama pull llama3
   ```

## Running the Application

1. Make sure Ollama is running:
   ```bash
   # Ollama should start automatically after installation
   # If not, run:
   ollama serve
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Chat with Llama 3

Simply type your message in the input field and press Enter or click the send button. The AI will respond based on your input and the conversation history.

### Speech-to-Text

1. Click the microphone icon
2. Start speaking (the icon will pulse purple while listening)
3. Your speech will be transcribed into the input field
4. Edit if needed, then send

### File Upload

1. Click the paperclip icon
2. Select a file from your device
3. The file will appear above the input field
4. You can remove it by clicking the X button
5. Send your message with the file attached

## Project Structure

```
lumi-ai-chat/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   │   └── chat/         # Chat API endpoint
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── chat-input.tsx    # Input field component
│   ├── chat-interface.tsx # Main chat UI
│   ├── message.tsx       # Message bubble component
│   └── nav-bar.tsx       # Navigation bar
├── hooks/                # Custom React hooks
│   └── use-chat.tsx      # Chat state management
├── public/               # Static assets
│   └── grid-pattern.svg  # Background pattern
├── types/                # TypeScript type definitions
│   ├── global.d.ts       # Global type declarations
│   └── index.ts          # Type exports
└── lib/                  # Utility functions
    └── utils.ts          # Helper functions
```

## Technical Details

### Technologies Used

- **Next.js**: React framework with App Router
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Ollama**: Local LLM runtime
- **Llama 3**: Open-source large language model
- **Web Speech API**: For speech recognition

### API Integration

The application communicates with Ollama through a Next.js API route at `/api/chat`. This route forwards requests to the Ollama API running locally at `http://localhost:11434/api/chat`.

## Troubleshooting

### Slow Responses

If you're experiencing slow responses:

1. Use a smaller model variant:
   ```bash
   ollama pull llama3:8b
   ```
   Then update the model name in the API call.

2. Adjust parameters in `app/api/chat/route.ts`:
   - Reduce `num_predict` for shorter responses
   - Increase `temperature` for faster (but potentially less accurate) responses

### Speech Recognition Issues

If speech recognition isn't working:

1. Ensure you're using a supported browser (Chrome, Edge, Safari)
2. Check that you've granted microphone permissions
3. Try in a quieter environment for better recognition

### Connection Errors

If you're seeing connection errors:

1. Verify Ollama is running:
   ```bash
   curl http://localhost:11434/api/version
   ```

2. Check if the model is available:
   ```bash
   ollama list
   ```

## License

[MIT](LICENSE)

## Acknowledgements

- [Ollama](https://ollama.ai/) for making LLMs accessible locally
- [Llama 3](https://ai.meta.com/llama/) by Meta AI
- [Lucide Icons](https://lucide.dev/) for the beautiful icons
- [TailwindCSS](https://tailwindcss.com/) for the styling utilities

