const curURL = window.location.href;
access_token = ''
if (curURL.includes('code=')) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const code = urlSearchParams.get('code');
  window.history.replaceState({}, document.title, 'https://main.dva0ia48yehl5.amplifyapp.com/');
  let post_body = {
    "body": {
        "code": code
    }
  }
  fetch('https://qs84bpwvhb.execute-api.us-east-1.amazonaws.com/beta/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post_body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Bad token request.');
      }
      return response.json();
    })
    .then((data) => {
        console.log(data.body)
        access_token = data.body.access_token
        setSessionCookie('access_token', data.body.access_token);
        setSessionCookie('id_token', data.body.id_token);
        setValueToElement("home-user-1", getValueFromJWT('access_token', 'username'))
        updateHref('home-user-1', window.location.href + "accountPage")
        const logoutLink = document.querySelector('#logout-link');
        logoutLink.style.display = 'inline-block';

        // checks whether user is admin or not after login
        fetch("https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/user?user=" + getValueFromJWT('access_token', 'username'), {
            method: 'GET',
            headers: {
                Authorization: `${data.body.access_token}`,
            },
        })
         .then((response) => {
            if (!response.ok) {
                throw new Error("Bad request.");
            }
            return response.json();
         })
         .then((data) => {
            if (data.isAdmin) {
                const adminLink = document.querySelector('#admin-link');
                adminLink.style.display = 'inline-block';
            }
         })
         .catch((error) => {
            console.log('Error: ', error);
         });

    })
    .catch((error) => {
      console.log('Error: ', error);
    });
}
function setSessionCookie(name, value) {
    var cookieString = `${name}=${value}; path=/;`;
    document.cookie = cookieString;
}
function logoutClicked() {
    try {
        deleteCookie('access_token');
        deleteCookie('id_token');
        // location.reload()
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
    }
}
function deleteCookie(cookieName) {
    // Check if the cookie exists
    if (getCookie(cookieName)) {
        // Set the expiration date in the past to delete the cookie
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        console.log(`Cookie '${cookieName}' deleted successfully.`);
    } else {
        console.log(`Cookie '${cookieName}' does not exist.`);
    }
}
function printJWT(cookie) {
    const jwtParts = cookie.split('.');
    if (jwtParts.length === 3) {
        const jwtPayload = JSON.parse(atob(jwtParts[1]));
        console.log(jwtPayload);
    } else {
        console.error("Invalid JWT format");
    }
}
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
        return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
function getValueFromJWT(cookieName, fieldName) {
    const jwtCookie = getCookie(cookieName);
    if (jwtCookie) {
        const parts = jwtCookie.split('.');
        if (parts.length === 3) {
        const decodedPayload = atob(parts[1]);
        const payloadData = JSON.parse(decodedPayload);
            if (payloadData[fieldName]) {
                return payloadData[fieldName];
            }
        }
    }
    return null;
}
function setValueToElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}
function updateHref(elementId, url) {
    const element = document.getElementById(elementId);
    if (element) {
        element.href = url;
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}
function populateAccountPage() {
    const username = getValueFromJWT('access_token', 'username');
    const accessToken = getCookie('id_token')
    fetch("https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/user?user="+username, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
    .then(response => response.json())
    .then(data => {
        document.getElementById("name").value = data.name || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("address").value = data.address || "";     
        document.getElementById("phone").value = data.phone || "";        
        
      if(data.Unsubscribed == "false") {
        let button = document.getElementById("toggleEmail")
        button.textContent = 'On';
        button.style.background = 'var(--bs-body-bg)';
        isOn = true;
      } 
    })
    .catch(error => {
      console.error("API request failed: ", error);
    }).finally(() => {
        $('#loadingModal').modal('hide');
    });
}

function updateUserInfo() {
    $('#loadingModal').modal('show');
    const usernameVal = getValueFromJWT('id_token', 'cognito:username')
    const nameVal = document.getElementById("name").value
    const emailVal = document.getElementById("email").value
    const addressVal = document.getElementById("address").value
    const accessToken = getCookie('id_token')
    const requestBody = {
        username : usernameVal,
        name : nameVal,
        email : emailVal,
        address : addressVal
    }
    fetch("https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/user", {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
          }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
      console.error("API request failed: ", error);
    }).finally(() => {
        $('#loadingModal').modal('hide');
    });
    closeConfirmationModal()
}
function deleteUser() {
    $('#loadingModal').modal('show');
    const usernameVal = getValueFromJWT('id_token', 'cognito:username')
    const accessToken = getCookie('id_token')
    const requestBody = {
        username : usernameVal,
    }
    fetch("https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/user", {
        method: 'DELETE',
        body: JSON.stringify(requestBody),
        headers: {
            Authorization: `${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
     window.location.href = '/'
     console.log(data)
    })
    .catch(error => {
      console.error("API request failed: ", error);
    }).finally(() => {
        $('#loadingModal').modal('hide');
    });
}
function updatePassword() {
    window.location.href = "https://beesbooks.auth.us-east-1.amazoncognito.com/forgotPassword?client_id=6fn54hfl5sql09gnvtsvcerg7n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fdarichards-main-patch-225e.dva0ia48yehl5.amplifyapp.com%2F"
}
function manageUsers() {
    window.location.href = 'manageUsers.html'
}
function showDeleteConfirmationModal() {
    $('#deletionModal').modal('show');
}
function closeConfirmationModal() {
    $('#confirmationModal').modal('hide');
}
function showConfirmationModal() {
    $('#confirmationModal').modal('show');
}
function closeDeletionModal() {
    $('#deletionModal').modal('hide');
}
