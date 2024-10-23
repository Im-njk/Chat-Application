const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const users={}

io.on('connection', (socket) => {

    socket.on('new-user-joined' , name=>{
        users[socket.id] = name;                          
        socket.broadcast.emit('user-joined', name)
    });
    
    socket.on('send', message=>{
        console.log(message)
        socket.broadcast.emit('receive',{message:message, name: users[socket.id]})
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    });
    
    socket.on('connect_error', (err) => {
        console.error('Connection Error:', err);
      });

    
});

server.listen(8000, () => {
    console.log('listening on *:8000');
});







