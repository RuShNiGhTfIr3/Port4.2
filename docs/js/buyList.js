window.addEventListener('DOMContentLoaded',function(e){
    let load= new List();
});

class List{
    constructor(){
        console.log("buyList started")
        this.api= new API();
        let searchBar= document.querySelector(".searchInput input");
        let searchForm= document.querySelector(".searchInput");

        searchBar.addEventListener('input',this.searchModal.bind(this));
        searchForm.addEventListener('submit',this.search);
        
        this.loadContent();
        this.cart();
    }

    search=(e)=>{
        e.preventDefault();
        let term= document.querySelector(".searchInput input").value
        
        if(/^\s*$/.test(term)==false){
            window.localStorage.setItem('searchedCard',term);
            window.location.href = '/pages/shopping.html';
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

    async loadContent(){
        let buyListDiv=document.querySelector(".buyListCards");
        let buylist= await this.randomCards();

        buylist.forEach(card=>{
            let html= '';
            let cardString= JSON.stringify(card);
            if(!card.prices.usd){
                let price = 0.01+Math.floor(Math.random()*(100-0.01));
                html+=`
                <div class="buyItem col-md" >
                    <div class="hidden">${cardString}</div>`;
                    if(card.image_uris.small){
                        html+=`<img src="${card.image_uris.small}"/>`;
                    }else{
                        html+=`<img width="146" height="204" src="https://ciat.cgiar.org/wp-content/uploads/image-not-found.png" alt="${card.name} picture">`
                    }
                    html+=`
                    <div class="buyText">
                        <p>${card.name}</p>
                        <p>${"$"+price}</p>
                    </div> 
                    <button class="sellCard">Sell</button> 
                </div>`;
            }else{
                html+=`
                <div class="buyItem col-md">
                    <div class="hidden">${cardString}</div>`
                    if(card.image_uris.small){
                        html+=`<img src="${card.image_uris.small}"/>`;
                    }else{
                        html+=`<img width="146" height="204" src="https://ciat.cgiar.org/wp-content/uploads/image-not-found.png" alt="${card.name} picture">`
                    }
                    html+=`
                    <div class="buyText">
                        <p>${card.name}</p>
                        <p>${"$"+card.prices.usd}</p>
                    </div> 
                    <button class="sellCard">Sell</button>
                </div>`;
            }
        
            buyListDiv.insertAdjacentHTML('beforeend',html);
        })

        let buyListSection= document.querySelectorAll(".buyListCards div")

        buyListSection.forEach(div=>{
            div.addEventListener('click',function(e){this.viewCard(e,div)}.bind(this),true)
        })

    }

    viewCard(e,card){
        e.preventDefault();
        console.log("test")
        let cardOBJ=card.getElementsByClassName("hidden")[0].innerHTML;

        localStorage.setItem("selectedCard",cardOBJ)

        window.location.href = '/pages/viewedProduct.html';
    }

    randomCards(){
        return Promise.all([this.api.random(), this.api.random(), this.api.random(),this.api.random(),this.api.random(),this.api.random(),this.api.random(),this.api.random(),this.api.random(),this.api.random(),this.api.random(),this.api.random(),this.api.random(),this.api.random()]).then(array=>{
           return array;
        })
    }
}