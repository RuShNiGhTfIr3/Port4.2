window.addEventListener('DOMContentLoaded',function(e){
    let load= new Shopping();
});



class Shopping{
    constructor(){
        console.log("started shopping");
        this.api= new API();
        let card= window.localStorage.getItem('searchedCard');
        let searchForm= document.querySelector(".searchForm");

        this.search(card);

        searchBar.addEventListener('input',this.searchModal.bind(this));
        searchForm.addEventListener('submit',this.searchBar);
    }

    searchBar=(e)=>{
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
                html+=`<img width="146" height="204" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXz9Pa5vsq2u8jN0dnV2N/o6u7FydPi5Onw8fS+ws3f4ee6v8v29/jY2+Hu7/Ly9PbJztbQ1dxJagBAAAAC60lEQVR4nO3b2ZaCMBREUQbDJOP//2wbEGVIFCHKTa+zH7uVRVmBBJQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCpdOzvQQqaq2KmuSrOzQ02lSeRem8rpsQq/ozg72Kj4UkAxEev8awnzs7P1yiIadsfpQXjfZCHhUCzbfmeurdNz6bDRsBWRsB+k0cXxdHjpa0wkTBn3hKnjzRZyEgYk3IeEv2RKWCt1cN9EJ0zjfm7Mq/rAVgUnbLpwnK/zA2tnuQmzJHquuqJq91blJuwmAW8rHbV3q2ITFrOAt7Xz3l2UmrBMlpcHe9fOUhOqRYVhFO/cqtSEy0H6bh/tJ1uhCctqlTB/NSnG9pOt1ISXjxLq825laVFowo9GaRPrF9talJqw3n6macaZ09yi1ISG2cLyriwePwxzi1ITru4s2naxma59TC2KTRjE83FqmQ6yeDaUDS3KTRhMV96h5TTSLD4HQ4uCE9bxePUU5pYL/3mD5o9CcMKgTONc39NNLrV5iK4aNLUoOWHQ38RQtW3nsm6db92i8ISvGBtct+hvwqyzBFxE9DehrcHlQPU1YWNvcNGirwlfNThv0ZOE9eJG1OsGZy36kVBdczU9e7RvAz5b9CFhqfIwSp4XwG+OwUWLPiRUV/33Z4tbGtTvGK635CfUDfb/SO5rt20N9t8m65fLT9g3GD5abDY2qC+lvEg4NjhEvLW4tUFvEj4a7OXq3TzoW8Jpg0PEzfk8SThv8EMeJFw1+O8SHmrQg4QHG/Qg4cEGxSc83KD4hIcblJ6w3L508TXh+vtDEpLw3GwDEpKQhOdznVD2fRr9tdpRw/1HqQndIeEvkXCXUlDC+1NBndsnge/fwyVnp9PGH3p95dm1WMKza4/fI37j+UPXR/c+2X9/hjQI0uO3LsyuMioM9A8Sjy/W1iIhY7Sn2tzpUahdWyXiNDNSxcWtSlCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAwCn+AEXGNosxDBhFAAAAAElFTkSuQmCC" alt="${card.name} picture">`;
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