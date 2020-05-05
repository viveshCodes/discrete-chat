class ChatUI {
    constructor(list){
        this.list = list;
    }
    // clear current chat room when room changes
    clear(){
        this.list.innerHTML = '';
    }    
    render(data){           // data = properties
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix : true}
        );
        const html = `
        <li class="list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</div>
        </li>
        `;
        
        this.list.innerHTML +=html;
    }
}