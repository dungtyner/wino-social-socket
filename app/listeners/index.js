const loadListeners = () => {
  global.nspChat = global.io.of('/chat');

  global.io.on('connect', (socket) => {
    socket.on('disconnect', () => {});
  });
};

module.exports = loadListeners;
