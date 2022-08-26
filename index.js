const searchForm = document.getElementById("brewery-search");
const breweryList = document.querySelector("#brewery-list");
const breweryItems = document.getElementsByClassName("brewery-item");
const favList = document.getElementById("favorites-list");
const brewContainer = document.getElementById("brewery-container");

//event listener on form
searchForm.addEventListener("submit", (event) => {
  const cityInput = event.target.city.value;
  const stateInput = event.target.state.value;
  const optionInput = event.target.types.value;

  formHandler(cityInput, stateInput, optionInput, event);

  //resets UL
  breweryList.innerHTML = "";
});

//adds favorite items to page
function fetchFavorites() {
  fetch("http://localhost:3000/breweries")
    .then((data) => data.json())
    .then((breweries) => {
      breweries.map((brewery) => {
        createFavCards(brewery);
      });
    });
}

//post method on a favorited brewery
function addFavorite(favBrewery, event) {
  event.preventDefault();
  fetch("http://localhost:3000/breweries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favBrewery),
  });
  createFavCards(favBrewery);
}

//deletes brewery from favorites
function deleteFavorite(id) {
  fetch(`http://localhost:3000/breweries/${id}`, {
    method: "DELETE",
    header: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

//when form inputs are put in, GET request to api with city and state
function formHandler(city, state, type, event) {
  event.preventDefault();

  //checks for city, state, and types values
  if (city && state && type === "choose") {
    fetch(
      `https://api.openbrewerydb.org/breweries?by_city=${city}&by_state=${state}&per_page=10`
    )
      .then((data) => data.json())
      .then((breweries) => {
        console.log("hi");
        console.log(breweries.length);
        const results = document.getElementById("results");
        results.innerHTML = `Showing results for <span>${city}</span>, <span>${state}</span>...`;
        breweries.forEach((brewery) => {
          createBreweryCards(brewery);
        });
      });
  }
  if (city && state && type != "choose") {
    fetch(
      `https://api.openbrewerydb.org/breweries?by_city=${city}&by_state=${state}&by_type=${type}&per_page=10`
    )
      .then((data) => data.json())
      .then((breweries) => {
        const results = document.getElementById("results");

        if (breweries.length > 0) {
          results.innerHTML = `Showing results for <span>${type}</span> breweries in <span>${city}</span>, <span>${state}</span>...`;
          breweries.forEach((brewery) => {
            createBreweryCards(brewery);
          });
        }
        if (breweries.length === 0) {
          results.textContent = "No results for this. Try again!";
        }
      });
  }
}

function createBreweryCards(brewery) {
  const li = document.createElement("li");
  const h4 = document.createElement("h4");
  const address = document.createElement("a");
  const link = document.createElement("a");
  const star = document.createElement("span");
  const img = document.createElement("img");
  const br = document.createElement("br");
  const contents = document.createElement("div");
  const footer = document.createElement("div");

  star.className = "star";
  const id = document.getElementsByClassName("brewery-item").length;
  li.setAttribute("id", `list-${id + 1}`);
  img.src = `./images/brew${id + 1}.jpeg`;
  li.className = "brewery-item";

  contents.className = "item-contents";
  footer.className = "item-footer";

  h4.textContent = brewery.name;
  address.textContent = `${brewery.street !== null ? brewery.street : " "} ${
    brewery.city
  }, ${brewery.state} ${brewery.postal_code}`;
  address.href = `https://maps.google.com/?q=${brewery.name}%20${
    brewery.street !== null ? brewery.street : " "
  }%20${brewery.city},%20${brewery.state}%20${brewery.postal_code}`;
  address.target = "_blank";
  link.target = "_blank";
  link.href = brewery.website_url;
  link.textContent = "Visit website";
  star.textContent = "☆";

  footer.append(link, star);
  contents.append(address, footer);
  li.append(h4, img, address, br, link, star);
  breweryList.append(li);

  //object for post request
  const newBreweryFav = {
    name: brewery.name,
    street: brewery.street,
    city: brewery.city,
    state: brewery.state,
    postal_code: brewery.postal_code,
    website_url: brewery.website_url,
    image: img.src,
  };

  star.addEventListener("click", (event) => {
    star.innerText = "★";
    star.style.color = "black";
    addFavorite(newBreweryFav, event); //posts favorite object
  });
}

function createFavCards(brewery) {
  const li = document.createElement("li");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  const link = document.createElement("a");
  const star = document.createElement("span");
  const img = document.createElement("img");

  li.className = "favorite_item";
  h4.textContent = brewery.name;
  p.textContent = `${brewery.street !== null ? brewery.street : " "} ${
    brewery.city
  }, ${brewery.state} ${brewery.postal_code}`;
  link.href = brewery.website_url;
  link.textContent = "Visit website";
  img.src = brewery.image;
  star.innerText = "★";
  star.style.color = "black";
  star.className = "star";

  li.append(h4, img, p, link, star);
  favList.append(li);

  star.addEventListener("click", () => {
    li.remove();
    deleteFavorite(brewery.id); //deletes card
  });
}

fetchFavorites();

const subForm = document.getElementById("subscribe-form");
console.log(subForm);

// subForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     validation();
//  })

function validation() {
  let email = document.getElementById("email").value;
  let text = document.getElementById("text");
  let pattern = /^[^ ]+@[^ ]+.[a-z]{2,3}$/;
  if (email.match(pattern)) {
    subForm.classList.add("valid");
    subForm.classList.remove("invalid");
    text.innerHTML = "Your Email Address in valid";
    text.style.color = "#00ff00";
  } else {
    subForm.classList.remove("valid");
    subForm.classList.add("invalid");
    text.innerHTML = "Please Enter Valid Email Address";
    text.style.color = "#ff0000";
  }
  if (email == "") {
    subForm.classList.remove("valid");
    subForm.classList.remove("invalid");
    text.innerHTML = "";
    text.style.color = "#00ff00";
  }
}
