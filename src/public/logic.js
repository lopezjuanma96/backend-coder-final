const chatMessages = document.querySelector('#chatMessages');
const productsBlock = document.querySelector('.productsBlock');

const userAlias = document.querySelector('#userAlias')?.textContent;

if (chatMessages){
    const socket = io()
    
    const chatInput = document.querySelector('#chatInput');
    const chatInputButtonSend = document.querySelector('#chatInputButtonSend');
    
    socket.on('chatMessages', (msgs) => {
        chatMessages.innerHTML = msgs.map((m) => `
            <div class=\"chatMessagesItem${userAlias === m.user ? ' chatMessagesItemUser' : ''}\">
                <b>${userAlias === m.user ? 'You:' : m.user}</b>
                <p>${m.text}</p>
                <i>${(new Date(m.date)).toDateString()}</i>
                </div>
                `).join('\n')
            })
            
            socket.on('newChatMessageUpdate', (m) => {
                chatMessages.innerHTML += `
                <div class=\"chatMessagesItem${userAlias === m.user ? ' chatMessagesItemUser' : ''}\">
                <b>${userAlias === m.user ? 'You:' : m.user}</b>
                <p>${m.text}</p>
                <i>${(new Date(m.date)).toDateString()}</i>
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

if (productsBlock) {
    const socket = io()
    const addedProducts = document.querySelector('#addedProducts');
    const productsTable = document.querySelector('#productsTable');
    const productsSendButton = document.querySelector('#addProductFormSendButton');
    const addProductForm = document.querySelector('#addProductForm');
    socket.on('newProductUpdate', (prod) => {
        if (addedProducts.childElementCount === 0) {
            addedProducts.innerHTML += `
                <h2>You added this products:</h2>
                <tr>
                    <th>Name</th>
                    <th>Stock</th>
                    <th>Price</th>
                </tr>
            `    
        }
        addedProducts.innerHTML += `
            <tr>
                <td>${prod.name}</td>
                <td>${prod.stock}</td>
                <td>${prod.price}</td>
            </tr>
            `
        if(productsTable){
            productsTable.innerHTML +=`
                <tr>
                    <td>${prod.name}</td>
                    <td>${prod.stock}</td>
                    <td>${prod.price}</td>
                </tr>
            `
        }
    })
    if (productsSendButton) {
        productsSendButton.addEventListener('click', (e) => {
            e.preventDefault();
            const toSend = {};
            addProductForm.childNodes.forEach((elem) => {
                if (elem.name){
                    toSend[`${elem.name}`] = parseFloat(elem.value) || elem.value;
                    elem.value = "";
                }
            })
            socket.emit('newProductInput', toSend);
        })
    }
}