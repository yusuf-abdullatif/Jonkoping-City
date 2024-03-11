fetch('http://localhost:3000/stores/all')
    .then(response => response.json())
    .then(stores => {
        console.log(stores)

        var keysArray = Object.keys(stores);
        var size = keysArray.length;
        
        var rectY = 350-size         
        var rectElement = document.querySelector('.NumberOfStores');

        rectElement.setAttribute('y', rectY);
        rectElement.setAttribute('height', size);
    });

    fetch('http://localhost:3000/restaurants/all')
    .then(response => response.json())
    .then(stores => {
        console.log(stores)

        var keysArray = Object.keys(stores);
        var size = keysArray.length;
        
        var rectY = 350-size         
        var rectElement = document.querySelector('.NumberOfRestaurants');

        rectElement.setAttribute('y', rectY);
        rectElement.setAttribute('height', size);
    });

    fetch('http://localhost:3000/hotels/all')
    .then(response => response.json())
    .then(stores => {
        console.log(stores)

        var keysArray = Object.keys(stores);
        var size = keysArray.length;
        
        var rectY = 350-size         
        var rectElement = document.querySelector('.NumberOfHotels');

        rectElement.setAttribute('y', rectY);
        rectElement.setAttribute('height', size);
    });


    fetch('http://localhost:3000/stores/storename/?storename=Bikupan')
    .then(response => response.json())
    .then(store => {
        console.log(store)
    });

    function redirectToLogin() {
        window.location.href = '/login.html';
      }