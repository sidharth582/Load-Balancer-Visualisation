const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cors());

// Routes
const loadBalancerRoutes = require('./routes/loadBalancerRoutes');
const serverRoutes = require('./routes/serverRoutes');
app.use('/api/loadbalancers', loadBalancerRoutes);
app.use('/api/servers', serverRoutes);

// Socket handler
require('./socket/socketHandler')(io);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});