import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { FaUser } from "react-icons/fa"; 

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const socket = io(baseUrl);

const Chat: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { text: string; timestamp: string; sender: string }[]
  >([]);
  const [typing, setTyping] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const promptUsername = prompt("Enter your username:");
      if (promptUsername) {
        sessionStorage.setItem("username", promptUsername);
        setUsername(promptUsername);
      }
    }

    if (username) {
      socket.on(
        "message",
        (data: { text: string; timestamp: string; sender: string }) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      );

      socket.on("typing", () => setTyping(true));
      socket.on("stop_typing", () => setTyping(false));
    }

    return () => {
      socket.off("message");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [username]);

  const sendMessage = () => {
    if (username) {
      const timestamp = new Date().toLocaleTimeString();
      socket.emit("message", { text: message, timestamp, sender: username });
      setMessage("");
    }
  };

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    if (event.target.value) {
      socket.emit("typing");
    } else {
      socket.emit("stop_typing");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && message.trim()) {
      sendMessage();
    }
  };

  if (!username) {
    return null; 
  }

  return (
    <div className="discord-chat">
      <div className="chat-header">
        <h2>Chat Module</h2>
        <FaUser size={24} />
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <FaUser size={20} className="user-icon" />
            <div className="message-content">
              <span className="timestamp">{msg.timestamp}</span>
              <p>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            </div>
          </div>
        ))}
        {typing && <p className="typing-indicator">Someone is typing...</p>}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={handleTyping}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
