# 💕 Thought Drop

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

> A beautiful, customizable web app for couples to share thoughts, feelings, and daily experiences in a private, secure way.

## 🌟 What is Thought Drop?

Thought Drop is a modern web application designed for couples who want to maintain emotional connection through thoughtful communication. It provides a safe, private space where partners can share their feelings, daily experiences, and thoughts without the noise of social media.

### ✨ Key Features

- **🎭 Emotional State Tracking** - Express how you feel with intuitive emoji sliders
- **💬 Personalized Messaging** - Share thoughts with customizable partner nicknames
- **📊 Emotion Meters** - Track different aspects of your emotional state
- **🏷️ Event Tagging** - Mark important moments and experiences
- **📧 Email Notifications** - Receive thoughts directly in your inbox
- **🌙 Dark Mode** - Beautiful interface that adapts to your preference
- **📱 Responsive Design** - Works perfectly on all devices
- **🔒 Privacy First** - No data storage, direct email delivery, no tracking

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- EmailJS account (free)

### 1. Clone and Install
```bash
git clone https://github.com/vaibhavbansal/thought-drop.git
cd thought-drop
npm install
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp docs/env.example .env.local

# Edit .env.local with your settings
VITE_APP_AUTHOR=Your Name
VITE_NAME_OPTIONS=Princess,Baby,Good girl,Sweetheart,Love
```

### 3. Set Up EmailJS (Required)
1. Create a free account at [EmailJS](https://dashboard.emailjs.com)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Add your credentials to `.env.local`:
```bash
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_APP_ENV=production
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) and start sharing thoughts! 💕

## 🛠️ Customization Options

### Essential Customizations (Required)
- **`VITE_APP_AUTHOR`** - Your name (appears in meta tags)
- **`VITE_NAME_OPTIONS`** - Partner nicknames (comma-separated)

### Advanced Customizations (Optional)
Uncomment these in `.env.local` to customize further:
```bash
# App Branding
VITE_APP_NAME=thought-drop
VITE_APP_TITLE=Thought Drop
VITE_APP_DISPLAY_NAME=Thought Drop
VITE_APP_SUBTITLE=A safe space for your heart
VITE_APP_DESCRIPTION=A safe space for your thoughts

# Emotion Customization
VITE_EMOTION_EMOJIS=😢,😔,😕,😠,😐,😊,😄,😍,🥰,😈
VITE_EMOTION_LABELS=Very Sad,Sad,Down,Angry,Neutral,Happy,Joyful,Loving,Adoring,Naughty

# Event Types
VITE_EVENT_OPTIONS=Small win 🌟,Tough moment 💭,Need a hug 🤗,Proud of myself ✨,Other

# Response Types
VITE_RESPONSE_OPTIONS=Listen only,Advice welcome,Hype me up,Check on me later
```

## 🚀 Deployment

### Option 1: Netlify (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Add environment variables in Netlify dashboard
4. Deploy automatically on every push

### Option 2: Vercel
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Option 3: Manual Deployment
```bash
# Build for production
npm run build

# Upload the 'dist' folder to your web server
```

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form
- **Email**: EmailJS
- **Icons**: Lucide React

## 📁 Project Structure

```
thought-drop/
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Configuration and utilities
│   ├── pages/              # Page components
│   └── types/              # TypeScript type definitions
├── docs/
│   └── env.example         # Environment variables template
├── public/                 # Static assets
└── README.md
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Variables
See `docs/env.example` for all available configuration options.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Important: Proper Attribution

**Please respect the original work:**

- ✅ **Keep the LICENSE file** - Don't remove or modify it
- ✅ **Maintain copyright notices** - Keep attribution to the original author
- ✅ **Credit the original project** - If you share your version, mention it's based on Thought Drop

**What this means:**
- You can customize it for your relationship
- You can deploy it for personal use
- You can share it with friends
- You can even use it commercially
- **But please don't claim you created the original app**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with love for couples who want to stay connected
- Inspired by the need for private, meaningful communication
- Thanks to all the open-source libraries that made this possible

## 💝 Support

If you found this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code

---

**Made with 💕 for staying connected**
