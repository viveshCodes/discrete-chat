// DOM queries
const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

// add a new chat
newChatForm.addEventListener('submit', event =>{
    event.preventDefault();
    const message = newChatForm.message.value.trim(); // message = id of input field, trim is to remove white spaces
    
    // Add new message to the database 
    chatroom.addChat(message)
        .then(()=>{                               // since async function returns promise so we used .then                                  
            newChatForm.reset()
        }).catch(err => console.log(err));
});

// class instances 
const chatroom = new Chatroom('golang' , 'viv-bhai');
const chatUI = new ChatUI(chatlist);

// get chats and render
chatroom.getChats((data) =>{
    chatUI.render(data);  // pass the 'data' received from getChats to ChatUI
});