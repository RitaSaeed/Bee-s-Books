function checkAndAddFavorite(bookIsbn){
        const user = getValueFromJWT('access_token', 'username');
        if(user == null){
            window.location.href = "https://beesbooks.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=6fn54hfl5sql09gnvtsvcerg7n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fmain.dva0ia48yehl5.amplifyapp.com%2F";
        }
        const endpoint = 'https://psiceqjjgb.execute-api.us-east-1.amazonaws.com/BB_prod/userFavorites?username=' + user;
        // Fetch user's favorites
        fetch(endpoint)
        .then(response => {
            if(!response.ok){
                throw new Error('Network Error');
            }
            // Parse response as JSON and return it
            return response.json();
        })
        .then(userFavorites => {
            console.log(userFavorites);
            let found = false; // Variable to track if the book is found in favorites
            for (let i = 0; i < userFavorites.favorites.length; i++) {
                console.log(userFavorites.favorites[i].SK.substring(5));
                if (userFavorites.favorites[i].SK.substring(5) === bookIsbn) {
                    console.log("Book is already in favorites.");
                    found = true; // Set found to true if the book is found in favorites
                    break;
                }
            }
            if (!found) { // If the book is not found in favorites, add it
                console.log("New favorite");
                addFavorite(bookIsbn);
            }
        })
        .catch(error => {
            // Handle fetch errors
            console.log('Error fetching user favorites', error);
        });
    }
        function addFavorite(bookIsbn){
            const endpoint = 'https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/user/favorites';
            const user = getValueFromJWT('access_token', 'username');
            if(user == null){
                window.location.href = "https://beesbooks.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=6fn54hfl5sql09gnvtsvcerg7n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fmain.dva0ia48yehl5.amplifyapp.com%2F";
            }
            const data = {
                username: user,
                favorites: [bookIsbn]
            }
        //configure fetch options
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        };
        //make fetch request to addFavorite lambda endpoint
        fetch(endpoint, fetchOptions)
            .then(response => {
            if(!response.ok){
                throw new Error('Network Error');
            }
            //parse response as JSON and return it
            return response.json();
        })
        .then(responseData => {
            //handle response from lambda function
            console.log('Favorites updated successfully', responseData);
            showNotification("Favorite has been added!")
        })
        .catch(error => {
            //handle fetch errors
            console.log('Error adding favorite', error);
        })
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000); // Remove the notification after 3 seconds
        location.reload();
}