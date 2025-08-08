
const Server = require('../models/server');
const store = require('../data/store');
const { v4: uuidv4 } = require('uuid');

exports.createServer = (req, res) => {
  const { name } = req.body;
  const id = uuidv4();
  const server = new Server(id, name);
  store.servers.push(server);

  res.status(201).json(server);
};

exports.getAllServers = (req, res) => {
  res.json(store.servers);
};