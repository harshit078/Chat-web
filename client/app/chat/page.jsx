"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";
import Logout from "@/components/shared/Logout";
import Message from "@/components/shared/Message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import ThemeButton from "@/components/shared/ThemeButton";
import { motion, AnimatePresence } from "framer-motion";

const STRAPI_URL = "https://committed-desk-9b61e987b3.strapiapp.com";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const socketRef = useRef();
  const messageContainerRef = useRef(null);
  const username = getCookie("username");
  const [typingUser, setTypingUser] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${STRAPI_URL}/api/messages/recent`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleNewMessage = useCallback((message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleTyping = () => {
    socketRef.current.emit("typing", { username });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socketRef.current = io(STRAPI_URL);

    socketRef.current.on("connect", () => {
      fetchMessages();
    });

    socketRef.current.on("message", handleNewMessage);

    socketRef.current.on("updateActiveUsers", (users) => {
      setActiveUsers(users);
    });

    socketRef.current.on("typing", ({ username }) => {
      setTypingUser(username);
    });

    if (username) {
      socketRef.current.emit("join", { username });
    }

    setIsLoggedIn(hasCookie("jwt", { path: "/" }));

    return () => {
      if (socketRef.current) {
        socketRef.current.off("message", handleNewMessage);
        socketRef.current.disconnect();
      }
    };
  }, [handleNewMessage, username]);

  const playSendMessageSound = () => {
    const audio = new Audio("/send-message.mp3"); // Path to your sound file
    audio.play();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage && username) {
      try {
        socketRef.current.emit("sendMessage", { username, text: inputMessage });
        setInputMessage("");
        playSendMessageSound();
        setTypingUser(null);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="h-screen p-1 w-full bg-gray-100 dark:bg-gray-900 flex flex-col">
      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="leading-[100%] text-4xl tracking-tight font-semibold text-gray-800 dark:text-white">
          Chat Room
        </h1>
        <div className="flex gap-4">
          <ThemeButton />
          {isLoggedIn && <Logout />}
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm flex gap-2 items-center"
        >
          <span className="font-medium">Active Users:</span>
          <AnimatePresence>
            {activeUsers.map((user, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="px-3 py-1 rounded-full text-xs bg-blue-600 text-white"
              >
                {user}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Message bubble */}
        <div
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-800 space-y-4"
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Message username={username} message={message} />
              </motion.div>
            ))}
          </AnimatePresence>
          {typingUser && (
            <div className="text-gray-500 italic">
              {typingUser} is typing...
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-3 bg-white dark:bg-gray-800 shadow-lg sticky bottom-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-full bg-gray-100 dark:bg-gray-700 px-4 text-gray-800 dark:text-white placeholder:text-gray-500 focus:ring-blue-500"
            />
            <Button
              type="submit"
              className="rounded-full bg-green-500 px-6 hover:bg-green-700"
              disabled={!inputMessage.trim()}
            >
              <PaperPlaneIcon />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
