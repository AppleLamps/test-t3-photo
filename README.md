# AI Image Generation Studio

An award-winning AI image generation application built with Next.js 16, featuring multiple state-of-the-art AI models from fal.ai.

## Features

- 🎨 **Multiple AI Models**: FLUX.1 [schnell], MiniMax Image-01, and Z-Image Turbo
- 🎯 **Smart Model Selection**: Multi-model comparison with dynamic UI based on capabilities
- 📐 **Flexible Image Sizes**: Model-specific aspect ratios and custom dimensions
- ⚡ **Real-time Generation**: Live progress tracking with queue management
- 💾 **Local Storage**: IndexedDB persistence with export/import functionality
- 🌙 **Premium Dark UI**: Glassmorphism design with purple-pink gradients
- ✨ **Smooth Animations**: Framer Motion for fluid transitions
- 📱 **Responsive Design**: Mobile-first approach with collapsible sidebar

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A fal.ai API key ([Get one here](https://fal.ai/dashboard/keys))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd test-t3-photo
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
FAL_KEY=your_fal_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: IndexedDB (via idb)
- **API**: fal.ai client
- **Icons**: Lucide React

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── generate/      # Image generation endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── canvas/           # Image display components
│   ├── generation/       # Generation queue components
│   ├── sidebar/          # Sidebar components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and types
│   ├── constants/       # Model configs and presets
│   ├── db/              # IndexedDB operations
│   └── types/           # TypeScript definitions
└── public/              # Static assets
```

## Available Models

### FLUX.1 [schnell]
- **Provider**: Black Forest Labs
- **Best for**: Fast, high-quality commercial images
- **Parameters**: Guidance scale, inference steps, seed
- **Sizes**: Square, portrait, landscape variants

### MiniMax Image-01
- **Provider**: Hailuo AI  
- **Best for**: Detailed images with longer prompts
- **Parameters**: Prompt optimizer, number of images (1-9)
- **Sizes**: 8 aspect ratios including ultrawide 21:9

### Z-Image Turbo
- **Provider**: Tongyi-MAI
- **Best for**: Lightning-fast generation with LoRA support
- **Parameters**: Inference steps, seed, prompt expansion
- **Sizes**: Same as FLUX.1

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Add `FAL_KEY` environment variable
4. Deploy!

### Environment Variables

Make sure to set these in your production environment:

- `FAL_KEY`: Your fal.ai API key

## Usage Tips

1. **Detailed Prompts**: The more descriptive your prompt, the better the results
2. **Style Presets**: Use style presets to enhance your prompts with professional keywords
3. **Multi-Model Comparison**: Select multiple models to compare results side-by-side
4. **Favorites**: Star your best generations for easy access
5. **Storage Management**: Monitor your browser storage usage and export backups regularly

## Keyboard Shortcuts

- `Ctrl+Enter`: Generate image
- `Esc`: Close modals/sidebars

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- [fal.ai](https://fal.ai) for providing the AI model APIs
- [Next.js](https://nextjs.org) team for the amazing framework
- All the open-source libraries that made this possible
