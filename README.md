
<h1>Brew Hub<h1>
<p>
Team Members: Kaeli Gilmore, Jordan Jennings, Lucy Tittle
Phase 1 - 080822 East B 
</p>
<p>
Brew Hub is a one page app that uses a public API to search for breweries in a designated area. The page is built with HTML, CSS, and Javascript. 
</p>
<p>
The main functionality is built using a fetch request. The user has the ability to search by city and state, as well as type of brewery. The API returns up to 10 breweries with their name, address, and website. 
</p>
![alt.text](./images/search.png)

<p>
The user is able to click the star ☆ to save that brewery to their favorites using a POST request. We are replicating a backend server by using json-server. The favorites are saved in the db.json file. Favorite breweries can be deleted as well by clicking the clicked star again.
</p>
![alt.text](./images/favorites.png)

<h2>Try Brew Hub<h2>
<p>
To test Brew Hub for yourself, clone this repository to your local computer. In the terminal run "json-server --watch db.json".

To check out the API documentation: https://www.openbrewerydb.org/documentation
</p>
