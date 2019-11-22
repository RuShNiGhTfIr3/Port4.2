window.addEventListener('DOMContentLoaded',function(e){
    let event = new Event();
    
});

class Event{
    constructor(){
        console.log("event loaded")
        let searchBar= document.querySelector("#searchBar");
        let searchForm= document.querySelector(".searchForm");
        this.loadEvent();
        this.cart();

        searchBar.addEventListener('input',this.searchModal.bind(this));
        searchForm.addEventListener('submit',this.search);
    }
    
    cart(){
        let quan = document.querySelector(".quantity");
        let length = localStorage.getItem("cartLength");
        if(quan.classList.contains("hidden")){
            quan.classList.toggle("hidden");
        }
        let quantityBubble='';
        if(length>0){
            quantityBubble+=`<p>${length}<p>`;
        }
        quan.innerHTML='';
        quan.insertAdjacentHTML('beforeend',quantityBubble);
    }

    search=(e)=>{
        e.preventDefault();
        let term= document.querySelector("#searchBar").value
        window.localStorage.setItem('searchedCard',term);
        window.location.href = '/pages/shopping.html';
    }

    searchModal=(e)=>{
        let searchTerm= e.target.value;
        let modal= document.querySelector("#modalSearch");
 
        if(searchTerm.length>=4){
            if(modal.classList.contains("hidden")){
                modal.classList.toggle("hidden");
             }
 
             this.api.searchModal(searchTerm)
             
        }else if(searchTerm.length<=3){
            if(!modal.classList.contains("hidden")){
                modal.classList.toggle("hidden");
            }
        }
 
     }

    loadEvent(){
        let type = localStorage.getItem("eventType");
        let event = localStorage.getItem("eventId");
        let eventDiv= document.querySelector(".eventSection");
        fetch(`/jsons/events.json`).then(res=>{
            return res.json();
        }).then(data=>{
            if(type=="events"){
                let selEvent= data.events[event];
                let html='';
                html+=`
                <h2>${selEvent.title}</h2>
                <img src="${selEvent.picture}"/>
                <p><strong>Event</strong>:${selEvent.date}</p>
                <p><strong>Time</strong>:${selEvent.time}</p>
                <p><strong>Entry</strong>:${selEvent.entry}</p>
                <p><strong>Description</strong>:${selEvent.description}</p>
                `;
                eventDiv.insertAdjacentHTML('beforeend',html);
            }else{
                let selEvent= data.weekly[event];
                let html='';
                html+=`
                <h2>${selEvent.title}</h2>
                <img src="${selEvent.picture}"/>
                <p><strong>Event</strong>:${selEvent.date}</p>
                <p><strong>Time</strong>:${selEvent.time}</p>
                <p><strong>Entry</strong>:${selEvent.entry}</p>
                <p><strong>Description</strong>:${selEvent.description}</p>
                `;
                eventDiv.insertAdjacentHTML('beforeend',html);
            }
            
        })
    }
}
