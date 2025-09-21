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
- **💬 Personalized Messaging** - Share thoughts with customizable partner nicknames (optional message)
- **💕 Miss You Meter** - Express how much you miss your partner
- **🏷️ Event Tagging** - Mark important moments and experiences
- **📧 Email Notifications** - Receive thoughts directly in your inbox
- **🌙 Dark Mode** - Beautiful interface that adapts to your preference
- **📱 Responsive Design** - Works perfectly on all devices
- **🔒 Privacy First** - No data storage, direct email delivery, no tracking

## 🚀 Quick Start (3 Steps)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone and Install
```bash
git clone https://github.com/vaibhavbansal/thought-drop.git
cd thought-drop
npm install
```

### 2. Configure Your App
```bash
# Copy the example configuration file
cp public/config/app.example.json public/config/app.json

# Edit public/config/app.json with your settings
# At minimum, update app.author and personalization.nameOptions
```

### 3. Start Development Server
```bash
npm run dev
```

**🎉 That's it!** Open [http://localhost:8081](http://localhost:8081) and start sharing thoughts! 💕

> **💡 Test Mode**: The app works out-of-the-box in test mode. No EmailJS setup required for testing!

## 🛠️ Customization Options

All customization is done through the `public/config/app.json` file. Here's what you can customize:

### Essential Customizations (Required)
- **`app.author`** - Your name (appears in meta tags)
- **`personalization.nameOptions`** - Partner nicknames (array of strings)

### Advanced Customizations (Optional)
```json
{
  "app": {
    "author": "Your Name",
    "name": "thought-drop",
    "title": "Thought Drop",
    "displayName": "Thought Drop",
    "subtitle": "A safe space for your heart",
    "description": "A safe space for your thoughts"
  },
  "personalization": {
    "nameOptions": ["Princess", "Baby", "Good girl", "Sweetheart", "Love"],
    "emotionEmojis": ["😢", "😔", "😕", "😠", "😐", "😊", "😄", "😍", "🥰", "😈"],
    "emotionLabels": ["Very Sad", "Sad", "Down", "Angry", "Neutral", "Happy", "Joyful", "Loving", "Adoring", "Naughty"],
    "meters": {
      "missYou": { "label": "Miss You Meter", "min": 0, "max": 10, "default": 5 }
    },
    "eventOptions": ["Small win 🌟", "Tough moment 💭", "Need a hug 🤗", "Proud of myself ✨", "Other"],
    "responseOptions": ["Listen only", "Advice welcome", "Hype me up", "Check on me later"]
  }
}
```

## 📧 EmailJS Setup (For Production)

**Skip this if you're just testing!** The app works in test mode by default.

