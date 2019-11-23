window.addEventListener('DOMContentLoaded',function(e){
    let load= new Shopping();
});



class Shopping{
    constructor(){
        console.log("started shopping");
        this.api= new API();
        let card= window.localStorage.getItem('searchedCard');
        let searchForm= document.querySelector(".searchInput");
        let searchBar= document.querySelector(".searchInput input");

        this.search(card);
        //this.addToCart();
        this.cart();

        searchBar.addEventListener('input',this.searchModal.bind(this));
        searchForm.addEventListener('submit',this.searchBar);
    }

    cart(){
        console.log("test")
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

    searchBar=(e)=>{
        e.preventDefault();
        let term= document.querySelector(".searchInput").value
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

    lightPlay(price){
        let rate = (price*0.2).toFixed(2);
        return (price-rate).toFixed(2);
    }
    
    heavyPlay(price){
        let rate = price*0.35;
        return (price-rate).toFixed(2);
    }

    async search(term){
        let found = await this.api.search(term);
        let resultsBar= document.querySelector(".results");
        let results= document.querySelector(".cardResults");
        let html="";
        if(found instanceof Error){
            html+=`<p> 0 Results found</p>`;
            resultsBar.insertAdjacentHTML('beforeend',html);
        }else{
        html+=`<p>
        30 results "${term}" in Magic The Gathering
        </p>
        `;
        resultsBar.insertAdjacentHTML('beforeend',html);
        
        found.data.forEach(card=>{
            let html='';
            html+=`<div class="item"><div class="hidden">${JSON.stringify(card)}</div>
            <h2>${card.name}</h2>`;

            if(card.image_uris){
                html+=`<img src="${card.image_uris.small}" alt="${card.name} picture">`;
            }else{
                html+=`<img width="146" height="204" src="https://ciat.cgiar.org/wp-content/uploads/image-not-found.png" alt="${card.name} picture">`;
            }

            html+=`<p>${card.set}<p>
            <p>${card.rarity[0]}*${card.collector_number}<p>`;

            if(card.prices.usd){
                let hp= this.heavyPlay(card.prices.usd);
                let lp= this.lightPlay(card.prices.usd);
                html+=`<p>
                Near Mint:$${card.prices.usd}<button class="buy"  data-near=${card.prices.usd}>Buy</button>
                Light Play:$${lp}<button class="buy"  data-lp=${lp}>Buy</button>
                Heavy Play:$${hp}<button class="buy"  data-hp=${hp}>Buy</button>
                </p>
                `;
            }else{
                let price = 0.01+Math.floor(Math.random()*(100-0.01));
                let lp= this.lightPlay(price);
                let hp= this.heavyPlay(price)
     
                html+=`<p>
                Near Mint:$${price}<button class="buy"  data-near=${price}>Buy</button>
                Light Play:$${lp}<button class="buy"  data-lp=${lp}>Buy</button>
                Heavy Play:$${hp}<button class="buy"  data-hp=${hp}>Buy</button>
                </p>
                `;
            }
            
            results.insertAdjacentHTML('beforeend',html);
        })
        let buttons = document.querySelectorAll(".buy");

        buttons.forEach(button=>{
            button.addEventListener('click',function(e){this.addToCart(e,results)}.bind(this),true);
        })
    }
    }

    addToCart=(e,page)=>{
        console.log("test")
        e.preventDefault();
        let card= page.getElementsByClassName("hidden")[0].innerHTML;
        let object= JSON.parse(card);
        let formatted=this.format(object.name,object.prices.usd,object.set,object.image_uris.small,object.collector_number,object.rarity);

        if(localStorage.getItem("shoppingCart")){
            let cards= localStorage.getItem("shoppingCart");
            let string= JSON.stringify(formatted);
            let obj = JSON.parse(cards);
            let fOBJ="{\"cards\":["+string;
            for(let i=0; i<obj.cards.length;i++){
                if(i!=obj.cards.length-1){
                    let str=JSON.stringify(obj.cards[i]);
                    fOBJ+=","+str;
                }else{
                    let str=JSON.stringify(obj.cards[i]);
                    fOBJ+=","+str+"]}";
                }
            }
            localStorage.setItem("shoppingCart",fOBJ);
        }else{
            let json="{\"cards\":["+JSON.stringify(formatted)+"]}";
            localStorage.setItem("shoppingCart",json);
        }
        this.cart();
    }

    format(name,price,set,img,number,rarity){
        if(price==null){
            let replacement = 0.01+Math.floor(Math.random()*(100-0.01));
            let card ={name:name,price:replacement,set:set,img:img,number:number,rarity:rarity};
            return card;
        }else{
            let card ={name:name,price:price,set:set,img:img,number:number,rarity:rarity};
            return card;
        }
        
    }

 
}