// DOM queries
const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm =document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

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

// update username
newNameForm.addEventListener('submit', event => {
    event.preventDefault();
    // update username
    const newName = newNameForm.name.value.trim();
    chatroom.updateUsername(newName);
    // reset form
    newNameForm.reset();
    // show notification for 
    updateMssg.innerText = `Username updated to ${newName}`;
    setTimeout(() =>{
        updateMssg.innerText = '';
    }, 3000);
});

// update chat room
rooms.addEventListener('click' , event =>{
    if(event.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(event.target.getAttribute('id'));
        chatroom.getChats((chat) =>{
            chatUI.render(chat);  
        });   
    }
});

// Check local storage for a username 
const username = (localStorage.username) ? localStorage.username : "anonymous";

// class instances 
const chatroom = new Chatroom('general' , username);
const chatUI = new ChatUI(chatlist);

// get chats and render
chatroom.getChats((data) =>{
    chatUI.render(data);  // pass the 'data' received from getChats to ChatUI
});
