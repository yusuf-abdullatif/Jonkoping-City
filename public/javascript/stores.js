// Assuming stores is an array of objects with a 'name' property
fetch('http://localhost:3000/stores/all')
    .then(response => response.json())
    .then(stores => {
        displayStores(stores, 'storesContainer');
        createAlphabetNavigation(stores, 'alphabetNavigation', 'storesContainer');
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
