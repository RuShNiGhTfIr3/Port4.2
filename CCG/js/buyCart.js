window.addEventListener('DOMContentLoaded',function(e){
    let load= new Buy();
});

class Buy{
    constructor(){
        console.log("buy cart started");
        this.loadCart();
        this.subTotal();
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

    subTotal(){
        let subTotalText = document.querySelector(".subTotal");
        let subItems= document.querySelector(".subItems")
        let cards = localStorage.getItem("buyCart");
        let subTotal=0;

        if(cards){
            let parsed = JSON.parse(cards);
            parsed.cards.forEach(card=>{
                subTotal+=parseFloat(card.price);
            })
            subTotalText.innerHTML="$"+subTotal.toFixed(2);
            subItems.innerHTML=`SubTotal (${parsed.cards.length} items)`
        }
    }

    loadCart(){
        let cart = localStorage.getItem("buyCart");
        let parsed=JSON.parse(cart);
        let section =document.querySelector(".toSell");
        let iterator=0;

        parsed.cards.forEach(card=>{
            let html='';
            html+=`<div data-id=${iterator} class"cartItem">
            <h3>${card.name}</h3>
            <img src="${card.img}"/>
            <p>${card.set}</p>
            <p>${card.rarity}*${card.number}</p>
            <p>$${card.price}</p>
            <button class="removeItemBuyCart"> remove</button>
            </div>`;
            section.insertAdjacentHTML('beforeend',html);
            iterator=iterator+1;
        })

        let buttons = document.querySelectorAll(".removeItemBuyCart");
        buttons.forEach(button=>{
            button.addEventListener('click',this.removeFromCart);
        })
    }

    removeFromCart(e){
        e.preventDefault();
        let id = e.target.parentElement.dataset.id;
        let cart = localStorage.getItem("buyCart");
        let parsed=JSON.parse(cart);
        delete parsed.cards[id];
        let newData=[];

        for(let i=0; i<parsed.cards.length;i++){
            if(parsed.cards[i]!=null){
                //console.log(JSON.stringify(parsed.cards[i]))
                if(i!=parsed.cards.length-1){
                    newData.push(JSON.stringify(parsed.cards[i])+",");
                }else{
                    newData.push(JSON.stringify(parsed.cards[i]));
                    console.log("pushed")
                }
                
            }
        }
        let newString=`{"cards":[`;
        newData.forEach(card=>{

            newString+=card;
        })
        newString+=']}';

        let string = JSON.stringify(newString);
        localStorage.setItem("buyCart",newString);
        console.log(JSON.parse(localStorage.getItem("buyCart")))

        location.reload();
    }
}