const chatMessages = document.querySelector('#chatMessages');
const userAlias = document.querySelector('#userAlias').textContent;

if (chatMessages){
    const socket = io()
    
    const chatInput = document.querySelector('#chatInput');
    const chatInputButtonSend = document.querySelector('#chatInputButtonSend');
    
    socket.on('chatMessages', (msgs) => {
        chatMessages.innerHTML = msgs.map((m) => `
            <div class=chatMessagesItem${userAlias === m.user ? ' chatMessagesItemUser' : ''}>
                <b>${userAlias === m.user ? 'You:' : m.user}</b><br>
                <p>${m.text}</p><br>
                <i>${m.date}</i>
            </div>
        `).join('\n')
    })

    socket.on('newChatMessageUpdate', (m) => {
        chatMessages.innerHTML += `
            <div class=chatMessagesItem${userAlias === m.user ? ' chatMessagesItemUser' : ''}>
                <b>${userAlias === m.user ? 'You:' : m.user}</b><br>
                <p>${m.text}</p><br>
                <i>${m.date}</i>
            </div>
            `
    })

    function sendMsg(){
        if(chatInput.value.length > 0){
            const msgObj = {
                text: chatInput.value,
                user: userAlias
            };
            chatInput.value = "";
            socket.emit('newChatMessageInput', msgObj)
        }
    }

    chatInputButtonSend.addEventListener('click', (e) => {
        e.preventDefault();
        sendMsg()
    })

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter'){
            e.preventDefault()
            sendMsg()
        } else if (!/[A-Z]|[a-z]|\s|\?|\¿|\!|\¡|\.|\,/ig.test(e.key)) {
            e.preventDefault()
        }
    })
}