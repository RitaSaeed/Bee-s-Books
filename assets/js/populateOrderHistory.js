function getOrderHistory() {    
    let container = document.getElementById("order-history-container");

    let userID = getValueFromJWT('id_token', 'cognito:username');
    let accessToken = getCookie('id_token');

    // let userID = 'narodgers1'
    // let accessToken = 'eyJraWQiOiJGc0ZlejR1bWFkMVh5WnJsNHhLY2gyR3JoYmc1M1V6akw3aHdxc3daWCtZPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiWVBsQ3dkcVpIMWFSaDM0R3phNTQ4dyIsInN1YiI6ImYxM2QzZmZkLTVkNmItNDQzOC1iMzZlLTgxNDRlOWY0ZGU4YSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9QMFlYVGd4WGEiLCJjb2duaXRvOnVzZXJuYW1lIjoiaWxhaWRsYXciLCJvcmlnaW5fanRpIjoiYWJkM2JiZmQtMWI1MC00MTc1LWE3ZTQtNTY3M2FmMjA0MWM3IiwiYXVkIjoiNmZuNTRoZmw1c3FsMDlnbnZ0c3ZjZXJnN24iLCJldmVudF9pZCI6IjFiMDhkODcyLTA2MzItNDg2Yy1iMGY1LTFmNGZmNWRlNDA0MyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzExMzMwMDIzLCJleHAiOjE3MTEzMzM2MjMsImlhdCI6MTcxMTMzMDAyMywianRpIjoiZDYyYzliNDMtN2YyOC00OWYxLWJhNGUtMmMwZGJkMWMyYTVjIiwiZW1haWwiOiJpbGFpZGxhd0ByYWRmb3JkLmVkdSJ9.oOm9oZhUTInHDnD9IrNSNiWbT-QRVkHAVYq2XZ_SbfV-ZSK0TgIyH6pUjOMYHHBD2sZ1fDncWrurOc2XZV_J9CZU5dXxP9R9vpjCgYGzOlvM6cPclNLEYnQJ7CFlC_QFd-MVOTTLqOua69fyLwYVWryBAyrvF9XJmdA47E7QYxJeJ3xOANipn6SSAKzbhf7jGGzk6o2pu3reMEXI9bhOwANG0ojg-GYCLq9DE3Lis4h-u1nXCd1NFn8_a4rMCT9YMdZF3qjbzLp1FPlq4coUGijgI6JUux15SP2H6_j7LjwhjUKOtOynGzACOjXBJLX6Di7sVrsp7bPnFn01LOm7Kg';

    let requestBody = {
        userID: userID,
    }


    let url = `https://y5b2vf326i.execute-api.us-east-1.amazonaws.com/Testing/Orders?userID=${userID}`;

    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(e => {
        console.log('ERROR: ', e);
    });

}
