# BloomWise - AI Flower Shop Assistant

## Setup AI Diagnosis (Gemini API)

This project features a secure Node.js backend to perform REAL AI-powered flower analysis without exposing API keys in the browser.

### 1. Get a Gemini API Key
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
- Sign in with your Google account and click **Create API Key**.
- Copy the generated API key.

### 2. Configure Environment Variables
- In the root of the project, navigate to the `server/` directory.
- Rename `server/.env.example` to `server/.env` (or create a new `.env` file).
- Add your API key to the file:
  ```
  GEMINI_API_KEY=your_actual_key_here
  PORT=3000
  ```
- ⚠️ **WARNING**: Never commit the `.env` file to GitHub or any public repository! It is already excluded in `.gitignore`.

### 3. Start the Project
Run the following command to start both the React frontend and the Express backend simultaneously:
```bash
npm run dev
```

### 4. Test the Upload
- Go to **AI Diagnosis** in the sidebar.
- Upload a flower image (JPG, PNG, WEBP).
- Click **Analyze Flower** and wait for the Gemini AI to process and return structured results!
