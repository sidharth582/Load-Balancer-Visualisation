const store = require('../data/store');
const { v4: uuidv4 } = require('uuid');
const { getNextServer } = require('../utils/roundRobin');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected');

    const interval = setInterval(() => {
      store.loadBalancers.forEach(lb => {
        const targetServerId = getNextServer(lb.id, store);
        if (targetServerId) {
          const server = store.servers.find(s => s.id === targetServerId);
          const requestId = uuidv4();
          const event = {
            requestId,
            loadBalancerId: lb.id,
            serverId: server.id,
            timestamp: new Date()
          };
          io.emit('requestRouted', event);
        }
      });
    }, 2000);

    socket.on('disconnect', () => {
      clearInterval(interval);
      console.log('Client disconnected');
    });
  });
};