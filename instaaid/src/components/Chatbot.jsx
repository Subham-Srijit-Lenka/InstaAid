import React, { useState, useRef, useEffect } from "react";
import Layout from "./layout/Layout";
import axios from "axios";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    { id: Date.now(), sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    const userMessage = { id: Date.now(), sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    const typingId = Date.now() + 1;
    setIsTyping(true);
    setMessages((prev) => [
      ...prev,
      { id: typingId, sender: "bot", text: "🤖 Bot is typing..." },
    ]);

    try {
      const res = await axios.post("/api", { message: trimmed });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingId
            ? {
                ...msg,
                text: res.data?.response || "No response from bot",
              }
            : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingId ? { ...msg, text: "Error contacting bot" } : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Layout>
      <div className="grid place-content-center my-[-60px] min-h-screen min-w-screen bg-gray-100">
        <div className="w-[350px] h-[75vh] flex flex-col border-2 border-blue-400 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.7)] bg-white overflow-hidden">
          <div className="bg-blue-500 text-white text-center py-3 font-semibold text-lg shadow-md">
            FirstAid Chatbot
          </div>

          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-gradient-to-b from-blue-50 to-white"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`px-3 py-2 rounded-lg max-w-[70%] text-sm shadow-md ${
                  msg.sender === "user"
                    ? "self-end bg-blue-500 text-white"
                    : "self-start bg-gray-200 text-gray-900"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex p-3 border-t border-gray-200 bg-gray-50">
            <input
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="userinput"
              name="userinput"
              type="text"
              value={userInput}
              placeholder="Type your question..."
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
