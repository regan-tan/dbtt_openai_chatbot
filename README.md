# 💬 DBTT OpenAI Chatbot

A sleek and responsive chatbot interface powered by OpenAI's GPT models. This project enables users to interact with an AI assistant using natural language directly from a browser-based interface. This is customised for our DBTT project for Elijah Pies.

## 🚀 Features

- GPT-powered AI chatbot
- Beautiful UI built with React and TailwindCSS
- Easy customization for personal or business use
- TypeScript support for modern development

## 📦 Project Structure

project/ ├── src/ │ ├── App.tsx │ ├── main.tsx │ └── ... ├── index.html ├── package.json └── ...


## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/your-username/dbtt_openai_chatbot.git
cd dbtt_openai_chatbot-main/project

2. Install dependencies
npm install

3. Create a .env file
⚠️ The .env file is NOT included in this repository.
You must create your own .env file with your OpenAI API key for the chatbot to function.

Create a .env file in the project/ directory with the following contents:
ini

VITE_OPENAI_API_KEY=your_openai_api_key_here
You can obtain your OpenAI API key from: https://platform.openai.com/account/api-keys

4. Run the development server
bash

npm run dev
Then open your browser and navigate to:
http://localhost:5173
to start chatting with the AI bot!

📄 License
This project is for educational and personal use only. You are free to extend or modify it as needed.
