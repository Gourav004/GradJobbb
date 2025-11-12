import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Navbar from "./Components/Navbar.jsx";
import "../App.css";
import "../index.css";
import { SyncLoader } from "react-spinners";
import Markdown from "react-markdown";

function App() {
  // ✅ Initialize Gemini client
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCQPiXsd1NeZOLiADsWE2s1qb_1C7E9YjY",
  });

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi! I’m your AI assistant 🤖" },
  ]);
  const [loading, setLoading] = useState(false);

  // ✅ Function to get AI response
  async function getResponse() {
    if (!prompt.trim()) return;
    setLoading(true);

    const newMessages = [...messages, { role: "user", content: prompt }];
    setMessages(newMessages);
    setPrompt("");

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      let outputText = "";
      if (result?.response?.text) {
        outputText = await result.response.text();
      } else if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
        outputText = result.candidates[0].content.parts[0].text;
      } else {
        outputText = "⚠️ Unexpected response format.";
      }

      setMessages([...newMessages, { role: "ai", content: outputText }]);
    } catch (err) {
      console.error("Gemini Error:", err);
      setMessages([
        ...newMessages,
        { role: "ai", content: "Something went wrong 😢" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center">
      <Navbar />

      {/* 💬 Chat Area (like ChatGPT layout) */}
      <div className="flex-1 w-full max-w-4xl px-4 sm:px-6 pt-24 pb-32 overflow-y-auto space-y-4">
        {messages.map((item, i) => (
          <div
            key={i}
            className={`flex w-full ${
              item.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                item.role === "user"
                  ? "max-w-[75%] sm:max-w-[55%] bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none"
                  : "w-[95%] sm:max-w-[80%] bg-zinc-900 text-gray-100 rounded-bl-none"
              } p-3 sm:p-4 rounded-2xl text-[15px] leading-relaxed shadow-md`}
            >
              <Markdown>{item.content}</Markdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-100 rounded-2xl p-3 w-[95%] sm:max-w-[80%]">
              <SyncLoader color="#00FFFF" size={5} />
            </div>
          </div>
        )}
      </div>

      {/* 📝 Input Bar (fixed at bottom, full width) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-[#111] border-t border-gray-800 p-1 sm:p-4 shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-center bg-[#1e1e1e] w-full px-3 sm:px-5 py-1 sm:py-3 rounded-xl border border-gray-600 focus-within:border-cyan-400 transition">
          <input
            type="text"
            placeholder="Type your message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getResponse()}
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-[15px] sm:text-[17px]"
          />

          <button
            onClick={getResponse}
            disabled={loading}
            className="ml-2 sm:ml-3 px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-semibold text-black 
                       bg-gradient-to-r from-cyan-400 to-blue-400 
                       rounded-lg hover:from-cyan-500 hover:to-blue-300 
                       active:scale-95 transition-all duration-200 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              "..."
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                <path d="m21.854 2.147-10.94 10.939" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
