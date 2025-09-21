# 🚀 Thought Drop - Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Local Testing
- [ ] App runs locally (`npm run dev`)
- [ ] Form submission works (test mode is fine)
- [ ] All customizations are in `public/config/app.json`
- [ ] Build succeeds (`npm run build`)

### 2. Configuration
- [ ] Copied `app.example.json` to `app.json`
- [ ] Updated `app.author` with your name
- [ ] Updated `personalization.nameOptions` with partner nicknames
- [ ] (Optional) Set up EmailJS for production emails

### 3. Code Ready
- [ ] All changes committed to git
- [ ] Code pushed to GitHub repository
- [ ] No sensitive information in code

## 🚀 Deployment Options

### Option A: Netlify (Recommended - 2 minutes)
1. [ ] Go to [netlify.com](https://netlify.com)
2. [ ] Click "New site from Git"
3. [ ] Connect GitHub account
4. [ ] Select your repository
5. [ ] Click "Deploy site"
6. [ ] **Done!** Your app is live

### Option B: Vercel (Alternative - 2 minutes)
1. [ ] Go to [vercel.com](https://vercel.com)
2. [ ] Click "New Project"
3. [ ] Import your repository
4. [ ] Click "Deploy"
5. [ ] **Done!** Your app is live

### Option C: Manual (Any web server)
1. [ ] Run `npm run build`
2. [ ] Upload `dist` folder to your web server
3. [ ] **Done!** Your app is live

## 📧 EmailJS Setup (Optional)

### For Production Emails
1. [ ] Create EmailJS account at [dashboard.emailjs.com](https://dashboard.emailjs.com)
2. [ ] Create email service (Gmail, Outlook, etc.)
3. [ ] Create email template with these variables:
   - `{{feeling_emoji}}` - Selected emoji
   - `{{feeling_label}}` - Emotion label
   - `{{name}}` - Partner's name
   - `{{miss_you_meter}}` - Miss You meter value
   - `{{events}}` - Selected events
   - `{{message}}` - Optional message
   - `{{response_type}}` - Response preference
   - `{{timestamp}}` - Send time
4. [ ] Update `public/config/app.json` with credentials:
   ```json
   {
     "emailjs": {
       "publicKey": "your_public_key",
       "serviceId": "your_service_id",
       "templateId": "your_template_id",
       "appEnv": "production"
     }
   }
   ```
5. [ ] Push changes to trigger new deployment

## 🎯 Post-Deployment

### Testing Your Live App
- [ ] Visit your deployed URL
- [ ] Test form submission
- [ ] Check if emails are received (if EmailJS configured)
- [ ] Test on mobile device
- [ ] Share with your partner! 💕

### Custom Domain (Optional)
- [ ] In Netlify/Vercel: Add custom domain
- [ ] Update DNS records as instructed
- [ ] Wait for SSL certificate (automatic)

## 🔧 Troubleshooting

### Common Issues
- **"Failed to send thought drop"**: Normal in test mode, set up EmailJS for production
- **App shows default settings**: Check `public/config/app.json` exists and is valid JSON
- **Build fails**: Run `npm run type-check` and `npm run lint` locally first

### Getting Help
- Check browser console (F12) for errors
- Validate JSON at [jsonlint.com](https://jsonlint.com)
- Check deployment platform logs

---

**🎉 Congratulations! Your Thought Drop app is now live and ready to strengthen your relationship! 💕**
