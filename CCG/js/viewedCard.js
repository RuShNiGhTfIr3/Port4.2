window.addEventListener('DOMContentLoaded',function(e){
    let view = new View();
});


class View{
    constructor(){
        console.log("viewing card");
        this.loadCard();
    }

    lightPlay(price){
        let rate = (price*0.2).toFixed(2);
        return (price-rate).toFixed(2);
    }
    
    heavyPlay(price){
        let rate = price*0.35;
        return (price-rate).toFixed(2);
    }

    loadCard(){
        let card= localStorage.getItem("selectedCard");
        let parsed=JSON.parse(card);
        let page =document.querySelector(".sellPage")
        let html='';

        html+=`<div>
        <h3>${parsed.name}</h3>
        <img src="${parsed.image_uris.small}"/>
        <p>${parsed.set}</p>
        <p>${parsed.rarity}*${parsed.collector_number}</p>`;

        if(parsed.prices.usd){
            let hp= this.heavyPlay(parsed.prices.usd);
            let lp= this.lightPlay(parsed.prices.usd);

            html+=`<p><div class="hidden">${card}</div>
            Near Mint:$${parsed.prices.usd}<button class="buy"  data-near=${parsed.prices.usd}>Buy</button>
            Light Play:$${lp}<button class="buy"  data-lp=${lp}>Buy</button>
            Heavy Play:$${hp}<button class="buy"  data-hp=${hp}>Buy</button>
            </p>`;
        }else{
            let price = 0.01+Math.floor(Math.random()*(100-0.01));
            let lp= this.lightPlay(price);
            let hp= this.heavyPlay(price);
            html+=`<p><div class="hidden">${card}</div>
            Near Mint:$${price}<button class="buy"  data-near=${price}>Buy</button>
            Light Play:$${lp}<button class="buy"  data-lp=${lp}>Buy</button>
            Heavy Play:$${hp}<button class="buy"  data-hp=${hp}>Buy</button>
            </p>`;
        }
        
        html+=`</div>`;
  
        page.insertAdjacentHTML('beforeend',html);
        let buttons = document.querySelectorAll(".buy");

        buttons.forEach(button=>{
            button.addEventListener('click',function(e){this.addToCart(e,page)}.bind(this),true);
        })
        
    }

    addToCart(e,page){
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