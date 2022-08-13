const chatMessages = document.querySelector('#chatMessages');
const userAlias = document.querySelector('#userAlias').textContent;

if (chatMessages){
    const socket = io()
    
    const chatInput = document.querySelector('#chatInput');
    const chatInputButtonSend = document.querySelector('#chatInputButtonSend');
    
    socket.on('chatMessages', (msgs) => {
        chatMessages.innerHTML(msgs.map((m) => `
            <div class=chatMessagesItem${userAlias === m.getUser() ? ' chatMessagesItemUser' : ''}>
                <b>${userAlias === m.getUser() ? 'You:' : m.getUser()}</b><br>
                <p>${m.getText()}</p><br>
                <i>${m.getDate()}</i>
            </div>
        `).join('\n')
        )
    })

    socket.on('newChatMessageUpdate', (m) => {
        chatMessages.append(`
            <div class=chatMessagesItem${userAlias === m.getUser() ? ' chatMessagesItemUser' : ''}>
                <b>${userAlias === m.getUser() ? 'You:' : m.getUser()}</b><br>
                <p>${m.getText()}</p><br>
                <i>${m.getDate()}</i>
            </div>
        `)
    })

    chatInputButtonSend.addEventListener('click', (e) => {
        e.preventDefault();
        const msgObj = {
            text: chatInput.value,
            user: userAlias
        };
        chatInput.value = "";
        socket.emit('newChatMessageInput', msgObj)
    })
}