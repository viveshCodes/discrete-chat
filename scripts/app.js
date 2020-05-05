// DOM queries
const chatlist = document.querySelector('.chat-list');

// class instances 
const chatroom = new Chatroom('golang' , 'viv-bhai');
const chatUI = new ChatUI(chatlist);

// get chats and render
chatroom.getChats((data) =>{
    chatUI.render(data);  // pass the 'data' received from getChats to ChatUI
});