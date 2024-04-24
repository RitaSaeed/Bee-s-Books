let username = getValueFromJWT('access_token', 'username');
let eventData = JSON.stringify({"payload": {"Key": {"userID": username}}});

function populateCartPage() {
    const user = getValueFromJWT('access_token', 'username');
        if(user == null){
                window.location.href = "https://beesbooks.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=6fn54hfl5sql09gnvtsvcerg7n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fmain.dva0ia48yehl5.amplifyapp.com%2F";
        }
    fetch("https://pxtzuwk46l.execute-api.us-east-1.amazonaws.com/dev/cart", {
        method: 'POST',
        body: eventData,
        headers: {"Content-Type": "application/json"}
    }).then(response => response.json()).then(data => {
        let cartData = {
            "Item": {
                "products": [],
                "userID": username
            }
        }

        let products = data["body"]["products"];

        if (products === undefined) {
            document.getElementById("cart-spinner").style.display = "none";
            document.getElementById('cart-items-group').innerHTML = `<h1 id='cartStatus'>Cart is empty.</h1>`;
            console.log("Cart empty");
            return;
        }

        for (let i = 0; i < products.length; i++) {
            let isbnNumber = products[i]['ISBN'];
            if (isbnNumber !== undefined) {
                console.log(isbnNumber.substring(5));
                cartData.Item.products[i] = {productID: isbnNumber.substring(5), quantity: "1"};
            }

        }

        generateProducts(cartData);
        document.getElementById("cart-spinner").style.display = "none";
    });
}

function calcSubtotal() {
    fetch("https://pxtzuwk46l.execute-api.us-east-1.amazonaws.com/dev/subtotal", {
        method: 'POST',
        body: eventData,
        headers: {"Content-Type": "application/json"}})
    .then(response => response.json()).then(data => {
        document.getElementById('subtotalID').innerHTML = "$" + data["body"]["value"];
        // added below since order total is the same as subtotal
        document.getElementById('totalID').innerHTML = "$" + data["body"]["value"];
    });
}

function placeOrder() {
    document.getElementById('cart-items-group').innerHTML = "";
    document.getElementById("cart-spinner").style.display = "";
    fetch("https://y5b2vf326i.execute-api.us-east-1.amazonaws.com/Testing/Order", {
        method: 'PUT',
        body: eventData,
        headers: {"Content-Type": "application/json"}})
    .then(response => response.json()).then((data) => {
        document.getElementById('subtotalID').innerHTML = "$0";
        document.getElementById('totalID').innerHTML = "$0";
        window.location.href = '/order-confirmation.html';
    });
}

function clearCart() {
    fetch("https://pxtzuwk46l.execute-api.us-east-1.amazonaws.com/dev/cart", {
        method: 'DELETE',
        body: JSON.stringify({"payload": {"Key": username}}),
        headers: {"Content-Type": "application/json"}})
    .then(response => response.json()).then((data) => {
        document.getElementById('cart-items-group').innerHTML = "";
        document.getElementById('subtotalID').innerHTML = "$0";
    });
}

function removeSpecific(isbn) {
    isbn = isbn.toString().substring(5)
    fetch("https://pxtzuwk46l.execute-api.us-east-1.amazonaws.com/dev/cart", {
        method: 'DELETE',
        body: JSON.stringify({
            "payload": {
                "Key": username,
                "Products": [isbn]
            }}),
        headers: {"Content-Type": "application/json"}})
    .then(response => response.json()).then((data) => {
        document.getElementById('cart-items-group').innerHTML = "";
        document.getElementById('subtotalID').innerHTML = "$0";
        populateCartPage();
        calcSubtotal();
    });
}

window.onload = function() {
    populateCartPage();
    calcSubtotal();
}

