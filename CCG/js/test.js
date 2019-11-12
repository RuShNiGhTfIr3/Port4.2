
document.addEventListener('DOMContentLoaded',function(){
    let assignment= new UI();
});

class UI{
    constructor(){
        this.api= new API();
        console.log("UI started.");

        this.form = document.querySelector("form");
        this.form.addEventListener('submit',function (e) {this.search(e)}.bind(this),true);
    }

    search=(e)=>{
        e.preventDefault();
        let input = document.querySelector("input").value;
        this.api.search(input);
    }
}



class API{
    constructor(){
        console.log("API Started.")
        this.BASE_URL = 'https://api.scryfall.com';
    }

    search(name){
        let div = document.querySelector("#card");
            return fetch(`${this.BASE_URL}/cards/search?q=${name}`).then(res=>{
            if(res.ok){
                return res.json();
            }
            throw new Error(res);
        })
        .then(cards=>{
            cards.data.forEach(card=>{
                let html= '';
                html+=`<h1>${card.name}</h1><img src="${card.image_uris.normal}">`
                div.insertAdjacentHTML('beforeend',html);
            })
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