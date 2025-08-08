function getNextServer(lbId, store) {
  const list = store.connections[lbId];
  const index = store.roundRobinIndex[lbId] || 0;
  const server = list[index % list.length];
  store.roundRobinIndex[lbId] = (index + 1) % list.length;
  return server;
}
module.exports = { getNextServer }; 