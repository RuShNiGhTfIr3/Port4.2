class Homepage{
    constructor(){
        console.log("Homepage Loaded.")
        this.api = new API();
        let searchBar= document.querySelector("#searchBar");
        let activeScroll = document.querySelectorAll(".feat");
        let searchForm= document.querySelector(".searchForm");

        searchBar.addEventListener('input',this.searchModal.bind(this));
        searchForm.addEventListener('submit',this.search)
        activeScroll.forEach(button=>{
            button.addEventListener('click',this.changeFeatured)
        })
        this.loadContent();
        this.loadEvents();
    }

    search=(e)=>{
        e.preventDefault();
        let term= document.querySelector("#searchBar").value
        window.localStorage.setItem('searchedCard',term);
        window.location.href = '/pages/shopping.html';
    }

    loadEvents(){
        let file = 'jsons/events.json';
        let div = document.querySelector("#events");
        fetch('jsons/events.json').then(res=>{
            return res.json();
        }).then(json=>{
            json.events.forEach(events=>{
                let html="";
                html+=`<div>
                <h3>${events.title}</h3>
                <img src=${events.picture} alt="${events.title} picture"/>
                <p><strong>When</strong>:${events.date}</p>
                <p><strong>Time</strong>:${events.time}</p>
                <p><strong>Entry</strong>:${events.entry}</p>
                <p><strong>Description</strong>:${events.description}</p>
                <button>Read More</button>
                `
                div.insertAdjacentHTML('beforeend',html)
            })
        })
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
                featuredImage.src="Pictures/Throne-of-Eldrane-information.png";
            break;

            case "3":
                featuredImage.src="Pictures/Throne-of-Eldrane-information.jpg";
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
        let salesDiv=document.querySelector("#sales");
        let buyListDiv=document.querySelector("#buyList");
        let sales = await this.randomCards();
        let buylist= await this.randomCards();


        sales.forEach(card=>{
            let html= '';
            html+=`<div><p>${card.name}</p><img src="${card.image_uris.small}"/><p>${card.prices.usd}</p></div>`;
            salesDiv.insertAdjacentHTML('beforeend',html);
        })

        buylist.forEach(card=>{
            let html= '';
            console.log(card)
            html+=`<div><p>${card.name}</p><img src="${card.image_uris.small}"/><p>${card.prices.usd}</p></div>`;
            buyListDiv.insertAdjacentHTML('beforeend',html);
        })

    }

    randomCards(){
        return Promise.all([this.api.random(), this.api.random(), this.api.random(),this.api.random()]).then(array=>{
           return array;
        })
    }
}
