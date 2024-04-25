const idToken = getCookie("id_token");
const toastTriggerEdit = document.getElementById('submit-edit');
const toastTriggerAdd = document.getElementById('submit-add');

const headers = new Headers({
    'Authorization': `Bearer ${idToken}`
});
// JavaScript
document.getElementById('submit-edit').addEventListener('click', function (event) {
    console.log("Submit-edit clicked.");
    const myForm = document.getElementById('product-form-edit');
    const formData = new FormData(myForm);
    console.log(formData);
    alterBook(formData);
});

document.getElementById('submit-add').addEventListener('click', function (event) {
    console.log("Submit-add clicked.");
    const addForm = document.getElementById('product-form-add');
    const addFormData = new FormData(addForm);
    console.log(addFormData);
    addBook(addFormData);
});

document.getElementById('submit-delete').addEventListener('click', function (event) {
    console.log("Submit-delete clicked.");
    const deleteForm = document.getElementById('product-form-edit');
    const deleteFormData = new FormData(deleteForm);
    console.log(deleteFormData);
    deleteBook(deleteFormData);
});

// updates book information from admin dashboard
function alterBook(formData) {
    console.log('Edit form submitted!');

    const url = 'https://psiceqjjgb.execute-api.us-east-1.amazonaws.com/BB_prod/AdminMethods';
    console.log(formData);
    let inputData = {
        "PK": formData.get("PK"),
        "SK": formData.get("SK"),
        "author": formData.get("author"),
        "description": formData.get("description"),
        "fiction": formData.get("fiction"),
        "img": formData.get("img"),
        "price": formData.get("price"),
        "quantity": formData.get("quantity"),
        "rating": formData.get("rating"),
        "title": formData.get("title")
    }
    inputData = JSON.stringify(inputData);
    fetch(url, {
        method: 'PUT', // or 'POST', 'PUT', etc.
        headers: headers,
        body: inputData,
    })
        .then(response => {
            if (response.ok) {
                // Handle successful response
                if (toastTriggerEdit) {
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(document.getElementById('toast-success-edit'));
                    toastBootstrap.show();

                }
                return response.json();
            } else {
                // Handle error response
                if (toastTriggerEdit) {
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(document.getElementById('toast-failure-edit'));
                    toastBootstrap.show();

                }
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
        })
        .then(data => {


            console.log('Book updated successfully');
            console.log('Response data:', data);
        })
        .catch(error => {

            console.error(error);
        });
}

// adds a new book using form on admin dashboard
function addBook(addFormData) {
    console.log('Add form submitted!');

    const url = 'https://psiceqjjgb.execute-api.us-east-1.amazonaws.com/BB_prod/AdminMethods';
    console.log(addFormData);
    let inputData = {
        "PK": addFormData.get("PK"),
        "SK": addFormData.get("SK"),
        "author": addFormData.get("author"),
        "description": addFormData.get("description"),
        "fiction": addFormData.get("fiction"),
        "img": addFormData.get("img"),
        "price": addFormData.get("price"),
        "quantity": addFormData.get("quantity"),
        "rating": addFormData.get("rating"),
        "title": addFormData.get("title")
    }
    inputData = JSON.stringify(inputData);
    fetch(url, {
        method: 'POST', // or 'POST', 'PUT', etc.
        headers: headers,
        body: inputData,
    })
        .then(response => {
            if (response.ok) {
                // Handle successful response
                if (toastTriggerAdd) {
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(document.getElementById('toast-success-add'));
                    toastBootstrap.show();

                }
                return response.json();
            } else {
                // Handle error response
                if (toastTriggerAdd) {
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(document.getElementById('toast-failure-add'));
                    toastBootstrap.show();

                }
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
        })
        .then(data => {

            console.log('New book added successfully!');
            console.log('Response data:', data);
        })
        .catch(error => {

            console.error(error);
        });
}

function deleteBook(deleteFormData) {
    console.log('Delete form submitted!');

    const url = 'https://psiceqjjgb.execute-api.us-east-1.amazonaws.com/BB_prod/AdminMethods';
    console.log(deleteFormData);
    let inputData = {
        "genrepk": deleteFormData.get("PK"),
        "isbnsk": deleteFormData.get("SK"),
    }
    inputData = JSON.stringify(inputData);
    fetch(url, {
        method: 'DELETE', // or 'POST', 'PUT', etc.
        headers: headers,
        body: inputData,
    })
        .then(response => {
            if (response.ok) {
                // Handle successful response
                return response.json();
            } else {
                // Handle error response
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
        })
        .then(data => {
            console.log('Book deleted successfully');
            console.log('Response data:', data);
        })
        .catch(error => {
            console.error(error);
        });
}