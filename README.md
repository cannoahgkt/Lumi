# LUMI AI Chat Interface

A modern, futuristic AI chat interface featuring liquid glass design inspired by iOS 26 aesthetics. Built with Next.js and featuring both light and dark themes.

## ✨ Features

- 🤖 **AI Integration**: Seamless integration with Ollama's Llama 3 model
- 🎨 **Liquid Glass Design**: Modern glassmorphism effects with iOS 26-inspired aesthetics
- 🌓 **Theme System**: Beautiful light (creamy white) and dark modes with smooth transitions
- 🔊 **Voice Input**: Speech-to-text functionality for hands-free interaction
- 📎 **File Upload**: Support for image and document uploads with preview
- 📱 **Responsive**: Optimized for all screen sizes and devices
- ⚡ **Real-time**: Instant chat responses with message history
- 🎭 **Animations**: Smooth transitions and modern micro-interactions

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cannoahgkt/Lumi)

## 📋 Prerequisites

Before you begin, ensure you have:
- [Node.js](https://nodejs.org/) (v18 or newer)
- [Ollama](https://ollama.ai/download) installed and running
- Llama 3 model pulled to your Ollama instance

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cannoahgkt/Lumi.git
   cd Lumi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment (optional):**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local if you need to change the Ollama URL
   # Default is http://localhost:11434
   ```

4. **Set up Ollama and Llama 3:**
   ```bash
   # Install Ollama from https://ollama.ai/download
   
   # After installation, pull the Llama 3 model
   ollama pull llama3
   
   # Verify the model is available
   ollama list
   ```

## 🏃‍♂️ Running Locally

1. **Start Ollama service:**
   ```bash
   # Ollama should start automatically after installation
   # If not, run:
   ollama serve
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deploy to Vercel

### Method 1: One-Click Deploy
Click the deploy button above or use this link:
[Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/cannoahgkt/Lumi)

### Method 2: Manual Deploy
1. **Push to GitHub** (if not already done)
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your Lumi repository
   - Click "Deploy"

3. **Configure Environment (if needed):**
   - No additional environment variables required for basic deployment
   - For production Ollama integration, you may need to configure API endpoints

## 🎨 Theme Customization

The app features two beautiful themes:

- **Light Mode**: Creamy white backgrounds with warm, comfortable tones
- **Dark Mode**: Deep blues and purples with futuristic glassmorphism effects

Toggle between themes using the sun/moon icon in the navigation bar.

## 📱 Features Overview

### Liquid Glass UI
- Advanced glassmorphism effects with backdrop blur
- Smooth rounded corners and subtle shadows
- Gradient overlays for depth and visual interest

### Voice Input
- Click the microphone icon to start voice input
- Supports speech-to-text in supported browsers (Chrome, Edge)

### File Upload
- Support for images, PDFs, and text documents
- Image preview functionality
- Drag and drop support

## 🔧 Troubleshooting

### Chat not working / "Cannot connect to Ollama"
1. **Make sure Ollama is running:**
   ```bash
   ollama serve
   ```

2. **Verify Llama 3 model is installed:**
   ```bash
   ollama list
   # Should show llama3 in the list
   ```

3. **Pull the model if missing:**
   ```bash
   ollama pull llama3
   ```

4. **Check Ollama is accessible:**
   ```bash
   curl http://localhost:11434/api/version
   # Should return Ollama version info
   ```

### For Vercel Deployment
- The app will show a helpful message when Ollama is not available
- For production use, you'll need to deploy Ollama on a server and update the `OLLAMA_URL` environment variable
- Consider using services like Railway, DigitalOcean, or AWS to host your Ollama instance

### Common Issues
- **Port 11434 is busy**: Restart Ollama with `ollama serve`
- **Model not found**: Run `ollama pull llama3` to download the model
- **CORS errors**: Make sure you're running the app on localhost during development

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OLLAMA_URL` | URL where Ollama is running | `http://localhost:11434` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

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

