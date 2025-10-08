# UX Critic - AI-Powered UX Analysis Tool

An intelligent design analysis platform that provides instant UX feedback using Google's Gemini AI. Upload your designs and receive actionable insights on accessibility, usability, visual design, and layout with comprehensive scoring and recommendations.

![UX Critic Dashboard](public/modern-landing-page.png)

## Features

### Core Functionality
- **AI-Powered Analysis** - Leverages Google Gemini 2.0 Flash to analyze designs for UX issues
- **Comprehensive Feedback** - Detailed insights across four categories:
  - Accessibility (contrast, text size, WCAG compliance)
  - Usability (navigation, user flow, interaction patterns)
  - Visual Design (typography, color, spacing)
  - Layout (structure, hierarchy, responsiveness)
- **UX Scoring** - Automated scoring system (0-100) with category breakdowns
- **Severity-Based Issues** - Critical, high, medium, and low priority issues
- **Analysis Dashboard** - View, manage, and track all your design analyses
- **AI Assistant** - Interactive chat interface for UX questions and guidance

### Productivity Features
- **Theme Toggle** - Switch between dark and light modes
- **Keyboard Shortcuts** - Quick navigation and actions
  - `Cmd/Ctrl + N` - New Analysis
  - `Cmd/Ctrl + D` - Dashboard
  - `Cmd/Ctrl + /` - AI Assistant
  - `Cmd/Ctrl + K` - Search
  - `Cmd/Ctrl + Shift + T` - Toggle Theme
- **Clipboard Paste** - Paste images directly from clipboard
- **Export Reports** - Download analysis as HTML reports
- **Data Persistence** - Save and manage analyses locally

### User Experience
- **Drag & Drop Upload** - Easy file upload with drag-and-drop support
- **Real-time Analysis** - Live progress indicators during AI processing
- **Filterable Results** - Filter issues by severity (Critical, High, Medium, Low)
- **Responsive Design** - Mobile-first design that works on all devices
- **Authentication** - Secure user accounts with protected routes

### Design System
- **Dark/Light Themes** - Modern UI with theme switching
- **Smooth Animations** - Polished transitions and loading states
- **Accessible Components** - Built with shadcn/ui for accessibility
- **Consistent Typography** - Geist font family throughout

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - High-quality React components
- **Lucide Icons** - Modern icon library

### Backend & AI
- **Vercel AI SDK** - AI integration framework
- **Google Gemini 2.0 Flash** - Image analysis and UX feedback generation
- **Server Actions** - Next.js server-side API routes
- **Context API** - State management for analyses and authentication

### Development Tools
- **Geist Font** - Modern sans-serif and monospace fonts
- **ESLint** - Code linting
- **localStorage** - Client-side data persistence

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Google AI API key (Gemini)

### Installation

