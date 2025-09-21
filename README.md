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

### 2. Configure Your App
```bash
# Copy the example configuration file
cp public/config/app.example.json public/config/app.json

# Edit public/config/app.json with your settings
# Update the app.author and personalization.nameOptions
```

### 3. Set Up EmailJS (Required)
1. Create a free account at [EmailJS](https://dashboard.emailjs.com)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Add your credentials to `public/config/app.json`:
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

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:8081](http://localhost:8081) and start sharing thoughts! 💕

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

## 🚀 Deployment

### Option 1: Netlify (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Deploy automatically on every push
4. Update `public/config/app.json` with your settings

### Option 2: Vercel
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push
4. Update `public/config/app.json` with your settings

### Option 3: Manual Deployment
```bash
# Build for production
npm run build

# Upload the 'dist' folder to your web server
```

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

### Common Issues

**Q: The app shows default configuration instead of my custom settings**
- Make sure you've copied `app.example.json` to `app.json`
- Check that your JSON syntax is valid (no trailing commas, proper quotes)
- Verify the file is in `public/config/app.json`

**Q: EmailJS is not working**
- Ensure your EmailJS credentials are correctly set in `app.json`
- Check that your EmailJS service and template are active
- Verify your public key, service ID, and template ID are correct

**Q: Development server won't start**
- Run `npm install` to ensure all dependencies are installed
- Check that port 8081 is not already in use
- Try `npm run build` to check for compilation errors

**Q: Build fails**
- Run `npm run type-check` to check for TypeScript errors
- Run `npm run lint` to check for code quality issues
- Ensure all imports are correct and files exist

### Getting Help
- Check the browser console for error messages
- Verify your configuration file syntax
- Make sure all required fields are present in `app.json`

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
