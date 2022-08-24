const searchForm = document.getElementById("brewery-search");
const breweryList = document.querySelector("#brewery-list");
const breweryItems = document.getElementsByClassName("brewery-item");
const favList = document.getElementById("favorites-list")




//event listener on form
searchForm.addEventListener("submit", (event) => {
    const cityInput = event.target.city.value;
    const stateInput = event.target.state.value;
    formHandler(cityInput, stateInput);
    event.target.city.value = "";
    event.target.state.value = "";

    //reset UL list to be empty if new search
    breweryList.innerHTML = "";
    
})

//when form inputs are put in, GET request to api with city and state
function formHandler(city, state){
    event.preventDefault();

    //checks for city and state values
    if(city && state){
        fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}&by_state=${state}&per_page=6`)
        .then(data => data.json())
        .then(breweries => {
            breweries.forEach(brewery => {
                createBreweryCards(brewery)
            });
        })
   
    } else (
        alert("Please enter both city and state!")
    )

}


function createBreweryCards(brewery){

    const li = document.createElement("li");
    const h4 = document.createElement("h4")
    const p = document.createElement("p")
    const link = document.createElement("a")
    const star = document.createElement("span")
    const img = document.createElement("img")

    star.className = "star";
    const id = document.getElementsByClassName("brewery-item").length;
    li.setAttribute("id", `list-${id + 1}`);
    img.src = `/images/brew${id + 1}.jpeg`
    li.className = "brewery-item";
    

    h4.textContent = brewery.name;
    p.textContent = `${brewery.street !== null ? brewery.street : " " } ${brewery.city}, ${brewery.state} ${brewery.postal_code}`
    link.href = brewery.website_url
    link.textContent = "Visit website"
    star.textContent = "☆"
 
    li.append( h4, img, p, link, star)
    breweryList.append(li)

    card.querySelector('#remove').addEventListener('click', () => {
        card.remove()
        deleteFavorite(star.id)
    })

    //object for post request
    const newBreweryFav = {
        name: brewery.name,
        street: brewery.street,
        city: brewery.city,
        state: brewery.state,
        postal_code: brewery.postal_code,
        website_url: brewery.website_url,
        image: img.src
    }

    star.addEventListener("click", (event) => {
        star.innerText = "★"
        star.style.color = "orange"
        addFavorite(newBreweryFav, event)
    })
}

function addFavorite(favBrewery, event){
    event.preventDefault()
    fetch("http://localhost:3000/breweries",{
            method: "POST",
            headers:{
            "Content-Type" : "application/json"
            },
            body: JSON.stringify(favBrewery)
        })
  
}


//Create DELETE 

function deleteFavorite(id) {
    fetch("http://localhost:3000/breweries", {
        method: "DELETE",
        header: { "Content-Type": "application/json" },
    })
        .then(res => res.json())
        .then(star => console.log(star))
}


function createFavCards(){
    fetch("http://localhost:3000/breweries")
    .then(data => data.json())
    .then(breweries => {

        if(breweries.length > 0){
            const title = document.getElementById("favorites-title")
            title.classList.remove("hidden")
        }
            breweries.forEach((brewery) => { 
                const li = document.createElement("li");
                const h4 = document.createElement("h4");
                const p = document.createElement("p");
                const link = document.createElement("a");
                const star = document.createElement("span");
                const img = document.createElement("img");

                li.className = "favorite_item"
                h4.textContent = brewery.name;
                p.textContent = `${brewery.street !== null ? brewery.street : " " } ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;
                link.href = brewery.website_url;
                link.textContent = "Visit website";
                img.src = brewery.image;
                star.innerText = "★";
                star.style.color = "orange";
                star.className = "star";
            
                li.append(h4,img, p, link, star)
                favList.append(li);

                star.addEventListener('click', () => {
                    li.remove()
                    deleteFavorite(brewery.id)
                })
            })
     })
}

createFavCards();

// card.querySelector('#remove').addEventListener('click', () => {
//     card.remove()
//     deleteFavorite(star.id)
// })

function deleteFavorite(id) {
    fetch(`http://localhost:3000/breweries/${id}`, {
        method: "DELETE",
        header: { "Content-Type": "application/json" },
    })
        .then(res => res.json())
}

//EMAIL

function validation() {  
    let form = document.getElementById('form')  
    let email = document.getElementById('email').value  
    let text = document.getElementById('text')  
    let pattern = /^[^ ]+@[^ ]+.[a-z]{2,3}$/  
    if (email.match(pattern)) {  
     form.classList.add('valid')  
     form.classList.remove('invalid')  
     text.innerHTML = "Your Email Address in valid"  
     text.style.color = '#00ff00'  
    } else {  
     form.classList.remove('valid')  
     form.classList.add('invalid')  
     text.innerHTML = "Please Enter Valid Email Address"  
     text.style.color = '#ff0000'  
    }  
    if (email == '') {  
     form.classList.remove('valid')  
     form.classList.remove('invalid')  
     text.innerHTML = ""  
     text.style.color = '#00ff00'  
    }  
   }  