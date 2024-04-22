$(document).ready(async function () {
            try {

                const isAdmin = await checkAdminStatus();

                if (!isAdmin) {
                    alert("Access Denied: You are not authorized to view this content.");
                    return;
                }

                const users = await getUsers();

                function mapUserToTabulator(user) {
                    return {
                        username: user.username,
                        email: user.email || user["cognito:email_alias"],
                        name: user.name || '',
                        address: user.address || 'null',
                        admin: user.isAdmin || false,
                        confirmed: user["cognito:user_status"] || "Unconfirmed",
                        unsubscribed: user.Unsubscribed || 'null'
                    };
                }

                mappedUsers = users.map(mapUserToTabulator)


                var table = new Tabulator("#userTableContainer", {
                    height: 450,
                    data: mappedUsers,
                    layout: 'fitDataFill',
                    pagination: "local",
                    paginationSize: 10,
                    columns: [
                        { title: "Username", field: "username", width: 125 },
                        { title: "Email", field: "email", width: 250 },
                        { title: "Name", field: "name", width: 150 },
                        { title: "Address", field: "address", width: 200 },
                        { title: "Confirmed", field: "confirmed", width: 100 },
                        { title: "Unsubscribed", field: "unsubscribed", width: 75 },
                        { title: "Admin", field: "admin", hozAlign: "center", vertAlign: "middle", formatter: "tickCross", width: 75 },
                    ]
                });

                table.on("rowClick", function (e, row) {
                    userDashboard(row)
                });

                const orders = await getOrders();

                let ordertable = new Tabulator("#orderTableContainer", {
                    height: 450,
                    data: orders,
                    layout: 'fitDataFill',
                    pagination: "local",
                    paginationSize: 10,
                    columns: [
                        { title: "Order ID", field: "SK", width: 125 },
                        { title: "Customer Name", field: "PK", width: 250 },
                        { title: "Placed At", field: "DateTime", width: 250 },
                        { title: "Total", field: "name", width: 150 },
                        { title: "Items", field: "Products", width: 200 },
                        { title: "Status", field: "OrderState", width: 100 },
                    ]
                });

                ordertable.on("rowClick", function (e, row) {
                    orderDashboard(row)
                });

            } catch (error) {
                console.error("Error getting users:", error);
            }
        });

        async function orderDashboard(row) {
            console.log(row.getData());
            var overlay = document.createElement("div");
            overlay.classList.add("dashboard-overlay");
            document.body.appendChild(overlay);
            var container = document.createElement("div");
            container.classList.add("dashboard-container");

            var fields = [
                { title: "Order ID", field: "SK", width: 125 },
                { title: "Customer Name", field: "PK", width: 250 },
                { title: "Placed At", field: "DateTime", width: 250 },
                { title: "Total", field: "name", width: 150 },
                { title: "Items", field: "Products", width: 200 },
                { title: "Status", field: "OrderState", width: 100 },
            ];

            var rowData = row.getData();
            fields.forEach(function (field) {

                var label = document.createElement("label");
                label.textContent = field.title;
                container.appendChild(label);
                container.appendChild(document.createElement("br"));
                var input = document.createElement("input");
                input.type = "text";
                input.placeholder = field.title;
                input.style.width = field.width + "px";
                input.id = field.field; // Assign unique ID
                input.value = rowData[field.field];
                if (field.title === "Order ID" || field.title === "Customer Name" || field.title === "Status" || field.title === "Total") {
                    input.disabled = true; // Disable editing
                }
                else {
                    input.disabled = false; // Enable editing
                }

                container.appendChild(input);
                container.appendChild(document.createElement("br"));
            });


            var statusLabel = document.createElement("label");
            statusLabel.textContent = "Update Status:";
            container.appendChild(statusLabel);
            container.appendChild(document.createElement("br"));

            var statusSelect = document.createElement("select");
            statusSelect.id = "statusSelect";
            var statusOptions = ["Completed", "Refunded"];
            statusOptions.forEach(function (status) {
                var option = document.createElement("option");
                option.value = status.toLowerCase();
                option.textContent = status;
                statusSelect.appendChild(option);
            });
            container.appendChild(statusSelect);
            container.appendChild(document.createElement("br"));

            var submitButton = document.createElement("button");
            submitButton.textContent = "Update Order";
            submitButton.classList.add("btn", "btn-primary");
            submitButton.addEventListener("click", function () {
                //updatedData.status = document.getElementById("statusSelect").value; // Update status from dropdown
                updateOrder(row, document.getElementById("statusSelect").value);
            });
            container.appendChild(submitButton);

            var closeButton = document.createElement("button");
            closeButton.textContent = "Close";
            closeButton.classList.add("btn", "btn-danger");
            closeButton.addEventListener("click", function () {
                document.body.removeChild(overlay);
                document.body.removeChild(container);
            });
            container.appendChild(closeButton);
            overlay.appendChild(container);

        }

        function updateOrder(row, fields, order_status) {
            console.log("Fields", fields)
            console.log("Updated order data:", row.getData(), order_status);
            const accessToken = getCookie('id_token')
            const orderP = document.getElementById('Products').value
            const s = orderP.split(',')

            if (s[0] === "") {
                alert("The products are empty");
                return;
            }
            const requestBody = {
                userID: row.getData()['PK'],
                orderNum: row.getData()['SK'],
                orderState: order_status,
                products: s
            }
            console.log(requestBody);
            fetch("https://y5b2vf326i.execute-api.us-east-1.amazonaws.com/Testing/adminOrder", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    Authorization: `${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        alert("Updated successfully!")
                    } else {
                        alert("Error updating order!")
                    }
                    console.log(response)
                })
                .then(data => {

                })
                .catch(error => {
                    console.error("API request failed: ", error);
                })
        }

        function processOrder(row, order_status) {
            // Your code to update the order in the database goes here
            console.log("Updated order data:", row.getData(), order_status);
            const accessToken = getCookie('id_token')
            const requestBody = {
                username: row.getData()['PK'],
                orderNum: row.getData()['SK'],
                orderState: order_status
            }
            console.log(requestBody);
            fetch("https://y5b2vf326i.execute-api.us-east-1.amazonaws.com/Testing/adminOrder", {
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: {
                    Authorization: `${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        alert("Updated successfully!")

                    } else {
                        alert("Error updating order!")
                    }
                    console.log(response)
                })
                .then(data => {

                })
                .catch(error => {
                    console.error("API request failed: ", error);
                })
        }

        async function userDashboard(row) {
            var overlay = document.createElement("div");
            overlay.classList.add("dashboard-overlay");
            document.body.appendChild(overlay);
            var container = document.createElement("div");
            container.classList.add("dashboard-container");
            var user = {};
            // Create text fields
            var fields = [
                { title: "Username", field: "username", width: 125 },
                { title: "Email", field: "email", width: 250 },
                { title: "Name", field: "name", width: 150 },
                { title: "Address", field: "address", width: 250 },
                //{ title: "Confirmed", field: "confirmed", width: 100 },
                //{ title: "Unsubscribed", field: "unsubscribed", width: 75 },
                //{ title: "Admin", field: "admin", hozAlign: "center", vertAlign: "middle", formatter: "tickCross", width: 75 }
            ];
            var rowData = row.getData()
            fields.forEach(function (field) {

                var label = document.createElement("label");
                label.textContent = field.title;
                container.appendChild(label);
                container.appendChild(document.createElement("br"));
                var input = document.createElement("input");
                input.type = "text";
                input.placeholder = field.title;
                input.style.width = field.width + "px";
                input.id = field.field; // Assign unique ID
                input.value = rowData[field.field]
                container.appendChild(input);
                container.appendChild(document.createElement("br"));
            });

            var submitButton = document.createElement("button");
            submitButton.textContent = "Update User";
            submitButton.classList.add("btn", "btn-primary");
            submitButton.addEventListener("click", function () {
                user = {}
                fields.forEach(function (field) {
                    user[field.field] = document.getElementById(field.field).value;
                });
                updateUser(user);
            });
            container.appendChild(submitButton);

            var buttonLabels = ["Delete User", "Make Admin", "Revoke Admin", "Password Reset"];
            buttonLabels.forEach(function (label) {
                var button = document.createElement("button");
                button.textContent = label;
                button.classList.add("btn", "btn-primary");
                button.addEventListener("click", function () {
                    switch (label) {
                        case "Delete User":
                            deleteUser(user.username);
                            break;
                        case "Make Admin":
                            makeAdmin(user.username);
                            break;
                        case "Revoke Admin":
                            revokeAdmin(user.username);
                            break;
                        case "Password Reset":
                            passwordReset(user.username);
                            break;
                        default:
                            console.log("Unknown button clicked");
                    }
                });
                container.appendChild(button);
            });

            var closeButton = document.createElement("button");
            closeButton.textContent = "Close";
            closeButton.classList.add("btn", "btn-danger");
            closeButton.addEventListener("click", function () {
                document.body.removeChild(container);
                document.body.removeChild(overlay);
            });
            container.appendChild(closeButton);
            document.body.appendChild(container);

        }

        async function updateUser(user) {
            console.log('updating...')
            const accessToken = getCookie('id_token')
            const requestBody = {
                username: user['username'],
                name: user['name'],
                email: user['email'],
                address: user['address']
            }

            fetch("https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/admin/users", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    Authorization: `${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        alert("Updated successfully!")
                    } else {
                        alert("Error updating user!")
                    }
                    console.log(response)
                })
                .then(data => {

                })
                .catch(error => {
                    console.error("API request failed: ", error);
                })
        }

        async function revokeAdmin(user) {
            console.log('revoking admin...')
            user = document.getElementById('username').value
            const confirmation = window.confirm("Are you sure you want to perform this action?");
            if (!confirmation) {
                return;
            }
            const accessToken = getCookie('id_token');
            const response = await fetch("https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/admin/users", {
                headers: {
                    Authorization: `${accessToken}`,
                },
                method: "POST",
                body: JSON.stringify({
                    isAdmin: "false",
                    username: user
                })
            })
                .then(response => {
                    if (response.status === 200) {
                        alert("Updated successfully!")
                    } else {
                        alert("Error updating user!")
                    }
                    console.log(response)
                })
                .then(data => {

                })
                .catch(error => {
                    console.error("API request failed: ", error);
                })
                .then(response => {
                    if (response.status === 200) {
                        alert("Updated successfully!")
                    } else {
                        alert("Error updating user!")
                    }
                    console.log(response)
                })
                .then(data => {

                })
                .catch(error => {
                    console.error("API request failed: ", error);
                })
            const data = await response;
        }

        async function passworReset(user) {
            console.log('password reset...')
            return
        }

        async function getUsers() {
            try {
                const accessToken = getCookie('id_token');
                const response = await fetch("https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/admin/users", {
                    headers: {
                        Authorization: `${accessToken}`,
                    }
                });
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("API request failed:", error);
                alert(error);
                throw error;
            }
        }

        async function getOrders() {
            try {
                const accessToken = getCookie('id_token');
                const response = await fetch("https://y5b2vf326i.execute-api.us-east-1.amazonaws.com/Testing/adminOrder", {
                    headers: {
                        Authorization: `${accessToken}`,
                    }
                });
                const data = await response.json();
                return data.body;
            } catch (error) {
                console.error("API request failed:", error);
                throw error;
            }
        }



        async function deleteUser(user) {
            console.log(user)
            user = document.getElementById('username').value

            const confirmation = window.confirm("Are you sure you want to perform this action?");
            if (!confirmation) {
                return;
            }
            const accessToken = getCookie('id_token');
            const response = await fetch("https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/admin/users?username=" + user, {
                headers: {
                    Authorization: `${accessToken}`
                },
                method: "DELETE",
            })
                .then(response => {
                    if (response.status === 200) {
                        alert("Updated successfully!")
                    } else {
                        alert("Error updating user!")
                    }
                    console.log(response)
                })
                .then(data => {

                })
                .catch(error => {
                    console.error("API request failed: ", error);
                })

        }

        async function makeAdmin(user) {
            user = document.getElementById('username').value

            const confirmation = window.confirm("Are you sure you want to perform this action?");
            if (!confirmation) {
                return;
            }
            const accessToken = getCookie('id_token');
            const response = await fetch("https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/admin/users", {
                headers: {
                    Authorization: `${accessToken}`,
                },
                method: "POST",
                body: JSON.stringify({
                    isAdmin: "true",
                    username: user
                })
            }).then(response => {
                if (response.status === 200) {
                    alert("Updated successfully!")
                } else {
                    alert("Error updating user!")
                }
                console.log(response)
            }).then(data => {

            })
                .catch(error => {
                    console.error("API request failed: ", error);
                })

        }



        function deleteButtonFormatter(cell, formatterParams, onRendered) {
            var username = cell.getRow().getData().username;
            return '<button class="btn btn-primary btn-sm transparent-bg-button" style="padding: 0.2rem 0.4rem;" onclick="deleteUser(\'' + username + '\')">Delete User</button>';
        }

        function makeAdminButtonFormatter(cell, formatterParams, onRendered) {
            var username = cell.getRow().getData().username;
            return '<button class="btn btn-primary btn-sm transparent-bg-button" style="padding: 0.2rem 0.4rem;" onclick="makeAdmin(\'' + username + '\')">Make Admin</button>';
        }


        async function checkAdminStatus() {
            try {
                const accessToken = getCookie('id_token');
                const username = getValueFromJWT('access_token', "username")
                const response = await fetch("https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/user?user=" + username, {
                    headers: {
                        Authorization: `${accessToken}`,
                    },
                });

                const data = await response.json();
                return data.isAdmin;

            } catch (error) {
                console.error("API request failed:", error);
                alert(error)
                throw error;
            }
        }