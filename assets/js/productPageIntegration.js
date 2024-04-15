let username = getValueFromJWT('access_token', 'username');

function addProductToCart(ISBN) {
    if (typeof(ISBN) !== 'string') {
        console.log("Invalid ISBN type");
        return;
    }

    const apiUrl = localStorage.getItem('productURL');

    fetch(apiUrl).then(response => {
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${response.status}');
        }

        return response.json();
    }).then(data => {
        let eventData = JSON.stringify({
            "payload": {
                "Key": {"userID": username}, 
                "Products": [{
                    "ISBN": ISBN,
                    "Title": data["Items"][0]["title"],
                    "Image": data["Items"][0]["img"],
                    "Price": data["Items"][0]["price"]
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