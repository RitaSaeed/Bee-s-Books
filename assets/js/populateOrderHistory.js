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
        
        let container = document.getElementById('order-history-container');

        for (const order in data) {
            console.log("order: " + JSON.stringify(data[order]));
        }
    })
    .catch(e => {
        console.log('ERROR: ', e);
        return null;
    });
}
