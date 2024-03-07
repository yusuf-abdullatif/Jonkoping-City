// Assuming hotels is an array of objects with a 'name' property
fetch('http://localhost:3000/hotels/hotelsByNameStartsWith?hotelname='+window.searchText)
    .then(response => response.json())
    .then(hotels => {
        displayHotels(hotels, 'storesContainer');
    });

function displayHotels(hotels, containerId) {
    const oldContainer = document.getElementById(containerId);
    oldContainer.innerHTML = '';
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