// DO NOT EDIT PAST THIS POINT WITHOUT CONSULTING OUR TEAM
function generateProducts(cartData) { // books is the JSON data returned from the API call
    cartData.Item.products.forEach(cartItem => {
        let url = `https://psiceqjjgb.execute-api.us-east-1.amazonaws.com/BB_prod/getBooks?isbn=${cartItem.productID}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.Items.length != 0) {
                    let book = {};
                    book.isbn = cartItem.productID;
                    book.data = data.Items[0];
                    book.userQuantity = cartItem.quantity;

                    // Generate the product page URL based on the book's ISBN
                    const productPageURL = `https://main.dva0ia48yehl5.amplifyapp.com/product.html`;

                    populateGroup(book, productPageURL, cartItem.productID);
                }
            });
    });

    // populateGroup(books);
    
}
function populateGroup(book, productPageURL, isbn) {
    const cardGroup = document.getElementById('cart-items-group'); // Assuming there's a container with the class 'card-group' in your HTML
    const row = document.createElement('div');
    row.className = 'row';
    row.style = 'margin: 10px';
    const card = document.createElement('div');
    card.className = 'card';
    card.style = 'height: auto; border-width: 2px; border-style: solid; border-radius: 10px;';
    // card.onclick = function() {
    //         console.log(book);
    //         console.log('book clicked');
    //         console.log(book.data.SK.slice(5));
    //         localStorage.setItem('productURL', `https://psiceqjjgb.execute-api.us-east-1.amazonaws.com/BB_prod/getBooks?isbn=${book.data.SK.slice(5)}`);
    //         console.log(localStorage.getItem('productURL'));
    //         window.location.href = 'product.html';
    //     };

    // make only image clickable, add favorites call
    
    // for product.quantity below, use quantity of the book that the user wants to purchase
    card.innerHTML = `
        <div class="card-body">
            <div class="row" style="border-width: 1px;">
                <div class="col">
                    <div class="row">
                        <div class="col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-3" style="height: auto;">
                            <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
                                <a href="${productPageURL}">
                                    <img id="cart-item-image" src="${book.data.img}" style="height: auto; width: 65%;" onclick="setProductISBN('${isbn}')" />
                                </a>
                            </div>
                        </div>
                        <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" style="padding: 0px;">
                            <div class="row" style="height: 50%; width: 180%; margin: 0px;">
                                <div class="col" style="width: 100%;">
                                    <h5 style="width: 100%;">${book.data.title || 'Unknown'}</h5>
                                    <h5 style="width: 100%;">${book.data.author || 'Unknown'}</h5>
                                </div>
                            <div class="col-auto col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                            <div class="row" style="height: 25%;">
                                <div class="col d-lg-flex justify-content-lg-center align-items-lg-center"><button class="btn btn-primary btn-sm d-lg-flex justify-content-center align-items-center align-content-center justify-content-lg-center align-items-lg-center pull-right" onclick="checkAndAddFavorite('${book.data.SK}')" type="button" style="padding: 10px;height: 35px;width: 35px;margin-bottom: 10px;margin-top: 10px;margin-right: 5px;"><i class="fas fa-heart d-lg-flex justify-content-lg-center align-items-lg-center" style="color: var(--bs-emphasis-color);width: 10px;"></i></button><button id="${book.data.SK}" value="${book.data.SK}" onclick="removeSpecific('${book.data.SK}')" class="btn btn-primary btn-sm d-lg-flex justify-content-center align-items-center align-content-center justify-content-lg-center align-items-lg-center pull-right" type="button" style="padding: 10px;height: 35px;width: 35px;margin-bottom: 10px;margin-top: 10px;margin-right: 0px;"><span style="color: white;"><strong>X</strong></span></button></div>
                            </div>
                            <div class="row d-lg-flex justify-content-lg-center align-items-lg-end" style="height: 75%;">
                        </div>
                            <div class="row d-lg-flex align-items-lg-end" style="height: 50%; width: 100%; margin: 0px;">
                                <div class="col" style="width: 100%;">
                                    <h5 class="d-lg-flex justify-content-lg-center align-items-lg-end" style="width: 100%;">\$${book.data.price || '0'}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    row.appendChild(card);
    cardGroup.appendChild(row);
}

function setProductISBN(isbn) {
    const invoke_url = `https://psiceqjjgb.execute-api.us-east-1.amazonaws.com/BB_prod/getBooks?isbn=${isbn}`
    localStorage.setItem("productURL", invoke_url)
}
