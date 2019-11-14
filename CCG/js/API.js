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
            for(let i=0;cards.total_cards<15;i++){
                if(cards.data[i].name!=undefined){
                    let html= '';
                    html+=`<li><p>${i}${cards.data[i].name}</p></li>`
                    div.insertAdjacentHTML('beforeend',html);
                }
            }
           
        })
    }

    search(card){
        return fetch(`https://api.scryfall.com/cards/search?q=${card}`).then(res=>{
            if(res.ok){
                return res.json();
            }
            throw new Error(res);
        }).then(res=>{
            return res;
        })
    }

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