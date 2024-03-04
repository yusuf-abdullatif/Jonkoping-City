// Assuming restaurants is an array of objects with a 'name' property
fetch('http://localhost:3000/restaurants/all')
    .then(response => response.json())
    .then(restaurants => {
        displayRestaurants(restaurants, 'storesContainer');
        createAlphabetNavigation(restaurants, 'alphabetNavigation', 'storesContainer');
    });

function createAlphabetNavigation(restaurants, containerId, targetContainerId) {
    const alphabetContainer = document.getElementById(containerId);

    // Extract unique first letters from restaurant names
    const uniqueFirstLetters = [...new Set(restaurants.map(restaurant => restaurant.name[0].toLowerCase()))];

    // Sort the letters alphabetically
    uniqueFirstLetters.sort();

    // Add letter elements to the alphabet container
    uniqueFirstLetters.forEach(letter => {
        const letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        letterElement.dataset.letter = letter;
        letterElement.textContent = letter.toUpperCase();
        letterElement.addEventListener('click', () => scrollToLetter(letter, targetContainerId));
        alphabetContainer.appendChild(letterElement);
    });
}

function scrollToLetter(letter, targetContainerId) {
    const letterSection = document.getElementById(`letter-${letter}`);

    if (letterSection) {
        letterSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function displayRestaurants(restaurants, containerId) {
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
        urlElement.href = restaurant.website;
        urlElement.textContent = 'Visit Website';

        restaurantBox.appendChild(nameElement);
        restaurantBox.appendChild(infoElement);
        restaurantBox.appendChild(urlElement);

        container.appendChild(restaurantBox);
    });
}

window.addEventListener('scroll', function() {
    const storesContainer = document.getElementById('storesContainer');
    const alphabetNavigation = document.getElementById('alphabetNavigation');
    const storesContainerRect = storesContainer.getBoundingClientRect();

    // If top of store container is visible in the windows 
    if (storesContainerRect.top <= 0) {
        // Calculate the distance between the top of the window and the bottom of the stores container
        const distanceFromTop = Math.max(0, -storesContainerRect.top);
        // Apply this distance as the offset value for the navigation bar
        alphabetNavigation.style.top = distanceFromTop + 'px';
    } else {
        // If the stores container is at the top of the window, reset the offset of the navigation bar
        alphabetNavigation.style.top = '0';
    }
});