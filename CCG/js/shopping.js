window.addEventListener('DOMContentLoaded',function(e){
    let load= new Shopping();
});



class Shopping{
    constructor(){
        console.log("started shopping");
        this.api= new API();
        let card= window.localStorage.getItem('searchedCard');
        this.search(card)
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
            console.log(card);
            let html='';
            html+=`<div class="item">
            <h2>${card.name}<h2>
            <img src="${card.image_uris.small}" alt="${card.name} picture">
            <p>${card.set}<p>
            <p>${card.rarity[0]}*${card.collector_number}<p>
            <div>
            `;
            results.insertAdjacentHTML('beforeend',html);
        })
    }

 
}