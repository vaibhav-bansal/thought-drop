# Thought Drop

A safe space for sharing your thoughts and feelings.

## Project Overview

Thought Drop is a web application that provides a secure and private way to share your thoughts, feelings, and daily experiences. Built with modern web technologies, it offers a beautiful and intuitive user interface for emotional expression.

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- EmailJS (for email notifications)

## Development Setup

1. Clone the repository:
```sh
git clone <repository-url>
cd thought-drop
```

2. Install dependencies:
```sh
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local` for production
   - Copy `.env.example` to `.env.test` for testing
   - Update the variables with your EmailJS credentials

4. Start the development server:
```sh
# For production environment
npm run dev

# For test environment
npm run dev -- --mode test
```

## Building for Production

```sh
npm run build
```

## Environment Variables

Required environment variables:
- `VITE_EMAILJS_PUBLIC_KEY`: Your EmailJS public key
- `VITE_EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID

Optional test environment variables:
- `VITE_EMAILJS_TEST_TEMPLATE_ID`: Test template ID
- `VITE_APP_ENV`: Set to 'test' for test environment

## Features

- Emotional state tracking
- Customizable name selection
- Multiple emotion meters
- Event tagging
- Private messaging
- Email notifications
- Dark mode support
- Responsive design

## Security

- No data storage on servers
- Direct email delivery
- No tracking or analytics
- Private and secure communication

## License

Private - All rights reserved
