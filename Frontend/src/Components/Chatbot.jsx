import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import Navbar from "./Components/Navbar.jsx";
import "./App.css";
import "./index.css";
import { SyncLoader } from "react-spinners";
import Markdown from "react-markdown";

function App() {
  // ✅ Initialize Gemini client
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCQPiXsd1NeZOLiADsWE2s1qb_1C7E9YjY",
  });

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Hello! I am **UI Forge AI**. How can I help you craft code today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); // For auto-scrolling

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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
        { role: "ai", content: "Something went wrong. Please try again. 😢" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#050505] min-h-screen flex flex-col relative font-sans text-gray-100 selection:bg-cyan-500/30">
      <Navbar />

      {/* 💬 Chat Area */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-36 overflow-y-auto space-y-6 scroll-smooth">
        {messages.map((item, i) => {
          const isUser = item.role === "user";

          return (
            <div
              key={i}
              className={`flex w-full ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative max-w-[90%] sm:max-w-[85%] p-4 sm:p-6 rounded-2xl text-[15px] shadow-lg
                  ${
                    isUser
                      ? "bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-br-md border border-cyan-500/30"
                      : "styled-response rounded-bl-md" // ✅ Uses our Custom CSS Class here
                  }`}
              >
                {/* If it's User, just text. If AI, use Markdown */}
                {isUser ? (
                  <p className="leading-relaxed font-medium">{item.content}</p>
                ) : (
                  <Markdown>{item.content}</Markdown>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start w-full">
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4 w-fit shadow-lg flex items-center gap-3">
              <span className="text-cyan-400 text-sm font-mono animate-pulse">
                AI Thinking...
              </span>
              <SyncLoader color="#22d3ee" size={6} margin={3} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 📝 Input Bar (Floating & Glassmorphism) */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pb-6 pt-10 px-4 pointer-events-none flex justify-center">
        <div className="pointer-events-auto w-full max-w-4xl bg-[#111]/80 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-2xl shadow-cyan-900/20 p-2 flex items-center gap-2 transition-all focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/20">
          <input
            type="text"
            placeholder="Ask anything about Code..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getResponse()}
            className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 outline-none text-[16px] px-4 py-3"
          />

          <button
            onClick={getResponse}
            disabled={loading || !prompt.trim()}
            className="px-4 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-spin block text-lg">⟳</span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
