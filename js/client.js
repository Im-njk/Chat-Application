const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container")

const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

const Uname = prompt('Enter your name to join');


socket.emit('new-user-joined', Uname);

socket.on('user-joined',data=>{
    append(`${data} joined the chat`, 'join')
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`, 'left')
})
socket.on('left',data=>{
    append(`${data} left`, 'leave')
})

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const message = messageInput.value;
    append(`you: ${message}`,"right");
    socket.emit('send',message);
    messageInput.value = '';

})