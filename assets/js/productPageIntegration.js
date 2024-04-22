let username = getValueFromJWT('access_token', 'username');

function addProductToCart() {
    const apiUrl = localStorage.getItem('productURL');

    fetch(apiUrl).then(response => {
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${response.status}');
        }

        return response.json();
    }).then(data => {
        let eventData = JSON.stringify({
            "payload": {
                "Key": username, 
                "Products": [{
                    "ISBN": data["Items"][0]["SK"],
                    "Title": data["Items"][0]["title"],
                    "Image": data["Items"][0]["img"],
                    "Price": data["Items"][0]["price"],
                    "Genre": data["Items"][0]["PK"].slice(6)
                }]
            }
        });
    
        fetch("https://pxtzuwk46l.execute-api.us-east-1.amazonaws.com/dev/cart", {
            method: 'PUT',
            body: eventData,
            headers: {"Content-Type": "application/json"}
        });
    });
}