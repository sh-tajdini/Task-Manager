import { WebSocketServer } from 'ws';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let tasks = [];

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send all tasks to the newly connected client
  ws.send(JSON.stringify({ type: 'initialTasks', tasks }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log('Received message:', data);

    if (data.type === 'addTask') {
      tasks.push(data.task);
      console.log('Broadcasting taskAdded:', data.task);
      broadcastUpdate('taskAdded', data.task);
    } else if (data.type === 'updateTask') {
      const taskIndex = tasks.findIndex(t => t.id === data.task.id);
      if (taskIndex !== -1) {
        tasks[taskIndex] = data.task;
        console.log('Broadcasting taskUpdated:', data.task);
        broadcastUpdate('taskUpdated', data.task);
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

function broadcastUpdate(type, task) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type, task }));
    }
  });
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});