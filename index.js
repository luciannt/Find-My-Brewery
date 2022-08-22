const searchForm = document.getElementById("brewery-search")

//event listener on form
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityInput = event.target.city.value;
    const stateInput = event.target.state.value;
    formHandler(cityInput, stateInput);
})

//when form inputs are put in, GET request to api with city and state
function formHandler(city, state){
    console.log(city, state)

    //checks for city and state values
    if(city && state){
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}&by_state=${state}&per_page=6`)
    .then(data => data.json())
    .then(breweries => console.log(breweries))
    } else (
        alert("Please enter a state!")
    )
}