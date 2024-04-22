const idToken = getCookie("id_token");
    
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

                                            // updates book information from admin dashboard
                                            function alterBook(formData) {
                                                console.log('Form submitted!');

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
                                                            return response.json();
                                                        } else {
                                                            // Handle error response
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
                                                console.log('Form submitted!');

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
                                                            return response.json();
                                                        } else {
                                                            // Handle error response
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