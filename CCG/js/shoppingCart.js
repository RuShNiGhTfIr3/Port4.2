window.addEventListener('DOMContentLoaded',function(e){
    let cart= new Cart();
});

class Cart{
    constructor(){
        console.log("cart opened");
        this.loadCart();
        this.subTotal();
    }

    subTotal(){
        let subTotalText = document.querySelector(".subTotal");
        let subItems= document.querySelector(".subItems")
        let cards = localStorage.getItem("shoppingCart");
        let subTotal=0;

        if(cards){
            let parsed = JSON.parse(cards);
            parsed.cards.forEach(card=>{
                subTotal+=parseFloat(card.price);
            })
            subTotalText.innerHTML="$"+subTotal;
            subItems.innerHTML=`SubTotal (${parsed.cards.length} items)`
        }
    }

    loadCart(){
        let cart = localStorage.getItem("shoppingCart");
        let parsed=JSON.parse(cart);
        let section =document.querySelector(".toBuy");
        let iterator=0;

        parsed.cards.forEach(card=>{
            let html='';
            html+=`<div data-id=${iterator} class"cartItem">
            <h3>${card.name}</h3>
            <img src="${card.img}"/>
            <p>${card.set}</p>
            <p>${card.rarity}*${card.number}</p>
            <p>${card.price}</p>
            <button class="removeItemCart"> remove</button>
            </div>`;
            section.insertAdjacentHTML('beforeend',html);
            iterator=iterator+1;
        })

        let buttons = document.querySelectorAll(".removeItemCart");
        buttons.forEach(button=>{
            button.addEventListener('click',this.removeFromCart);
        })
    }

    removeFromCart(e){
        e.preventDefault();
        let id = e.target.parentElement.dataset.id;
        let cart = localStorage.getItem("shoppingCart");
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
        localStorage.setItem("shoppingCart",newString);
        console.log(JSON.parse(localStorage.getItem("shoppingCart")))

        location.reload();
    }
}