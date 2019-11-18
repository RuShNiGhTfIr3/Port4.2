class Homepage{
    constructor(){
        console.log("Homepage Loaded.")
        this.api = new API();
        let searchBar= document.querySelector("#searchBar");
        let activeScroll = document.querySelectorAll(".feat");
        let searchForm= document.querySelector(".searchForm");

        searchBar.addEventListener('input',this.searchModal.bind(this));
        searchForm.addEventListener('submit',this.search);
        activeScroll.forEach(button=>{
            button.addEventListener('click',this.changeFeatured);
        })
        this.loadContent();
        this.loadEvents();
    }

    search=(e)=>{
        e.preventDefault();
        let term= document.querySelector("#searchBar").value
        
        if(/^\s*$/.test(term)==false){
            window.localStorage.setItem('searchedCard',term);
            window.location.href = '/pages/shopping.html';
        }
    }

    loadEvents(){
        let div = document.querySelector(".eventContent");
        fetch('jsons/events.json').then(res=>{
            return res.json();
        }).then(json=>{
            let iterator=0;
            json.events.forEach(events=>{
                let html="";
                html+=`<div class="eventItem" data-type="events" data-id="${iterator}">
                <h3>${events.title}</h3>
                <img src=${events.picture} alt="${events.title} picture"/>
                <p><strong>When</strong>:${events.date}</p>
                <p><strong>Time</strong>:${events.time}</p>
                <p><strong>Entry</strong>:${events.entry}</p>
                <p><strong>Description</strong>:${events.description}</p>
                <button class="eventButton">Read More</button>
                `
                div.insertAdjacentHTML('beforeend',html)
                iterator=iterator+1;
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

    changeFeatured(e){
        let active= document.querySelector(".activeScroll");
        let featuredImage= document.querySelector("#featured img");
        active.classList.toggle("activeScroll");
        e.target.classList.toggle("activeScroll");

        console.log(e.target.dataset.feat)
        switch(e.target.dataset.feat){
            case "1":
            featuredImage.src="Pictures/ccgholidarybanner.png";
            console.log("test")
            break;

            case "2":
                featuredImage.src="Pictures/plceholder1.png";
            break;

            case "3":
                featuredImage.src="Pictures/placeholder2.png";
            break;
        }
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

    async loadContent(){
        let salesDiv=document.querySelector(".salesListContent");
        let buyListDiv=document.querySelector(".buyContent");
        let sales = await this.randomCards();
        let buylist= await this.randomCards();


        sales.forEach(card=>{
            let html= '';
            let cardString= JSON.stringify(card);

            if(!card.prices.usd){
                let price = 0.01+Math.floor(Math.random()*(100-0.01))
                html+=`<div class="salesContent">
                <div class="hidden">${cardString}</div>`;
                if(card.image_uris){
                    html+=`<img src="${card.image_uris.small}" alt="${card.name} picture"/>`;
                }else{
                    html+=`<img width="146" height="204" src="https://ciat.cgiar.org/wp-content/uploads/image-not-found.png" alt="${card.name} picture">`;
                }
                html+=`<div class="contentText"><p>${card.name}
                ${"$"+price}</p></div>
                </div>`;
            }else{
                html+=`<div class="salesContent">
                <div class="hidden">${cardString}</div>`;
                
                if(card.image_uris){
                    html+=`<img src="${card.image_uris.small}" alt="${card.name} picture"/>`;
                }else{
                    html+=`<img width="146" height="204" src="https://ciat.cgiar.org/wp-content/uploads/image-not-found.png" alt="${card.name} picture">`;
                }
                html+=`<div class="contentText"><p>${card.name}</p>
                <p>$${card.prices.usd}</p></div>
                </div>`;
            }
            salesDiv.insertAdjacentHTML('beforeend',html);
        })

        buylist.forEach(card=>{
            let html= '';
            let cardString= JSON.stringify(card);
            if(!card.prices.usd){
                    let price = 0.01+Math.floor(Math.random()*(100-0.01));
                    html+=`<div class="salesContent">
                    <div class="hidden">${cardString}</div>
                    <p>${card.name}</p>`;
                    if(card.image_uris){
                        html+=`<img src="${card.image_uris.small}" alt="${card.name} picture"/>`;
                    }else{
                        html+=`<img width="146" height="204" src="https://ciat.cgiar.org/wp-content/uploads/image-not-found.png" alt="${card.name} picture">`;
                    }
                    html+=`<p>${"$"+price}</p>
                    </div>`;
            }else{
                html+=`<div class="salesContent">
                <div class="hidden">${cardString}</div>
                <p>${card.name}</p>`;
                if(card.image_uris){
                    html+=`<img src="${card.image_uris.small}" alt="${card.name}" picture/>`;
                }else{
                    html+=`<img width="146" height="204" src="https://ciat.cgiar.org/wp-content/uploads/image-not-found.png" alt="${card.name} picture">`;
                }
                html+=`<p>${"$"+card.prices.usd}</p>
                </div>`;
            }
        
            buyListDiv.insertAdjacentHTML('beforeend',html);
        })
        let salesSection = document.querySelectorAll("#sales div");
        let buyListSection= document.querySelectorAll("#buyList div")

        salesSection.forEach(div=>{
            div.addEventListener('click',function(e){this.viewCard(e,div)}.bind(this),true);
        })

        buyListSection.forEach(div=>{
            div.addEventListener('click',function(e){this.viewCard(e,div)}.bind(this),true)
        })

    }

    viewCard(e,card){
        e.preventDefault();
        let cardOBJ=card.getElementsByClassName("hidden")[0].innerHTML;

        localStorage.setItem("selectedCard",cardOBJ)

        window.location.href = '/pages/viewProduct.html';
    }

    randomCards(){
        return Promise.all([this.api.random(), this.api.random(), this.api.random(),this.api.random()]).then(array=>{
           return array;
        })
    }
}
