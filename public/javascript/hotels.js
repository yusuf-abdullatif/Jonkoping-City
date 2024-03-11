// Assuming hotels is an array of objects with a 'name' property
fetch('http://localhost:3000/hotels/all')
    .then(response => response.json())
    .then(hotels => {
        displayHotels(hotels, 'storesContainer');
        createAlphabetNavigation(hotels, 'alphabetNavigation', 'storesContainer');
    });

function createAlphabetNavigation(hotels, containerId, targetContainerId) {
    const alphabetContainer = document.getElementById(containerId);

    // Extract unique first letters from hotels names
    const uniqueFirstLetters = [...new Set(hotels.map(hotel => hotel.name[0].toLowerCase()))];

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

function displayHotels(hotels, containerId) {
    const container = document.getElementById(containerId);

    hotels.forEach(hotel => {
        const hotelBox = document.createElement('div');
        hotelBox.classList.add('store-box');
        hotelBox.style.maxHeight = '200px';
        hotelBox.id = `letter-${hotel.name[0].toLowerCase()}`; // Set an ID based on the first letter

        const nameElement = document.createElement('h2');
        nameElement.textContent = hotel.name;
        const infoElement = document.createElement('p');
        infoElement.textContent = `Rating: ${hotel.rating || 'N/A'}`;
        infoElement.innerHTML += `<br><br>${hotel.address || 'N/A'}`;

        const urlElement = document.createElement('a');
        urlElement.classList.add('openWebsite')
        urlElement.href = hotel.website;
        urlElement.textContent = 'Visit Website';

        hotelBox.appendChild(nameElement);
        hotelBox.appendChild(infoElement);
        hotelBox.appendChild(urlElement);

        container.appendChild(hotelBox);
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