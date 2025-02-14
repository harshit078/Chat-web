"use strict";

const { Server } = require("socket.io");

const SOCKET_EVENTS = {
  CONNECTION: "connection",
  JOIN: "join",
  SEND_MESSAGE: "sendMessage",
  DISCONNECT: "disconnect",
  UPDATE_ACTIVE_USERS: "updateActiveUsers",
};

module.exports = {
  register(/*{ strapi }*/) {},

  bootstrap({ strapi }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*",
      },
    });

    strapi.io = io;
    const activeUsers = new Set();

    io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
      console.log("A user connected");

      socket.on(SOCKET_EVENTS.JOIN, handleJoin(socket, activeUsers, io));
      socket.on(SOCKET_EVENTS.SEND_MESSAGE, handleSendMessage(strapi));
      socket.on("typing", ({ username }) => {
        socket.broadcast.emit("typing", { username });
      });
      socket.on(
        SOCKET_EVENTS.DISCONNECT,
        handleDisconnect(socket, activeUsers, io)
      );
    });
  },
};

// Handler for user joining
const handleJoin =
  (socket, activeUsers, io) =>
  ({ username }) => {
    console.log(`${username} joined the chat`);
    socket.username = username;
    activeUsers.add(username);
    io.emit(SOCKET_EVENTS.UPDATE_ACTIVE_USERS, Array.from(activeUsers));
  };

// Handler for sending messages
const handleSendMessage =
  (strapi) =>
  async ({ username, text }) => {
    try {
      const message = await strapi.controllers[
        "api::message.message"
      ].createMessage({
        request: {
          body: {
            content: text,
            sender: username,
          },
        },
      });
      console.log("Message created via socket:", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

// Handler for user disconnecting
const handleDisconnect = (socket, activeUsers, io) => () => {
  if (socket.username) {
    activeUsers.delete(socket.username);
    io.emit(SOCKET_EVENTS.UPDATE_ACTIVE_USERS, Array.from(activeUsers));
    console.log(`${socket.username} disconnected`);
  }
};
