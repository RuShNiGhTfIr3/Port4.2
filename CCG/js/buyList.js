window.addEventListener('DOMContentLoaded',function(e){
    let load= new List();
});

class List{
    constructor(){
        console.log("buyList started")
        this.api= new API();
        this.loadContent();
        this.cart();
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
                html+=`<div><div class="hidden">${cardString}</div><p>${card.name}</p><img src="${card.image_uris.small}"/><p>${"$"+price}</p> <button class="sellCard">Sell</button> </div>`;
            }else{
                html+=`<div><div class="hidden">${cardString}</div><p>${card.name}</p><img src="${card.image_uris.small}"/><p>${"$"+card.prices.usd}</p> <button class="sellCard">Sell</button></div>`;
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

        window.location.href = '/pages/viewProduct.html';
    }

    randomCards(){
        return Promise.all([this.api.random(), this.api.random(), this.api.random(),this.api.random(),this.api.random(),this.api.random()]).then(array=>{
           return array;
        })
    }
}