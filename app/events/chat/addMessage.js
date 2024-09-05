const addMessage = ({ account, idChat, message }) => {
  global.nspChat.to(`CHAT_${idChat}`).emit(`PEOPLE_${idChat}_SENDING`, {
    account,
    message,
  });

  global.nspChat.to(`CHAT_${idChat}`).emit(`PEOPLE_SENDING`, {
    id_Chat: idChat,
    slug_sender: account.slug_personal,
    time_send:
      message.session_messages[message.session_messages.length - 1].time_send,
  });
};

module.exports = addMessage;