### Quick EmailJS Setup
1. **Create account** at [EmailJS](https://dashboard.emailjs.com) (free)
2. **Create email service** (Gmail, Outlook, etc.)
3. **Create email template** with these variables:
   - `{{feeling_emoji}}` - The emoji selected
   - `{{feeling_label}}` - The emotion label
   - `{{name}}` - Partner's chosen name
   - `{{miss_you_meter}}` - Miss You meter value
   - `{{events}}` - Selected events
   - `{{message}}` - Optional message
   - `{{response_type}}` - How they want you to respond
   - `{{timestamp}}` - When it was sent
4. **Update `public/config/app.json`**:
```json
{
  "emailjs": {
    "publicKey": "your_public_key_here",
    "serviceId": "your_service_id_here", 
    "templateId": "your_template_id_here",
    "appEnv": "production"
  }
}
```

## 🚀 Deploy Your App

### Option 1: Netlify (Easiest)
1. **Push to GitHub** (if not already there)
2. **Go to [Netlify](https://netlify.com)** → "New site from Git"
3. **Connect your repo** → Deploy automatically
4. **Done!** Your app is live

### Option 2: Vercel
1. **Push to GitHub** (if not already there)  
2. **Go to [Vercel](https://vercel.com)** → "New Project"
3. **Import your repo** → Deploy automatically
4. **Done!** Your app is live

### Option 3: Manual Deployment
```bash
npm run build
# Upload the 'dist' folder to any web server
```

## 📋 Step-by-Step Deployment Guide

### For Complete Beginners

**1. Get Your Code Ready**
```bash
# Make sure your app works locally first
npm run dev
# Test it at http://localhost:8081
```

**2. Push to GitHub** (if not already there)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

**3. Deploy with Netlify** (Recommended)
- Go to [netlify.com](https://netlify.com)
- Click "New site from Git"
- Connect your GitHub account
- Select your `thought-drop` repository
- Click "Deploy site"
- **Done!** Your app is live at `https://your-app-name.netlify.app`

**4. Configure EmailJS** (Optional)
- Follow the EmailJS setup section above
- Update `public/config/app.json` with your credentials
- Push changes to GitHub (Netlify auto-deploys)

**5. Custom Domain** (Optional)
- In Netlify: Site settings → Domain management
- Add your custom domain
- Update DNS records as instructed

### 🎯 That's It!
Your Thought Drop app is now live and ready to use! 💕

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5.4.20
- **Styling**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form
- **Email**: EmailJS
- **Icons**: Lucide React (latest)
- **Configuration**: JSON-based config system

## 📁 Project Structure

```
thought-drop/
├── src/
│   ├── components/          # React components
│   ├── lib/                 # Configuration and utilities
│   ├── pages/               # Page components
│   └── types/               # TypeScript type definitions
├── public/
│   └── config/              # JSON configuration files
│       ├── app.json         # Main configuration
│       └── app.example.json # Example configuration
└── README.md
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server (port 8081)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Configuration System
All configuration is done through JSON files in `public/config/`:
- **`app.json`** - Your main configuration file
- **`app.example.json`** - Example configuration with sample values

No environment variables needed! 🎉

## 🆕 Recent Updates

### v2.1 - Test Mode & Simplified Deployment
- ✅ **Added Test Mode** - App works out-of-the-box without EmailJS setup
- ✅ **Simplified README** - Clear 3-step setup process
- ✅ **Step-by-step deployment guide** - Perfect for beginners
- ✅ **Better troubleshooting** - Quick fixes for common issues
- ✅ **Enhanced user experience** - No more confusing errors during testing

### v2.0 - JSON Configuration System
- ✅ **Migrated from environment variables to JSON config files**
- ✅ **Added configurable Miss You meter** (unique emotional aspect for couples)
- ✅ **Improved configuration validation** with fallbacks
- ✅ **Updated all dependencies** to latest versions
- ✅ **Enhanced code quality** with better TypeScript types
- ✅ **Simplified deployment** - no more `.env` files needed
- ✅ **Added scroll-to-error functionality** - Automatically scrolls to first validation error

### Key Improvements
- **🎯 Easier Setup**: Copy one JSON file instead of managing environment variables
- **🔧 Better Customization**: Configure emotions, Miss You meter, and all options in one place
- **📦 Cleaner Codebase**: Removed unused code and improved type safety
- **🚀 Faster Development**: Hot reloading for configuration changes
- **🛡️ More Robust**: Automatic validation and fallback configurations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔧 Troubleshooting

### Quick Fixes

**❌ "Failed to send thought drop" error**
- **Solution**: App is in test mode by default. This is normal!
- **To fix**: Set up EmailJS (see EmailJS Setup section) or ignore the error - it's just testing

**❌ App shows default configuration instead of my settings**
- **Check**: Did you copy `app.example.json` to `app.json`?
- **Check**: Is your JSON syntax valid? (use a JSON validator)
- **Check**: File location is `public/config/app.json`

**❌ Development server won't start**
- **Try**: `npm install` (reinstall dependencies)
- **Try**: Different port - Vite will auto-find available port
- **Try**: `npm run build` (check for errors)

**❌ Build fails**
- **Run**: `npm run type-check` (TypeScript errors)
- **Run**: `npm run lint` (code quality issues)
- **Check**: All files exist and imports are correct

### Getting Help
- **Browser Console**: Press F12 → Console tab for error messages
- **Terminal**: Check for error messages when running commands
- **JSON Validator**: Use [jsonlint.com](https://jsonlint.com) to validate your config

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
- 🐛 Reporting bugs or configuration issues
- 💡 Suggesting new features or improvements
- 🤝 Contributing code or documentation
- 📝 Sharing your custom configurations

### Feature Requests
We're always looking to improve! Some ideas for future features:
- 📊 Analytics dashboard for relationship insights
- 🎨 Custom themes and color schemes
- 📱 Mobile app version
- 🔔 Push notifications
- 📅 Calendar integration for special dates

---

**Made with 💕 for staying connected**
