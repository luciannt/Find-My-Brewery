const searchForm = document.getElementById("brewery-search")

//event listener on form
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityInput = event.target.city.value;
    const stateInput = event.target.state.value;
    formHandler(cityInput, stateInput);
    event.target.city.value = "";
    event.target.state.value = "";
})

//when form inputs are put in, GET request to api with city and state
function formHandler(city, state){
    console.log(city, state)

    //checks for city and state values
    if(city && state){
        fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}&by_state=${state}&per_page=6`)
        .then(data => data.json())
        .then(breweries => {
            breweries.forEach(brewery => {
                console.log(brewery)
                createBreweryCards(brewery)
            });
        })
   
    } else (
        alert("Please enter both city and state!")
    )


}

function createBreweryCards(brewery){
    const li = document.createElement("li")
    li.className = "brewery-item"
    const h4 = document.createElement("h4")
    const p = document.createElement("p")
    const link = document.createElement("a")
    const star = document.createElement("span")
    star.setAttribute("id", "star");
    h4.textContent = brewery.name;
    p.textContent = `${brewery.street} ${brewery.city}, ${brewery.state} ${brewery.postal_code}`
    link.href = brewery.website_url
    link.textContent = "Visit website"
    star.textContent = "☆"
    star.style.fontSize = "26px"
   
    const breweryList = document.querySelector("#brewery-list")
    li.append( h4, p, link, star)
    breweryList.append(li)

}