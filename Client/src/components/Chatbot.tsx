import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/chat`, { message: input });
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error contacting server." }]);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-xl w-80 p-4 border border-gray-200 z-50">
      <h3 className="text-lg font-semibold mb-2">Ask Jaiswal Arts</h3>
      <div className="h-48 overflow-y-auto mb-2 space-y-1">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-1 rounded-xl ${msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l px-2 py-1"
          placeholder="Ask a question..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-3 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
