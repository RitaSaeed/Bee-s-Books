// This is a seperate function to make testing easier by being able to pass
// in whatever userID you want to getOrderHistory()
function createOrderHistoryTable() {

    let userID = getValueFromJWT('id_token', 'cognito:username');

    let orders = getOrderHistory(userID);
}

function getOrderHistory(userID) {    
    let requestBody = {
        userID: userID,
    }

    let url = `https://y5b2vf326i.execute-api.us-east-1.amazonaws.com/Testing/Orders?userID=${userID}`;

    console.log(url);

    let container = document.getElementById("order-history-container");



    return fetch(url)
    .then(response => response.json())
    .then(response => {
        let data = response['dynamodb_response'];
        console.log(data);
        
        var historyHTML = "";


        for (const order in data) {
            console.log("order: " + JSON.stringify(data[order]));

            let orderID = data[order]['SK']['S'];
            let date = data[order]['DateTime']['S'].split(' ')[0];
            let productJSON = data[order]['Products']['L'];

            var products = [];

            for (const entry in productJSON) {
                products.push(productJSON[entry]['S'])
            }

            let total = "FILLER";
            let productName = "FILLER";

            console.log("orderID: " + JSON.stringify(orderID));
            console.log("date: " + JSON.stringify(date));
            console.log("products: " + JSON.stringify(products));



            historyHTML += 
            `<section class="vh-100 gradient-custom-2">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-10 col-lg-8 col-xl-6">
                <div class="card card-stepper" style="border-radius: 16px;">
                <div class="card-header p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p class="text-muted mb-2"> Order ID </p>
                            <span class="fw-bold text-body">${orderID}</span>
                        </div>
                        <div>
                            <p class="text-muted mb-2"> Placed On </p>
                            <span class="fw-bold text-body">${date}</span>
                        </div>
                        <div>
                            <p class="text-muted mb-2"> Total </p>
                            <span class="fw-bold text-body">${total}</span>
                        </div>
                    </div>
                </div>
                <div class="card-body p-4">

                <div class="mx-n5 px-5 py-4">
                    <div class="row">
                        <div class="col-md-2">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/6.webp" class="img-fluid">
                        </div>
                        <div class="col-md-5 col-lg-7">
                            <p>${productName}</p>
                        </div>
                        <div class="col-md-4 col-lg-3">
                            <p class="mb-0">${total}</p>`;

            historyHTML += `/div>
                    </div>
                </div>

                <div class="card-footer p-4">
                    <div class="d-flex justify-content-between">
                    <div class="border-start h-100"></div>
                    <h5 class="fw-normal mb-0"><a href="#!">Cancel</a></h5>
                    <h5 class="fw-normal mb-0"><a href="#!" class="text-muted"><i class="fas fa-ellipsis-v"></i></a>
                    </h5>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>`;

        }

        container.innerHTML = historyHTML;
    })
    .catch(e => {
        console.log('ERROR: ', e);
        return null;
    });
}
