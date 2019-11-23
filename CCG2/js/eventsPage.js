window.addEventListener('DOMContentLoaded',function(e){
    let load= new Events();
});

class Events{
    constructor(){
        console.log("started events page");
        let searchBar= document.querySelector(".searchInput input");
        let searchForm= document.querySelector(".searchInput");
        this.api=new API();

        this.loadEvents();
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
        let term= document.querySelector(".searchInput input").value
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

    loadEvents(){
        fetch('/jsons/events.json').then(res=>{
            if(res.ok){
                return res.json();
            }

        }).then(data=>{
            let events= data.events;
            let weekly = data.weekly;
            let eventSection= document.querySelector(".otherContent");
            let weeklySection= document.querySelector(".weeklyContent");

            let otherIt=0;
            events.forEach(event=>{
                let html='';

                html+=`<div class="col-11 eventItems" data-type="events" data-id="${otherIt}">
                <h3>${event.title}</h3>
                <img src="${event.picture}"/>
                <p><strong>Event</strong>:${event.date}</p>
                <p><strong>Time</strong>:${event.time}</p>
                <p><strong>Entry</strong>:${event.entry}</p>
                <p><strong>Description</strong>:${event.description}</p>
                <button class="eventButton">Read More</button>
                </div>`;

                eventSection.insertAdjacentHTML('beforeend',html);
                otherIt=otherIt+1;
                
            })

            let weeklyIt=0;
            weekly.forEach(event=>{
                let html='';

                html+=`<div class="col-11 eventItems" data-type="weekly" data-id="${weeklyIt}">
                <h3>${event.title}</h3>
                <img src="${event.picture}"/>
                <p><strong>Event</strong>:${event.date}</p>
                <p><strong>Time</strong>:${event.time}</p>
                <p><strong>Entry</strong>:${event.entry}</p>
                <p><strong>Description</strong>:${event.description}</p>
                <button class="eventButton">Read More</button>
                </div>`;

                weeklySection.insertAdjacentHTML('beforeend',html);
                weeklyIt=weeklyIt+1;
            })

            let buttons = document.querySelectorAll(".eventButton");
            buttons.forEach(button=>{
            button.addEventListener('click',this.readMore)
            })
        })
    }

    readMore(e){
        e.preventDefault();
        localStorage.setItem("eventType",e.target.parentElement.dataset.type);
        localStorage.setItem("eventId",e.target.parentElement.dataset.id);

        window.location.href = '/pages/event.html';

    }
}