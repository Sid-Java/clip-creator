# Cl1p Creator

A secure, one-time viewable clip creation service using cl1p.net API.

## Features

- Create one-time viewable text clips
- Secure sharing with auto-destruction after viewing
- Modern dark mode interface
- Mobile responsive design

## Deployment on Netlify

1. **Fork or Clone the Repository**
   ```bash
   git clone <repository-url>
   cd clip-creator
   ```

2. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy on Netlify**
   - Go to [Netlify](https://www.netlify.com/)
   - Sign up or login
   - Click "New site from Git"
   - Choose GitHub as your Git provider
   - Select your repository
   - Configure build settings:
     - Build command: leave empty
     - Publish directory: `.`
   - Click "Deploy site"

4. **Environment Variables**
   After deployment:
   - Go to Site settings > Build & deploy > Environment
   - Add environment variable:
     - Key: `VITE_API_TOKEN`
     - Value: Your cl1p.net API token

## Local Development

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd clip-creator
   ```

2. **Run Locally**
   - Open `index.html` in your browser
   - Or use a local server:
     ```bash
     npx serve
     ```

## API Token

To get your API token:
1. Create an account on [cl1p.net](https://cl1p.net)
2. Go to account preferences
3. Generate an API token
4. Add the token to your Netlify environment variables

## Security Note

Never commit your API token directly in the code. Always use environment variables for sensitive information. 