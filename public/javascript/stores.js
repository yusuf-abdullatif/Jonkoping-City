// Assuming stores is an array of objects with a 'name' property
fetch('http://localhost:3000/stores/all')
    .then(response => response.json())
    .then(stores => {
        displayStores(stores, 'storesContainer');
        createAlphabetNavigation(stores, 'alphabetNavigation', 'storesContainer');
        displayDistricts(stores, 'byDistrict');
    });

function createAlphabetNavigation(stores, containerId, targetContainerId) {
    const alphabetContainer = document.getElementById(containerId);

    // Extract unique first letters from store names
    const uniqueFirstLetters = [...new Set(stores.map(store => store.name[0].toLowerCase()))];

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

function displayStores(stores, containerId) {
    const container = document.getElementById(containerId);

    stores.forEach(store => {
        const storeBox = document.createElement('div');
        storeBox.classList.add('store-box');
        storeBox.id = `letter-${store.name[0].toLowerCase()}`; // Set an ID based on the first letter

        const nameElement = document.createElement('h2');
        nameElement.textContent = store.name;
        const districtElement = document.createElement('p');
        districtElement.textContent = `District: ${store.district || 'N/A'}`;

        const urlElement = document.createElement('a');
        urlElement.href = store.url;
        urlElement.textContent = 'Visit Website';

        storeBox.appendChild(nameElement);
        storeBox.appendChild(districtElement);
        storeBox.appendChild(urlElement);

        container.appendChild(storeBox);
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

function displayDistricts(stores, selectId) {
    const selectElement = document.getElementById(selectId);

    // Extract unique districts from stores
    const uniqueDistricts = [...new Set(stores.map(store => store.district))];

    // Remove any existing options
    selectElement.innerHTML = '';

    // Create an option for each district and append it to the select element
    uniqueDistricts.forEach(district => {
        if (district!=null) {
            const optionElement = document.createElement('option');
            optionElement.value = district;
            optionElement.textContent = district; 
            selectElement.appendChild(optionElement);
        }
    });
}


