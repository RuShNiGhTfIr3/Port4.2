class Homepage{
    constructor(){
        console.log("Homepage Loaded.")
        this.api = new API();
        let searchBar= document.querySelector("#searchBar");
        let activeScroll = document.querySelectorAll(".feat");

        searchBar.addEventListener('input',this.search.bind(this));
        activeScroll.forEach(button=>{
            button.addEventListener('click',this.changeFeatured)
        })
        this.sales();
    }

    changeFeatured(e){
        let active= document.querySelector(".activeScroll");
        active.classList.toggle("activeScroll");
        e.target.classList.toggle("activeScroll");

        switch(e.target.dataset.feat){
            case 1:

            break;

            case 2:

            break;

            case 3:

            break;
        }
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

    sales(){
        let sales=[];
        let salesDiv=document.querySelector("#sales");
        

        const getCards=async _=>{
            console.log("start")
            let temp=[];
            for(let i=0;i<4;i++){
                this.api.random().then(random=>{
                    temp.push(random);
                })
            }
        }

        //  sales.forEach(card=>{
        //     let html='';
        //     html+=`<div><p>${card.name}</p></div>`
        //     salesDiv.insertAdjacentHTML('beforeend',html);
        //     console.log(card.name)
        // })
    }

    randomCards(){
        let sales=[];
        for(let i=0;i<4;i++){
            this.api.random().then(random=>{
                sales.push(random);
            })
        }

        return sales
    }
}
