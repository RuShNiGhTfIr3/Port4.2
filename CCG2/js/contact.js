window.addEventListener('DOMContentLoaded',function(e){
    let load= new Contact();
});

class Contact{
    constructor(){
        console.log("Contact Loaded.")
        this.api = new API();
        let searchBar= document.querySelector(".searchInput input");
        let searchForm= document.querySelector(".searchInput");

        searchBar.addEventListener('input',this.searchModal.bind(this));
        searchForm.addEventListener('submit',this.search);

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

    search=(e)=>{
        e.preventDefault();
        let term= document.querySelector(".searchInput input").value
        
        if(/^\s*$/.test(term)==false){
            window.localStorage.setItem('searchedCard',term);
            window.location.href = '/pages/shopping.html';
        }
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
}