1. **Clone or download the project**
   \`\`\`bash
   git clone <your-repo-url>
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   \`\`\`env
   # Google AI (Gemini) API Key
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   \`\`\`

4. **Get your Gemini API key**
   
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the key and add it to your `.env.local` file

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Start Guide

1. **Sign Up** - Create an account on the signup page
2. **Upload Design** - Navigate to "New Analysis" or click "Try Now"
3. **Select File** - Drag & drop, click to upload, or paste from clipboard
4. **Start Analysis** - Click "Analyze Design" to begin AI processing
5. **View Results** - See comprehensive feedback with scores and issues
6. **Save Analysis** - Give it a title and save to your dashboard
7. **Export Report** - Download analysis as HTML report
8. **AI Assistant** - Ask UX questions in the AI Assistant chat

## Project Structure

ux-critic/
├── app/
│ ├── api/
│ │ ├── analyze/route.ts # Analysis API endpoint
│ │ └── assistant/route.ts # AI Assistant API endpoint
│ ├── analyze/
│ │ └── page.tsx # Analysis page
│ ├── assistant/
│ │ └── page.tsx # AI Assistant chat page
│ ├── auth/
│ │ ├── signin/page.tsx # Sign in page
│ │ └── signup/page.tsx # Sign up page
│ ├── dashboard/
│ │ └── page.tsx # User dashboard
│ ├── settings/
│ │ └── page.tsx # User settings
│ ├── upload/
│ │ └── page.tsx # Upload interface
│ ├── globals.css # Global styles and theme
│ ├── layout.tsx # Root layout with providers
│ └── page.tsx # Landing page
├── components/
│ ├── ui/ # shadcn/ui components
│ ├── analysis-results.tsx # Analysis display component
│ ├── export-pdf-button.tsx # Export functionality
│ ├── image-upload.tsx # File upload with clipboard
│ ├── navbar.tsx # Navigation with theme toggle
│ ├── protected-route.tsx # Auth protection wrapper
│ └── ... # Other components
├── lib/
│ ├── analysis-context.tsx # Analysis state management
│ ├── auth-context.tsx # Authentication state
│ ├── theme-context.tsx # Theme state management
│ ├── keyboard-shortcuts.tsx # Global keyboard shortcuts
│ ├── types.ts # TypeScript interfaces
│ └── utils.ts # Utility functions
├── public/ # Static assets
└── README.md # Project documentation

## Key Features Explained

### AI Analysis Pipeline

1. **Image Upload** - User uploads design file (PNG, JPG, WebP) or pastes from clipboard
2. **Base64 Conversion** - File converted to base64 for API transmission
3. **AI Processing** - Google Gemini 2.0 Flash analyzes the design
4. **Structured Response** - AI returns JSON with issues, scores, and recommendations
5. **Visual Display** - Results shown with category scores and filterable issues
6. **Persistence** - Analysis saved to localStorage with metadata

### Analysis Categories

**Accessibility**
- Color contrast ratios (WCAG compliance)
- Text size and readability
- Touch target sizes
- Screen reader compatibility
- Keyboard navigation

**Usability**
- Navigation clarity
- User flow optimization
- Interactive element sizing
- Information hierarchy
- Error prevention

**Visual Design**
- Typography hierarchy
- Color palette coherence
- Spacing consistency
- Visual balance
- Brand consistency

**Layout**
- Grid usage and alignment
- Responsive design
- Content structure
- White space utilization
- Mobile optimization

### Severity Levels

- **Critical** (Red) - Issues that significantly impact usability or accessibility
- **High** (Orange) - Important issues that should be addressed soon
- **Medium** (Yellow) - Moderate issues worth addressing
- **Low** (Blue) - Minor suggestions for improvement

### AI Assistant

The AI Assistant provides:
- Real-time UX guidance and best practices
- Answers to design questions
- Recommendations for specific scenarios
- Industry standards and guidelines
- Conversational interface with chat history

## Customization

### Changing the Theme

Edit `app/globals.css` to customize colors:

\`\`\`css
@theme inline {
  --color-primary: oklch(0.55 0.22 255);
  --color-background: oklch(0.09 0 0);
  --color-foreground: oklch(0.98 0 0);
  /* ... other tokens */
}
\`\`\`

### Adding New Analysis Categories

1. Update the AI prompt in `app/api/analyze/route.ts`
2. Add new category types to `lib/types.ts`
3. Update the results display in `components/analysis-results.tsx`

### Customizing AI Behavior

Modify the prompt in `app/api/analyze/route.ts`:

\`\`\`typescript
const prompt = `You are a UX expert analyzing a design...
// Add your custom instructions here
`
\`\`\`

### Keyboard Shortcuts

Modify shortcuts in `lib/keyboard-shortcuts.tsx`:

\`\`\`typescript
// Add new shortcuts
if ((e.metaKey || e.ctrlKey) && e.key === 'your-key') {
  e.preventDefault()
  // Your action here
}
\`\`\`

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in project settings
   - Deploy

3. **Set Environment Variables**
   - Add `GOOGLE_GENERATIVE_AI_API_KEY` in Vercel dashboard
   - Ensure the key is accessible in production

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Yes | Google AI (Gemini) API key for analysis |

## Troubleshooting

### AI Analysis Not Working

- **API Key**: Verify your Gemini API key is correct in `.env.local`
- **API Quota**: Check your Google AI Studio quota and usage
- **Mock Data Fallback**: The app shows demo data if AI is unavailable
- **Browser Console**: Check for error messages in the browser console
- **Network**: Ensure you have internet connectivity

### Theme Not Persisting

- Check browser localStorage is enabled
- Clear browser cache and try again
- Verify `theme-context.tsx` is properly imported in layout

### Keyboard Shortcuts Not Working

- Ensure `keyboard-shortcuts.tsx` is imported in layout
- Check for conflicting browser shortcuts
- Try different key combinations

### Data Not Saving

- Verify localStorage is enabled in your browser
- Check browser storage quota
- Clear old data if storage is full

## Performance Optimization

- Images optimized with Next.js Image component
- Server-side AI processing (API keys not exposed)
- Lazy loading for heavy components
- Efficient state management with Context API
- localStorage for fast data retrieval

## Security Considerations

- API keys stored in environment variables (never in code)
- Server-side AI processing (API keys not exposed to client)
- Input validation on file uploads
- Protected routes with authentication
- Client-side data encryption for sensitive information

## Future Enhancements

- [ ] Figma plugin integration
- [ ] Batch analysis for multiple designs
- [ ] Historical trend tracking
- [ ] Team collaboration features
- [ ] Custom analysis templates
- [ ] PDF report generation (currently HTML)
- [ ] Integration with design tools (Sketch, Adobe XD)
- [ ] A/B testing comparison
- [ ] Real-time collaboration
- [ ] Mobile app version
- [ ] Database integration (Supabase/Neon)
- [ ] Advanced analytics dashboard
- [ ] Custom AI training on brand guidelines

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Font by [Vercel Geist](https://vercel.com/font)

---

**Made with care for designers and developers**
