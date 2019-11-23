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
        let term= document.querySelector(".searchInput Input").value

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
        ${found.data.length} Results "${term}" in Magic The Gathering
        </p>
        `;
        resultsBar.insertAdjacentHTML('beforeend',html);
        
        found.data.forEach(card=>{
            let html='';
            html+=`<div class="item row"><div class="hidden">${JSON.stringify(card)}</div>`;

            if(card.image_uris){
                html+=`<img src="${card.image_uris.small}" alt="${card.name} picture">`;
            }else{
                html+=`<img width="146" height="204" src="https://ciat.cgiar.org/wp-content/uploads/image-not-found.png" alt="${card.name} picture">`;
            }

            html+=`<div class="salesItemText"><h2>${card.name}</h2><p>${card.set} (Magic) Rarity ${card.rarity[0]}*Number${card.collector_number}</p>
            </div><div class="itemPrices">`;

            if(card.prices.usd){
                let hp= this.heavyPlay(card.prices.usd);
                let lp= this.lightPlay(card.prices.usd);
                html+=`<ul>
                <li><p>Near Mint:</p><p class="itemPrice">$${card.prices.usd}</p><button class="buy"  data-near=${card.prices.usd}>Add to cart</button></li>
                <li><p>Light Play:</p><p class="itemPrice">$${lp}</p><button class="buy"  data-lp=${lp}>Add to cart</button></li>
                <li><p>Heavy Play:</p><p class="itemPrice">$${hp}</p><button class="buy"  data-hp=${hp}>Add to cart</button></li>
                </ul>
                `;
            }else{
                let price = 0.01+Math.floor(Math.random()*(100-0.01));
                let lp= this.lightPlay(price);
                let hp= this.heavyPlay(price)
     
                html+=`<ul>
                <li><p>Near Mint:</p><p class="itemPrice">$${price}</p><button class="buy"  data-near=${price}>Add to cart</button></li>
                <li><p>Light Play:</p><p class="itemPrice">$${lp}</p><button class="buy"  data-lp=${lp}>Add to cart</button></li>
                <li><p>Heavy Play:</p><p class="itemPrice">$${hp}</p><button class="buy"  data-hp=${hp}>Add to cart</button></li>
                </ul>
                `;
            }
            html+=`</div>`
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