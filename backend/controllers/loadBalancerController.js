const LoadBalancer = require('../models/LoadBalancer');
const store = require('../data/store');
const { v4: uuidv4 } = require('uuid');

exports.createLoadBalancer = (req, res) => {
  const { name } = req.body;
  const id = uuidv4();
  const lb = new LoadBalancer(id, name);
  store.loadBalancers.push(lb);
  store.connections[id] = [];
  store.roundRobinIndex[id] = 0;

  res.status(201).json(lb);
};

exports.assignServer = (req, res) => {
  const { loadBalancerId, serverId } = req.body;
  const lbExists = store.loadBalancers.find(lb => lb.id === loadBalancerId);
  const serverExists = store.servers.find(s => s.id === serverId);

  if (!lbExists || !serverExists) {
    return res.status(404).json({ error: 'Load balancer or server not found' });
  }

  store.connections[loadBalancerId].push(serverId);
  res.status(200).json({ message: 'Server assigned successfully' });
};

exports.getAllLoadBalancers = (req, res) => {
  res.json(store.loadBalancers);
};