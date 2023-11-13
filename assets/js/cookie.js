const curURL = window.location.href;
access_token = ''

if (curURL.includes('code=')) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const code = urlSearchParams.get('code');
  window.history.replaceState({}, document.title, 'https://darichards-main-patch-225e.dva0ia48yehl5.amplifyapp.com/');

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

        setValueToElement("home-user", getValueFromJWT('access_token', 'username'))
        updateHref('home-user', window.location.href + "accountPage")
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
}

if(document.title.includes('Account Page')) {
    populateAccountPage()
    document.getElementById("deleteAccount").addEventListener('click', showDeleteConfirmationModal);
}   

function setSessionCookie(name, value) {
    
    var cookieString = `${name}=${value}; path=/;`;
    document.cookie = cookieString;
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
    $('#loadingModal').modal('show');


    const username = getValueFromJWT('access_token', 'username');
    const accessToken = getCookie('id_token')

    fetch("https://oevgdgxf8f.execute-api.us-east-1.amazonaws.com/beta/user?user="+username, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
    .then(response => response.json())
    .then(data => {
      document.getElementById("name").value = data.name;
      document.getElementById("email").value = data.email;
      document.getElementById("address").value = data.address;
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