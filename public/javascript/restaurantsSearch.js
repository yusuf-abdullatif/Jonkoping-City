// Assuming restaurants is an array of objects with a 'name' property
console.log("ss loaead")

fetch('http://localhost:3000/restaurants/restaurantsByNameStartsWith?restaurantname='+window.searchText)
    .then(response => response.json())
    .then(restaurants => {
        displayRestaurants(restaurants, 'storesContainer');
    });

function displayRestaurants(restaurants, containerId) {
    const oldContainer = document.getElementById(containerId);
    oldContainer.innerHTML = '';
    const container = document.getElementById(containerId);

    restaurants.forEach(restaurant => {
        const restaurantBox = document.createElement('div');
        restaurantBox.classList.add('store-box');
        restaurantBox.style.maxHeight = '200px';
        restaurantBox.id = `letter-${restaurant.name[0].toLowerCase()}`; // Set an ID based on the first letter

        const nameElement = document.createElement('h2');
        nameElement.textContent = restaurant.name;
        const infoElement = document.createElement('p');
        infoElement.textContent = `Rating: ${restaurant.rating || 'N/A'}`;
        infoElement.innerHTML += `<br>Type: ${restaurant.restaurant_type || 'N/A'}`;
        infoElement.innerHTML += `<br><br>${restaurant.address || 'N/A'}`;

        const urlElement = document.createElement('a');
        urlElement.classList.add('openWebsite')
        urlElement.href = restaurant.website;
        urlElement.textContent = 'Visit Website';

        restaurantBox.appendChild(nameElement);
        restaurantBox.appendChild(infoElement);
        restaurantBox.appendChild(urlElement);

        container.appendChild(restaurantBox);
    });
}