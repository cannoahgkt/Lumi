# LUMI AI Chat Interface

A modern, serverless AI chat interface featuring liquid glass design inspired by iOS 26 aesthetics. Chat with multiple AI models including Claude, GPT-4, Llama, and more - **no installation required!**

## ✨ Features

- 🤖 **Multiple AI Models**: Access Claude 3.5, GPT-4, Llama 3.1, Mixtral, and more
- 🌐 **Serverless**: Works instantly for anyone - no local setup required
- 🎨 **Liquid Glass Design**: Modern glassmorphism effects with iOS 26-inspired aesthetics
- 🌓 **Theme System**: Beautiful light (creamy white) and dark modes with smooth transitions
- 🔧 **Model Switching**: Change AI models mid-conversation without losing context
- 📝 **Prompt Templates**: 10+ built-in templates for coding, writing, and productivity
- 🔑 **Flexible API Keys**: Use our serverless providers or bring your own OpenAI key
- ⚙️ **Advanced Controls**: Adjust temperature, token limits, and model parameters
- 💾 **Auto-Save**: Conversations automatically saved locally
- 📱 **Responsive**: Optimized for all screen sizes and devices
- 🔊 **Voice Input**: Speech-to-text functionality for hands-free interaction
- 📎 **File Upload**: Support for image and document uploads with preview

## � Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cannoahgkt/Lumi)

## 🌐 Live Demo

Visit the live demo: https://lumi-pi.vercel.app/

**Try it now** - no installation required! Just open the link and start chatting with advanced AI models.

## 📋 Prerequisites

For deployment:
- [Node.js](https://nodejs.org/) (v18 or newer)
- API keys from [OpenRouter](https://openrouter.ai) and/or [Groq](https://console.groq.com)

For users: **Nothing!** Just visit the website and start chatting.

## 🛠️ Installation (For Developers)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cannoahgkt/Lumi.git
   cd Lumi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local and add your API keys
   OPENROUTER_API_KEY=your_openrouter_key_here
   GROQ_API_KEY=your_groq_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Get API Keys:**
   
   **OpenRouter (Recommended):**
   - Visit [openrouter.ai](https://openrouter.ai)
   - Sign up and get your API key
   - Access Claude, GPT-4, Llama, and 100+ models
   
   **Groq (Fastest):**
   - Visit [console.groq.com](https://console.groq.com)
   - Sign up and get your API key
   - Ultra-fast inference with Llama models

## 🏃‍♂️ Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

3. **Add Environment Variables in Vercel:**
   ```
   OPENROUTER_API_KEY=your_key_here
   GROQ_API_KEY=your_key_here
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

4. **Deploy!** Your app will be live instantly.

## 🎯 How to Use

### **For Visitors**
1. Open the website
2. Select an AI model from the dropdown
3. Choose a prompt template (optional)
4. Start chatting immediately!

### **Available Models**
- **Claude 3.5 Sonnet**: Anthropic's most capable model
- **GPT-4o**: OpenAI's latest multimodal model  
- **Llama 3.1 405B**: Meta's largest open model
- **Mixtral 8x7B**: Mistral's mixture of experts
- **Gemini Pro 1.5**: Google's multimodal model
- **And many more!**

### **Prompt Templates**
- 💻 **Code Help**: Explain, review, and debug code
- 📝 **Writing**: Emails, summaries, content creation
- 🎓 **Learning**: Explain concepts, translate text
- 💡 **Creative**: Brainstorming and ideation
- 🛠 **Productivity**: Professional tasks and optimization

### **Advanced Features**
- **Model Switching**: Change models mid-conversation
- **Custom API Keys**: Add your OpenAI key for GPT-4 access
- **Parameter Control**: Adjust temperature and response length
- **Chat History**: Conversations auto-saved locally
- **Template System**: Quick prompts for common tasks

## 🏗️ Architecture

```
User Request
    ↓
Next.js Frontend
    ↓
Serverless API (/api/chat)
    ↓
Provider Router
    ├── OpenRouter → Claude, GPT-4, Llama, etc.
    ├── Groq → Ultra-fast Llama inference  
    └── User's OpenAI Key → GPT-4 with user quota
```

## 🔒 Security & Privacy

- **Rate Limited**: 20 requests per minute per IP
- **Secure API Keys**: Your keys stay on your server
- **Local Storage**: User API keys stored locally only
- **No Data Collection**: Conversations not stored server-side
- **Environment Protected**: Sensitive data in environment variables

## 🎨 Customization

The app features two beautiful themes:
- **Light Mode**: Creamy white backgrounds with warm tones
- **Dark Mode**: Deep blues with futuristic glassmorphism effects

Toggle themes using the sun/moon icon in the navigation bar.

## 🚀 Future Features

The modular architecture supports easy addition of:
- 📎 **File Upload**: Images, PDFs, code files
- 🔗 **GitHub Integration**: Repository analysis and code review
- 🦙 **Local Ollama**: Fallback mode for offline usage
- 👥 **Team Features**: Shared conversations and templates
- 📊 **Analytics**: Usage insights and model performance
- 🎙️ **Voice Chat**: Audio input and output

## 🔧 Troubleshooting

### No Response from AI
1. Check that you've added API keys to `.env.local`
2. Verify your API keys are valid
3. Try a different model/provider
4. Check the browser console for errors

### Rate Limiting
- The app limits requests to prevent abuse
- Wait a minute before trying again
- Deploy your own instance for higher limits

### Model Not Available
- Some models may be temporarily unavailable
- Try switching to a different model
- Check the provider's status page

## 💰 Costs

### Free Tier
- **OpenRouter**: Limited free usage for testing
- **Groq**: Generous free tier with fast Llama models

### Paid Usage (Pay-per-use)
- **OpenRouter**: ~$0.50-$2 per 1M tokens (varies by model)
- **Groq**: ~$0.10-$0.30 per 1M tokens
- **User's OpenAI Key**: Direct OpenAI pricing

**Estimated costs**: $1-10/month for moderate usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

[MIT](LICENSE)

## 🙏 Acknowledgements

- [OpenRouter](https://openrouter.ai/) for unified AI model access
- [Groq](https://groq.com/) for ultra-fast inference
- [Anthropic](https://anthropic.com/) for Claude models
- [OpenAI](https://openai.com/) for GPT models
- [Meta](https://ai.meta.com/) for open-source Llama models
- [Vercel](https://vercel.com/) for seamless deployment
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://radix-ui.com/) for accessible components

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

