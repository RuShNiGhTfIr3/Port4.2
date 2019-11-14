class Homepage{
    constructor(){
        console.log("Homepage Loaded.")
        this.api = new API();
        let searchBar= document.querySelector("#searchBar");

        searchBar.addEventListener('input',this.search.bind(this));
    }

    search=(e)=>{
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
