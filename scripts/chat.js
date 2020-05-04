class Chatroom {
    constructor(room , username){
        this.room = room;
        this.username = username;
        // Store refernce to our collection : chats
        this.chats = db.collection('chats');
    }
    // Async Method To Add Chat
    async addChat(message){
        const now = new Date();
        const chat = {
            message , // message : message
            username : this.username,
            room : this.room,
            created_at : firebase.firestore.Timestamp.fromDate(now)
        };
        // Save the chat document
        const response = await this.chats.add(chat);
        return response;
    }
    // Setup a real time listener
    getChats(callback){
        this.chats
            .onSnapshot(snapshot =>{
                // use docChanges() to get all changed document
                snapshot.docChanges().forEach(change =>{
                    if(change.type === 'added'){    // added for saved document, and removed for deleted document
                        callback(change.doc.data());
                    }
                });
            });
    }
}

// Create a new instance of our Chatroom
const chatroom = new Chatroom('golang' , 'viv-bhai');

// Call getChats 
chatroom.getChats((data) =>{
    console.log(data);
});