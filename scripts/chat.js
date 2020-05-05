/* 1: Add new chat document */
class Chatroom {
    constructor(room , username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');        // Store refernce to our collection : chats
        this.unsub;
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
    /* 2 :Setup a real time listener */
    getChats(callback){
        console.log("got a call")
       this.unsub= this.chats
            .where('room','==', this.room)
            .orderBy('created_at')                           // To use this property, we need to enable indexing for room
            .onSnapshot(snapshot =>{
                snapshot.docChanges().forEach(change =>{     // use docChanges() to get all changed document
                    if(change.type === 'added'){            // added for saved document, and removed for deleted document
                        callback(change.doc.data());
                    }
                });
            });
    } // end getChats()

    updateUsername(username){
        this.username = username;
    }
    updateRoom(room){
        this.room = room;
        console.log("room update");
        if(this.unsub){
            this.unsub();
        }       
    }
}

// Create a new instance of our Chatroom
const chatroom = new Chatroom('golang' , 'viv-bhai');

// Call getChats 
chatroom.getChats((data) =>{
    console.log(data);
});

setTimeout(() =>{
    chatroom.updateRoom("firebase");
    chatroom.updateUsername("viv");
    chatroom.getChats((data)=>{
        console.log(data);
    }); 
    chatroom.addChat('Hello');
});
