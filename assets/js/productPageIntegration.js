let username = getValueFromJWT('access_token', 'username');

function addProductToCart(ISBN) {
    if (typeof(ISBN) !== 'string') {
        console.log("Invalid ISBN type");
        return;
    }

    let eventData = JSON.stringify({
        "payload": {
            "Key": {"userID": username}, 
            "Products": [ISBN]
        }
    });

    fetch("https://pxtzuwk46l.execute-api.us-east-1.amazonaws.com/dev/cart", {
        method: 'PUT',
        body: eventData,
        headers: {"Content-Type": "application/json"}
    });
}