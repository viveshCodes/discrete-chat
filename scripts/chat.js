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
            .where('room','==', this.room)
            .orderBy('created_at')        // To use this property, we need to enable indexing for room
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


<<<<<<< HEAD
// setTimeout(() =>{
//     chatroom.updateRoom("firebase");
//     chatroom.updateUsername("viv");
//     chatroom.getChats((data)=>{
//         console.log(data);
//     }); 
//     chatroom.addChat('Hello');
// });
=======
// Call getChats 
chatroom.getChats((data) =>{
    console.log(data);
});
>>>>>>> parent of e913079... Feature to update username and room
