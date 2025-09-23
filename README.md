# Thought Drop

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

A modern web application for couples to share thoughts, feelings, and daily experiences in a private, secure way. Built with React, TypeScript, and Vite.

## Features

- **Emotional State Tracking** - Express feelings with intuitive emoji sliders
- **Personalized Messaging** - Share thoughts with customizable partner nicknames
- **Miss You Meter** - Express how much you miss your partner
- **Event Tagging** - Mark important moments and experiences
- **Email Notifications** - Receive thoughts directly in your inbox
- **Dark Mode** - Beautiful interface that adapts to your preference
- **Responsive Design** - Works perfectly on all devices
- **Privacy First** - No data storage, direct email delivery, no tracking

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vaibhavbansal/thought-drop.git
   cd thought-drop
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view the application.

The application comes pre-configured and works out of the box in test mode.

## Configuration

All customization is done through the `public/config/app.json` file. The application comes pre-configured and works out of the box, but you can customize the settings as needed.

### Essential Settings

```json
{
  "app": {
    "author": "Your Name",
    "name": "thought-drop",
    "displayName": "Thought Drop",
    "subtitle": "A safe space for your heart",
    "description": "A safe space for your thoughts"
  },
  "personalization": {
    "nameOptions": ["Princess", "Baby", "Sweetheart", "Love"],
    "emotionEmojis": ["😢", "😔", "😕", "😠", "😐", "😊", "😄", "😍", "🥰", "😈"],
    "emotionLabels": ["Very Sad", "Sad", "Down", "Angry", "Neutral", "Happy", "Joyful", "Loving", "Adoring", "Naughty"],
    "meters": {
      "missYou": {
        "label": "Miss You Meter",
        "min": 0,
        "max": 10,
        "default": 5
      }
    },
    "eventOptions": ["Small win", "Tough moment", "Need a hug", "Proud of myself", "Other"],
    "responseOptions": ["Listen only", "Advice welcome", "Hype me up", "Check on me later"]
  }
}
```

## Email Setup (Optional)

The application works in test mode by default. To enable email notifications:

1. Create an account at [EmailJS](https://dashboard.emailjs.com)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{feeling_emoji}}` - Selected emoji
   - `{{feeling_label}}` - Emotion label
   - `{{name}}` - Partner's chosen name
   - `{{miss_you_meter}}` - Miss You meter value
   - `{{events}}` - Selected events
   - `{{message}}` - Optional message
   - `{{response_type}}` - Response preference
   - `{{timestamp}}` - Send time

4. Update `public/config/app.json`:
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

## Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com) → "New site from Git"
3. Connect your repository
4. Deploy automatically

### Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) → "New Project"
3. Import your repository
4. Deploy automatically

### Manual Deployment

```bash
npm run build
# Upload the 'dist' folder to any web server
```

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure

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

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form
- **Email**: EmailJS
- **Icons**: Lucide React

## Troubleshooting

### Common Issues

**"Failed to send thought drop" error**
- This is normal in test mode. Set up EmailJS for production emails.

**App shows default configuration**
- Check that your JSON syntax is valid
- Verify the file is located at `public/config/app.json`
- The app comes pre-configured, so no copying from example files is needed

**Development server won't start**
- Try running `npm install` to reinstall dependencies
- Check for TypeScript errors with `npm run build`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you found this project helpful, please consider:
- Starring the repository
- Reporting bugs or configuration issues
- Suggesting new features or improvements
- Contributing code or documentation