module.exports = {
  loadBalancers: [],
  servers: [],
  connections: {}, // { loadBalancerId: [serverIds] }
  roundRobinIndex: {} // { loadBalancerId: currentIndex }
};  