// Assuming stores is an array of objects with a 'name' property
console.log("charged")
fetch('http://localhost:3000/stores/all')
    .then(response => response.json())
    .then(stores => {
        displayStores(stores, 'storesContainer');
    });

function displayStores(stores, containerId) {
    const oldContainer = document.getElementById(containerId);
    oldContainer.innerHTML = '';
    const container = document.getElementById(containerId);

    stores.forEach(store => {

        if (store.district === window.districtText) {
            const storeBox = document.createElement('div');
            storeBox.classList.add('store-box');
            storeBox.id = `letter-${store.name[0].toLowerCase()}`; // Set an ID based on the first letter

            const nameElement = document.createElement('h2');
            nameElement.textContent = store.name;
            const districtElement = document.createElement('p');
            districtElement.textContent = `District: ${store.district || 'N/A'}`;

            const urlElement = document.createElement('a');
            urlElement.classList.add('openWebsite')
            urlElement.href = store.url;
            urlElement.textContent = 'Visit Website';

            storeBox.appendChild(nameElement);
            storeBox.appendChild(districtElement);
            storeBox.appendChild(urlElement);

            container.appendChild(storeBox);
        }
    });
}




