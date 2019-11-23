class API{
    constructor(){
        console.log("API Started.")
        this.BASE_URL = 'https://api.scryfall.com';
    }

    async random(){

        return await fetch(`${this.BASE_URL}/cards/random`).then(res=>{
            if(res.ok){
                return res.json();
            }
            throw new Error(res);
        }).then(card=>{
            return card;
        })
       
    }

    searchModal(name){
        let div = document.querySelector("#modalCards");
            return fetch(`${this.BASE_URL}/cards/search?q=${name}`).then(res=>{
            if(res.ok){
                return res.json();
            }
            throw new Error(res);
        })
        .then(cards=>{
            div.innerHTML="";
            if(cards.total_cards>0){

                for(let i=0;i<cards.total_cards;i++){
                    if(cards.data[i].name!=undefined){
                        let html= '';
                        html+=`<li class="modalItem"><div class="hidden">${JSON.stringify(cards.data[i])}</div><p>${cards.data[i].name}</p></li>`
                        div.insertAdjacentHTML('beforeend',html);
                        let li = document.querySelectorAll(".modalItem");
                        li.forEach(card=>{
                            card.addEventListener('click',function(e){this.viewed(e,card)}.bind(this),true);
                        })
                    }
                }
            }
           
        })
    }

    viewed(e,name){
        e.preventDefault();
        let cardOBJ=name.getElementsByClassName("hidden")[0].innerHTML;

        localStorage.setItem("selectedCard",cardOBJ)

        window.location.href = '/pages/viewedProduct.html';
    }

    search(card){
        return fetch(`https://api.scryfall.com/cards/search?q=${card}`).then(res=>{
            if(res.ok){
                return res.json();
            }
            throw new Error(res);
        }).then(res=>{
            return res;
        }).catch(err=>{
            return err;
        })}

    Api(config) {
        const{endpoint = '/cards', method='GET'}= config;
        const BASE_URL = 'https://api.scryfall.com';

        return fetch(`${BASE_URL}${endpoint}?`).then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(res);
        })
    }
}