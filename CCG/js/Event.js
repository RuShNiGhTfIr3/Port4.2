window.addEventListener('DOMContentLoaded',function(e){
    let event = new Event();
});

class Event{
    constructor(){
        console.log("event loaded")
        this.loadEvent();
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
