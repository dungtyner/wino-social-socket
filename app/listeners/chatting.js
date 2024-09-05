const listenerChatting = async (account) => {
  await global.nspChat.on('connect', async (socket) => {
    await account.list_id_box_chat.forEach(async (el) => {
      socket.join(`CHAT_${el}`);
      await socket.on(`IN_${el}_NO_TYPING`, (accountTyping) => {
        socket.broadcast
          .to(`CHAT_${el}`)
          .emit(`IN_${el}_NO_TYPING`, accountTyping);
      });
      await socket.on(`IN_${el}_PEOPLE_TYPING`, (account) => {
        socket.broadcast.to(`CHAT_${el}`).emit(`PEOPLE_${el}_TYPING`, account);
      });
    });
    socket.on('disconnect', () => {
      socket.removeAllListeners();
    });
  });

  await global.io.of('/chat').fetchSockets();
};

module.exports = listenerChatting;
