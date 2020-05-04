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
}

// Create a new instance of our Chatroom
const chatroom = new Chatroom('golang' , 'viv-bhai');
chatroom.addChat('hello gophers')
    .then(()=>console.log("Chat added to firestore")
    ).catch(err => console.log(err));